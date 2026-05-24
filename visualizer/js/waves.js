function renderWaves(engine, ctx, time, layerId) {
    const count = Math.floor(engine.pLayer(layerId, 'waveCount')); if (count <= 0) return;
    while ((engine.wavePhases[layerId] || []).length < count) (engine.wavePhases[layerId] = engine.wavePhases[layerId] || []).push(Math.random() * 100);
    const speed = engine.pLayer(layerId, 'waveSpeed'), thick = engine.pLayer(layerId, 'waveThickness'), chaos = engine.pLayer(layerId, 'waveChaos'), gAlpha = Math.max(0, Math.min(1, engine.pLayer(layerId, 'waveOpacity')));
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2, maxR = Math.max(cx, cy) * 1.5;
    ctx.save(); ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = gAlpha;
    for (let i = 0; i < count; i++) {
        engine.wavePhases[layerId][i] += speed; if (engine.wavePhases[layerId][i] > 100) engine.wavePhases[layerId][i] = 0;
        const radius = (engine.wavePhases[layerId][i] / 100) * maxR;
        const alpha = Math.sin((engine.wavePhases[layerId][i] / 100) * Math.PI) * 0.6 * engine.trend;
        const progress = engine.session.targetIndex !== null ? Math.min(1, (time - engine.session.transitionStart) / engine.session.transitionDuration) : 0;
        const layerSettings = engine.active.layers.find(l => l.id === layerId)?.settings;
        let colorA = engine.active.settings.palette[i % 6];
        let colorB = engine.target ? engine.target.settings.palette[i % 6] : colorA;

        if (layerSettings && layerSettings.useLayerColor) {
            if (Array.isArray(layerSettings.layerColors)) {
                colorA = layerSettings.layerColors[i % layerSettings.layerColors.length];
            } else {
                colorA = layerSettings.layerColor || '#ffffff';
            }
            colorB = colorA;
        }

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
