/**
 * BATEC VJ ENGINE v6.0 - Telemetry & Polish Update
 * Professional Stage Projection Framework
 */

// --- CORE UTILITIES ---

const FormulaEngine = {
    eval(formula, context, fallback = 0, min = null, max = null) {
        try {
            const { time, avg, bass, mid, treble, trend, x, y } = context;
            const fn = new Function('time', 'avg', 'bass', 'mid', 'treble', 'trend', 'x', 'y', 'Math', 'window', `try { return ${formula}; } catch(e) { return ${fallback}; }`);
            let val = fn(time, avg, bass, mid, treble, trend, x, y, Math, window);
            if (typeof val !== 'number' || isNaN(val)) return fallback;
            return val;
        } catch (e) { return fallback; }
    }
};

const ColorUtils = {
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
    },
    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) { h = s = 0; } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, l * 100];
    },
    lerpColor(hexA, hexB, t) {
        const a = this.hexToRgb(hexA);
        const b = this.hexToRgb(hexB);
        const r = Math.round(a.r + (b.r - a.r) * t);
        const g = Math.round(a.g + (b.g - a.g) * t);
        const bl = Math.round(a.b + (b.b - a.b) * t);
        return `rgb(${r},${g},${bl})`;
    }
};

// --- DATA DEFINITIONS ---

function createDefaultParams() {
    return {
        // PHYSICS
        sensitivity: { cat: 'physics', name: 'Mic Sens. [x]', min: 0.1, max: 20, step: 0.1, value: 2.8, formula: '2.8 + bass/100', useFormula: false, desc: 'Multiplies incoming audio energy. Higher values make the visualizer more reactive to quiet music.' },
        trendRate: { cat: 'physics', name: 'Trend Rate', min: 0.001, max: 0.2, step: 0.001, value: 0.04, formula: '0.04', useFormula: false, desc: 'Determines how fast the "Energy Trend" (0-1) updates. Low values create a smooth long-term average.' },
        clearOpacity: { cat: 'physics', name: 'Trail Persistence', min: 0, max: 1, step: 0.01, value: 0.12, formula: '0.12 + (1 - trend) * 0.1', useFormula: false, desc: 'Controls how much of the previous frame remains. 0 = Permanent trails, 1 = No trails.' },

        // WAVES
        waveCount: { cat: 'waves', name: 'Emanation Rings', min: 0, max: 50, step: 1, value: 0, formula: 'Math.floor(bass/50)', useFormula: false, desc: 'Number of circular waves expanding from the center. Works best when tied to Bass via formula.' },
        waveSpeed: { cat: 'waves', name: 'Wave Velocity', min: -10, max: 10, step: 0.1, value: 2.0, formula: '2.0 * (1 + trend)', useFormula: false, desc: 'The speed at which rings expand. Negative values make rings collapse inward.' },
        waveThickness: { cat: 'waves', name: 'Stroke Width [px]', min: 1, max: 100, step: 1, value: 10, formula: '10 + bass/5', useFormula: false, desc: 'Thickness of the circular wave outlines.' },
        waveChaos: { cat: 'waves', name: 'Distortion Field', min: 0, max: 200, step: 1, value: 20, formula: 'Math.sin(time/200) * 50', useFormula: false, desc: 'Adds Perlin-like noise distortion to the wave perimeter for an organic, liquid look.' },
        waveOpacity: { cat: 'waves', name: 'Global Opacity', min: 0, max: 1, step: 0.05, value: 0.8, formula: '0.8', useFormula: false, desc: 'Alpha transparency for the entire wave layer.' },

        // RAYS (HYPERSPACE)
        rayCount: { cat: 'rays', name: 'Laser Beams', min: 0, max: 200, step: 1, value: 24, formula: '24 + (trend > 0.8 ? 16 : 0)', useFormula: true, desc: 'Number of light rays emanating from the center point.' },
        raySpeed: { cat: 'rays', name: 'Tunnel Rotation', min: -5, max: 5, step: 0.1, value: 0.5, formula: '0.5 + Math.sin(time/5000)', useFormula: false, desc: 'Rotation speed of the beam array.' },
        rayThickness: { cat: 'rays', name: 'Beam Width', min: 1, max: 50, step: 1, value: 4, formula: '4 + (bass/50)', useFormula: true, desc: 'Width of each individual light ray.' },
        rayCenterHole: { cat: 'rays', name: 'Void Radius', min: 0, max: 800, step: 5, value: 80, formula: '80 + (trend * 150)', useFormula: true, desc: 'Creates a black circular "Eye" in the center where no rays are drawn.' },
        rayChaos: { cat: 'rays', name: 'Jitter Distortion', min: 0, max: 2, step: 0.05, value: 0.2, formula: '0.2 + trend', useFormula: false, desc: 'Adds aggressive jitter to the beam position for a glitched, strobe-like effect.' },
        rayOpacity: { cat: 'rays', name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.9, formula: '0.9', useFormula: false, desc: 'Alpha transparency for the laser beams.' },

        // PHOTOS
        imgScale: { cat: 'photos', name: 'Base Scale [x]', min: 0.5, max: 5, step: 0.1, value: 1.6, formula: '1.6 + trend*0.5', useFormula: false, desc: 'The zoom level of the background media. Values > 1 ensure Mediterranean artifacts fill the screen.' },
        imgGlitch: { cat: 'photos', name: 'Glitch Intensity', min: 0, max: 500, step: 1, value: 120, formula: '120 + bass', useFormula: false, desc: 'Randomized X/Y offset applied to the image based on music energy.' },
        imgBlur: { cat: 'photos', name: 'Optical Blur [px]', min: 0, max: 200, step: 1, value: 20, formula: '20 + bass/10', useFormula: true, desc: 'Real-time gaussian-style blur applied to the media pool.' },
        imgSaturate: { cat: 'photos', name: 'Saturation [%]', min: 0, max: 500, step: 1, value: 150, formula: '100 + trend*200', useFormula: true, desc: 'Deepens or washes out colors. 100% is natural, 0% is B&W.' },
        photoRotation: { cat: 'photos', name: 'Tilt Axis [rad]', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'Math.sin(time/2000) * 0.2', useFormula: false, desc: 'Slow rotation of the background media for a floating sensation.' },
        photoContrast: { cat: 'photos', name: 'Contrast Mod [%]', min: 0, max: 500, step: 1, value: 110, formula: '100 + bass', useFormula: false, desc: 'Digital contrast boost. High values (>200) create a high-fashion, high-energy look.' },

        // PARTICLES
        particleCount: { cat: 'particles', name: 'Kinetic Volume', min: 0, max: 2500, step: 10, value: 500, formula: '500 + Math.floor(trend*1000)', useFormula: false, desc: 'Number of active debris particles.' },
        particleSize: { cat: 'particles', name: 'Geometry Scale', min: 0.1, max: 150, step: 0.1, value: 4.0, formula: '3 + (bass/255) * 8 * trend', useFormula: true, desc: 'Size of individual particles.' },
        particleSpeed: { cat: 'particles', name: 'Speed Limit', min: 0.1, max: 20, step: 0.1, value: 2.0, formula: '2.0 + trend*5', useFormula: false, desc: 'How fast particles move.' },
        particleChaos: { cat: 'particles', name: 'Brownian Force', min: 0, max: 200, step: 1, value: 60, formula: '60 + bass', useFormula: false, desc: 'Random force applied to particle movement.' },
        particleOpacity: { cat: 'particles', name: 'Alpha Blend', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.2 + trend*0.5', useFormula: false, desc: 'Transparency of the particle field.' },
        particleDirection: { cat: 'particles', name: 'Force Vector', min: -Math.PI, max: Math.PI, step: 0.05, value: 0, formula: 'Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)', useFormula: true, desc: 'The direction particles travel.' },
        particleColorSpeed: { cat: 'particles', name: 'Hue Pulse', min: 0, max: 100, step: 1, value: 10, formula: '10 + trend*50', useFormula: false, desc: 'Speed at which particles cycle through the palette colors.' },
        particleRotation: { cat: 'particles', name: 'Geometry Spin', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'time/1000', useFormula: false, desc: 'Rotation of shapes like squares and triangles.' },
        particleGravity: { cat: 'particles', name: 'Gravity Y-Pull', min: -10, max: 10, step: 0.1, value: 0, formula: 'trend > 0.8 ? -2 : 1', useFormula: false, desc: 'Simulates weight pulling particles up or down.' },

        // TEXT
        textScale: { cat: 'text', name: 'Typography Zoom [x]', min: 0.1, max: 5.0, step: 0.05, value: 1.0, formula: '1.0 + trend', useFormula: false, desc: 'Size multiplier for the lyric text.' },
        textBlur: { cat: 'text', name: 'Atmosphere Fog [px]', min: 0, max: 200, step: 1, value: 30, formula: '30 + (1-trend)*20', useFormula: false, desc: 'Blur applied to text for a cinematic, hazy glow.' },
        textJitterX: { cat: 'text', name: 'Glitch Shift X [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.sin(time/200) * trend * 30', useFormula: true, desc: 'Horizontal jitter applied to lyrics.' },
        textJitterY: { cat: 'text', name: 'Glitch Shift Y [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.cos(time/200) * trend * 30', useFormula: true, desc: 'Vertical jitter applied to lyrics.' },
        textRotation: { cat: 'text', name: 'Z-Rotation [rad]', min: -0.5, max: 0.5, step: 0.01, value: 0, formula: 'Math.sin(time/1000) * 0.1', useFormula: false, desc: 'Subtle weaving rotation for text.' },
        textOpacity: { cat: 'text', name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.4 + trend*0.6', useFormula: false, desc: 'Transparency of the text layer.' },
        textHoldTime: { cat: 'text', name: 'Text Duration [s]', min: 1, max: 60, step: 0.5, value: 5.0, formula: '5', useFormula: false, desc: 'How long each word stays on screen.' },
        textFadeTime: { cat: 'text', name: 'Text Transition [s]', min: 0.1, max: 10, step: 0.1, value: 1.0, formula: '1', useFormula: false, desc: 'Duration of the fade-in/out transition.' },

        // ANALOG POST-PROCESSING
        analogDrift: { cat: 'analog', name: 'RGB Ghosting [px]', min: 0, max: 200, step: 1, value: 5, formula: 'trend > 0.8 ? 50 : 5', useFormula: true, desc: 'Offsets Color Channels for a nostalgic double-vision effect.' },
        analogScanlines: { cat: 'analog', name: 'CRT Scanlines', min: 0, max: 0.3, step: 0.01, value: 0.15, formula: '0.15', useFormula: false, desc: 'Simulates old TV hardware by drawing horizontal bars across the entire image.' },
        analogNoise: { cat: 'analog', name: 'Film Grain', min: 0, max: 1, step: 0.01, value: 0.08, formula: '0.08 + (bass/255)*0.2', useFormula: true, desc: 'Adds digital noise for a cinematic, film-like texture.' },
        analogWarmth: { cat: 'analog', name: 'Mediterranean Glow', min: 0, max: 1, step: 0.05, value: 0.3, formula: '0.3', useFormula: false, desc: 'Applies a sunset-inspired warm color wash specifically tailored for Agost projections.' },
        analogLightLeak: { cat: 'analog', name: 'Sun Flare Leaks', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.4 + (trend * 0.3)', useFormula: true, desc: 'Simulates light leaking into a film camera lens.' },
        analogVignette: { cat: 'analog', name: 'Vignette Darkening', min: 0, max: 1, step: 0.05, value: 0.5, formula: '0.5 + (avg/255)*0.2', useFormula: true, desc: 'Darkens the corners of the screen to draw focus to the center.' }
    };
}

function establishDefaults(params) {
    Object.keys(params).forEach(k => {
        if (params[k].defaultVal === undefined) {
            params[k].defaultVal = params[k].value;
            params[k].defaultForm = params[k].formula;
        }
    });
    return params;
}

function createDefaultPreset(name = "New Preset") {
    return {
        name: name,
        settings: {
            palette: ['#FFD700', '#FF8C00', '#FF4500', '#87CEEB', '#00BFFF', '#228B22'],
            particleShape: 'circle',
            imgBlendMode: 'screen',
            imgIndices: [], // Default photos off
            photoSourceMode: 'photos', // 'photos' or 'webcams'
            webcamIndices: [],
            textEnabled: true, // RE-ENABLED by default so user can see it works
            textList: ["AGOST", "BATEC", "ESTIU", "", ""],
            textSequenceMode: 'order',
            
            // Category Toggles
            physicsEnabled: true,
            wavesEnabled: true,
            raysEnabled: true,
            photosEnabled: true,
            particlesEnabled: true,
            analogEnabled: true
        },
        params: establishDefaults(createDefaultParams())
    };
}

// --- ENGINE CONTROLLER ---

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
        this.initMIDI();
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

    initMIDI() {
        if (!navigator.requestMIDIAccess) return;
        navigator.requestMIDIAccess().then(access => {
            const ind = document.getElementById('midiIndicator');
            const inputs = Array.from(access.inputs.values());
            if (inputs.length > 0) {
                if (ind) ind.textContent = `MIDI: ${inputs[0].name.toUpperCase()}`;
                inputs.forEach(input => {
                    input.onmidimessage = (msg) => this.handleMIDIMessage(msg);
                });
            }
        });
    }

    handleMIDIMessage(msg) {
        const [status, data1, data2] = msg.data;
        const type = status & 0xf0;
        const val = data2 / 127;
        const ind = document.getElementById('midiIndicator');
        if (ind) ind.textContent = `MIDI: [${type === 0xb0 ? 'CC' : 'NT'}] ${data1} VAL ${data2}`;

        // Alesis V49 Mappings
        // Knobs (Typical CC: 20, 21, 22, 23) (May vary by firmware)
        const knobMap = { 20: 'sensitivity', 21: 'waveCount', 22: 'rayCount', 23: 'particleCount', 1: 'imgGlitch' };
        if (type === 0xb0 && knobMap[data1]) {
            const p = this.active.params[knobMap[data1]];
            p.value = p.min + (p.max - p.min) * val;
            UI.rebuildConfigUI();
        }

        // Pads (Typical Note On: 36, 37, 38, 39, 40, 41, 42, 43 on Channel 1)
        const padMap = { 36: 'physics', 37: 'waves', 38: 'rays', 39: 'photos', 40: 'particles', 41: 'text', 42: 'analog' };
        if (type === 0x90 && padMap[data1]) {
            const cat = padMap[data1];
            this.active.settings[cat + 'Enabled'] = !this.active.settings[cat + 'Enabled'];
            UI.rebuildConfigUI();
        }
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

        if (stA.wavesEnabled !== false) this.renderWaves(ctx, time);
        if (stA.raysEnabled !== false) this.renderRays(ctx, time);
        if (stA.particlesEnabled !== false) this.renderParticles(ctx, time);
        if (stA.textEnabled !== false) this.renderLyrics(ctx, time, progress);

        this.applyAnalogPostFX(); // ALWAYS CALL to ensure buffer transfer

        const pnl = document.getElementById('controlsPanel');
        const showBtn = document.getElementById('btnShowUI');
        // If UI is hidden and user didn't move mouse, fade the recall button too
        if (pnl && showBtn) {
            if (pnl.classList.contains('hidden') && Date.now() - this.lastInteraction > 5000) showBtn.classList.add('inactive');
            else showBtn.classList.remove('inactive');
        }
    }

    applyAnalogPostFX() {
        const finalCtx = this.ctx;
        const w = window.innerWidth, h = window.innerHeight;
        const stA = this.active.settings;

        finalCtx.globalCompositeOperation = 'source-over';
        finalCtx.drawImage(this.bufferCanvas, 0, 0, w, h);

        if (stA.analogEnabled === false) return; // SKIP POST-FX ONLY, KEEP RENDER

        const drift = this.p('analogDrift');
        // RGB Ghosting: Offsets the Red/Cyan channels for a glitched double-vision effect
        if (drift > 0) {
            finalCtx.globalCompositeOperation = 'screen';
            finalCtx.globalAlpha = 0.5;
            finalCtx.drawImage(this.bufferCanvas, drift, 0, w, h);
            finalCtx.drawImage(this.bufferCanvas, -drift, 0, w, h);
            finalCtx.globalAlpha = 1;
        }

        // Film Grain: Using optimized pattern-fill
        const noiseAmt = this.p('analogNoise');
        if (noiseAmt > 0) {
            if (!this._noisePattern) {
                const imgData = this.noiseCtx.createImageData(256, 256);
                for(let i=0; i<imgData.data.length; i+=4) {
                    const val = Math.random() * 255;
                    imgData.data[i] = val; imgData.data[i+1] = val; imgData.data[i+2] = val;
                    imgData.data[i+3] = 255; // Fully opaque alpha for the pattern
                }
                this.noiseCtx.putImageData(imgData, 0, 0);
                this._noisePattern = finalCtx.createPattern(this.noiseCanvas, 'repeat');
            }
            finalCtx.save();
            finalCtx.globalCompositeOperation = 'overlay';
            finalCtx.globalAlpha = noiseAmt;
            finalCtx.fillStyle = this._noisePattern;
            finalCtx.translate(Math.random() * 10, Math.random() * 10); // Jitter grain pos
            finalCtx.fillRect(0, 0, w, h);
            finalCtx.restore();
        }

        // CRT Scanlines
        const scanlines = this.p('analogScanlines');
        if (scanlines > 0) {
            finalCtx.globalCompositeOperation = 'source-over';
            finalCtx.fillStyle = `rgba(0,0,0, ${scanlines})`;
            for (let y = 0; y < h; y += 4) {
                finalCtx.fillRect(0, y, w, 1.5);
            }
        }

        // Mediterranean Glow (Warmth)
        const warmth = this.p('analogWarmth');
        if (warmth > 0) {
            finalCtx.globalCompositeOperation = 'overlay';
            finalCtx.globalAlpha = warmth;
            finalCtx.fillStyle = '#ff9900'; // Warm orange/gold
            finalCtx.fillRect(0, 0, w, h);
            finalCtx.globalAlpha = 1;
        }

        // Light Leaks (Sun Flare)
        const leaks = this.p('analogLightLeak');
        if (leaks > 0) {
            // Need the current time from engine for animation
            const t = Date.now(); 
            finalCtx.globalCompositeOperation = 'screen';
            
            // Leak 1: Top Right Orange/Red
            const lx1 = w * 0.8 + Math.sin(t / 2000) * w * 0.1;
            const ly1 = Math.cos(t / 3000) * h * 0.1;
            const r1 = Math.max(w, h) * 0.6;
            const grad1 = finalCtx.createRadialGradient(lx1, ly1, 0, lx1, ly1, r1);
            grad1.addColorStop(0, `rgba(255, 60, 0, ${leaks * 0.6})`);
            grad1.addColorStop(1, 'rgba(255, 0, 0, 0)');
            finalCtx.fillStyle = grad1;
            finalCtx.fillRect(0, 0, w, h);

            // Leak 2: Bottom Left Yellow/Gold
            const lx2 = w * 0.2 + Math.cos(t / 2500) * w * 0.1;
            const ly2 = h * 0.9 + Math.sin(t / 2200) * h * 0.1;
            const r2 = Math.max(w, h) * 0.5;
            const grad2 = finalCtx.createRadialGradient(lx2, ly2, 0, lx2, ly2, r2);
            grad2.addColorStop(0, `rgba(255, 180, 0, ${leaks * 0.4})`);
            grad2.addColorStop(1, 'rgba(255, 100, 0, 0)');
            finalCtx.fillStyle = grad2;
            finalCtx.fillRect(0, 0, w, h);
        }

        // Vignette
        const vignette = this.p('analogVignette');
        if (vignette > 0) {
            finalCtx.globalCompositeOperation = 'source-over';
            const radius = Math.max(w, h) * 0.75;
            const gradV = finalCtx.createRadialGradient(w / 2, h / 2, radius * 0.4, w / 2, h / 2, radius);
            gradV.addColorStop(0, 'rgba(0,0,0,0)');
            gradV.addColorStop(1, `rgba(0,0,0,${vignette})`);
            finalCtx.fillStyle = gradV;
            finalCtx.fillRect(0, 0, w, h);
        }
    }

    renderLyrics(ctx, time, sessionProgress) {
        const preset = this.active;
        if (!preset.settings.textEnabled) return;
        const hold = this.p('textHoldTime') * 1000, fade = this.p('textFadeTime') * 1000;
        const validTexts = preset.settings.textList.filter(t => t.trim().length > 0);
        if (validTexts.length === 0) return;

        if (time - this.lyricLastSwap > hold + fade) {
            this.lyricLastSwap = time;
            if (preset.settings.textSequenceMode === 'random') this.lyricIdx = Math.floor(Math.random() * validTexts.length);
            else this.lyricIdx = (this.lyricIdx + 1) % validTexts.length;
        }

        const elapsed = time - this.lyricLastSwap;
        let opacity = this.p('textOpacity');
        if (elapsed < fade) opacity *= (elapsed / fade);
        else if (elapsed > hold) opacity *= (1 - (elapsed - hold) / fade);

        ctx.save(); ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity + this.trend * 0.4));
        ctx.translate(window.innerWidth / 2 + this.p('textJitterX'), window.innerHeight / 2 + this.p('textJitterY'));
        ctx.rotate(this.p('textRotation'));

        const fontSizeScale = this.p('textScale');
        ctx.font = `bold ${window.innerWidth * 0.12 * fontSizeScale}px 'Inter'`;

        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.filter = `blur(${this.p('textBlur')}px)`;
        const cA = preset.settings.palette[0], cB = this.target ? this.target.settings.palette[0] : cA;
        ctx.fillStyle = ColorUtils.lerpColor(cA, cB, sessionProgress);
        ctx.fillText(validTexts[this.lyricIdx].toUpperCase(), 0, 0);
        ctx.restore();
    }

    renderWaves(ctx, time) {
        const count = Math.floor(this.p('waveCount')); if (count <= 0) return;
        while (this.wavePhases.length < count) this.wavePhases.push(Math.random() * 100);
        const speed = this.p('waveSpeed'), thick = this.p('waveThickness'), chaos = this.p('waveChaos'), gAlpha = Math.max(0, Math.min(1, this.p('waveOpacity')));
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2, maxR = Math.max(cx, cy) * 1.5;
        ctx.save(); ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = gAlpha;
        for (let i = 0; i < count; i++) {
            this.wavePhases[i] += speed; if (this.wavePhases[i] > 100) this.wavePhases[i] = 0;
            const radius = (this.wavePhases[i] / 100) * maxR, alpha = Math.sin((this.wavePhases[i] / 100) * Math.PI) * 0.6 * this.trend;
            const progress = this.session.targetIndex !== null ? Math.min(1, (time - this.session.transitionStart) / this.session.transitionDuration) : 0;
            const colorA = this.active.settings.palette[i % 6], colorB = this.target ? this.target.settings.palette[i % 6] : colorA;

            ctx.beginPath();
            const segments = 60;
            for (let j = 0; j <= segments; j++) {
                const angle = (j / segments) * Math.PI * 2;
                const r = Math.max(0.1, radius + Math.sin(angle * 5 + time / 500 + i) * chaos);
                const x = cx + Math.cos(angle) * r, y = cy + Math.sin(angle) * r;
                if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            ctx.closePath(); ctx.lineWidth = thick;
            ctx.strokeStyle = ColorUtils.lerpColor(colorA, colorB, progress);
            ctx.stroke();
        }
        ctx.restore();
    }

    renderRays(ctx, time) {
        const count = Math.floor(this.p('rayCount')); if (count <= 0) return;
        const thick = this.p('rayThickness'), speed = this.p('raySpeed'), chaos = this.p('rayChaos');
        const hole = this.p('rayCenterHole'), gAlpha = Math.max(0, Math.min(1, this.p('rayOpacity')));
        const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
        const maxR = Math.max(window.innerWidth, window.innerHeight) * 1.5;
        
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.lineCap = 'round';
        
        const baseRot = (time / 5000) * speed;
        // Robust transition progress check
        const progress = (this.session.targetIndex !== null && !isNaN(this.session.transitionStart)) ? Math.min(1, (time - this.session.transitionStart) / this.session.transitionDuration) : 0;
        
        for (let i = 0; i < count; i++) {
            const colorA = this.active.settings.palette[i % 6], colorB = this.target ? this.target.settings.palette[i % 6] : colorA;
            const color = ColorUtils.lerpColor(colorA, colorB, progress);
            
            const angleChaos = Math.sin(time/400 + i) * chaos * this.trend;
            const angle = baseRot + (i / count) * Math.PI * 2 + angleChaos;
            const startR = Math.max(2, hole + Math.abs(Math.sin(time/300 + i) * chaos * hole * this.trend));
            
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(angle) * startR, cy + Math.sin(angle) * startR);
            ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
            
            ctx.strokeStyle = color;
            ctx.globalAlpha = gAlpha * (0.2 + this.trend * 0.8);
            ctx.lineWidth = Math.max(1, thick + (Math.sin(time/200 + i) * thick * chaos * this.trend));
            ctx.stroke();
        }
        ctx.restore();
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

class BatecParticle {
    constructor(engine) { this.engine = engine; this.reset(); }
    reset() {
        this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight;
        this.colorIdx = Math.floor(Math.random() * 6); this.hueOffset = Math.random() * 360;
        this.vx = (Math.random() - 0.5) * 2; this.vy = (Math.random() - 0.5) * 2;
    }
    update(time) {
        const eng = this.engine, trend = eng.trend, ctxP = { x: this.x, y: this.y };
        const dir = eng.p('particleDirection', ctxP), grav = eng.p('particleGravity', ctxP), chaosAmt = eng.p('particleChaos', ctxP);
        this.vx += Math.cos(dir) * (0.1 + trend * 0.5) * (chaosAmt / 100);
        this.vy += Math.sin(dir) * (0.1 + trend * 0.5) * (chaosAmt / 100) + (grav * 0.05);
        const maxS = eng.p('particleSpeed', ctxP) * (1 + trend * 2);
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 1;
        if (speed > maxS) { this.vx = (this.vx / speed) * maxS; this.vy = (this.vy / speed) * maxS; }
        this.x += this.vx; this.y += this.vy; this.hueOffset += eng.p('particleColorSpeed', ctxP) * 0.1;
        if (this.x < -150 || this.x > window.innerWidth + 150 || this.y < -150 || this.y > window.innerHeight + 150) this.reset();
    }
    draw(ctx) {
        const eng = this.engine, ctxP = { x: this.x, y: this.y };
        const size = Math.max(0.1, eng.p('particleSize', ctxP)), rot = eng.p('particleRotation', ctxP);
        const colorBase = eng.active.settings.palette[this.colorIdx];
        const rgb = ColorUtils.hexToRgb(colorBase); const hsla = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(rot);
        ctx.fillStyle = `hsla(${(hsla[0] + this.hueOffset) % 360}, ${hsla[1]}%, ${hsla[2]}%, ${Math.max(0, Math.min(1, eng.p('particleOpacity')))})`;
        ctx.beginPath();
        const shp = eng.active.settings.particleShape;
        if (shp === 'square') ctx.rect(-size, -size, size * 2, size * 2);
        else if (shp === 'triangle') { ctx.moveTo(0, -size); ctx.lineTo(size, size); ctx.lineTo(-size, size); }
        else if (shp === 'star') { for (let i = 0; i < 5; i++) { ctx.lineTo(Math.cos(i * 1.25) * size, Math.sin(i * 1.25) * size); ctx.lineTo(Math.cos(i * 1.25 + 0.6) * size / 2, Math.sin(i * 1.25 + 0.6) * size / 2); } }
        else ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.closePath(); ctx.fill(); ctx.restore();
    }
}

// --- UI MANAGER ---

const UI = {
    init(engine) {
        this.engine = engine;
        this.buildSlots(); this.rebuildConfigUI(); this.bindStaticUI();
        this.buildImageSelectors();
        this.buildWebcamSelectors();
        this.initCollapsibleSections();
        this.initInteractionTimer(); this.initHotkeys();
    },
    safeGet(id) { return document.getElementById(id); },

    buildImageSelectors() {
        const container = this.safeGet('panel-image-select');
        if (!container || !this.engine.imagePool.length) return;
        container.innerHTML = '<label style="display:block; font-size: 0.65rem; margin-bottom: 8px; color: var(--accent-glow);">Active Images in Pool:</label>';

        const activeIdx = this.engine.active.settings.imgIndices || [];

        this.engine.imagePool.forEach((item, idx) => {
            const row = document.createElement('div');
            row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px'; row.style.marginBottom = '6px';

            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.checked = activeIdx.includes(idx);
            chk.onchange = (e) => {
                const current = this.engine.active.settings.imgIndices || [];
                if (e.target.checked) {
                    if (!current.includes(idx)) current.push(idx);
                } else {
                    this.engine.active.settings.imgIndices = current.filter(i => i !== idx);
                }
            };

            const lbl = document.createElement('span');
            lbl.textContent = item.name.toUpperCase();
            lbl.style.fontSize = '0.7rem';
            lbl.style.color = 'white';

            row.appendChild(chk); row.appendChild(lbl);
            container.appendChild(row);
        });
    },

    buildWebcamSelectors() {
        const container = this.safeGet('panel-webcam-select');
        if (!container) return;
        container.innerHTML = '';
        const e = this.engine;

        if (!e.webcamsInitialized) {
            const btn = document.createElement('button');
            btn.className = 'glass-panel'; // Use glass-panel for visibility
            btn.textContent = 'Hardware Request: Enable & Scan Webcams';
            btn.style.width = '100%';
            btn.style.fontSize = '0.7rem';
            btn.style.padding = '12px';
            btn.style.color = 'var(--accent-glow)';
            btn.style.border = '1px solid var(--accent-glow)';
            btn.style.textTransform = 'uppercase';
            btn.style.cursor = 'pointer';
            btn.onclick = () => e.requestWebcams(() => this.buildWebcamSelectors());
            container.appendChild(btn);
            return;
        }

        if (e.availableWebcams.length === 0) {
            container.innerHTML = '<span style="color:var(--text-secondary); font-size:0.8rem;">No webcams found.</span>';
            return;
        }

        const instr = document.createElement('div');
        instr.style.color = 'var(--accent-glow)'; instr.style.fontSize = '0.65rem'; instr.style.marginBottom = '8px';
        instr.textContent = 'SELECT VIDEO INPUTS:';
        container.appendChild(instr);
        
        const activeIdxs = e.active.settings.webcamIndices || [];
        e.availableWebcams.forEach((cam, i) => {
            const row = document.createElement('div');
            row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px'; row.style.padding = '4px 0';
            
            const chk = document.createElement('input'); 
            chk.type = 'checkbox';
            chk.checked = activeIdxs.includes(i);
            chk.onchange = (ev) => {
                const current = this.engine.active.settings.webcamIndices || [];
                if (ev.target.checked) {
                    if (!current.includes(i)) current.push(i);
                } else {
                    this.engine.active.settings.webcamIndices = current.filter(x => x !== i);
                }
            };
            
            const lbl = document.createElement('span'); 
            lbl.textContent = cam.label; 
            lbl.style.fontSize = '0.8rem';
            lbl.style.color = 'white';
            
            row.appendChild(chk); row.appendChild(lbl); 
            container.appendChild(row);
        });
    },

    initCollapsibleSections() {
        document.querySelectorAll('.config-section').forEach(section => {
            const h4 = section.querySelector('h4');
            if (!h4) return;

            const cat = section.getAttribute('data-cat');
            if (cat && cat !== 'session' && cat !== 'physics') {
                const toggle = document.createElement('input');
                toggle.type = 'checkbox';
                toggle.id = `toggle_${cat}`;
                toggle.className = 'cat-toggle';
                toggle.checked = this.engine.active.settings[cat + 'Enabled'] !== false;
                toggle.onchange = (e) => {
                    this.engine.active.settings[cat + 'Enabled'] = e.target.checked;
                };
                h4.prepend(toggle);
            }

            // Add icon
            const icon = document.createElement('span');
            icon.className = 'collapse-icon';
            icon.textContent = '▼';
            h4.appendChild(icon);
            h4.classList.add('collapsible-header');

            // Wrap contents
            const wrapper = document.createElement('div');
            wrapper.className = 'section-content';

            // Move all siblings after h4 into wrapper
            while (h4.nextSibling) {
                wrapper.appendChild(h4.nextSibling);
            }
            section.appendChild(wrapper);

            // Click listener
            h4.onclick = (e) => {
                if(e.target.tagName === 'INPUT') return;
                const isCollapsed = wrapper.classList.toggle('collapsed');
                icon.classList.toggle('collapsed', isCollapsed);
            };
        });

        const btnExp = this.safeGet('btnExpandAll');
        if (btnExp) btnExp.onclick = () => {
            document.querySelectorAll('.section-content').forEach(w => w.classList.remove('collapsed'));
            document.querySelectorAll('.collapse-icon').forEach(i => i.classList.remove('collapsed'));
        };
        const btnCol = this.safeGet('btnCollapseAll');
        if (btnCol) btnCol.onclick = () => {
            document.querySelectorAll('.section-content').forEach(w => w.classList.add('collapsed'));
            document.querySelectorAll('.collapse-icon').forEach(i => i.classList.add('collapsed'));
        };
    },

    // Sync telemetry to the DOM
    updateTelemetry(engine, time) {
        if (!engine.audio.analyser) return;
        const b = engine.smoothed.bass, m = engine.smoothed.mid, t = engine.smoothed.treble, a = engine.smoothed.avg;
        const elB = this.safeGet('meter-bass'), elM = this.safeGet('meter-mid'), elT = this.safeGet('meter-treble'), elA = this.safeGet('meter-avg');
        if (elB) elB.style.width = `${(b / 255) * 100}%`;
        if (elM) elM.style.width = `${(m / 255) * 100}%`;
        if (elT) elT.style.width = `${(t / 255) * 100}%`;
        if (elA) elA.style.width = `${(a / 255) * 100}%`;

        const vB = this.safeGet('val-bass'), vM = this.safeGet('val-mid'), vT = this.safeGet('val-treble'), vA = this.safeGet('val-avg');
        if (vB) vB.textContent = Math.round(b);
        if (vM) vM.textContent = Math.round(m);
        if (vT) vT.textContent = Math.round(t);
        if (vA) vA.textContent = Math.round(a);

        const trendEl = this.safeGet('txt-trend'); if (trendEl) trendEl.textContent = engine.trend.toFixed(2);
        const timeEl = this.safeGet('txt-time'); if (timeEl) timeEl.textContent = Math.floor(time);
    },

    buildSlots() {
        const grid = this.safeGet('presetSlots'); if (!grid) return;
        grid.innerHTML = '';
        this.engine.session.presets.forEach((p, i) => {
            const btn = document.createElement('div');
            btn.className = `slot ${i === this.engine.session.activeIndex ? 'active' : ''} ${i === this.engine.session.targetIndex ? 'switching' : ''}`;
            btn.style.zIndex = "1200"; // Ensure slots are always on top
            btn.style.pointerEvents = "auto";
            btn.textContent = (i + 1) % 10; btn.title = p.name;
            btn.onclick = (ev) => {
                ev.stopPropagation();
                this.engine.switchTo(i);
                this.buildSlots();
                this.rebuildConfigUI();
                this.buildImageSelectors(); // Ensure checkboxes update
            };
            grid.appendChild(btn);
        });
        const nameInput = this.safeGet('activePresetName'); if (nameInput) nameInput.value = this.engine.active.name;
    },

    rebuildConfigUI() {
        ['panel-physics', 'panel-waves', 'panel-rays', 'panel-photos', 'panel-particles', 'panel-text', 'panel-analog'].forEach(id => {
            const el = this.safeGet(id); if (el) el.innerHTML = '';
            const cat = id.replace('panel-', '');
            const chk = this.safeGet(`toggle_${cat}`);
            if (chk) chk.checked = this.engine.active.settings[cat + 'Enabled'] !== false;
        });

        const params = this.engine.active.params;
        const sortedKeys = Object.keys(params).sort((a, b) => {
            const pA = params[a], pB = params[b];
            const isOpaA = pA.name.toLowerCase().includes('weight') || a.toLowerCase().includes('opacity');
            const isOpaB = pB.name.toLowerCase().includes('weight') || b.toLowerCase().includes('opacity');
            if (isOpaA && !isOpaB) return -1;
            if (!isOpaA && isOpaB) return 1;
            return 0; // retain relative order otherwise
        });

        sortedKeys.forEach(key => {
            const param = params[key];
            const container = this.safeGet(`panel-${param.cat}`);
            if (!container) return;
            const row = document.createElement('div'); row.className = 'param-row';

            // Header: Label + Reset Button + Fx Toggle
            const header = document.createElement('div'); header.className = 'param-header';

            const labelGroup = document.createElement('div');
            labelGroup.style.display = 'flex'; labelGroup.style.alignItems = 'center'; labelGroup.style.gap = '6px';
            const label = document.createElement('span'); label.className = 'param-label'; label.textContent = param.name;
            const btnReset = document.createElement('button'); btnReset.className = 'icon-btn-inline'; btnReset.textContent = '↺'; btnReset.title = "Reset to Preset Default";
            btnReset.style.width = '14px'; btnReset.style.height = '14px'; btnReset.style.fontSize = '0.5rem';
            labelGroup.appendChild(label); 

            if (param.desc) {
                const help = document.createElement('span'); help.className = 'help-icon'; help.textContent = '?';
                const tip = document.createElement('span'); tip.className = 'tooltip'; tip.textContent = param.desc;
                help.appendChild(tip); labelGroup.appendChild(help);
            }
            labelGroup.appendChild(btnReset);

            const btnTog = document.createElement('button'); btnTog.className = `fx-toggle ${param.useFormula ? 'active' : ''}`; btnTog.textContent = 'Fx';
            header.appendChild(labelGroup); header.appendChild(btnTog); row.appendChild(header);

            // Slider UI with Readout
            const sliderUI = document.createElement('div'); sliderUI.className = `param-ui param-slider ${param.useFormula ? 'hidden' : ''}`;
            const sliderFlex = document.createElement('div'); sliderFlex.style.display = 'flex'; sliderFlex.style.alignItems = 'center'; sliderFlex.style.gap = '8px';
            const inputRange = document.createElement('input'); inputRange.type = 'range'; inputRange.min = param.min; inputRange.max = param.max; inputRange.step = param.step; inputRange.value = param.value; inputRange.style.flex = "1";
            const readout = document.createElement('span'); readout.className = 'param-val-readout'; readout.textContent = param.value;
            sliderFlex.appendChild(inputRange); sliderFlex.appendChild(readout);
            sliderUI.appendChild(sliderFlex);

            inputRange.oninput = (e) => {
                param.value = parseFloat(e.target.value);
                readout.textContent = param.value;
            };

            // Formula UI
            const formulaUI = document.createElement('div'); formulaUI.className = `param-ui param-formula ${param.useFormula ? '' : 'hidden'}`;
            const txtFormula = document.createElement('textarea'); txtFormula.className = 'formula-box'; txtFormula.value = param.formula;
            txtFormula.oninput = (e) => param.formula = e.target.value;
            formulaUI.appendChild(txtFormula);

            // Reset Logic
            btnReset.onclick = () => {
                param.value = param.defaultVal;
                param.formula = param.defaultForm;
                inputRange.value = param.value;
                txtFormula.value = param.formula;
                readout.textContent = param.value;
            };

            // Toggle Logic
            btnTog.onclick = () => {
                param.useFormula = !param.useFormula; btnTog.classList.toggle('active');
                sliderUI.classList.toggle('hidden'); formulaUI.classList.toggle('hidden');
            };

            row.appendChild(sliderUI); row.appendChild(formulaUI); container.appendChild(row);
        });
        this.bindStaticUI();
    },

    bindStaticUI() {
        const e = this.engine; const active = e.active;
        this.safeGet('btnStart').onclick = () => { e.startAudio(); this.safeGet('startOverlay').style.display = 'none'; this.safeGet('controlsPanel').classList.remove('hidden'); };
        this.safeGet('btnAdvanced').onclick = () => this.safeGet('advancedPanel').classList.toggle('hidden');
        this.safeGet('btnCloseAdvanced').onclick = () => this.safeGet('advancedPanel').classList.add('hidden');
        this.safeGet('btnHelp').onclick = () => this.safeGet('helpModal').classList.toggle('hidden');
        this.safeGet('btnCloseHelp').onclick = () => this.safeGet('helpModal').classList.add('hidden');
        this.safeGet('btnMidiHelp').onclick = () => this.safeGet('midiHelpModal').classList.remove('hidden');
        this.safeGet('btnCloseMidiHelp').onclick = () => this.safeGet('midiHelpModal').classList.add('hidden');
        this.safeGet('btnPause').onclick = (ev) => { active.settings.isPaused = !active.settings.isPaused; if (active.settings.isPaused) e.audio.ctx?.suspend(); else e.audio.ctx?.resume(); ev.target.textContent = active.settings.isPaused ? 'Resume Audio' : 'Pause Audio'; };
        this.safeGet('btnHideUI').onclick = () => {
            document.querySelectorAll('.glass-panel').forEach(p => p.classList.add('hidden'));
            this.safeGet('telemetryPanel').classList.add('hidden'); // Ensure telemetry hides too
            this.safeGet('btnShowUI').classList.remove('hidden');
            this.safeGet('btnShowUI').classList.remove('inactive');
            e.lastInteraction = Date.now();
        };
        this.safeGet('btnShowUI').onclick = () => {
            this.safeGet('controlsPanel').classList.remove('hidden');
            this.safeGet('telemetryPanel').classList.remove('hidden'); // Bring telemetry back
            this.safeGet('btnShowUI').classList.add('hidden');
        };

        window.onclick = (ev) => {
            const hMod = this.safeGet('helpModal');
            const mMod = this.safeGet('midiHelpModal');
            if (ev.target === hMod) hMod.classList.add('hidden');
            if (ev.target === mMod) mMod.classList.add('hidden');
        };

        // Slot Management
        this.safeGet('btnNewPreset').onclick = () => { e.session.presets.push(createDefaultPreset(`Preset ${e.session.presets.length + 1}`)); this.buildSlots(); };
        this.safeGet('btnDeletePreset').onclick = () => { if (e.session.presets.length <= 1) return; e.session.presets.splice(e.session.activeIndex, 1); e.session.activeIndex = 0; this.buildSlots(); this.rebuildConfigUI(); };
        this.safeGet('activePresetName').oninput = (ev) => { active.name = ev.target.value; this.buildSlots(); };

        // Static Settings
        ['imgBlendMode', 'particleShape', 'textSequenceMode'].forEach(id => { const el = this.safeGet(id); if (el) { el.value = active.settings[id]; el.oninput = ev => active.settings[id] = ev.target.value; } });
        const txtChk = this.safeGet('textEnabled'); if (txtChk) { txtChk.checked = active.settings.textEnabled; txtChk.onchange = ev => active.settings.textEnabled = ev.target.checked; }
        [0, 1, 2, 3, 4].forEach(i => { const el = this.safeGet(`text${i}`); if (el) { el.value = active.settings.textList[i]; el.oninput = ev => active.settings.textList[i] = ev.target.value; } });
        [1, 2, 3, 4, 5, 6].forEach(i => { const el = this.safeGet(`palette${i}`); if (el) { el.value = active.settings.palette[i - 1]; el.oninput = (ev) => active.settings.palette[i - 1] = ev.target.value; } });

        // Project Import/Export
        this.safeGet('btnCopySession').onclick = () => { this.safeGet('styleIO').value = JSON.stringify(e.session, null, 2); };
        this.safeGet('btnImportSession').onclick = () => {
            try {
                const raw = JSON.parse(this.safeGet('styleIO').value);
                raw.presets.forEach(p => p.params = establishDefaults(p.params));
                e.session = raw;
                e.session.imported = true;
                e.healPresets();
                this.buildSlots(); this.rebuildConfigUI();
                this.buildImageSelectors(); this.buildWebcamSelectors();
                this.bindPhotoSourceToggle();
            } catch (err) { alert('Invalid Project JSON.'); }
        };

        // Reset All Button
        const btnResetAll = this.safeGet('btnResetAll');
        if (btnResetAll) {
            btnResetAll.onclick = () => {
                if (e.session.imported) {
                    Object.keys(active.params).forEach(k => {
                        active.params[k].value = active.params[k].defaultVal;
                        active.params[k].formula = active.params[k].defaultForm;
                    });
                    this.rebuildConfigUI();
                } else {
                    alert("No JSON project loaded to revert to. Export your session to save states!");
                }
            };
        }

        const btnRand = this.safeGet('btnRandom');
        if (btnRand) btnRand.onclick = () => this.randomizeActivePreset();

        this.bindPhotoSourceToggle();
    },

    randomizeActivePreset() {
        const active = this.engine.active;
        Object.keys(active.params).forEach(k => {
            const p = active.params[k];
            // Randomly set value within range
            p.value = p.min + Math.random() * (p.max - p.min);
            // 20% chance to toggle formula mode for extra chaos
            if (Math.random() > 0.8) p.useFormula = !p.useFormula;
        });
        
        // Randomize Palette
        active.settings.palette = active.settings.palette.map(() => 
            '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
        );
        
        this.rebuildConfigUI();
    },

    bindPhotoSourceToggle() {
        const e = this.engine;
        const radPhotos = this.safeGet('radioSourcePhotos');
        const radWebcams = this.safeGet('radioSourceWebcams');
        const pnlPhotos = this.safeGet('panel-image-select');
        const pnlWebcams = this.safeGet('panel-webcam-select');
        
        const updateView = () => {
            const mode = e.active.settings.photoSourceMode || 'photos';
            if (radPhotos) radPhotos.checked = (mode === 'photos');
            if (radWebcams) radWebcams.checked = (mode === 'webcams');
            if (pnlPhotos) pnlPhotos.style.display = (mode === 'photos') ? 'block' : 'none';
            if (pnlWebcams) pnlWebcams.style.display = (mode === 'webcams') ? 'block' : 'none';
            
            // Re-run builder if empty
            if (mode === 'webcams' && pnlWebcams.innerHTML === '') this.buildWebcamSelectors();
        };
        
        const setMode = (m) => { e.active.settings.photoSourceMode = m; updateView(); };
        
        if (radPhotos) {
            radPhotos.onchange = () => setMode('photos');
            radPhotos.parentElement.onclick = () => setMode('photos'); // Robust label click
        }
        if (radWebcams) {
            radWebcams.onchange = () => setMode('webcams');
            radWebcams.parentElement.onclick = () => setMode('webcams'); // Robust label click
        }
        updateView();
    },

    initHotkeys() {
        window.addEventListener('keydown', (ev) => {
            if (ev.key >= '0' && ev.key <= '9' && ev.target.tagName !== 'INPUT' && ev.target.tagName !== 'TEXTAREA') {
                const idx = ev.key === '0' ? 9 : parseInt(ev.key) - 1;
                this.engine.switchTo(idx);
                this.buildSlots();
                setTimeout(() => {
                    this.rebuildConfigUI();
                    this.buildImageSelectors();
                }, 500);
            }
        });
    },

    initInteractionTimer() {
        const r = () => { if (this.engine) this.engine.lastInteraction = Date.now(); };
        ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(ev => window.addEventListener(ev, r));
    }
};

const engine = new BatecEngine();
UI.init(engine);
