function parseLyricsText(text) {
    if (!text) return [];
    
    // Normalize newlines
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const lyrics = [];

    // Check if it looks like SRT format
    const isSrt = text.includes('-->');

    if (isSrt) {
        // Split by double newline to handle blocks cleanly
        const blocks = normalized.split(/\n\s*\n/);
        for (const block of blocks) {
            const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length < 2) continue;

            // Find the line containing the time range (e.g. 00:00:01,000 --> 00:00:04,000)
            let timeRangeIndex = -1;
            for (let idx = 0; idx < lines.length; idx++) {
                if (lines[idx].includes('-->')) {
                    timeRangeIndex = idx;
                    break;
                }
            }

            if (timeRangeIndex === -1) continue;

            const timeLine = lines[timeRangeIndex];
            const match = timeLine.match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})\s*-->\s*(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})/);
            if (match) {
                const startMs = 
                    parseInt(match[1]) * 3600000 +
                    parseInt(match[2]) * 60000 +
                    parseInt(match[3]) * 1000 +
                    parseInt(match[4]);
                const endMs = 
                    parseInt(match[5]) * 3600000 +
                    parseInt(match[6]) * 60000 +
                    parseInt(match[7]) * 1000 +
                    parseInt(match[8]);
                
                // Subtitle text is all lines after the time range line
                const textLines = lines.slice(timeRangeIndex + 1);
                lyrics.push({
                    time: startMs,
                    endTime: endMs,
                    text: textLines.join('\n')
                });
            }
        }
    } else {
        // LRC / Timestamp Parser (Fallback)
        const lines = normalized.split('\n');
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            const timestampRegex = /\[(\d+):(\d+(?:\.\d+)?)\]/g;
            let match;
            const timestamps = [];
            let lastIndex = 0;

            while ((match = timestampRegex.exec(line)) !== null) {
                const mins = parseInt(match[1]);
                const secs = parseFloat(match[2]);
                const timeMs = (mins * 60 + secs) * 1000;
                timestamps.push(timeMs);
                lastIndex = timestampRegex.lastIndex;
            }

            if (timestamps.length > 0) {
                const restText = line.substring(lastIndex).trim();
                for (const t of timestamps) {
                    lyrics.push({
                        time: t,
                        endTime: null,
                        text: restText
                    });
                }
            } else {
                // Fallback: mm:ss.xx: Text or ss.xx: Text
                const simpleTimeColonMatch = line.match(/^(\d+):(\d+(?:\.\d+)?)\s*[:-\s]\s*(.*)$/);
                if (simpleTimeColonMatch) {
                    const mins = parseInt(simpleTimeColonMatch[1]);
                    const secs = parseFloat(simpleTimeColonMatch[2]);
                    const restText = simpleTimeColonMatch[3].trim();
                    lyrics.push({
                        time: (mins * 60 + secs) * 1000,
                        endTime: null,
                        text: restText
                    });
                } else {
                    const simpleTimeMatch = line.match(/^(\d+(?:\.\d+)?)\s*[:-\s]\s*(.*)$/);
                    if (simpleTimeMatch) {
                        const secs = parseFloat(simpleTimeMatch[1]);
                        const restText = simpleTimeMatch[2].trim();
                        lyrics.push({
                            time: secs * 1000,
                            endTime: null,
                            text: restText
                        });
                    }
                }
            }
        }
    }

    lyrics.sort((a, b) => a.time - b.time);
    return lyrics;
}

function renderLyrics(engine, ctx, time, sessionProgress, layerId) {
    const preset = engine.active;
    const layer = preset.layers.find(l => l.id === layerId);
    if (!layer || !layer.enabled) return;

    if (!engine.lyricStates) engine.lyricStates = {};
    if (!engine.lyricStates[layerId]) engine.lyricStates[layerId] = { lyricIdx: -1, lyricLastSwap: 0 };
    const state = engine.lyricStates[layerId];

    const hold = engine.pLayer(layerId, 'textHoldTime') * 1000, fade = engine.pLayer(layerId, 'textFadeTime') * 1000;
    
    let fullText = "";
    let activeLyric = null;
    let lyricDuration = Infinity;
    let currentFade = Math.max(1, fade);
    let currentHold = hold;

    if (layer.settings.timedLyricsEnabled) {
        if (!layer.parsedLyrics) {
            layer.parsedLyrics = parseLyricsText(layer.settings.timedLyricsText || "");
        }
        const lyricsList = layer.parsedLyrics;
        if (lyricsList.length === 0) return;

        let activeIdx = -1;
        for (let i = 0; i < lyricsList.length; i++) {
            if (lyricsList[i].time <= time) {
                activeIdx = i;
            } else {
                break;
            }
        }

        if (activeIdx === -1) {
            if (state.lyricIdx !== -1) {
                state.lyricIdx = -1;
                state.lyricLastSwap = time;
            }
            return;
        }

        if (state.lyricIdx !== activeIdx) {
            state.lyricIdx = activeIdx;
            state.lyricLastSwap = lyricsList[activeIdx].time;
        }

        activeLyric = lyricsList[activeIdx];
        const nextLyric = lyricsList[activeIdx + 1];
        lyricDuration = activeLyric.endTime ? (activeLyric.endTime - activeLyric.time) : (nextLyric ? nextLyric.time - activeLyric.time : Infinity);
        
        if (lyricDuration !== Infinity) {
            if (lyricDuration < currentFade * 2) {
                currentFade = Math.max(1, lyricDuration / 2);
                currentHold = 0;
            } else if (lyricDuration < currentHold + currentFade) {
                currentHold = lyricDuration - currentFade;
            }
        }

        fullText = activeLyric.text.toUpperCase();
    } else {
        const validTexts = layer.settings.textList.filter(t => t.trim().length > 0);
        if (validTexts.length === 0) return;

        if (time < state.lyricLastSwap) {
            state.lyricLastSwap = time; // Reset if physics time was synced/reset
        }

        if (!layer.settings.textManualMode && (time - state.lyricLastSwap > hold + fade)) {
            state.lyricLastSwap = time;
            if (layer.settings.textSequenceMode === 'random') state.lyricIdx = Math.floor(Math.random() * validTexts.length);
            else state.lyricIdx = (state.lyricIdx + 1) % validTexts.length;
        }

        // Safety check if validTexts shrank during a preset switch
        if (state.lyricIdx >= validTexts.length || state.lyricIdx < 0) {
            state.lyricIdx = 0;
        }

        fullText = validTexts[state.lyricIdx].toUpperCase();
    }

    const elapsed = time - state.lyricLastSwap;
    const typeSpeed = engine.pLayer(layerId, 'textTypeSpeed');
    const isFrozen = !layer.settings.timedLyricsEnabled && layer.settings.textFreeze && 
        (layer.settings.timedLyricsEnabled ? false : layer.settings.textList.filter(t => t.trim().length > 0).length === 1);
    
    const charsToShow = (isFrozen || typeSpeed <= 0) ? fullText.length : Math.floor(elapsed / typeSpeed);
    const displayText = fullText.substring(0, charsToShow);
    const isDone = charsToShow >= fullText.length;
    
    // Add a blinking cursor if still typing and not ink mode
    const cursor = (layer.settings.textDissolveStyle !== 'ink' && !isDone && Math.floor(time / 300) % 2 === 0) ? "|" : "";

    let opacity = engine.pLayer(layerId, 'textOpacity');
    if (!isFrozen) {
        if (layer.settings.timedLyricsEnabled) {
            if (elapsed < currentFade) {
                opacity *= (elapsed / currentFade);
            } else if (lyricDuration !== Infinity && elapsed > lyricDuration - currentFade) {
                const fadeOutProgress = (elapsed - (lyricDuration - currentFade)) / currentFade;
                opacity *= Math.max(0, 1 - fadeOutProgress);
            } else if (elapsed > currentHold) {
                opacity *= Math.max(0, 1 - (elapsed - currentHold) / currentFade);
            }
        } else {
            if (layer.settings.textManualMode) {
                if (elapsed < fade) opacity *= (elapsed / fade);
            } else {
                if (elapsed < fade) opacity *= (elapsed / fade);
                else if (elapsed > hold) opacity *= (1 - (elapsed - hold) / fade);
            }
        }
    }

    // INK RESOLVE: Non-linear opacity mask for organic soaking effect
    const isInk = layer.settings.textDissolveStyle === 'ink';
    if (isInk && elapsed < currentFade * 2) {
        const resolve = engine.pLayer(layerId, 'textInkResolve');
        opacity = Math.pow(opacity, 1.0 / (0.1 + resolve * 2.0));
    }

    if (displayText.trim().length === 0) return;

    ctx.save(); ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
    
    // Floating Drift & Jitter: Wobble around center without drifting off-screen
    const breezeAmt = engine.pLayer(layerId, 'textEnvironmentDrift');
    const breezeX = Math.sin(time / 2000) * 30 * breezeAmt;
    const breezeY = Math.cos(time / 3000) * 15 * breezeAmt;
    
    const jitterX = engine.pLayer(layerId, 'textJitterX');
    const jitterY = engine.pLayer(layerId, 'textJitterY');
    
    ctx.translate(window.innerWidth / 2 + jitterX + breezeX, window.innerHeight / 2 + jitterY + breezeY);
    ctx.rotate(engine.pLayer(layerId, 'textRotation'));

    const baseFontSize = window.innerWidth * 0.08 * engine.pLayer(layerId, 'textScale');
    const font = layer.settings.textFontFamily || 'Inter';
    ctx.font = `bold ${baseFontSize}px ${font}, serif`;

    // Auto-fit calculation to prevent horizontal overflow/clipping
    const lines = displayText.split('\n');
    let maxLineWidth = 0;
    lines.forEach(lineText => {
        const metrics = ctx.measureText(lineText);
        if (metrics.width > maxLineWidth) {
            maxLineWidth = metrics.width;
        }
    });

    const maxAllowedWidth = window.innerWidth * 0.85; // 85% of screen width
    let finalFontSize = baseFontSize;
    if (maxLineWidth > maxAllowedWidth) {
        finalFontSize = baseFontSize * (maxAllowedWidth / maxLineWidth);
        ctx.font = `bold ${finalFontSize}px ${font}, serif`;
    }

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
    
    const fontSize = finalFontSize;
    const lineHeight = fontSize * 1.2;
    const totalHeight = lineHeight * (lines.length - 1);
    
    lines.forEach((lineText, idx) => {
        const yOffset = -totalHeight / 2 + idx * lineHeight;
        const lineCursor = (idx === lines.length - 1) ? cursor : "";
        ctx.fillText(lineText + lineCursor, 0, yOffset);
    });
    
    if (glow > 0) ctx.shadowBlur = 0; // Reset for performance
    ctx.restore();
}
