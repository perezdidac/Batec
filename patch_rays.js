const fs = require('fs');
let content = fs.readFileSync('visualizer/js/rays.js', 'utf8');

content = content.replace(/function renderRays\(engine, ctx, time\) \{/, "function renderRays(engine, ctx, time, layerId) {");

content = content.replace(/engine\.p\('rayCount'\)/g, "engine.pLayer(layerId, 'rayCount')");
content = content.replace(/engine\.p\('rayThickness'\)/g, "engine.pLayer(layerId, 'rayThickness')");
content = content.replace(/engine\.p\('raySpeed'\)/g, "engine.pLayer(layerId, 'raySpeed')");
content = content.replace(/engine\.p\('rayChaos'\)/g, "engine.pLayer(layerId, 'rayChaos')");
content = content.replace(/engine\.p\('rayCenterHole'\)/g, "engine.pLayer(layerId, 'rayCenterHole')");
content = content.replace(/engine\.p\('rayOpacity'\)/g, "engine.pLayer(layerId, 'rayOpacity')");

fs.writeFileSync('visualizer/js/rays.js', content, 'utf8');
