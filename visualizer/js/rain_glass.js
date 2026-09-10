/**
 * BatecRainGlass - Optical Rain-on-Glass & Water Droplet Simulation
 * Simulates a wet window pane or windshield with condensing beads, trickling runs,
 * and normal-based optical refraction distorting the underlying canvas.
 */
class BatecRainGlass {
    constructor(engine) {
        this.engine = engine;
        this.drops = [];
        this.ripples = [];
        this.maxDrops = 850; // Vastly increased count for a true downpour
        this.lastSpawn = 0;
        this.dropletCanvas = document.createElement('canvas');
        this.dropletCtx = this.dropletCanvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dropletCanvas.width = this.width;
        this.dropletCanvas.height = this.height;
    }

    initDrops(density) {
        const targetCount = Math.floor(density * this.maxDrops);
        while (this.drops.length < targetCount) {
            this.drops.push(this.createDrop(false));
        }
        if (this.drops.length > targetCount) {
            this.drops.length = targetCount;
        }
    }

    createDrop(atTop = false) {
        const isRunner = Math.random() < 0.18; // 18% running streams
        return {
            x: Math.random() * this.width,
            y: atTop ? -20 : Math.random() * this.height,
            r: isRunner ? (3.5 + Math.random() * 6.0) : (1.8 + Math.random() * 4.5),
            vy: isRunner ? (2.0 + Math.random() * 4.0) : (0.04 + Math.random() * 0.12),
            vx: (Math.random() - 0.5) * 0.15,
            isRunner: isRunner,
            trail: [],
            shiver: 0,
            alpha: 0.75 + Math.random() * 0.25
        };
    }

    update(layerId, time) {
        const eng = this.engine;
        const density = Math.max(0.05, Math.min(1.0, eng.pLayer(layerId, 'rainDensity') || 0.5));
        const dripSpeed = eng.pLayer(layerId, 'rainDripSpeed') || 1.0;
        const bassImpact = (eng.smoothed.bass / 255);

        this.initDrops(density);

        // Bass transient shiver
        const bassShiver = bassImpact > 0.4 ? (bassImpact * 4.0) : 0;

        for (let i = 0; i < this.drops.length; i++) {
            const d = this.drops[i];
            d.shiver = bassShiver * (Math.random() - 0.5);

            // Runners move faster and leave beads behind
            if (d.isRunner) {
                d.y += d.vy * dripSpeed * (1 + bassImpact * 1.5);
                d.x += d.vx + d.shiver * 0.5;

                // Leave trail beads
                if (Math.random() < 0.25) {
                    d.trail.push({
                        x: d.x + (Math.random() - 0.5) * 2,
                        y: d.y,
                        r: d.r * (0.3 + Math.random() * 0.3),
                        alpha: 0.6
                    });
                    if (d.trail.length > 12) d.trail.shift();
                }
            } else {
                // Static beads slowly gather mass and occasionally break free into runners
                d.y += d.vy * dripSpeed;
                d.x += d.shiver * 0.2;
                if (bassImpact > 0.7 && Math.random() < 0.04) {
                    d.isRunner = true;
                    d.vy = 2.0 + Math.random() * 2.5;
                }
            }

            // Wrap or respawn
            if (d.y > this.height + 30 || d.x < -30 || d.x > this.width + 30) {
                Object.assign(d, this.createDrop(true));
            }
        }
    }

    render(ctx, layerId, time, sourceCanvas) {
        const eng = this.engine;
        const layer = eng.active.layers.find(l => l.id === layerId);
        if (!layer || !layer.enabled) return;

        this.update(layerId, time);

        const refractionStr = eng.pLayer(layerId, 'rainRefraction') || 15.0;
        const condensationFog = eng.pLayer(layerId, 'rainFog') || 0.25;
        const opacity = eng.pLayer(layerId, 'rainOpacity') || 0.9;
        const dropSizeMult = eng.pLayer(layerId, 'rainDropSize') || 1.0;

        ctx.save();
        ctx.globalAlpha = opacity;

        // 1. Condensation Mist / Fog on Glass
        if (condensationFog > 0.01) {
            ctx.fillStyle = `rgba(220, 230, 245, ${condensationFog * 0.22})`;
            ctx.fillRect(0, 0, this.width, this.height);
        }

        // 2. Draw optical water droplets with highlights, shadow, and simulated lens refraction
        for (let i = 0; i < this.drops.length; i++) {
            const d = this.drops[i];
            const rad = d.r * dropSizeMult;
            const px = d.x + d.shiver;
            const py = d.y;

            // Draw trail beads first
            if (d.isRunner && d.trail.length > 0) {
                for (let j = 0; j < d.trail.length; j++) {
                    const tDrop = d.trail[j];
                    this.drawSingleBead(ctx, tDrop.x, tDrop.y, tDrop.r * dropSizeMult, tDrop.alpha * 0.7, refractionStr, sourceCanvas);
                }
            }

            // Main droplet
            this.drawSingleBead(ctx, px, py, rad, d.alpha, refractionStr, sourceCanvas);
        }

        ctx.restore();
    }

    drawSingleBead(ctx, x, y, r, alpha, refractionStr, sourceCanvas) {
        if (r <= 0.5) return;

        // Optical refraction: sample inverted/offset slice from source canvas
        if (sourceCanvas && refractionStr > 0.5 && r > 1.8) {
            const sampleSize = Math.floor(r * 2.8);
            const sx = Math.max(0, Math.min(this.width - sampleSize, x - sampleSize / 2 + refractionStr * 0.4));
            const sy = Math.max(0, Math.min(this.height - sampleSize, y - sampleSize / 2 + refractionStr * 0.4));

            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.clip();

            // Refracted lens magnification / displacement
            ctx.drawImage(
                sourceCanvas,
                sx, sy, sampleSize, sampleSize,
                x - r * 1.3, y - r * 1.3, r * 2.6, r * 2.6
            );

            // Water droplet inner volume shading
            const innerGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
            innerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
            innerGrad.addColorStop(0.6, 'rgba(120, 160, 200, 0.15)');
            innerGrad.addColorStop(1, 'rgba(10, 20, 40, 0.4)');
            ctx.fillStyle = innerGrad;
            ctx.fill();

            // Dark rim of water droplet (Fresnel reflection)
            ctx.strokeStyle = `rgba(10, 20, 35, ${0.7 * alpha})`;
            ctx.lineWidth = Math.max(1.2, r * 0.28);
            ctx.stroke();

            // Bright white top-left curved specular highlight (catching stage / window light)
            ctx.beginPath();
            ctx.arc(x - r * 0.32, y - r * 0.32, r * 0.48, Math.PI * 0.8, Math.PI * 1.65);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
            ctx.lineWidth = Math.max(1.2, r * 0.3);
            ctx.stroke();

            // Secondary caustics highlight on bottom right
            ctx.beginPath();
            ctx.arc(x + r * 0.25, y + r * 0.25, r * 0.35, 0, Math.PI * 0.65);
            ctx.strokeStyle = `rgba(200, 235, 255, ${0.65 * alpha})`;
            ctx.lineWidth = Math.max(1.0, r * 0.22);
            ctx.stroke();

            ctx.restore();
        } else {
            // Fast 2D fallback for tiny droplets
            ctx.save();
            ctx.fillStyle = `rgba(180, 210, 245, ${0.55 * alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();

            // Highlight dot
            ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * alpha})`;
            ctx.beginPath();
            ctx.arc(x - r * 0.3, y - r * 0.3, Math.max(1.0, r * 0.4), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}
