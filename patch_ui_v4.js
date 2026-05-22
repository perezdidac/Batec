const fs = require('fs');
let content = fs.readFileSync('visualizer/js/ui.js', 'utf8');

// Replace layer title with input and add collapse icon
const layerHeaderReplacement = `                const title = document.createElement('input');
                title.type = 'text';
                title.className = 'text-input-minimal';
                title.value = layer.name || (layer.type.toUpperCase() + ' LAYER');
                title.style.margin = '0';
                title.style.width = '120px';
                title.style.fontWeight = 'bold';
                title.style.color = 'var(--accent-glow)';
                title.style.border = 'none';
                title.style.background = 'transparent';
                title.oninput = (e) => { layer.name = e.target.value; };
                title.onclick = (e) => { e.stopPropagation(); }; // Prevent collapse when clicking input

                titleWrap.appendChild(enableChk);
                titleWrap.appendChild(title);

                const rightGroup = document.createElement('div');
                rightGroup.style.display = 'flex';
                rightGroup.style.alignItems = 'center';
                rightGroup.style.gap = '8px';

                const collapseIcon = document.createElement('span');
                collapseIcon.className = 'collapse-icon';
                collapseIcon.textContent = '▼';
                collapseIcon.style.cursor = 'pointer';

                const btnDel = document.createElement('button');
                btnDel.className = 'icon-btn-minimal danger';
                btnDel.innerHTML = '&times;';
                btnDel.title = 'Remove Layer';
                btnDel.onclick = (e) => {
                    e.stopPropagation();
                    activePreset.layers = activePreset.layers.filter(l => l.id !== layer.id);
                    // Cleanup params
                    Object.keys(activePreset.params).forEach(k => {
                        if (k.endsWith('_' + layer.id)) delete activePreset.params[k];
                    });
                    this.rebuildConfigUI();
                };

                rightGroup.appendChild(btnDel);
                rightGroup.appendChild(collapseIcon);

                header.appendChild(titleWrap);
                header.appendChild(rightGroup);
                header.style.cursor = 'pointer';
                layerDiv.appendChild(header);`;

content = content.replace(/                const title = document\.createElement\('h5'\);[\s\S]*?layerDiv\.appendChild\(header\);/, layerHeaderReplacement);

// Add collapse logic to contentDiv
const collapseLogicReplacement = `
                const contentWrapper = document.createElement('div');
                contentWrapper.className = 'section-content'; // Reuse existing class for animation
                contentWrapper.id = 'layer-wrapper-' + layer.id;

                header.onclick = (e) => {
                    if(e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
                    const isCollapsed = contentWrapper.classList.toggle('collapsed');
                    collapseIcon.classList.toggle('collapsed', isCollapsed);
                    layer.isCollapsed = isCollapsed; // Save state so it persists on rebuild
                };

                // Add special UI controls for specific layer types`;

content = content.replace(/                \/\/ Add special UI controls for specific layer types/, collapseLogicReplacement);

// We need to route the controls Div and contentDiv into the new wrapper
content = content.replace(/layerDiv\.appendChild\(controlsDiv\);/g, "contentWrapper.appendChild(controlsDiv);");
content = content.replace(/                const contentDiv = document\.createElement\('div'\);\n                contentDiv\.id = 'layer-content-' \+ layer\.id;\n                contentDiv\.className = 'control-grid';\n                layerDiv\.appendChild\(contentDiv\);/,
    `                const contentDiv = document.createElement('div');
                contentDiv.id = 'layer-content-' + layer.id;
                contentDiv.className = 'control-grid';
                contentWrapper.appendChild(contentDiv);
                layerDiv.appendChild(contentWrapper);

                // Restore collapse state
                if (layer.isCollapsed) {
                    contentWrapper.classList.add('collapsed');
                    collapseIcon.classList.add('collapsed');
                }
`);

fs.writeFileSync('visualizer/js/ui.js', content, 'utf8');
