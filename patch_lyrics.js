const fs = require('fs');
let content = fs.readFileSync('visualizer/js/lyrics.js', 'utf8');

content = content.replace(/function renderLyrics\(engine, ctx, time, sessionProgress\) \{/, "function renderLyrics(engine, ctx, time, sessionProgress, layerId) {");

content = content.replace(/const preset = engine\.active;\n    if \(\!preset\.settings\.textEnabled\) return;/,
`    const preset = engine.active;
    const layer = preset.layers.find(l => l.id === layerId);
    if (!layer || !layer.enabled) return;

    if (!engine.lyricStates) engine.lyricStates = {};
    if (!engine.lyricStates[layerId]) engine.lyricStates[layerId] = { lyricIdx: 0, lyricLastSwap: 0 };
    const state = engine.lyricStates[layerId];
`);

// Replace global settings lookups with layer settings lookups
content = content.replace(/preset\.settings\.textList/g, "layer.settings.textList");
content = content.replace(/preset\.settings\.textSequenceMode/g, "layer.settings.textSequenceMode");
content = content.replace(/preset\.settings\.textFreeze/g, "layer.settings.textFreeze");
content = content.replace(/preset\.settings\.textDissolveStyle/g, "layer.settings.textDissolveStyle");
content = content.replace(/preset\.settings\.textFontFamily/g, "layer.settings.textFontFamily");

// Update lyric state variables
content = content.replace(/engine\.lyricLastSwap/g, "state.lyricLastSwap");
content = content.replace(/engine\.lyricIdx/g, "state.lyricIdx");

// Update engine.p(...) to engine.pLayer(layerId, ...)
const params = [
    'textHoldTime', 'textFadeTime', 'textTypeSpeed', 'textOpacity',
    'textInkResolve', 'textEnvironmentDrift', 'textJitterX', 'textJitterY',
    'textRotation', 'textScale', 'textBlur', 'textGlow'
];

params.forEach(param => {
    content = content.split("engine.p('" + param + "')").join("engine.pLayer(layerId, '" + param + "')");
});

fs.writeFileSync('visualizer/js/lyrics.js', content, 'utf8');
