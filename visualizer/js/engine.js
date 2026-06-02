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
        this.time = 0;
        this.timePaused = false;
        this.timeOffset = 0;
        this.mx = 0.5;
        this.my = 0.5;
        this.lastPointerMove = 0;
        this.autoplay = false;
        this.autoplayDuration = 30;
        this.autoplayTimer = 0;
        this.lfo1 = { shape: 'sine', rate: 1.0, value: 0 };
        this.lfo2 = { shape: 'sine', rate: 0.5, value: 0 };
        this.bpmTracker = new BatecBpmAnalyzer();
        this.wavePhases = {};
        this.particleLayers = {};
        this.lyricStates = {};

        this.lyricIdx = 0;
        this.lyricLastSwap = 0;
        this.lyricFadeProgress = 1;
        this.blackout = false;

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
            // Reconstruct default definitions for both global and dynamic layer parameters
            const allDefaults = { ...defaults };
            if (p.layers) {
                p.layers.forEach(layer => {
                    const layerParams = getLayerParams(layer.type, layer.id);
                    Object.assign(allDefaults, layerParams);
                });
            }

            // Restore missing parameters and heal static schema Definitions
            Object.keys(allDefaults).forEach(k => {
                if (!p.params[k]) {
                    p.params[k] = JSON.parse(JSON.stringify(allDefaults[k]));
                } else {
                    p.params[k] = { ...allDefaults[k], ...p.params[k] };
                }
            });

            // Establish defaults for any newly filled parameters
            establishDefaults(p.params);

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

        // Category Toggle Fix: If the master category is disabled, return 0 (killing the effect)
        const catEnabledKey = param.cat + 'Enabled';
        if (preset.settings[catEnabledKey] === false) return 0;

        const ctx = {
            time: this.time, bpm: this.bpmTracker.bpm, avg: this.smoothed.avg, bass: this.smoothed.bass, mid: this.smoothed.mid,
            treble: this.smoothed.treble, trend: this.trend, x: 0, y: 0,
            mx: this.mx, my: this.my, lfo1: this.lfo1.value, lfo2: this.lfo2.value, ...localContext
        };
        let val = param.useFormula ? FormulaEngine.eval(param.formula, ctx, param.value) : param.value;

        // Analytics & Output Normalization (Calibration Layer)
        if (param.isCalibrating) {
            param.calibRawMin = Math.min(param.calibRawMin === undefined ? Infinity : param.calibRawMin, val);
            param.calibRawMax = Math.max(param.calibRawMax === undefined ? -Infinity : param.calibRawMax, val);
        } else if (param.calibrated && param.useFormula) {
            const cMin = param.calibRawMin;
            const cMax = param.calibRawMax;
            if (cMax > cMin) {
                // Interpolate raw [cMin, cMax] into user-defined bounding boxes [param.min, param.max]
                val = param.min + ((val - cMin) / (cMax - cMin)) * (param.max - param.min);
            }
        }

        // Enforce solid safety guards after all filters
        if (param.min !== undefined && val < param.min) val = param.min;
        if (param.max !== undefined && val > param.max) val = param.max;

        return val;
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

    evalPLayer(preset, layerId, key, localContext = {}) {
        const paramKey = `${key}_${layerId}`;
        const param = preset.params[paramKey];
        if (!param) return 0;

        // We don't have catEnabled checks per layer like we did globally.
        // We just assume the layer is active if it's in the list and enabled.
        const layer = preset.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return 0;

        const ctx = {
            time: this.time, bpm: this.bpmTracker.bpm, avg: this.smoothed.avg, bass: this.smoothed.bass, mid: this.smoothed.mid,
            treble: this.smoothed.treble, trend: this.trend, x: 0, y: 0,
            mx: this.mx, my: this.my, lfo1: this.lfo1.value, lfo2: this.lfo2.value, ...localContext
        };
        let val = param.useFormula ? FormulaEngine.eval(param.formula, ctx, param.value) : param.value;

        if (param.isCalibrating) {
            param.calibRawMin = Math.min(param.calibRawMin === undefined ? Infinity : param.calibRawMin, val);
            param.calibRawMax = Math.max(param.calibRawMax === undefined ? -Infinity : param.calibRawMax, val);
        } else if (param.calibrated && param.useFormula) {
            const cMin = param.calibRawMin;
            const cMax = param.calibRawMax;
            if (cMax > cMin) {
                val = param.min + ((val - cMin) / (cMax - cMin)) * (param.max - param.min);
            }
        }

        if (param.min !== undefined && val < param.min) val = param.min;
        if (param.max !== undefined && val > param.max) val = param.max;

        return val;
    }

    pLayer(layerId, key, localContext = {}) {
        const valA = this.evalPLayer(this.active, layerId, key, localContext);
        if (this.session.targetIndex === null) return valA;

        const valB = this.evalPLayer(this.target, layerId, key, localContext);
        const t = (performance.now() - this.session.transitionStart) / this.session.transitionDuration;
        const progress = Math.min(1, Math.max(0, t));

        if (progress >= 1) {
            return valB; // State updates handled by p() normally, but we return target val
        }
        return valA + (valB - valA) * progress;
    }

    switchTo(index) {
        if (index === this.session.activeIndex || index >= this.session.presets.length || index < 0) return;
        this.session.targetIndex = index;
        this.session.transitionStart = performance.now();
        const speed = document.getElementById('sessionTransitionSpeed');
        this.session.transitionDuration = (speed ? parseFloat(speed.value) : 1) * 1000;
        this.time = 0; // Sync math arrays
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
        const paths = ['images/olympics.jpg', 'images/seattle.jpg', 'images/snow.jpg', 'images/train.jpg', 'images/casa.jpg'];
        const isLocalFile = window.location.protocol === 'file:';

        paths.forEach((p, idx) => {
            const img = new Image();
            // Critical Fix: Only set crossOrigin if on a server. Setting it on 'file://' causes a CORS block.
            if (!isLocalFile) img.crossOrigin = "anonymous";

            img.src = p;
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
            await navigator.mediaDevices.getUserMedia({ video: true });
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(d => d.kind === 'videoinput');

            for (let i = 0; i < videoDevices.length; i++) {
                const dev = videoDevices[i];
                this.availableWebcams.push({ id: dev.deviceId, label: dev.label || `Camera ${i + 1}` });
                const vid = document.createElement('video');
                vid.autoplay = true; vid.playsInline = true; vid.muted = true;
                const stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: dev.deviceId } } });
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
            if (document.getElementById('dmxPanel')) document.getElementById('dmxPanel').classList.remove('hidden');

            this.lastFrameTime = performance.now();
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

        // High-fidelity Spectral Flux Onset Detection for BPM
        this.bpmTracker.analyze(this.audio.data, performance.now());
    }

    loop(time) {
        this.updateAudio();

        // Update physics time
        const now = performance.now();
        const deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;

        if (!this.timePaused && (!this.active || !this.active.settings.isPaused)) {
            this.time += deltaTime;
        }

        // Update LFO values
        this.updateLfos(deltaTime);

        // Update Autoplay Scheduler
        if (this.autoplay && !this.timePaused && (!this.active || !this.active.settings.isPaused)) {
            this.autoplayTimer += deltaTime;
            if (this.autoplayTimer >= this.autoplayDuration * 1000) {
                this.autoplayTimer = 0;
                this.switchTo((this.session.activeIndex + 1) % this.session.presets.length);
                if (typeof UI !== 'undefined' && UI.buildSlots) {
                    UI.buildSlots();
                    setTimeout(() => { if (UI.rebuildConfigUI) UI.rebuildConfigUI(); }, 500);
                }
            }
        }

        this.render(time);

        // Sync hardware to visualizer engine
        if (this.dmx) this.dmx.updateFromEngine(this);

        UI.updateTelemetry(this, time);
        requestAnimationFrame((t) => this.loop(t));
    }

    updateLfos(deltaTime) {
        const t = this.time / 1000.0;
        [this.lfo1, this.lfo2].forEach(lfo => {
            const phase = t * lfo.rate * Math.PI * 2;
            let val = 0;
            switch(lfo.shape) {
                case 'sine':
                    val = Math.sin(phase);
                    break;
                case 'triangle':
                    val = 1.0 - 2.0 * Math.abs((phase / Math.PI) % 2.0 - 1.0);
                    break;
                case 'square':
                    val = Math.sin(phase) >= 0 ? 1.0 : -1.0;
                    break;
                case 'saw':
                    val = 1.0 - 2.0 * ((phase / (Math.PI * 2)) % 1.0);
                    break;
                case 'noise':
                    // Smooth noise: interpolate between noise values
                    const step = Math.floor(t * lfo.rate * 2);
                    const fract = (t * lfo.rate * 2) % 1.0;
                    const h1 = Math.sin(step * 12.9898 + 78.233) * 43758.5453;
                    const h2 = Math.sin((step + 1) * 12.9898 + 78.233) * 43758.5453;
                    const r1 = (h1 - Math.floor(h1)) * 2 - 1;
                    const r2 = (h2 - Math.floor(h2)) * 2 - 1;
                    val = r1 + (r2 - r1) * fract;
                    break;
            }
            lfo.value = val;
        });
    }

    render(time) {
        // Track FPS
        const localTime = this.time;
        this.frameCount++;
        if (time > this.fpsUpdateTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (time - this.fpsUpdateTime));
            this.frameCount = 0;
            this.fpsUpdateTime = time;
            const fpsEl = document.getElementById('txt-fps');
            if (fpsEl) fpsEl.textContent = this.fps;
        }

        if (this.blackout) {
            this.ctx.fillStyle = '#000000';
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.bufferCtx.fillStyle = '#000000';
            this.bufferCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            return;
        }

        const ctx = this.bufferCtx; // RE-ENABLE BUFFER (Testing if removing cpu flag fixed it)
        const stA = this.active.settings;
        const progress = this.session.targetIndex !== null ? Math.min(1, (time - this.session.transitionStart) / this.session.transitionDuration) : 0;

        ctx.globalCompositeOperation = 'source-over';
        let bgHex = stA.bgColor || '#000000';
        // Parse hex to RGB
        let r = parseInt(bgHex.slice(1, 3), 16) || 1;
        let g = parseInt(bgHex.slice(3, 5), 16) || 1;
        let b = parseInt(bgHex.slice(5, 7), 16) || 1;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, this.p('clearOpacity')))})`;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        if (stA.webglEnabled && this.shader && this.shader.supported) {
            this.shader.render(this, localTime);
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 1.0;
            ctx.drawImage(this.shader.canvas, 0, 0, window.innerWidth, window.innerHeight);
        }


        // Render dynamically defined layers
        if (this.active.layers) {
            this.active.layers.forEach(layer => {
                if (!layer.enabled) return;

                // --- Apply Masking ---
                const hasMask = layer.settings && layer.settings.maskType && layer.settings.maskType !== 'none';
                if (hasMask) {
                    ctx.save();
                    this.applyLayerMask(ctx, layer);
                }

                if (layer.type === 'photos') this.renderPhotos(ctx, localTime, progress, layer.id);
                if (layer.type === 'waves') renderWaves(this, ctx, localTime, layer.id);
                if (layer.type === 'rays') renderRays(this, ctx, localTime, layer.id);
                if (layer.type === 'particles') this.renderParticles(ctx, localTime, layer.id);
                if (layer.type === 'text') renderLyrics(this, ctx, localTime, progress, layer.id);
                if (layer.type === 'spectrum') this.renderSpectrum(ctx, localTime, layer.id);

                if (hasMask) {
                    ctx.restore();
                }
            });
        }

        // Remove old static layer rendering block


        let finalSource = this.bufferCanvas;

        // 1. GPU Post-FX (Smear / Aberration / Kaleido / Analog Optics)
        if (this.glPost && this.glPost.supported) {
            const aberration = this.p('gpuAberration');
            const smear = this.p('gpuSmearRatio');
            const meltSpeed = this.p('gpuMeltSpeed');
            const kaleido = this.p('gpuKaleidoSegments');
            const grain = this.p('analogNoise');
            const vignette = this.p('analogVignette');
            const dof = this.p('opticsFocusPull');
            const bleed = this.p('analogInkBleed');
            const scan = this.p('analogScanlines');

            // Optimization: Skip expensive FBO pass if all GPU values are disabled
            const active = (stA.gpu_fxEnabled && (aberration > 0 || smear > 0 || kaleido > 0 || Math.abs(meltSpeed) > 0)) ||
                (stA.analogEnabled && (grain > 0 || vignette > 0 || dof > 0 || bleed > 0 || scan > 0));

            if (active) {
                const rx = this.glPost.render(this, this.bufferCanvas, localTime);
                if (rx !== false) finalSource = this.glPost.canvas; // Chain the GPU output
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




    renderPhotos(ctx, time, progress, layerId) {
        const layer = this.active.layers.find(l => l.id === layerId);
        if (!layer) return;
        const mode = layer.settings.photoSourceMode || 'photos';
        const isWebcam = mode === 'webcams';
        const pool = isWebcam ? this.webcamPool : this.imagePool;
        const indices = isWebcam ? (layer.settings.webcamIndices || []) : (layer.settings.imgIndices || []);

        if (pool.length > 0 && indices.length > 0) {
            ctx.save();
            const scale = this.pLayer(layerId, 'imgScale'), glitch = this.pLayer(layerId, 'imgGlitch');
            ctx.translate(window.innerWidth / 2, window.innerHeight / 2); ctx.rotate(this.pLayer(layerId, 'photoRotation'));

            indices.forEach((poolIdx, i) => {
                const item = pool[poolIdx];
                if (!item) return;

                const mediaObj = isWebcam ? item : item.img;
                if (!mediaObj) return;

                if (isWebcam && mediaObj.readyState < 2) return;

                ctx.globalAlpha = this.pLayer(layerId, 'imgOpacity') * (1 - progress);

                const ox = glitch > 0 ? Math.sin(time / 1000 + i) * glitch : 0;
                const oy = glitch > 0 ? Math.cos(time / 1200 + i) * glitch : 0;
                ctx.filter = `hue-rotate(${i * 60 + this.trend * 360}deg) blur(${this.pLayer(layerId, 'imgBlur')}px) saturate(${this.pLayer(layerId, 'imgSaturate')}%) contrast(${this.pLayer(layerId, 'photoContrast')}%)`;
                ctx.globalCompositeOperation = layer.settings.imgBlendMode || 'screen';
                const w = window.innerWidth * scale, h = window.innerHeight * scale;
                ctx.drawImage(mediaObj, -w / 2 + ox, -h / 2 + oy, w, h);
            });
            ctx.restore();
        }
    }


    renderParticles(ctx, time, layerId) {
        const required = Math.floor(this.pLayer(layerId, 'particleCount'));
        if (!this.particleLayers[layerId]) this.particleLayers[layerId] = [];
        const particles = this.particleLayers[layerId];

        while (particles.length < required) {
            particles.push(new BatecParticle(this, layerId));
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < required; i++) {
            const p = particles[i];
            p.update(time);
            p.draw(ctx);
        }
        ctx.restore();
    }

    advanceManualLyrics() {
        const localTime = this.time;
        const active = this.active;
        if (!active || !active.layers) return;
        
        active.layers.forEach(layer => {
            if (layer.type === 'text' && layer.settings.textManualMode) {
                if (!this.lyricStates) this.lyricStates = {};
                if (!this.lyricStates[layer.id]) {
                    this.lyricStates[layer.id] = { lyricIdx: 0, lyricLastSwap: 0 };
                }
                const state = this.lyricStates[layer.id];
                const validTexts = layer.settings.textList.filter(t => t.trim().length > 0);
                if (validTexts.length > 0) {
                    state.lyricLastSwap = localTime;
                    if (layer.settings.textSequenceMode === 'random') {
                        state.lyricIdx = Math.floor(Math.random() * validTexts.length);
                    } else {
                        state.lyricIdx = (state.lyricIdx + 1) % validTexts.length;
                    }
                }
            }
        });
    }

    applyLayerMask(ctx, layer) {
        const type = layer.settings.maskType;
        const invert = layer.settings.maskInvert || false;
        
        // Evaluate mask parameters (they support formulas!)
        const mx = this.pLayer(layer.id, 'maskX') * window.innerWidth;
        const my = this.pLayer(layer.id, 'maskY') * window.innerHeight;
        const mSize = this.pLayer(layer.id, 'maskSize') * Math.max(window.innerWidth, window.innerHeight);

        ctx.beginPath();
        if (type === 'circle') {
            if (invert) {
                // Outer rectangle clockwise, inner shape counter-clockwise to subtract
                ctx.rect(0, 0, window.innerWidth, window.innerHeight);
                ctx.arc(mx, my, Math.max(0.1, mSize / 2), 0, Math.PI * 2, true);
            } else {
                ctx.arc(mx, my, Math.max(0.1, mSize / 2), 0, Math.PI * 2);
            }
        } else if (type === 'rect') {
            const w = mSize;
            const h = mSize * 0.75; // 4:3 aspect ratio default
            const x = mx - w / 2;
            const y = my - h / 2;
            if (invert) {
                ctx.rect(0, 0, window.innerWidth, window.innerHeight);
                // Draw inner rect counter-clockwise
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + h);
                ctx.lineTo(x + w, y + h);
                ctx.lineTo(x + w, y);
                ctx.closePath();
            } else {
                ctx.rect(x, y, w, h);
            }
        } else if (type === 'horizontal_band') {
            const h = mSize * 0.5;
            const y1 = my - h / 2;
            if (invert) {
                ctx.rect(0, 0, window.innerWidth, Math.max(0, y1));
                ctx.rect(0, my + h / 2, window.innerWidth, window.innerHeight - (my + h / 2));
            } else {
                ctx.rect(0, y1, window.innerWidth, h);
            }
        } else if (type === 'vertical_band') {
            const w = mSize * 0.5;
            const x1 = mx - w / 2;
            if (invert) {
                ctx.rect(0, 0, Math.max(0, x1), window.innerHeight);
                ctx.rect(mx + w / 2, 0, window.innerWidth - (mx + w / 2), window.innerHeight);
            } else {
                ctx.rect(x1, 0, w, window.innerHeight);
            }
        } else if (type === 'grid') {
            // Checkerboard grid mask
            const cols = 4;
            const rows = 3;
            const w = window.innerWidth / cols;
            const h = window.innerHeight / rows;
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    if ((c + r) % 2 === (invert ? 1 : 0)) {
                        ctx.rect(c * w + (w - w * mSize)/2, r * h + (h - h * mSize)/2, w * mSize, h * mSize);
                    }
                }
            }
        }
        ctx.clip();
    }

    renderSpectrum(ctx, localTime, layerId) {
        if (!this.audio.analyser || !this.audio.data) return;
        
        const count = Math.min(256, Math.floor(this.pLayer(layerId, 'spectrumCount')));
        const scaleHeight = this.pLayer(layerId, 'spectrumHeight');
        const specWidth = this.pLayer(layerId, 'spectrumWidth') * window.innerWidth;
        const centerX = this.pLayer(layerId, 'spectrumX') * window.innerWidth;
        const centerY = this.pLayer(layerId, 'spectrumY') * window.innerHeight;
        const opacity = this.pLayer(layerId, 'spectrumOpacity');
        const thick = this.pLayer(layerId, 'spectrumThickness');
        
        const layer = this.active.layers.find(l => l.id === layerId);
        const style = layer?.settings?.spectrumStyle || 'bars';
        
        ctx.save();
        
        // Custom palette color blending if enabled
        let colorBase = this.active.settings.palette[0];
        if (layer?.settings?.useLayerColor) {
            if (Array.isArray(layer.settings.layerColors) && layer.settings.layerColors.length > 0) {
                colorBase = layer.settings.layerColors[0];
            } else {
                colorBase = layer.settings.layerColor || '#ffffff';
            }
        }
        
        ctx.strokeStyle = colorBase;
        ctx.fillStyle = colorBase;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = thick;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const data = this.audio.data;
        const len = Math.min(data.length, count);
        
        if (style === 'bars') {
            const barW = specWidth / len;
            const startX = centerX - specWidth / 2;
            for (let i = 0; i < len; i++) {
                const val = (data[i] / 255.0) * scaleHeight;
                ctx.fillRect(startX + i * barW, centerY - val / 2, Math.max(1, barW - 2), val);
            }
        } else if (style === 'waveform') {
            const step = specWidth / len;
            const startX = centerX - specWidth / 2;
            ctx.beginPath();
            for (let i = 0; i < len; i++) {
                const val = (data[i] / 255.0) * scaleHeight;
                const px = startX + i * step;
                const py = centerY - val / 2;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        } else if (style === 'circular_spectrum') {
            const radius = specWidth / 6; // base radius
            ctx.beginPath();
            for (let i = 0; i < len; i++) {
                const angle = (i / len) * Math.PI * 2;
                const val = (data[i] / 255.0) * scaleHeight;
                const r = radius + val;
                const px = centerX + Math.cos(angle) * r;
                const py = centerY + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
        } else if (style === 'circular_waveform') {
            const radius = specWidth / 6;
            ctx.beginPath();
            for (let i = 0; i < len; i++) {
                // Mirror it to make a smooth circle
                const idx = i < len / 2 ? i : len - i;
                const angle = (i / len) * Math.PI * 2;
                const val = (data[Math.floor(idx)] / 255.0) * scaleHeight;
                const r = radius + val;
                const px = centerX + Math.cos(angle) * r;
                const py = centerY + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
        }
        
        ctx.restore();
    }

}