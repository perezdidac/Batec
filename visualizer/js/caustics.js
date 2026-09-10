/**
 * BatecCaustics - Oceanic Depth & Subsurface Light Patterns
 * Generates dynamic dancing water caustics (sunlight network refracting through sea waves)
 * and deep marine luminescence tailored for "Platja".
 */
class BatecCaustics {
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

    render(ctx, layerId, time) {
        const eng = this.engine;
        const layer = eng.active.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return;

        const scale = eng.pLayer(layerId, 'causticScale') || 1.8;
        const speed = eng.pLayer(layerId, 'causticSpeed') || 0.6;
        const intensity = eng.pLayer(layerId, 'causticIntensity') || 0.75;
        const depthFog = eng.pLayer(layerId, 'causticDepth') || 0.35;
        const turbulence = eng.pLayer(layerId, 'causticTurbulence') || 0.5;
        const midTreble = ((eng.smoothed.mid + eng.smoothed.treble) / (255 * 2));

        const t = (time / 1000) * speed;

        ctx.save();

        // 1. Marine Depth Gradient
        if (depthFog > 0.05) {
            const grad = ctx.createLinearGradient(0, 0, 0, this.height);
            grad.addColorStop(0, `rgba(4, 25, 45, ${depthFog * 0.4})`);
            grad.addColorStop(0.5, `rgba(10, 45, 75, ${depthFog * 0.25})`);
            grad.addColorStop(1, `rgba(2, 12, 28, ${depthFog * 0.6})`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        // 2. Procedural Caustic Mesh
        // Uses Voronoi-like intersecting sinusoidal interference waves
        const settings = layer.settings || {};
        let colors = eng.active.settings.palette;
        if (settings.useLayerColor) {
            colors = Array.isArray(settings.layerColors) ? settings.layerColors : [settings.layerColor || '#68d8d6'];
        }
        const shimmerColor = colors[Math.min(3, colors.length - 1)] || '#a8dadc';

        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha = intensity * (0.8 + midTreble * 0.4);

        const gridSize = Math.max(30, Math.floor(65 / scale));
        const cols = Math.ceil(this.width / gridSize) + 2;
        const rows = Math.ceil(this.height / gridSize) + 2;

        ctx.strokeStyle = shimmerColor;
        ctx.lineWidth = 1.2 + midTreble * 1.5;

        // Draw interwoven caustic ribbons
        for (let r = 0; r < rows; r++) {
            ctx.beginPath();
            for (let c = 0; c < cols; c++) {
                const bx = c * gridSize;
                const by = r * gridSize;

                // Wave harmonics
                const nx = (bx / this.width) * 4.0;
                const ny = (by / this.height) * 4.0;

                const wave1 = Math.sin(nx * 2.5 + t * 1.4 + ny * 1.2);
                const wave2 = Math.cos(ny * 3.1 - t * 1.1 + nx * 0.8);
                const wave3 = Math.sin((nx + ny) * 2.0 + t * 2.0 * (1 + turbulence));

                const dispX = (wave1 + wave3 * 0.5) * (gridSize * 0.45);
                const dispY = (wave2 + wave3 * 0.5) * (gridSize * 0.45);

                const px = bx + dispX;
                const py = by + dispY;

                if (c === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        // Vertical intersecting mesh lines for the classic caustic netting
        for (let c = 0; c < cols; c += 2) {
            ctx.beginPath();
            for (let r = 0; r < rows; r++) {
                const bx = c * gridSize;
                const by = r * gridSize;

                const nx = (bx / this.width) * 4.0;
                const ny = (by / this.height) * 4.0;

                const wave1 = Math.sin(nx * 2.5 + t * 1.4 + ny * 1.2);
                const wave2 = Math.cos(ny * 3.1 - t * 1.1 + nx * 0.8);
                const wave3 = Math.sin((nx + ny) * 2.0 + t * 2.0 * (1 + turbulence));

                const dispX = (wave1 + wave3 * 0.5) * (gridSize * 0.45);
                const dispY = (wave2 + wave3 * 0.5) * (gridSize * 0.45);

                const px = bx + dispX;
                const py = by + dispY;

                if (r === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
        }

        // 3. Floating Organic Floating Particulates / Sunbeams in water
        const moteCount = 18;
        ctx.fillStyle = '#ffffff';
        for (let m = 0; m < moteCount; m++) {
            const mx = (Math.sin(m * 123.4 + t * 0.3) * 0.5 + 0.5) * this.width;
            const my = (Math.cos(m * 321.7 + t * 0.2) * 0.5 + 0.5) * this.height;
            const mSize = 1.0 + Math.sin(t + m) * 0.8;
            ctx.beginPath();
            ctx.arc(mx, my, Math.max(0.5, mSize), 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}
