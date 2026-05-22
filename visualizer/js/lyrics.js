function renderLyrics(engine, ctx, time, sessionProgress, layerId) {
        const preset = engine.active;
    const layer = preset.layers.find(l => l.id === layerId);
    if (!layer || !layer.enabled) return;

    if (!engine.lyricStates) engine.lyricStates = {};
    if (!engine.lyricStates[layerId]) engine.lyricStates[layerId] = { lyricIdx: 0, lyricLastSwap: 0 };
    const state = engine.lyricStates[layerId];

    const hold = engine.pLayer(layerId, 'textHoldTime') * 1000, fade = engine.pLayer(layerId, 'textFadeTime') * 1000;
    const validTexts = layer.settings.textList.filter(t => t.trim().length > 0);
    if (validTexts.length === 0) return;

    if (time < state.lyricLastSwap) {
        state.lyricLastSwap = time; // Reset if physics time was synced/reset
    }

    if (time - state.lyricLastSwap > hold + fade) {
        state.lyricLastSwap = time;
        if (layer.settings.textSequenceMode === 'random') state.lyricIdx = Math.floor(Math.random() * validTexts.length);
        else state.lyricIdx = (state.lyricIdx + 1) % validTexts.length;
    }

    const elapsed = time - state.lyricLastSwap;
    const typeSpeed = engine.pLayer(layerId, 'textTypeSpeed');
    
    // Safety check if validTexts shrank during a preset switch
    if (state.lyricIdx >= validTexts.length) {
        state.lyricIdx = 0;
    }
    
    const fullText = validTexts[state.lyricIdx].toUpperCase();
    const isInk = layer.settings.textDissolveStyle === 'ink';
    const isFrozen = layer.settings.textFreeze && validTexts.length === 1;
    
    const charsToShow = isFrozen ? fullText.length : Math.floor(elapsed / typeSpeed);
    const displayText = fullText.substring(0, charsToShow);
    const isDone = charsToShow >= fullText.length;
    
    // Add a blinking cursor if still typing and not ink mode
    const cursor = (layer.settings.textDissolveStyle !== 'ink' && !isDone && Math.floor(time / 300) % 2 === 0) ? "|" : "";

    let opacity = engine.pLayer(layerId, 'textOpacity');
    if (!isFrozen) {
        if (elapsed < fade) opacity *= (elapsed / fade);
        else if (elapsed > hold) opacity *= (1 - (elapsed - hold) / fade);
    }

    // INK RESOLVE: Non-linear opacity mask for organic soaking effect
    if (isInk && elapsed < fade * 2) {
        const resolve = engine.pLayer(layerId, 'textInkResolve');
        opacity = Math.pow(opacity, 1.0 / (0.1 + resolve * 2.0));
    }

    ctx.save(); ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity + engine.trend * 0.4));
    
    // Floating Drift: Words slowly rise and drift horizontally over their lifetime
    const breezeAmt = engine.pLayer(layerId, 'textEnvironmentDrift');
    const breezeX = Math.sin(time / 2000) * 50 * breezeAmt;
    const breezeY = Math.cos(time / 3000) * 20 * breezeAmt;
    
    const driftX = (elapsed / 1000) * engine.pLayer(layerId, 'textJitterX') + breezeX;
    const driftY = (elapsed / 1000) * engine.pLayer(layerId, 'textJitterY') + breezeY;
    
    ctx.translate(window.innerWidth / 2 + driftX, window.innerHeight / 2 + driftY);
    ctx.rotate(engine.pLayer(layerId, 'textRotation'));

    const fontSizeScale = engine.pLayer(layerId, 'textScale');
    const font = layer.settings.textFontFamily || 'Inter';
    ctx.font = `bold ${window.innerWidth * 0.08 * fontSizeScale}px ${font}, serif`; 

    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.filter = `blur(${engine.pLayer(layerId, 'textBlur')}px)`;
    const cA = preset.settings.palette[0], cB = engine.target ? engine.target.settings.palette[0] : cA;
    const finalColor = ColorUtils.lerpColor(cA, cB, sessionProgress);
    ctx.fillStyle = finalColor;
    
    // TEXT GLOW (Emotional Aura)
    const glow = engine.pLayer(layerId, 'textGlow');
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
