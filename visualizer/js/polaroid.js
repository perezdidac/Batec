/**
 * BatecPolaroid - Instant Film Chemical Development & Emulsion Vignette
 * Simulates a slowly developing instant picture (chemical silver halides resolving,
 * temperature color drift, and paper borders).
 * Built for "Pareces enfadada" & memory motifs.
 */
class BatecPolaroid {
    constructor(engine) {
        this.engine = engine;
    }

    render(ctx, layerId, time) {
        const eng = this.engine;
        const layer = eng.active.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        const devProgress = Math.max(0, Math.min(1.0, eng.pLayer(layerId, 'polaroidDevelop') || 0.8));
        const colorBleed = eng.pLayer(layerId, 'polaroidBleed') || 0.4;
        const sepiaShift = eng.pLayer(layerId, 'polaroidSepia') || 0.3;
        const showFrame = (layer.settings && layer.settings.showFrame !== false);

        ctx.save();

        // 1. Emulsion Development Shadow: chemical milkiness fading as the picture develops
        if (devProgress < 0.99) {
            ctx.globalCompositeOperation = 'screen';
            const milkyAlpha = (1.0 - devProgress) * 0.7;
            ctx.fillStyle = `rgba(35, 45, 55, ${milkyAlpha})`;
            ctx.fillRect(0, 0, w, h);
        }

        // 2. Chemical Temperature Shift (Sepia / Cyan-Magenta cross-processing)
        if (sepiaShift > 0.05) {
            ctx.globalCompositeOperation = 'color';
            ctx.fillStyle = `rgba(215, 175, 110, ${sepiaShift * 0.4})`;
            ctx.fillRect(0, 0, w, h);
        }

        // 3. Classic Polaroid Frame: white bottom-heavy border
        if (showFrame) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = '#f6f3ea'; // Off-white Polaroid card stock

            const padSide = Math.max(20, Math.floor(w * 0.04));
            const padTop = padSide;
            const padBottom = padSide * 3.2; // Classic wide chin for notes

            ctx.beginPath();
            ctx.rect(0, 0, w, h);

            // Cut out inner photo viewport with sharp paper edge
            const innerX = padSide;
            const innerY = padTop;
            const innerW = w - padSide * 2;
            const innerH = h - padTop - padBottom;

            ctx.rect(innerX, innerY, innerW, innerH);
            ctx.fill('evenodd');

            // Inner dark bevel shadow of the photo aperture
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(innerX, innerY, innerW, innerH);

            // Vintage card stock subtle grain/stain
            if (colorBleed > 0.1) {
                ctx.fillStyle = `rgba(180, 140, 90, ${colorBleed * 0.08})`;
                ctx.fillRect(0, 0, w, h);
            }
        }

        ctx.restore();
    }
}
