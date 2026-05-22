const fs = require('fs');
let content = fs.readFileSync('visualizer/js/waves.js', 'utf8');

// Change signature
content = content.replace(/function renderWaves\(engine, ctx, time\) \{/, "function renderWaves(engine, ctx, time, layerId) {");

// Change engine.p(...) to engine.pLayer(layerId, ...)
content = content.replace(/engine\.p\('waveCount'\)/, "engine.pLayer(layerId, 'waveCount')");
content = content.replace(/engine\.p\('waveSpeed'\)/, "engine.pLayer(layerId, 'waveSpeed')");
content = content.replace(/engine\.p\('waveThickness'\)/, "engine.pLayer(layerId, 'waveThickness')");
content = content.replace(/engine\.p\('waveChaos'\)/, "engine.pLayer(layerId, 'waveChaos')");
content = content.replace(/engine\.p\('waveOpacity'\)/, "engine.pLayer(layerId, 'waveOpacity')");

// Handle engine.wavePhases[layerId] correctly
content = content.replace(/engine\.wavePhases\.length/g, "(engine.wavePhases[layerId] || []).length");
content = content.replace(/engine\.wavePhases\.push/g, "(engine.wavePhases[layerId] = engine.wavePhases[layerId] || []).push");
content = content.replace(/engine\.wavePhases\[i\]/g, "engine.wavePhases[layerId][i]");

fs.writeFileSync('visualizer/js/waves.js', content, 'utf8');
