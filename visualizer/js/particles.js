class BatecParticle {
    constructor(engine, layerId) { this.engine = engine; this.layerId = layerId; this.reset(); }
    reset() {
        this.x = Math.random() * window.innerWidth; this.y = Math.random() * window.innerHeight;
        this.colorIdx = Math.floor(Math.random() * 6); this.hueOffset = Math.random() * 360;
        this.vx = (Math.random() - 0.5) * 2; this.vy = (Math.random() - 0.5) * 2;
    }
    update(time) {
        const eng = this.engine, trend = eng.trend, ctxP = { x: this.x, y: this.y };
        const dir = eng.pLayer(this.layerId, 'particleDirection', ctxP), grav = eng.pLayer(this.layerId, 'particleGravity', ctxP), chaosAmt = eng.pLayer(this.layerId, 'particleChaos', ctxP);
        const wind = eng.pLayer(this.layerId, 'particleWind', ctxP);
        this.vx += (Math.cos(dir) * (0.1 + trend * 0.5) * (chaosAmt / 100)) + (wind * 0.01);
        this.vy += (Math.sin(dir) * (0.1 + trend * 0.5) * (chaosAmt / 100)) + (grav * 0.05);

        // Pointer attraction force (Interactive Field)
        if (performance.now() - eng.lastPointerMove < 3000) {
            const px = eng.mx * window.innerWidth;
            const py = eng.my * window.innerHeight;
            const dx = px - this.x;
            const dy = py - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            if (dist < 250) {
                const force = (1.0 - dist / 250) * 0.15;
                this.vx += (dx / dist) * force;
                this.vy += (dy / dist) * force;
            }
        }

        // BREEZE: Collective rhythmic sway
        const breezeStrength = eng.pLayer(this.layerId, 'particleBreezeStrength');
        this.vx += Math.sin(time / 1000 + this.x / 500) * breezeStrength * 0.2;
        this.vy += Math.cos(time / 1500 + this.y / 500) * breezeStrength * 0.1;

        const maxS = eng.pLayer(this.layerId, 'particleSpeed', ctxP) * (1 + trend * 2);
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy) || 1;
        if (speed > maxS) { this.vx = (this.vx / speed) * maxS; this.vy = (this.vy / speed) * maxS; }
        this.x += this.vx; this.y += this.vy; this.hueOffset += eng.pLayer(this.layerId, 'particleColorSpeed', ctxP) * 0.1;
        if (this.x < -150 || this.x > window.innerWidth + 150 || this.y < -150 || this.y > window.innerHeight + 150) this.reset();
    }
    draw(ctx) {
        const eng = this.engine, ctxP = { x: this.x, y: this.y };
        const size = Math.max(0.1, eng.pLayer(this.layerId, 'particleSize', ctxP)), rot = eng.pLayer(this.layerId, 'particleRotation', ctxP);
        const layerSettings = eng.active.layers.find(l => l.id === this.layerId)?.settings;
        const shp = (layerSettings?.particleShape || 'mote');
        
        ctx.save();
        ctx.translate(this.x, this.y); ctx.rotate(rot);
        
        let colorBase = eng.active.settings.palette[this.colorIdx];
        if (layerSettings && layerSettings.useLayerColor) {
            if (Array.isArray(layerSettings.layerColors)) {
                colorBase = layerSettings.layerColors[this.colorIdx % layerSettings.layerColors.length];
            } else {
                colorBase = layerSettings.layerColor || '#ffffff';
            }
        }
        const rgb = ColorUtils.hexToRgb(colorBase);

        if (shp === 'mote') {
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            const op = eng.pLayer(this.layerId, 'particleOpacity');

            if (layerSettings && layerSettings.useLayerColor) {
                let rgbaPrefix = rgb.rgbaPrefix;
                if (!rgbaPrefix) {
                    rgbaPrefix = `rgba(${rgb.r},${rgb.g},${rgb.b},`;
                    rgb.rgbaPrefix = rgbaPrefix;
                }
                grad.addColorStop(0, rgbaPrefix + op + ')');
                grad.addColorStop(0.4, rgbaPrefix + (op * 0.4) + ')');
                grad.addColorStop(1, rgbaPrefix + '0)');
            } else {
                // Artsy Dust Mote: Soft radial glow, warm golden-white
                grad.addColorStop(0, `rgba(255,245,200,${op})`);
                grad.addColorStop(0.4, `rgba(255,220,150,${op * 0.4})`);
                grad.addColorStop(1, 'rgba(255,200,100,0)');
            }
            ctx.fillStyle = grad;
        } else {
            const hslParts = ColorUtils.hexToHslParts(colorBase);
            const h = Math.round(hslParts.h + this.hueOffset) % 360;
            const op = Math.max(0, Math.min(1, eng.pLayer(this.layerId, 'particleOpacity')));
            ctx.fillStyle = `hsla(${h}${hslParts.suffix}${op})`;
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