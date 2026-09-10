/**
 * BatecTopography - 3D Audio-Reactive Topographic Elevation Contour Map
 * Generates evocative contour isolines resembling vintage elevation surveys
 * of the Catalan mountains (Montserrat, Montseny) and arid inland terrain (Gravel).
 */
class BatecTopography {
    constructor(engine) {
        this.engine = engine;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    // 2D Smooth Noise function
    noise(x, y) {
        const xi = Math.floor(x);
        const yi = Math.floor(y);
        const xf = x - xi;
        const yf = y - yi;

        const u = xf * xf * (3.0 - 2.0 * xf);
        const v = yf * yf * (3.0 - 2.0 * yf);

        const h = (ix, iy) => {
            const sinVal = Math.sin(ix * 127.1 + iy * 311.7) * 43758.5453;
            return sinVal - Math.floor(sinVal);
        };

        const n00 = h(xi, yi);
        const n10 = h(xi + 1, yi);
        const n01 = h(xi, yi + 1);
        const n11 = h(xi + 1, yi + 1);

        const nx0 = n00 + (n10 - n00) * u;
        const nx1 = n01 + (n11 - n01) * u;
        return nx0 + (nx1 - nx0) * v;
    }

    fbm(x, y, octaves = 3) {
        let val = 0;
        let amp = 0.5;
        let freq = 1.0;
        for (let i = 0; i < octaves; i++) {
            val += amp * this.noise(x * freq, y * freq);
            freq *= 2.0;
            amp *= 0.5;
        }
        return val;
    }

    render(ctx, layerId, time) {
        const eng = this.engine;
        const layer = eng.active.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return;

        const scale = eng.pLayer(layerId, 'topoScale') || 3.0;
        const lineCount = Math.floor(eng.pLayer(layerId, 'topoLines') || 24);
        const speed = eng.pLayer(layerId, 'topoSpeed') || 0.4;
        const chaos = eng.pLayer(layerId, 'topoChaos') || 0.5;
        const opacity = eng.pLayer(layerId, 'topoOpacity') || 0.85;
        const lineWidth = eng.pLayer(layerId, 'topoLineWidth') || 1.5;
        const elevationBass = (eng.smoothed.bass / 255) * 1.5;
        const trend = eng.trend;

        ctx.save();
        ctx.globalAlpha = opacity;

        // Colors from palette or layer override
        const settings = layer.settings || {};
        let colors = eng.active.settings.palette;
        if (settings.useLayerColor) {
            colors = Array.isArray(settings.layerColors) ? settings.layerColors : [settings.layerColor || '#cda34f'];
        }

        const t = (time / 1000) * speed;
        const stepX = 24; // sampling resolution
        const cols = Math.ceil(this.width / stepX) + 1;

        // Isometric / Horizon tilt perspective option
        const isPerspective = settings.perspective !== false;
        const horizonY = this.height * 0.25;

        for (let i = 0; i < lineCount; i++) {
            const normI = i / lineCount;
            const color = colors[i % colors.length];
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth * (isPerspective ? (0.5 + normI * 1.5) : 1.0);

            ctx.beginPath();

            const baseY = isPerspective 
                ? horizonY + Math.pow(normI, 1.6) * (this.height - horizonY)
                : (normI * this.height);

            const zFactor = isPerspective ? (0.2 + normI * 0.8) : 1.0;

            for (let c = 0; c < cols; c++) {
                const px = c * stepX;
                const nx = (px / this.width) * scale;
                const ny = normI * scale + t;

                // Audio reactive terrain displacement
                const elevation = this.fbm(nx * (1 + chaos * 0.5), ny, 3);
                const ripple = Math.sin(nx * 10 + t * 3) * (elevationBass * 15);
                const waveAmp = (elevation * 80 * zFactor) + ripple + (trend * 20 * zFactor);

                const py = baseY - waveAmp;

                if (c === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }

            ctx.stroke();

            // Elevation label numbers on every 4th line (Vintage surveyor aesthetic)
            if (i % 4 === 0 && settings.showSurveyNumbers !== false) {
                const labelX = (this.width * 0.15 + (i * 47) % (this.width * 0.7));
                const cIdx = Math.floor(labelX / stepX);
                const nx = (labelX / this.width) * scale;
                const ny = normI * scale + t;
                const labelY = baseY - ((this.fbm(nx, ny, 3) * 80 * zFactor) + (elevationBass * 15));

                ctx.save();
                ctx.fillStyle = color;
                ctx.font = '9px "Courier New", monospace';
                ctx.globalAlpha = opacity * 0.65;
                const altMeters = Math.floor(200 + normI * 1250 + elevationBass * 100);
                ctx.fillText(`${altMeters}m`, labelX, labelY - 4);
                ctx.restore();
            }
        }

        ctx.restore();
    }
}
