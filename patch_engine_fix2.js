const fs = require('fs');
let content = fs.readFileSync('visualizer/js/engine.js', 'utf8');

content = content.replace(/        return valA \+ \(valB - valA\) \* progress;\n    }\n\n    switchTo/,
"    switchTo");

fs.writeFileSync('visualizer/js/engine.js', content, 'utf8');
