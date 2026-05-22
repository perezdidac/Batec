const fs = require('fs');
let content = fs.readFileSync('visualizer/js/ui.js', 'utf8');

// Remove the old bindPhotoSourceToggle completely
content = content.replace(/    bindPhotoSourceToggle\(\) \{[\s\S]*?        updateView\(\);\n    \},/, "");

fs.writeFileSync('visualizer/js/ui.js', content, 'utf8');
