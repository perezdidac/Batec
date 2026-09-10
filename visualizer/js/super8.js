/**
 * BatecSuper8 - Analog Film Projector & Nostalgia Optics
 * Simulates mechanical film gate weave/jitter, warm amber edge light leaks,
 * sprocket hole borders, and film burn flashes on musical peaks.
 */
class BatecSuper8 {
    constructor(engine) {
        this.engine = engine;
        this.lastBurn = 0;
        this.burnIntensity = 0;
        this.leakColorIdx = 0;
    }

    render(ctx, layerId, time) {
        const eng = this.engine;
        const layer = eng.active.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        const jitterAmt = eng.pLayer(layerId, 'filmJitter') || 0.3;
        const leakIntensity = eng.pLayer(layerId, 'filmLightLeak') || 0.5;
        const burnRate = eng.pLayer(layerId, 'filmBurnRate') || 0.4;
        const showBorder = (layer.settings && layer.settings.filmBorder !== false);
        const bass = eng.smoothed.bass / 255;

        const t = time / 1000;

        ctx.save();

        // 1. Film Burn Flashes triggered by intense bass peaks
        if (bass > 0.75 && Math.random() < burnRate * 0.3 && (time - this.lastBurn > 400)) {
            this.burnIntensity = 0.8 + Math.random() * 0.2;
            this.lastBurn = time;
        }

        if (this.burnIntensity > 0.01) {
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = `rgba(255, 140, 40, ${this.burnIntensity * 0.45})`;
            ctx.fillRect(0, 0, w, h);
            this.burnIntensity *= 0.88; // decay
        }

        // 2. Warm Edge Light Leaks (Anamorphic Orange/Red/Magenta corner flare)
        if (leakIntensity > 0.02) {
            ctx.globalCompositeOperation = 'screen';

            // Pulsing leak cycle
            const leakX = (Math.sin(t * 0.4) * 0.3 + 0.5) * w;
            const leakRad = (0.3 + Math.sin(t * 0.7) * 0.15) * Math.max(w, h);

            const leakGrad = ctx.createRadialGradient(leakX, 0, 0, leakX, 0, leakRad);
            leakGrad.addColorStop(0, `rgba(255, 120, 50, ${leakIntensity * 0.6})`);
            leakGrad.addColorStop(0.4, `rgba(220, 40, 90, ${leakIntensity * 0.3})`);
            leakGrad.addColorStop(0.8, `rgba(130, 20, 80, ${leakIntensity * 0.1})`);
            leakGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = leakGrad;
            ctx.fillRect(0, 0, w, h);
        }

        // 3. Vintage Curved Film Frame Mask & Sprocket Marks
        if (showBorder) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#060505';

            const borderThick = Math.max(12, Math.floor(w * 0.025));
            const cornerRad = borderThick * 2.5;

            // Outside frame mask (letterbox borders with rounded corners)
            ctx.beginPath();
            ctx.rect(0, 0, w, h);

            // Cut out inner viewport
            const innerX = borderThick;
            const innerY = borderThick;
            const innerW = w - borderThick * 2;
            const innerH = h - borderThick * 2;

            ctx.moveTo(innerX + cornerRad, innerY);
            ctx.arcTo(innerX + innerW, innerY, innerX + innerW, innerY + innerH, cornerRad);
            ctx.arcTo(innerX + innerW, innerY + innerH, innerX, innerY + innerH, cornerRad);
            ctx.arcTo(innerX, innerY + innerH, innerX, innerY, cornerRad);
            ctx.arcTo(innerX, innerY, innerX + innerW, innerY, cornerRad);
            ctx.closePath();

            ctx.fill('evenodd');

            // Left margin sprocket holes (classic 8mm / 16mm look)
            const holeH = borderThick * 0.8;
            const holeW = borderThick * 0.45;
            const holeGap = holeH * 2.2;
            ctx.fillStyle = '#000000';

            for (let y = borderThick * 2; y < h - borderThick * 2; y += holeGap) {
                const hx = borderThick * 0.25;
                ctx.beginPath();
                ctx.rect(hx, y, holeW, holeH);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}
