/**
 * BatecCinematicLight - Volumetric Window Sunbeams & Venetian Blinds
 * Projects dramatic, cinematic slants of afternoon or morning light through
 * window panes or architectural Venetian blinds, with floating dust motes.
 * Designed for "Casa" and "Divendres".
 */
class BatecCinematicLight {
    constructor(engine) {
        this.engine = engine;
        this.dustMotes = [];
        this.initDust();
    }

    initDust() {
        this.dustMotes = [];
        for (let i = 0; i < 90; i++) {
            this.dustMotes.push({
                x: Math.random(),
                y: Math.random(),
                size: 0.8 + Math.random() * 2.2,
                vx: (Math.random() - 0.5) * 0.0003,
                vy: -0.0001 - Math.random() * 0.0004,
                alpha: 0.3 + Math.random() * 0.7,
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

        const angleDeg = eng.pLayer(layerId, 'lightAngle') || 40.0;
        const beamIntensity = eng.pLayer(layerId, 'lightIntensity') || 0.65;
        const warmth = eng.pLayer(layerId, 'lightWarmth') || 0.7; // 0 = cool white/blue, 1 = golden hour amber
        const blindCount = Math.floor(eng.pLayer(layerId, 'blindCount') || 14);
        const blindOpen = eng.pLayer(layerId, 'blindOpen') || 0.6; // 0 = closed, 1 = wide open
        const dustDensity = eng.pLayer(layerId, 'dustDensity') || 0.6;

        const audioMid = (eng.smoothed.mid / 255);
        const currentIntensity = beamIntensity * (0.85 + audioMid * 0.35);

        ctx.save();

        // 1. Color Palette: Golden hour honey vs Morning mist
        const rVal = Math.floor(255 * warmth + 200 * (1 - warmth));
        const gVal = Math.floor(205 * warmth + 225 * (1 - warmth));
        const bVal = Math.floor(130 * warmth + 255 * (1 - warmth));

        // 2. Volumetric Window Beams / Venetian Blinds Shadows
        const radAngle = (angleDeg * Math.PI) / 180;
        const cosA = Math.cos(radAngle);
        const sinA = Math.sin(radAngle);

        ctx.globalCompositeOperation = 'screen';

        const totalBars = Math.max(3, blindCount);
        const barSpan = (h * 1.5) / totalBars;

        for (let i = 0; i < totalBars; i++) {
            const barY = (i * barSpan) - (h * 0.3);
            const slotHeight = barSpan * blindOpen;

            // Polygonal light beam cast across the room
            ctx.beginPath();
            // Source window edge (top/left)
            const x0 = 0;
            const y0 = barY;
            const x1 = 0;
            const y1 = barY + slotHeight;

            // Projected far screen edge
            const reach = w * 1.8;
            const x2 = x1 + cosA * reach;
            const y2 = y1 + sinA * reach;
            const x3 = x0 + cosA * reach;
            const y3 = y0 + sinA * reach;

            ctx.moveTo(x0, y0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.closePath();

            // Gradient falloff along the beam
            const beamGrad = ctx.createLinearGradient(0, barY, x3, y3);
            beamGrad.addColorStop(0, `rgba(${rVal}, ${gVal}, ${bVal}, ${currentIntensity * 0.45})`);
            beamGrad.addColorStop(0.3, `rgba(${rVal}, ${gVal}, ${bVal}, ${currentIntensity * 0.25})`);
            beamGrad.addColorStop(0.8, `rgba(${rVal}, ${gVal}, ${bVal}, ${currentIntensity * 0.08})`);
            beamGrad.addColorStop(1, `rgba(${rVal}, ${gVal}, ${bVal}, 0.0)`);

            ctx.fillStyle = beamGrad;
            ctx.fill();
        }

        // 3. Floating Illuminated Dust Motes dancing in the light
        if (dustDensity > 0.05) {
            const activeDust = Math.floor(this.dustMotes.length * dustDensity);
            const t = time / 1000;

            ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;

            for (let i = 0; i < activeDust; i++) {
                const m = this.dustMotes[i];

                // Slow Brownian convection currents
                m.x += m.vx + Math.sin(t * 0.5 + m.phase) * 0.0002;
                m.y += m.vy + Math.cos(t * 0.3 + m.phase) * 0.0001;

                if (m.y < 0) m.y = 1.0;
                if (m.x < 0) m.x = 1.0;
                if (m.x > 1) m.x = 0.0;

                const mx = m.x * w;
                const my = m.y * h;

                // Dust sparkles as it catches light
                const sparkle = Math.sin(t * 2.0 + m.phase) * 0.3 + 0.7;
                ctx.globalAlpha = m.alpha * currentIntensity * sparkle;

                ctx.beginPath();
                ctx.arc(mx, my, m.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }
}
