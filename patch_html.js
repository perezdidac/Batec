const fs = require('fs');
let content = fs.readFileSync('visualizer/index.html', 'utf8');

// Insert Opacity slider
content = content.replace(/<button id="btnHelp" class="help-btn" title="Engine Documentation">\?<\/button>\n                <\/div>\n            <\/div>/,
`<button id="btnHelp" class="help-btn" title="Engine Documentation">?</button>
                </div>
            </div>

            <div class="control-group" style="margin-bottom: 12px; padding: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="param-label" style="font-size:0.75rem;">UI Opacity</span>
                    <span id="uiOpacityVal" style="font-size:0.7rem; font-family:monospace; color:var(--text-secondary);">0.90</span>
                </div>
                <input type="range" id="uiOpacity" min="0" max="1" step="0.05" value="0.9" style="width:100%; margin-top:6px;">
            </div>`);

// Replace Layer Panels in advanced config with Layers Container
const advancedPanelContentRegex = /<div class="config-section" data-cat="physics">[\s\S]*?<div class="config-section" data-cat="webgl">/;

const layersContainerReplacement = `<div class="config-section" data-cat="physics">
                    <h4>Core Physics & Reality</h4>
                    <div id="panel-physics" class="control-grid"></div>
                </div>

                <div class="config-section" style="border:1px solid rgba(255,191,0,0.3); padding:12px; border-radius:8px; margin-top:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <h4 style="margin:0; border:none; padding:0; color:var(--accent-glow);">Active Effect Layers</h4>
                        <div style="display:flex; gap:8px;">
                            <select id="selAddLayer" style="padding:4px; font-size:0.7rem;">
                                <option value="photos">Photos / Media</option>
                                <option value="waves">Rings / Waves</option>
                                <option value="rays">Laser Rays</option>
                                <option value="particles">Particles</option>
                                <option value="text">Text / Lyrics</option>
                            </select>
                            <button id="btnAddLayer" class="primary-btn" style="padding:4px 12px; width:auto; font-size:0.7rem;">ADD +</button>
                        </div>
                    </div>

                    <div id="layersContainer" style="display:flex; flex-direction:column; gap:16px;">
                        <!-- Dynamic Layers Injected Here -->
                    </div>
                </div>

                <!-- WebGL Cyberpunk Layer -->
                <div class="config-section" data-cat="webgl">`;

content = content.replace(advancedPanelContentRegex, layersContainerReplacement);

fs.writeFileSync('visualizer/index.html', content, 'utf8');
