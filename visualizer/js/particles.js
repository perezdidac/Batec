class BatecParticle {
    constructor(engine) { this.engine = engine; this.reset(); }
    reset() {
        this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight;
        this.colorIdx = Math.floor(Math.random() * 6); this.hueOffset = Math.random() * 360;
        this.vx = (Math.random() - 0.5) * 2; this.vy = (Math.random() - 0.5) * 2;
    }
    update(time) {
        const eng = this.engine, trend = eng.trend, ctxP = { x: this.x, y: this.y };
        const dir = eng.p('particleDirection', ctxP), grav = eng.p('particleGravity', ctxP), chaosAmt = eng.p('particleChaos', ctxP);
        const wind = eng.p('particleWind', ctxP);
        this.vx += (Math.cos(dir) * (0.1 + trend * 0.5) * (chaosAmt / 100)) + (wind * 0.01);
        this.vy += (Math.sin(dir) * (0.1 + trend * 0.5) * (chaosAmt / 100)) + (grav * 0.05);

        // BREEZE: Collective rhythmic sway
        const breezeStrength = eng.p('particleBreezeStrength');
        this.vx += Math.sin(time / 1000 + this.x / 500) * breezeStrength * 0.2;
        this.vy += Math.cos(time / 1500 + this.y / 500) * breezeStrength * 0.1;

        const maxS = eng.p('particleSpeed', ctxP) * (1 + trend * 2);
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 1;
        if (speed > maxS) { this.vx = (this.vx / speed) * maxS; this.vy = (this.vy / speed) * maxS; }
        this.x += this.vx; this.y += this.vy; this.hueOffset += eng.p('particleColorSpeed', ctxP) * 0.1;
        if (this.x < -150 || this.x > window.innerWidth + 150 || this.y < -150 || this.y > window.innerHeight + 150) this.reset();
    }
    draw(ctx) {
        const eng = this.engine, ctxP = { x: this.x, y: this.y };
        const size = Math.max(0.1, eng.p('particleSize', ctxP)), rot = eng.p('particleRotation', ctxP);
        const shp = eng.active.settings.particleShape;
        
        ctx.save();
        ctx.translate(this.x, this.y); ctx.rotate(rot);
        
        if (shp === 'mote') {
            // Artsy Dust Mote: Soft radial glow, warm golden-white
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            const op = eng.p('particleOpacity');
            grad.addColorStop(0, `rgba(255, 245, 200, ${op})`);
            grad.addColorStop(0.4, `rgba(255, 220, 150, ${op * 0.4})`);
            grad.addColorStop(1, `rgba(255, 200, 100, 0)`);
            ctx.fillStyle = grad;
        } else {
            const colorBase = eng.active.settings.palette[this.colorIdx];
            const rgb = ColorUtils.hexToRgb(colorBase); const hsla = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
            ctx.fillStyle = `hsla(${(hsla[0] + this.hueOffset) % 360}, ${hsla[1]}%, ${hsla[2]}%, ${Math.max(0, Math.min(1, eng.p('particleOpacity')))})`;
        }

        ctx.beginPath();
        if (shp === 'square') ctx.rect(-size, -size, size * 2, size * 2);
        else if (shp === 'triangle') { ctx.moveTo(0, -size); ctx.lineTo(size, size); ctx.lineTo(-size, size); }
        else if (shp === 'star') { for (let i = 0; i < 5; i++) { ctx.lineTo(Math.cos(i * 1.25) * size, Math.sin(i * 1.25) * size); ctx.lineTo(Math.cos(i * 1.25 + 0.6) * size / 2, Math.sin(i * 1.25 + 0.6) * size / 2); } }
        else if (shp === 'petal') {
            // Organic teardrop/petal shape
            ctx.moveTo(0, -size);
            ctx.quadraticCurveTo(size * 0.8, -size * 0.5, size * 0.2, size);
            ctx.quadraticCurveTo(0, size * 1.2, -size * 0.2, size);
            ctx.quadraticCurveTo(-size * 0.8, -size * 0.5, 0, -size);
        }
        else if (shp === 'leaf') {
            // Sharp leaf shape with central rib
            ctx.moveTo(0, -size);
            ctx.quadraticCurveTo(size, 0, 0, size);
            ctx.quadraticCurveTo(-size, 0, 0, -size);
        }
        else if (shp === 'pollen' || shp === 'mote' || shp === 'circle') {
            ctx.arc(0, 0, size, 0, Math.PI * 2);
        }
        ctx.closePath(); ctx.fill(); ctx.restore();
    }
}