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
    if (!engine.lyricStates[layerId]) engine.lyricStates[layerId] = { lyricIdx: 0, lyricLastSwap: 0 };
    const state = engine.lyricStates[layerId];

    // Check intro delay (wait before showing lyrics after selecting a preset)
    const delayParam = engine.pLayer(layerId, 'textStartDelay');
    const startDelay = (delayParam !== undefined && !isNaN(delayParam) ? delayParam : 30) * 1000;
    if (time < startDelay) {
        state.lyricLastSwap = startDelay;
        return; // Wait during intro period for visual ambiance to establish
    }

    // Check stop time (stop showing lyrics after specified seconds, default 240s = 4 mins)
    const stopParam = engine.pLayer(layerId, 'textStopDelay');
    const stopTime = (stopParam !== undefined && !isNaN(stopParam) ? stopParam : 240) * 1000;
    if (time >= stopTime) {
        return;
    }

    const hold = engine.pLayer(layerId, 'textHoldTime') * 1000, fade = engine.pLayer(layerId, 'textFadeTime') * 1000;
    const pauseParam = engine.pLayer(layerId, 'textPauseTime');
    const pause = (pauseParam !== undefined && !isNaN(pauseParam) ? pauseParam : 15) * 1000;
    
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

        const rawTimed = activeLyric.text;
        fullText = (layer.settings.textUppercase === true) ? rawTimed.toUpperCase() : rawTimed;
    } else {
        const validTexts = layer.settings.textList.filter(t => t.trim().length > 0);
        if (validTexts.length === 0) return;

        if (time < state.lyricLastSwap) {
            state.lyricLastSwap = time; // Reset if physics time was synced/reset
        }

        if (!layer.settings.textManualMode && (time - state.lyricLastSwap > hold + fade + pause)) {
            state.lyricLastSwap = time;
            if (layer.settings.textSequenceMode === 'random') state.lyricIdx = Math.floor(Math.random() * validTexts.length);
            else state.lyricIdx = (state.lyricIdx + 1) % validTexts.length;
        }

        // Safety check if validTexts shrank during a preset switch
        if (state.lyricIdx >= validTexts.length || state.lyricIdx < 0) {
            state.lyricIdx = 0;
        }

        const rawText = validTexts[state.lyricIdx];
        fullText = (layer.settings.textUppercase === true) ? rawText.toUpperCase() : rawText;
    }

    const elapsed = time - state.lyricLastSwap;
    const typeSpeed = engine.pLayer(layerId, 'textTypeSpeed');
    const isFrozen = !layer.settings.timedLyricsEnabled && layer.settings.textFreeze && 
        (layer.settings.timedLyricsEnabled ? false : layer.settings.textList.filter(t => t.trim().length > 0).length === 1);
    
    const isFadeMode = (layer.settings.textDissolveStyle === 'fade') || (typeSpeed <= 0);
    const charsToShow = (isFrozen || isFadeMode) ? fullText.length : Math.floor(elapsed / typeSpeed);
    const displayText = fullText.substring(0, charsToShow);
    const isDone = charsToShow >= fullText.length;
    
    // Add a blinking cursor if actively typing (not in simple fade mode, not in ink mode)
    const cursor = (!isFadeMode && layer.settings.textDissolveStyle !== 'ink' && !isDone && Math.floor(time / 300) % 2 === 0) ? "|" : "";

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
                else if (elapsed > hold) opacity *= Math.max(0, 1 - (elapsed - hold) / fade);
            }
        }
    }

    // INK RESOLVE: Non-linear opacity mask for organic soaking effect
    const isInk = layer.settings.textDissolveStyle === 'ink';
    if (isInk && elapsed < currentFade * 2) {
        const resolve = engine.pLayer(layerId, 'textInkResolve');
        opacity = Math.pow(opacity, 1.0 / (0.1 + resolve * 2.0));
    }

    if (displayText.trim().length === 0 || opacity <= 0.001) return;

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
    const font = layer.settings.textFontFamily || 'Lora';

    // Cached auto-fit font size calculation to avoid measureText overhead on every frame
    if (!state.cachedSize || state.cachedSize.text !== displayText || state.cachedSize.width !== window.innerWidth) {
        ctx.font = `bold ${baseFontSize}px ${font}, serif`;
        const lines = displayText.split('\n');
        let maxLineWidth = 0;
        lines.forEach(lineText => {
            const metrics = ctx.measureText(lineText);
            if (metrics.width > maxLineWidth) maxLineWidth = metrics.width;
        });
        const maxAllowedWidth = window.innerWidth * 0.85;
        let finalFontSize = baseFontSize;
        if (maxLineWidth > maxAllowedWidth) {
            finalFontSize = baseFontSize * (maxAllowedWidth / maxLineWidth);
        }
        state.cachedSize = { text: displayText, width: window.innerWidth, fontSize: finalFontSize, lines: lines };
    }

    const { fontSize, lines } = state.cachedSize;
    ctx.font = `bold ${fontSize}px ${font}, serif`;
    ctx.textAlign = 'center'; 
    ctx.textBaseline = 'middle';

    const blurAmt = engine.pLayer(layerId, 'textBlur');
    if (blurAmt > 0.5) ctx.filter = `blur(${blurAmt}px)`;

    let cA, cB;
    if (layer.settings && layer.settings.useLayerColor && layer.settings.layerColor) {
        cA = layer.settings.layerColor;
        cB = (engine.target && engine.target.layers) ? (engine.target.layers.find(l => l.id === layerId)?.settings?.layerColor || cA) : cA;
    } else {
        const palA = preset.settings.palette;
        const palB = engine.target ? engine.target.settings.palette : palA;
        cA = palA[5] || palA[palA.length - 1] || '#ffffff';
        cB = palB[5] || palB[palB.length - 1] || '#ffffff';
    }
    const finalColor = ColorUtils.lerpColor(cA, cB, sessionProgress);
    ctx.fillStyle = finalColor;
    
    // Performance: Only activate expensive Canvas shadow blur if explicitly requested
    const glow = engine.pLayer(layerId, 'textGlow');
    const hasGlow = glow > 1.0;
    
    const lineHeight = fontSize * 1.2;
    const totalHeight = lineHeight * (lines.length - 1);
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.04));
    ctx.lineJoin = 'round';

    lines.forEach((lineText, idx) => {
        const yOffset = -totalHeight / 2 + idx * lineHeight;
        const fullLine = lineText + ((idx === lines.length - 1) ? cursor : "");
        
        // Stroke outline runs first without shadow for crisp, high-speed drawing
        ctx.strokeText(fullLine, 0, yOffset);

        // Fill text with aura only if glow > 0
        if (hasGlow) {
            ctx.shadowColor = finalColor;
            ctx.shadowBlur = Math.min(20, glow);
        }
        ctx.fillText(fullLine, 0, yOffset);
        if (hasGlow) ctx.shadowBlur = 0;
    });
    
    if (blurAmt > 0.5) ctx.filter = 'none';
    ctx.restore();
}
