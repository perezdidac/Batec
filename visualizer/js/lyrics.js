function renderLyrics(engine, ctx, time, sessionProgress) {
    const preset = engine.active;
    if (!preset.settings.textEnabled) return;
    const hold = engine.p('textHoldTime') * 1000, fade = engine.p('textFadeTime') * 1000;
    const validTexts = preset.settings.textList.filter(t => t.trim().length > 0);
    if (validTexts.length === 0) return;

    if (time < engine.lyricLastSwap) {
        engine.lyricLastSwap = time; // Reset if physics time was synced/reset
    }

    if (time - engine.lyricLastSwap > hold + fade) {
        engine.lyricLastSwap = time;
        if (preset.settings.textSequenceMode === 'random') engine.lyricIdx = Math.floor(Math.random() * validTexts.length);
        else engine.lyricIdx = (engine.lyricIdx + 1) % validTexts.length;
    }

    const elapsed = time - engine.lyricLastSwap;
    const typeSpeed = engine.p('textTypeSpeed');
    
    // Safety check if validTexts shrank during a preset switch
    if (engine.lyricIdx >= validTexts.length) {
        engine.lyricIdx = 0;
    }
    
    const fullText = validTexts[engine.lyricIdx].toUpperCase();
    const isInk = preset.settings.textDissolveStyle === 'ink';
    const isFrozen = preset.settings.textFreeze && validTexts.length === 1;
    
    const charsToShow = isFrozen ? fullText.length : Math.floor(elapsed / typeSpeed);
    const displayText = fullText.substring(0, charsToShow);
    const isDone = charsToShow >= fullText.length;
    
    // Add a blinking cursor if still typing and not ink mode
    const cursor = (preset.settings.textDissolveStyle !== 'ink' && !isDone && Math.floor(time / 300) % 2 === 0) ? "|" : "";

    let opacity = engine.p('textOpacity');
    if (!isFrozen) {
        if (elapsed < fade) opacity *= (elapsed / fade);
        else if (elapsed > hold) opacity *= (1 - (elapsed - hold) / fade);
    }

    // INK RESOLVE: Non-linear opacity mask for organic soaking effect
    if (isInk && elapsed < fade * 2) {
        const resolve = engine.p('textInkResolve');
        opacity = Math.pow(opacity, 1.0 / (0.1 + resolve * 2.0));
    }

    ctx.save(); ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity + engine.trend * 0.4));
    
    // Floating Drift: Words slowly rise and drift horizontally over their lifetime
    const breezeAmt = engine.p('textEnvironmentDrift');
    const breezeX = Math.sin(time / 2000) * 50 * breezeAmt;
    const breezeY = Math.cos(time / 3000) * 20 * breezeAmt;
    
    const driftX = (elapsed / 1000) * engine.p('textJitterX') + breezeX;
    const driftY = (elapsed / 1000) * engine.p('textJitterY') + breezeY;
    
    ctx.translate(window.innerWidth / 2 + driftX, window.innerHeight / 2 + driftY);
    ctx.rotate(engine.p('textRotation'));

    const fontSizeScale = engine.p('textScale');
    const font = preset.settings.textFontFamily || 'Inter';
    ctx.font = `bold ${window.innerWidth * 0.08 * fontSizeScale}px ${font}, serif`; 

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.filter = `blur(${engine.p('textBlur')}px)`;
    const cA = preset.settings.palette[0], cB = engine.target ? engine.target.settings.palette[0] : cA;
    const finalColor = ColorUtils.lerpColor(cA, cB, sessionProgress);
    ctx.fillStyle = finalColor;
    
    // TEXT GLOW (Emotional Aura)
    const glow = engine.p('textGlow');
    if (glow > 0) {
        ctx.shadowColor = finalColor;
        ctx.shadowBlur = glow;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
    
    ctx.fillText(displayText + cursor, 0, 0);
    
    if (glow > 0) ctx.shadowBlur = 0; // Reset for performance
    ctx.restore();
}
