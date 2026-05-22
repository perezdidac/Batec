const fs = require('fs');

let content = fs.readFileSync('visualizer/js/engine.js', 'utf8');

const pLayerCode = `
    evalPLayer(preset, layerId, key, localContext = {}) {
        const paramKey = \`\${key}_\${layerId}\`;
        const param = preset.params[paramKey];
        if (!param) return 0;

        // We don't have catEnabled checks per layer like we did globally.
        // We just assume the layer is active if it's in the list and enabled.
        const layer = preset.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return 0;

        const ctx = {
            time: performance.now() - this.timeOffset, bpm: this.bpmTracker.bpm, avg: this.smoothed.avg, bass: this.smoothed.bass, mid: this.smoothed.mid,
            treble: this.smoothed.treble, trend: this.trend, x: 0, y: 0, ...localContext
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
`;

content = content.replace(/p\(key, localContext = \{\}\) \{[\s\S]*?    \}/, match => match + "\n" + pLayerCode);

// Add particleLayers to constructor
content = content.replace(/this\.wavePhases = \[\];/, 'this.wavePhases = {};\n        this.particleLayers = {};\n        this.lyricStates = {};');

const renderPhotosCode = `
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
                ctx.filter = \`hue-rotate(\${i * 60 + this.trend * 360}deg) blur(\${this.pLayer(layerId, 'imgBlur')}px) saturate(\${this.pLayer(layerId, 'imgSaturate')}%) contrast(\${this.pLayer(layerId, 'photoContrast')}%)\`;
                ctx.globalCompositeOperation = layer.settings.imgBlendMode || 'screen';
                const w = window.innerWidth * scale, h = window.innerHeight * scale;
                ctx.drawImage(mediaObj, -w / 2 + ox, -h / 2 + oy, w, h);
            });
            ctx.restore();
        }
    }
`;

content = content.replace(/renderParticles\(ctx, time\) \{/, match => renderPhotosCode + "\n    " + match);

// Update renderParticles to take layerId
const renderParticlesCode = `
    renderParticles(ctx, time, layerId) {
        const required = Math.floor(this.pLayer(layerId, 'particleCount'));
        if (!this.particleLayers[layerId]) this.particleLayers[layerId] = [];
        const particles = this.particleLayers[layerId];

        while (particles.length < required) particles.push(new BatecParticle(this, layerId));
        if (particles.length > required) particles.length = required;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        particles.forEach(p => { p.update(time); p.draw(ctx); });
        ctx.restore();
    }
`;
content = content.replace(/renderParticles\(ctx, time\) \{[\s\S]*?    \}/, renderParticlesCode);

// Update render()
const renderReplacement = `
        // Render dynamically defined layers
        if (this.active.layers) {
            this.active.layers.forEach(layer => {
                if (!layer.enabled) return;
                if (layer.type === 'photos') this.renderPhotos(ctx, localTime, progress, layer.id);
                if (layer.type === 'waves') renderWaves(this, ctx, localTime, layer.id);
                if (layer.type === 'rays') renderRays(this, ctx, localTime, layer.id);
                if (layer.type === 'particles') this.renderParticles(ctx, localTime, layer.id);
                if (layer.type === 'text') renderLyrics(this, ctx, localTime, progress, layer.id);
            });
        }

        // Remove old static layer rendering block
`;

content = content.replace(/if \(stA\.photosEnabled\) \{[\s\S]*?if \(stA\.textEnabled !== false\) renderLyrics\(this, ctx, localTime, progress\);/, renderReplacement);

fs.writeFileSync('visualizer/js/engine.js', content, 'utf8');
