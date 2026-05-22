const fs = require('fs');
let content = fs.readFileSync('visualizer/index.html', 'utf8');

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

                    <div id="layersContainer" style="display:flex; flex-wrap:wrap; gap:16px;">
                        <!-- Dynamic Layers Injected Here -->
                    </div>
                </div>

                <!-- WebGL Cyberpunk Layer -->
                <div class="config-section" data-cat="webgl">`;

content = content.replace(advancedPanelContentRegex, layersContainerReplacement);

fs.writeFileSync('visualizer/index.html', content, 'utf8');
