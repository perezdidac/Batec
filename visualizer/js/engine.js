class BatecEngine {
    constructor() {
        this.canvas = document.getElementById('visualizerCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Post-Processing Buffers
        this.bufferCanvas = document.createElement('canvas');
        this.bufferCtx = this.bufferCanvas.getContext('2d');
        this.noiseCanvas = document.createElement('canvas');
        this.noiseCtx = this.noiseCanvas.getContext('2d');
        this.noiseCanvas.width = this.noiseCanvas.height = 256;

        this.fps = 0;
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.fpsUpdateTime = 0;

        this.session = {
            presets: [createDefaultPreset("Default Project")],
            activeIndex: 0,
            targetIndex: null,
            transitionStart: 0,
            transitionDuration: 1000
        };

        this.audio = { ctx: null, analyser: null, data: null, source: null };
        this.smoothed = { bass: 0, mid: 0, treble: 0, avg: 0 };
        this.trend = 0;
        this.energyHistory = [];
        this.lastInteraction = Date.now();
        this.imagePool = [];
        this.lastImageCycle = 0;
        this.webcamPool = [];
        this.availableWebcams = [];
        this.webcamsInitialized = false;
        this.wavePhases = [];

        this.lyricIdx = 0;
        this.lyricLastSwap = 0;
        this.lyricFadeProgress = 1;

        this.healPresets();
        this.initResize();
        this.loadImages();
        this.midi = new BatecMIDI(this);
        this.shader = new BatecShader();
        this.glPost = new BatecGLPostFX();
        this.dmx = new BatecDMX(this);
        
        // Setup DMX Connection Button
        const dmxBtn = document.getElementById('btnDmxConnect');
        if (dmxBtn) {
            dmxBtn.addEventListener('click', () => {
                this.dmx.toggle();
            });
        }
    }

    healPresets() {
        const defaults = createDefaultParams();
        const defSet = createDefaultPreset().settings;
        this.session.presets.forEach(p => {
            // Restore missing parameters
            Object.keys(defaults).forEach(k => {
                if (!p.params[k]) p.params[k] = JSON.parse(JSON.stringify(defaults[k]));
            });
            // Auto-heal missing settings
            Object.keys(defSet).forEach(k => {
                if (p.settings[k] === undefined) {
                    p.settings[k] = Array.isArray(defSet[k]) ? [...defSet[k]] : defSet[k];
                }
            });
        });
    }



    get active() { return this.session.presets[this.session.activeIndex]; }
    get target() { return this.session.targetIndex !== null ? this.session.presets[this.session.targetIndex] : null; }

    evalP(preset, key, localContext = {}) {
        const param = preset.params[key];
        if (!param) return 0;
        const ctx = {
            time: performance.now(), avg: this.smoothed.avg, bass: this.smoothed.bass, mid: this.smoothed.mid,
            treble: this.smoothed.treble, trend: this.trend, x: 0, y: 0, ...localContext
        };
        return param.useFormula ? FormulaEngine.eval(param.formula, ctx, param.value) : param.value;
    }

    p(key, localContext = {}) {
        const valA = this.evalP(this.active, key, localContext);
        if (this.session.targetIndex === null) return valA;

        const valB = this.evalP(this.target, key, localContext);
        const t = (performance.now() - this.session.transitionStart) / this.session.transitionDuration;
        const progress = Math.min(1, Math.max(0, t));

        if (progress >= 1) {
            this.session.activeIndex = this.session.targetIndex;
            this.session.targetIndex = null;
            return valB;
        }
        return valA + (valB - valA) * progress;
    }

    switchTo(index) {
        if (index === this.session.activeIndex || index >= this.session.presets.length || index < 0) return;
        this.session.targetIndex = index;
        this.session.transitionStart = performance.now();
        const speed = document.getElementById('sessionTransitionSpeed');
        this.session.transitionDuration = (speed ? parseFloat(speed.value) : 1) * 1000;
    }

    initResize() {
        const resize = () => {
            if (!this.canvas) return;
            const w = window.innerWidth;
            const h = window.innerHeight;
            const dpr = window.devicePixelRatio;

            this.canvas.width = w * dpr;
            this.canvas.height = h * dpr;
            this.canvas.style.width = w + 'px';
            this.canvas.style.height = h + 'px';
            this.ctx.scale(dpr, dpr);

            this.bufferCanvas.width = w * dpr;
            this.bufferCanvas.height = h * dpr;
            this.bufferCtx.scale(dpr, dpr);
        };
        window.addEventListener('resize', resize); resize();
    }

    loadImages() {
        const paths = ['images/olympics.jpg', 'images/seattle.jpg', 'images/snow.jpg', 'images/train.jpg'];
        paths.forEach((p, idx) => {
            const img = new Image(); img.src = p;
            img.onload = () => {
                this.imagePool.push({ img, path: p, name: p.split('/').pop().split('.')[0] });
                UI.buildImageSelectors(); // Re-build UI when image finishes loading
            };
        });
    }

    async requestWebcams(callback) {
        if (this.webcamsInitialized) { if (callback) callback(); return; }
        try {
            // Request permission
            await navigator.mediaDevices.getUserMedia({video: true});
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === 'videoinput');
            
            for (let i = 0; i < videoDevices.length; i++) {
                const dev = videoDevices[i];
                this.availableWebcams.push({ id: dev.deviceId, label: dev.label || `Camera ${i+1}` });
                const vid = document.createElement('video');
                vid.autoplay = true; vid.playsInline = true; vid.muted = true;
                const stream = await navigator.mediaDevices.getUserMedia({video: {deviceId: {exact: dev.deviceId}}});
                vid.srcObject = stream;
                vid.play().catch(e => console.warn("Auto-play blocked:", e)); // Vital for non-DOM elements
                this.webcamPool.push(vid);
            }
            
            // Auto-select first camera if none assigned
            if (this.availableWebcams.length > 0) {
                this.session.presets.forEach(p => {
                    if (!p.settings.webcamIndices || p.settings.webcamIndices.length === 0) {
                        p.settings.webcamIndices = [0];
                    }
                });
            }

            this.webcamsInitialized = true;
            if (callback) callback();
        } catch (err) {
            console.error("Webcam Init Error:", err);
            // Non-blocking alert so UI flow continues
            alert("Could not access Webcams. Please run Batec via a local server (http://localhost) to enable camera permissions, and ensure a camera is connected.");
            
            this.availableWebcams = [];
            this.webcamPool = [];
            this.webcamsInitialized = true; // prevent infinite loops
            if (callback) callback();
        }
    }

    async startAudio() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.audio.analyser = this.audio.ctx.createAnalyser();
            this.audio.analyser.fftSize = 512;
            this.audio.source = this.audio.ctx.createMediaStreamSource(stream);
            this.audio.source.connect(this.audio.analyser);
            this.audio.data = new Uint8Array(this.audio.analyser.frequencyBinCount);

            // Show telemetry when audio starts
            document.getElementById('telemetryPanel').classList.remove('hidden');

            requestAnimationFrame((t) => this.loop(t));
        } catch (e) { alert("Mic required."); }
    }

    updateAudio() {
        if (!this.audio.analyser || this.active.settings.isPaused) return;
        this.audio.analyser.getByteFrequencyData(this.audio.data);
        let sum = 0, b = 0, m = 0, t = 0;
        const len = this.audio.data.length;
        const sens = this.p('sensitivity');
        for (let i = 0; i < len; i++) {
            const v = Math.min(255, this.audio.data[i] * (sens / 2.8));
            sum += v;
            // Bass (0-3%), Mid (3-15%), Treble (15-100%)
            if (i < len * 0.03) b += v;
            else if (i < len * 0.15) m += v;
            else t += v;
        }
        const bLen = Math.max(1, len * 0.03);
        const mLen = Math.max(1, len * 0.12);
        const tLen = Math.max(1, len * 0.85);

        const lerp = 0.15;
        // Applying pre-emphasis multipliers for visual balance (Bass needs reduction, Treble needs boost)
        this.smoothed.bass += ((b / bLen) * 0.8 - this.smoothed.bass) * lerp;
        this.smoothed.mid += ((m / mLen) * 1.8 - this.smoothed.mid) * lerp;
        this.smoothed.treble += ((t / tLen) * 5.0 - this.smoothed.treble) * lerp;
        this.smoothed.avg += (sum / len - this.smoothed.avg) * lerp;

        this.energyHistory.push(this.smoothed.avg);
        if (this.energyHistory.length > 200) this.energyHistory.shift();
        const histAvg = this.energyHistory.reduce((a, b) => a + b, 0) / this.energyHistory.length;
        this.trend += ((histAvg / 180) - this.trend) * this.p('trendRate');
        this.trend = Math.max(0, Math.min(1, this.trend));
    }

    loop(time) {
        this.updateAudio();
        this.render(time);
        
        // Sync hardware to visualizer engine
        if (this.dmx) this.dmx.updateFromEngine(this);
        
        UI.updateTelemetry(this, time);
        requestAnimationFrame((t) => this.loop(t));
    }

    render(time) {
        // Track FPS
        this.frameCount++;
        if (time > this.fpsUpdateTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (time - this.fpsUpdateTime));
            this.frameCount = 0;
            this.fpsUpdateTime = time;
            const fpsEl = document.getElementById('txt-fps');
            if (fpsEl) fpsEl.textContent = this.fps;
        }

        const ctx = this.bufferCtx; // RE-ENABLE BUFFER (Testing if removing cpu flag fixed it)
        const stA = this.active.settings;
        const progress = this.session.targetIndex !== null ? Math.min(1, (time - this.session.transitionStart) / this.session.transitionDuration) : 0;

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(1, 1, 1, ${Math.max(0, Math.min(1, this.p('clearOpacity')))})`;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        if (stA.webglEnabled && this.shader && this.shader.supported) {
            this.shader.render(this, time);
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 1.0;
            ctx.drawImage(this.shader.canvas, 0, 0, window.innerWidth, window.innerHeight);
        }

        if (stA.photosEnabled) {
            const mode = stA.photoSourceMode || 'photos';
            const isWebcam = mode === 'webcams';
            const pool = isWebcam ? this.webcamPool : this.imagePool;
            const indices = isWebcam ? (stA.webcamIndices || []) : (stA.imgIndices || []);

            if (pool.length > 0 && indices.length > 0) {
                ctx.save();
                const scale = this.p('imgScale'), glitch = this.p('imgGlitch');
                ctx.translate(window.innerWidth / 2, window.innerHeight / 2); ctx.rotate(this.p('photoRotation'));

                indices.forEach((poolIdx, i) => {
                    const item = pool[poolIdx];
                    if (!item) return;
                    
                    const mediaObj = isWebcam ? item : item.img;
                    if (!mediaObj) return;
                    
                    // Webcams take a bit to spin up, prevent drawing empty states
                    if (isWebcam && mediaObj.readyState < 2) return;

                    ctx.globalAlpha = (0.2 + (this.smoothed.avg / 255) * 0.6) * (1 - progress);
                    const ox = Math.sin(time / 800 + i) * glitch * this.trend;
                    const oy = Math.cos(time / 900 + i) * glitch * this.trend;
                    // ctx.filter = `hue-rotate(${i * 60 + this.trend * 360}deg) blur(${this.p('imgBlur')}px) saturate(${this.p('imgSaturate')}%) contrast(${this.p('photoContrast')}%)`;
                    ctx.globalCompositeOperation = stA.imgBlendMode;
                    const w = window.innerWidth * scale, h = window.innerHeight * scale;
                    ctx.drawImage(mediaObj, -w / 2 + ox, -h / 2 + oy, w, h);
                });
                ctx.restore();
            }
        }

        if (stA.wavesEnabled !== false) renderWaves(this, ctx, time);
        if (stA.raysEnabled !== false) renderRays(this, ctx, time);
        if (stA.particlesEnabled !== false) this.renderParticles(ctx, time);
        if (stA.textEnabled !== false) renderLyrics(this, ctx, time, progress);

        let finalSource = this.bufferCanvas;
        
        // 1. GPU Post-FX (Smear / Aberration / Kaleido)
        if (stA.gpu_fxEnabled && this.glPost && this.glPost.supported) {
            const aberration = this.p('gpuAberration');
            const smear = this.p('gpuSmearRatio');
            const kaleido = this.p('gpuKaleidoSegments');
            
            // Optimization: Skip expensive FBO pass if all GPU values are disabled
            if (aberration > 0 || smear > 0 || kaleido > 0) {
                this.glPost.render(this, this.bufferCanvas, time);
                finalSource = this.glPost.canvas; // Chain the GPU output
            }
        }
        
        // 2. CPU Analog Post-FX & Screen Transfer
        applyAnalogPostFX(this, finalSource);

        const pnl = document.getElementById('controlsPanel');
        const showBtn = document.getElementById('btnShowUI');
        // If UI is hidden and user didn't move mouse, fade the recall button too
        if (pnl && showBtn) {
            if (pnl.classList.contains('hidden') && Date.now() - this.lastInteraction > 5000) showBtn.classList.add('inactive');
            else showBtn.classList.remove('inactive');
        }
    }



    renderParticles(ctx, time) {
        const required = Math.floor(this.p('particleCount'));
        if (!this.particles) this.particles = [];
        while (this.particles.length < required) this.particles.push(new BatecParticle(this));
        if (this.particles.length > required) this.particles.length = required;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        this.particles.forEach(p => { p.update(time); p.draw(ctx); });
        ctx.restore();
    }
}