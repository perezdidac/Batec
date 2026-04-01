function applyAnalogPostFX(engine, sourceCanvas) {
    const finalCtx = engine.ctx;
    const w = window.innerWidth, h = window.innerHeight;
    const stA = engine.active.settings;
    const src = sourceCanvas || engine.bufferCanvas;

    finalCtx.globalCompositeOperation = 'source-over';
    finalCtx.drawImage(src, 0, 0, w, h);

    if (stA.analogEnabled === false) return; // SKIP POST-FX ONLY, KEEP RENDER

    const drift = engine.p('analogDrift');
    // RGB Ghosting: Offsets the Red/Cyan channels for a glitched double-vision effect
    if (drift > 0) {
        finalCtx.globalCompositeOperation = 'screen';
        finalCtx.globalAlpha = 0.5;
        finalCtx.drawImage(src, drift, 0, w, h);
        finalCtx.drawImage(src, -drift, 0, w, h);
        finalCtx.globalAlpha = 1;
    }

    // Film Grain: Using optimized pattern-fill
    const noiseAmt = engine.p('analogNoise');
    if (noiseAmt > 0) {
        if (!engine._noisePattern) {
            const imgData = engine.noiseCtx.createImageData(256, 256);
            for(let i=0; i<imgData.data.length; i+=4) {
                const val = Math.random() * 255;
                imgData.data[i] = val; imgData.data[i+1] = val; imgData.data[i+2] = val;
                imgData.data[i+3] = 255; // Fully opaque alpha for the pattern
            }
            engine.noiseCtx.putImageData(imgData, 0, 0);
            engine._noisePattern = finalCtx.createPattern(engine.noiseCanvas, 'repeat');
        }
        finalCtx.save();
        finalCtx.globalCompositeOperation = 'overlay';
        finalCtx.globalAlpha = noiseAmt;
        finalCtx.fillStyle = engine._noisePattern;
        finalCtx.translate(Math.random() * 10, Math.random() * 10); // Jitter grain pos
        finalCtx.fillRect(0, 0, w, h);
        finalCtx.restore();
    }

    // CRT Scanlines
    const scanlines = engine.p('analogScanlines');
    if (scanlines > 0) {
        finalCtx.globalCompositeOperation = 'source-over';
        finalCtx.fillStyle = `rgba(0,0,0, ${scanlines})`;
        for (let y = 0; y < h; y += 4) {
            finalCtx.fillRect(0, y, w, 1.5);
        }
    }

    // Mediterranean Glow (Warmth)
    const warmth = engine.p('analogWarmth');
    if (warmth > 0) {
        finalCtx.globalCompositeOperation = 'overlay';
        finalCtx.globalAlpha = warmth;
        finalCtx.fillStyle = '#ff9900'; // Warm orange/gold
        finalCtx.fillRect(0, 0, w, h);
        finalCtx.globalAlpha = 1;
    }

    // Light Leaks (Sun Flare)
    const leaks = engine.p('analogLightLeak');
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
    const vignette = engine.p('analogVignette');
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
