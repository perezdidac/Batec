const fs = require('fs');
let content = fs.readFileSync('visualizer/js/engine.js', 'utf8');

content = content.replace(/        if \(progress >= 1\) \{\n            this\.session\.activeIndex = this\.session\.targetIndex;\n            this\.session\.targetIndex = null;\n            return valB;\n        }\n\n    evalPLayer/,
"        if (progress >= 1) {\n            this.session.activeIndex = this.session.targetIndex;\n            this.session.targetIndex = null;\n            return valB;\n        }\n        return valA + (valB - valA) * progress;\n    }\n\n    evalPLayer");

fs.writeFileSync('visualizer/js/engine.js', content, 'utf8');
