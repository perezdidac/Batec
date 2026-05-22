const fs = require('fs');
let content = fs.readFileSync('visualizer/js/particles.js', 'utf8');

content = content.replace(/constructor\(engine\) \{ this\.engine = engine; this\.reset\(\); \}/, "constructor(engine, layerId) { this.engine = engine; this.layerId = layerId; this.reset(); }");

const replacements = [
    'particleDirection', 'particleGravity', 'particleChaos', 'particleWind',
    'particleBreezeStrength', 'particleSpeed', 'particleColorSpeed',
    'particleSize', 'particleRotation', 'particleOpacity'
];

replacements.forEach(param => {
    content = content.split("eng.p('" + param + "', ctxP)").join("eng.pLayer(this.layerId, '" + param + "', ctxP)");
    content = content.split("eng.p('" + param + "')").join("eng.pLayer(this.layerId, '" + param + "')");
});

content = content.replace(/eng\.active\.settings\.particleShape/g, "(eng.active.layers.find(l => l.id === this.layerId)?.settings.particleShape || 'mote')");

fs.writeFileSync('visualizer/js/particles.js', content, 'utf8');
