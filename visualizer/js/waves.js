function renderWaves(engine, ctx, time) {
    const count = Math.floor(engine.p('waveCount')); if (count <= 0) return;
    while (engine.wavePhases.length < count) engine.wavePhases.push(Math.random() * 100);
    const speed = engine.p('waveSpeed'), thick = engine.p('waveThickness'), chaos = engine.p('waveChaos'), gAlpha = Math.max(0, Math.min(1, engine.p('waveOpacity')));
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2, maxR = Math.max(cx, cy) * 1.5;
    ctx.save(); ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = gAlpha;
    for (let i = 0; i < count; i++) {
        engine.wavePhases[i] += speed; if (engine.wavePhases[i] > 100) engine.wavePhases[i] = 0;
        const radius = (engine.wavePhases[i] / 100) * maxR;
        const alpha = Math.sin((engine.wavePhases[i] / 100) * Math.PI) * 0.6 * engine.trend;
        const progress = engine.session.targetIndex !== null ? Math.min(1, (time - engine.session.transitionStart) / engine.session.transitionDuration) : 0;
        const colorA = engine.active.settings.palette[i % 6], colorB = engine.target ? engine.target.settings.palette[i % 6] : colorA;

        ctx.beginPath();
        const segments = 60;
        for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2;
            const r = Math.max(0.1, radius + Math.sin(angle * 5 + time / 500 + i) * chaos);
            const x = cx + Math.cos(angle) * r, y = cy + Math.sin(angle) * r;
            if (j === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.lineWidth = thick;
        ctx.strokeStyle = ColorUtils.lerpColor(colorA, colorB, progress);
        ctx.stroke();
    }
    ctx.restore();
}
