const fs = require('fs');
let content = fs.readFileSync('visualizer/js/ui.js', 'utf8');

content = content.replace(/delete obj\.cat; delete obj\.name; delete obj\.desc;/g, "delete obj.cat; /* name is kept for layers but global can be deleted. We keep it just in case */ delete obj.desc;");

fs.writeFileSync('visualizer/js/ui.js', content, 'utf8');
