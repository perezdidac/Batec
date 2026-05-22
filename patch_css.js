const fs = require('fs');
let content = fs.readFileSync('visualizer/style.css', 'utf8');

content = content.replace(/#controlsContainer \{[\s\S]*?\}/,
`#controlsContainer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  pointer-events: none;
}`);

// Allow children of controlsContainer to have pointer events
content += "\n#controlsContainer > * { pointer-events: auto; max-width: 400px; }";

fs.writeFileSync('visualizer/style.css', content, 'utf8');
