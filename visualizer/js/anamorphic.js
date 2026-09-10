/**
 * BatecAnamorphic - Highway Sodium Streetlights & Anamorphic Optical Flares
 * Simulates streaks of light passing across the screen horizontally like
 * passing lampposts on a nighttime highway drive or taillights on wet asphalt.
 * Built for "Coming back home" & stage climax drops.
 */
class BatecAnamorphic {
    constructor(engine) {
        this.engine = engine;
        this.streaks = [];
        this.initStreaks();
    }

    initStreaks() {
        this.streaks = [];
        for (let i = 0; i < 8; i++) {
            this.streaks.push({
                y: Math.random(),
                speed: 0.15 + Math.random() * 0.4,
                width: 0.4 + Math.random() * 0.6,
                thickness: 1.5 + Math.random() * 4.0,
                colorIdx: Math.floor(Math.random() * 6),
                alpha: 0.5 + Math.random() * 0.5,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    render(ctx, layerId, time) {
        const eng = this.engine;
        const layer = eng.active.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return;

        const w = window.innerWidth;
        const h = window.innerHeight;

        const streakCount = Math.floor(eng.pLayer(layerId, 'flareCount') || 6);
        const streakLength = eng.pLayer(layerId, 'flareLength') || 1.2;
        const speed = eng.pLayer(layerId, 'flareSpeed') || 0.8;
        const intensity = eng.pLayer(layerId, 'flareIntensity') || 0.75;
        const bassImpact = eng.smoothed.bass / 255;
        const midImpact = eng.smoothed.mid / 255;

        const t = (time / 1000) * speed;

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        const settings = layer.settings || {};
        let colors = eng.active.settings.palette;
        if (settings.useLayerColor) {
            colors = Array.isArray(settings.layerColors) ? settings.layerColors : [settings.layerColor || '#ff9900'];
        }

        for (let i = 0; i < Math.min(streakCount, this.streaks.length); i++) {
            const s = this.streaks[i];

            // Horizontal cycle position: sweeping from right to left or oscillating
            const sweep = (t * s.speed + (i / streakCount)) % 1.4 - 0.2;
            const cx = sweep * w;
            const cy = (s.y * 0.7 + 0.15) * h + Math.sin(t + s.phase) * (h * 0.05);

            const flareW = w * streakLength * s.width * (1.0 + bassImpact * 0.6);
            const flareH = s.thickness * (1.0 + midImpact * 2.5);

            const colHex = colors[i % colors.length] || '#ffaa33';
            const rgb = ColorUtils.hexToRgb(colHex);

            // Anamorphic horizontal streak gradient
            const grad = ctx.createLinearGradient(cx - flareW / 2, cy, cx + flareW / 2, cy);
            grad.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
            grad.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * s.alpha * 0.3})`);
            grad.addColorStop(0.5, `rgba(255, 255, 255, ${intensity * s.alpha * 0.95})`);
            grad.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * s.alpha * 0.3})`);
            grad.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.ellipse(cx, cy, flareW / 2, flareH, 0, 0, Math.PI * 2);
            ctx.fill();

            // Central bright optical core orb
            const orbRad = flareH * 2.0;
            const orbGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbRad);
            orbGrad.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.9})`);
            orbGrad.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${intensity * 0.4})`);
            orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = orbGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, orbRad, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}
