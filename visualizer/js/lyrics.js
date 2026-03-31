function renderLyrics(engine, ctx, time, sessionProgress) {
    const preset = engine.active;
    if (!preset.settings.textEnabled) return;
    const hold = engine.p('textHoldTime') * 1000, fade = engine.p('textFadeTime') * 1000;
    const validTexts = preset.settings.textList.filter(t => t.trim().length > 0);
    if (validTexts.length === 0) return;

    if (time - engine.lyricLastSwap > hold + fade) {
        engine.lyricLastSwap = time;
        if (preset.settings.textSequenceMode === 'random') engine.lyricIdx = Math.floor(Math.random() * validTexts.length);
        else engine.lyricIdx = (engine.lyricIdx + 1) % validTexts.length;
    }

    const elapsed = time - engine.lyricLastSwap;
    let opacity = engine.p('textOpacity');
    if (elapsed < fade) opacity *= (elapsed / fade);
    else if (elapsed > hold) opacity *= (1 - (elapsed - hold) / fade);

    ctx.save(); ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity + engine.trend * 0.4));
    ctx.translate(window.innerWidth / 2 + engine.p('textJitterX'), window.innerHeight / 2 + engine.p('textJitterY'));
    ctx.rotate(engine.p('textRotation'));

    const fontSizeScale = engine.p('textScale');
    ctx.font = `bold ${window.innerWidth * 0.12 * fontSizeScale}px 'Inter'`;

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.filter = `blur(${engine.p('textBlur')}px)`;
    const cA = preset.settings.palette[0], cB = engine.target ? engine.target.settings.palette[0] : cA;
    ctx.fillStyle = ColorUtils.lerpColor(cA, cB, sessionProgress);
    ctx.fillText(validTexts[engine.lyricIdx].toUpperCase(), 0, 0);
    ctx.restore();
}
