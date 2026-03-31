function renderRays(engine, ctx, time) {
    const count = Math.floor(engine.p('rayCount')); if (count <= 0) return;
    const thick = engine.p('rayThickness'), speed = engine.p('raySpeed'), chaos = engine.p('rayChaos');
    const hole = engine.p('rayCenterHole'), gAlpha = Math.max(0, Math.min(1, engine.p('rayOpacity')));
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const maxR = Math.max(window.innerWidth, window.innerHeight) * 1.5;
    
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.lineCap = 'round';
    
    const baseRot = (time / 5000) * speed;
    // Robust transition progress check
    const progress = (engine.session.targetIndex !== null && !isNaN(engine.session.transitionStart)) ? Math.min(1, (time - engine.session.transitionStart) / engine.session.transitionDuration) : 0;
    
    for (let i = 0; i < count; i++) {
        const colorA = engine.active.settings.palette[i % 6], colorB = engine.target ? engine.target.settings.palette[i % 6] : colorA;
        const color = ColorUtils.lerpColor(colorA, colorB, progress);
        
        const angleChaos = Math.sin(time/400 + i) * chaos * engine.trend;
        const angle = baseRot + (i / count) * Math.PI * 2 + angleChaos;
        const startR = Math.max(2, hole + Math.abs(Math.sin(time/300 + i) * chaos * hole * engine.trend));
        
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * startR, cy + Math.sin(angle) * startR);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        
        ctx.strokeStyle = color;
        ctx.globalAlpha = gAlpha * (0.2 + engine.trend * 0.8);
        ctx.lineWidth = Math.max(1, thick + (Math.sin(time/200 + i) * thick * chaos * engine.trend));
        ctx.stroke();
    }
    ctx.restore();
}
