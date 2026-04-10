function applyAnalogPostFX(engine, sourceCanvas) {
    const finalCtx = engine.ctx;
    const w = window.innerWidth, h = window.innerHeight;
    const stA = engine.active.settings;
    const src = sourceCanvas || engine.bufferCanvas;

    // Clear the destination canvas to black, preventing alpha ghosting artifacts with Overlay blend modes
    finalCtx.globalCompositeOperation = 'source-over';
    finalCtx.fillStyle = 'black';
    finalCtx.fillRect(0, 0, w, h);
    
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

    // Film Grain & Vignette are now processed universally in gl_postfx.js (Hardware GPU level)
    // CPU fallback deleted for performance.

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

    // AUDIO REACTIVE LIGHTNING FLASH (STORM EFFECT)
    const flash = engine.p('analogFlash');
    if (flash > 0.05) { // Needs to bypass small noise
        finalCtx.globalCompositeOperation = 'screen';
        finalCtx.globalAlpha = Math.min(1, flash);
        finalCtx.fillStyle = '#e0f7fa'; // Blinding blue-white flash
        finalCtx.fillRect(0, 0, w, h);
        finalCtx.globalAlpha = 1;
    }
}
