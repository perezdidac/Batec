const fs = require('fs');
let content = fs.readFileSync('visualizer/js/ui.js', 'utf8');

const dmxClickLogic = `
        const dmxHeader = this.safeGet('dmxHeader');
        if (dmxHeader) {
            dmxHeader.onclick = (e) => {
                if(e.target.tagName === 'BUTTON') return;
                const dmxContent = this.safeGet('dmxContent');
                const dmxIcon = this.safeGet('dmxCollapseIcon');
                if (dmxContent) {
                    const isCollapsed = dmxContent.classList.toggle('collapsed');
                    if (dmxIcon) dmxIcon.classList.toggle('collapsed', isCollapsed);
                }
            };
        }
`;

content = content.replace(/this\.safeGet\('btnHelp'\)\.onclick = \(\) => this\.safeGet\('helpModal'\)\.classList\.toggle\('hidden'\);/, dmxClickLogic + "\n        this.safeGet('btnHelp').onclick = () => this.safeGet('helpModal').classList.toggle('hidden');");

fs.writeFileSync('visualizer/js/ui.js', content, 'utf8');
