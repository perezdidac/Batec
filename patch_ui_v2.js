const fs = require('fs');
let content = fs.readFileSync('visualizer/js/ui.js', 'utf8');

// Replace opacity logic
const opacitySliderBinding = `
        const uiOpacity = this.safeGet('uiOpacity');
        if (uiOpacity) {
            uiOpacity.oninput = (ev) => {
                const val = ev.target.value;
                document.getElementById('uiOpacityVal').textContent = parseFloat(val).toFixed(2);
                document.documentElement.style.setProperty('--panel-bg', \`rgba(10, 10, 10, \${val * 0.45})\`);
                // Force panels to update their background opacity
                document.querySelectorAll('.glass-panel').forEach(p => {
                    p.style.backgroundColor = \`rgba(10, 10, 10, \${val})\`;
                    p.style.backdropFilter = \`blur(\${val * 28}px)\`;
                });
            };
        }
`;
content = content.replace(/this\.safeGet\('btnStart'\)\.onclick = \(\) => \{/, opacitySliderBinding + "\n        this.safeGet('btnStart').onclick = () => {");

// Add addLayerLogic
const addLayerLogic = `
        const btnAddLayer = this.safeGet('btnAddLayer');
        const selAddLayer = this.safeGet('selAddLayer');
        if (btnAddLayer && selAddLayer) {
            btnAddLayer.onclick = () => {
                const type = selAddLayer.value;
                const layerId = Math.random().toString(36).substr(2, 9);
                const newParams = getLayerParams(type, layerId);

                // Merge params into preset
                Object.assign(active.params, newParams);

                // Create layer settings
                const settings = {};
                if (type === 'photos') {
                    settings.photoSourceMode = 'photos';
                    settings.imgIndices = [];
                    settings.webcamIndices = [];
                    settings.imgBlendMode = 'screen';
                } else if (type === 'particles') {
                    settings.particleShape = 'mote';
                } else if (type === 'text') {
                    settings.textList = ["NEW TEXT", "", "", "", ""];
                    settings.textSequenceMode = 'order';
                    settings.textFontFamily = 'Lora';
                    settings.textDissolveStyle = 'ink';
                    settings.textFreeze = false;
                }

                active.layers.push({ id: layerId, type: type, enabled: true, settings: settings });
                this.rebuildConfigUI();
            };
        }
`;
content = content.replace(/this\.safeGet\('btnDeletePreset'\)\.onclick = \(\) => \{[^}]+\};\n        this\.safeGet\('activePresetName'\)\.oninput = \(ev\) => \{ active\.name = ev\.target\.value; this\.buildSlots\(\); \};/,
match => match + "\n\n" + addLayerLogic);

// Dynamic layer panels with controls
const rebuildConfigUIReplacement = `
    rebuildConfigUI() {
        const activePreset = this.engine.target || this.engine.active;
        ['panel-physics', 'panel-webgl', 'panel-gpu_fx', 'panel-analog'].forEach(id => {
            const el = this.safeGet(id); if (el) el.innerHTML = '';
            const cat = id.replace('panel-', '');
            const chk = this.safeGet(\`toggle_\${cat}\`) || this.safeGet(\`\${cat}Enabled\`);
            if (chk) chk.checked = activePreset.settings[cat + 'Enabled'] !== false;
        });

        const layersContainer = this.safeGet('layersContainer');
        if (layersContainer) layersContainer.innerHTML = '';

        const params = activePreset.params;
        const sortedKeys = Object.keys(params).sort((a, b) => {
            const pA = params[a], pB = params[b];
            const isOpaA = pA.name.toLowerCase().includes('weight') || a.toLowerCase().includes('opacity');
            const isOpaB = pB.name.toLowerCase().includes('weight') || b.toLowerCase().includes('opacity');
            if (isOpaA && !isOpaB) return -1;
            if (!isOpaA && isOpaB) return 1;
            return 0; // retain relative order otherwise
        });

        // Build layer containers first
        if (activePreset.layers && layersContainer) {
            activePreset.layers.forEach(layer => {
                const layerDiv = document.createElement('div');
                layerDiv.className = 'layer-panel';
                layerDiv.style.border = '1px solid rgba(255,255,255,0.1)';
                layerDiv.style.padding = '8px';
                layerDiv.style.borderRadius = '6px';
                layerDiv.style.marginBottom = '8px';
                layerDiv.style.background = 'rgba(0,0,0,0.2)';
                layerDiv.style.flex = '1 1 300px';
                layerDiv.style.minWidth = '300px';

                const header = document.createElement('div');
                header.style.display = 'flex';
                header.style.justifyContent = 'space-between';
                header.style.alignItems = 'center';
                header.style.marginBottom = '8px';
                header.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
                header.style.paddingBottom = '4px';

                const titleWrap = document.createElement('div');
                titleWrap.style.display = 'flex';
                titleWrap.style.alignItems = 'center';
                titleWrap.style.gap = '8px';

                const enableChk = document.createElement('input');
                enableChk.type = 'checkbox';
                enableChk.checked = layer.enabled;
                enableChk.onchange = (e) => { layer.enabled = e.target.checked; };

                const title = document.createElement('h5');
                title.textContent = layer.type.toUpperCase() + ' LAYER';
                title.style.margin = '0';
                title.style.color = 'var(--text-secondary)';

                titleWrap.appendChild(enableChk);
                titleWrap.appendChild(title);

                const btnDel = document.createElement('button');
                btnDel.className = 'icon-btn-minimal danger';
                btnDel.innerHTML = '&times;';
                btnDel.title = 'Remove Layer';
                btnDel.onclick = () => {
                    activePreset.layers = activePreset.layers.filter(l => l.id !== layer.id);
                    // Cleanup params
                    Object.keys(activePreset.params).forEach(k => {
                        if (k.endsWith('_' + layer.id)) delete activePreset.params[k];
                    });
                    this.rebuildConfigUI();
                };

                header.appendChild(titleWrap);
                header.appendChild(btnDel);
                layerDiv.appendChild(header);

                // Add special UI controls for specific layer types
                if (layer.type === 'photos') {
                    const controlsDiv = document.createElement('div');
                    controlsDiv.innerHTML = \`
                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Compositing Mode</label>
                        <select id="imgBlendMode_\${layer.id}">
                            <option value="screen">Screen (Lighten)</option>
                            <option value="exclusion">Exclusion (Artistic)</option>
                            <option value="lighter">Lighter</option>
                            <option value="overlay">Overlay</option>
                            <option value="hard-light">Hard Light</option>
                            <option value="color-dodge">Color Dodge</option>
                        </select>
                    </div>
                    <div class="control-group"
                        style="margin-bottom: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                        <label>Media Source</label>
                        <div style="display:flex; gap:16px; margin-top:4px;">
                            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="radio" name="photoSourceMode_\${layer.id}" value="photos" id="radioSourcePhotos_\${layer.id}"
                                    style="width:auto;"> Photos
                            </label>
                            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="radio" name="photoSourceMode_\${layer.id}" value="webcams" id="radioSourceWebcams_\${layer.id}"
                                    style="width:auto;"> Webcams
                            </label>
                        </div>
                    </div>
                    <div id="panel-image-select_\${layer.id}"
                        style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;"></div>
                    <div id="panel-webcam-select_\${layer.id}"
                        style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; display:none;">
                    </div>\`;
                    layerDiv.appendChild(controlsDiv);

                } else if (layer.type === 'particles') {
                    const controlsDiv = document.createElement('div');
                    controlsDiv.innerHTML = \`
                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Shape Architecture</label>
                        <select id="particleShape_\${layer.id}">
                            <option value="circle">Organic Circle</option>
                            <option value="square">Abstract Square</option>
                            <option value="triangle">Geometric Delta</option>
                            <option value="star">Celestial Star</option>
                            <option value="petal">Organic Petal</option>
                            <option value="leaf">Sharp Leaf</option>
                            <option value="pollen">Dust Pollen</option>
                            <option value="mote">Dust Mote</option>
                        </select>
                    </div>\`;
                    layerDiv.appendChild(controlsDiv);
                } else if (layer.type === 'text') {
                    const controlsDiv = document.createElement('div');
                    controlsDiv.innerHTML = \`
                    <div class="control-group" style="margin-bottom: 12px; display: flex; gap: 10px;">
                        <label style="flex:1; display:flex; justify-content:space-between; align-items:center;">
                            Freeze Sequence
                            <input type="checkbox" id="textFreeze_\${layer.id}" style="width:auto; margin:0;">
                        </label>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Text Sequences (Up to 5)</label>
                        <div class="lyric-inputs-grid">
                            <input type="text" id="text0_\${layer.id}" placeholder="Phrase 1" class="text-input-minimal">
                            <input type="text" id="text1_\${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                            <input type="text" id="text2_\${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                            <input type="text" id="text3_\${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                            <input type="text" id="text4_\${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                        </div>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Sequencing Logic</label>
                        <select id="textSequenceMode_\${layer.id}">
                            <option value="order">Sequential Loop</option>
                            <option value="random">Randomized Shuffle</option>
                        </select>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Typography Style</label>
                        <select id="textFontFamily_\${layer.id}">
                            <option value="'Lora', serif">Lora (Serif)</option>
                            <option value="'Inter', sans-serif">Inter (Modern)</option>
                            <option value="'Courier New', monospace">Typewriter</option>
                            <option value="'Homemade Apple', cursive">Handwritten</option>
                        </select>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Dissolve Animation</label>
                        <select id="textDissolveStyle_\${layer.id}">
                            <option value="fade">Classic Fade</option>
                            <option value="ink">Ink Resolve</option>
                        </select>
                    </div>\`;
                    layerDiv.appendChild(controlsDiv);
                }

                const contentDiv = document.createElement('div');
                contentDiv.id = 'layer-content-' + layer.id;
                contentDiv.className = 'control-grid';
                layerDiv.appendChild(contentDiv);

                layersContainer.appendChild(layerDiv);

                // Bind specific controls values
                if (layer.type === 'photos') {
                    const sel = this.safeGet(\`imgBlendMode_\${layer.id}\`);
                    if(sel) { sel.value = layer.settings.imgBlendMode || 'screen'; sel.onchange = e => layer.settings.imgBlendMode = e.target.value; }

                    const pRad = this.safeGet(\`radioSourcePhotos_\${layer.id}\`);
                    const wRad = this.safeGet(\`radioSourceWebcams_\${layer.id}\`);
                    if (pRad && wRad) {
                        pRad.checked = layer.settings.photoSourceMode !== 'webcams';
                        wRad.checked = layer.settings.photoSourceMode === 'webcams';
                        const changeFn = () => {
                            layer.settings.photoSourceMode = pRad.checked ? 'photos' : 'webcams';
                            this.buildImageSelectorsForLayer(layer);
                            this.buildWebcamSelectorsForLayer(layer);

                            const pSel = this.safeGet(\`panel-image-select_\${layer.id}\`);
                            const wSel = this.safeGet(\`panel-webcam-select_\${layer.id}\`);
                            if (pSel) pSel.style.display = pRad.checked ? 'block' : 'none';
                            if (wSel) wSel.style.display = wRad.checked ? 'block' : 'none';
                        }
                        pRad.onchange = changeFn;
                        wRad.onchange = changeFn;
                    }
                    this.buildImageSelectorsForLayer(layer);
                    this.buildWebcamSelectorsForLayer(layer);
                } else if (layer.type === 'particles') {
                    const sel = this.safeGet(\`particleShape_\${layer.id}\`);
                    if(sel) { sel.value = layer.settings.particleShape || 'mote'; sel.onchange = e => layer.settings.particleShape = e.target.value; }
                } else if (layer.type === 'text') {
                    const frz = this.safeGet(\`textFreeze_\${layer.id}\`);
                    if(frz) { frz.checked = layer.settings.textFreeze; frz.onchange = e => layer.settings.textFreeze = e.target.checked; }
                    [0, 1, 2, 3, 4].forEach(i => {
                        const el = this.safeGet(\`text\${i}_\${layer.id}\`);
                        if(el) { el.value = layer.settings.textList[i] || ""; el.oninput = e => layer.settings.textList[i] = e.target.value; }
                    });
                    const seq = this.safeGet(\`textSequenceMode_\${layer.id}\`);
                    if(seq) { seq.value = layer.settings.textSequenceMode || 'order'; seq.onchange = e => layer.settings.textSequenceMode = e.target.value; }
                    const fnt = this.safeGet(\`textFontFamily_\${layer.id}\`);
                    if(fnt) { fnt.value = layer.settings.textFontFamily || 'Lora'; fnt.onchange = e => layer.settings.textFontFamily = e.target.value; }
                    const dis = this.safeGet(\`textDissolveStyle_\${layer.id}\`);
                    if(dis) { dis.value = layer.settings.textDissolveStyle || 'ink'; dis.onchange = e => layer.settings.textDissolveStyle = e.target.value; }
                }
            });
        }

        sortedKeys.forEach(key => {
            const param = params[key];
            let container = this.safeGet(\`panel-\${param.cat}\`);

            // If the category belongs to a layer, find the layer container
            if (!container) {
                const parts = param.cat.split('_');
                if (parts.length > 1) {
                    const layerId = parts[1];
                    container = this.safeGet('layer-content-' + layerId);
                }
            }

            if (!container) return;
            const row = document.createElement('div');
            row.className = 'param-row';
            row.id = \`param-row-\${key}\`;
            if (this.engine.midi && this.engine.midi.selectedParam === key) row.classList.add('midi-selected');

            // Header: Label + Reset Button + Fx Toggle
            const header = document.createElement('div'); header.className = 'param-header';

            const labelGroup = document.createElement('div');
            labelGroup.style.display = 'flex'; labelGroup.style.alignItems = 'center'; labelGroup.style.gap = '6px';
            const label = document.createElement('span'); label.className = 'param-label'; label.textContent = param.name;
            const btnReset = document.createElement('button'); btnReset.className = 'icon-btn-inline'; btnReset.textContent = '↺'; btnReset.title = "Reset to Preset Default";
            btnReset.style.width = '14px'; btnReset.style.height = '14px'; btnReset.style.fontSize = '0.5rem';
            labelGroup.appendChild(label);

            if (param.desc) {
                const help = document.createElement('span'); help.className = 'help-icon'; help.textContent = '?';
                const tip = document.createElement('span'); tip.className = 'tooltip'; tip.textContent = param.desc;
                help.appendChild(tip); labelGroup.appendChild(help);
            }

            const btnLearn = document.createElement('button');
            btnLearn.className = 'icon-btn-inline learn-btn';
            btnLearn.textContent = 'M';
            btnLearn.title = 'MIDI Learn (Select Slider)';
            if (this.engine.midi && this.engine.midi.learnTarget && this.engine.midi.learnTarget.key === key) {
                btnLearn.classList.add('learning');
            }
            btnLearn.onclick = () => { if(this.engine.midi) this.engine.midi.enterLearnMode({ type: 'select', key: key }); };
            labelGroup.appendChild(btnLearn);

            labelGroup.appendChild(btnReset);

            const btnTog = document.createElement('button'); btnTog.className = \`fx-toggle \${param.useFormula ? 'active' : ''}\`; btnTog.textContent = 'Fx';
            header.appendChild(labelGroup); header.appendChild(btnTog); row.appendChild(header);

            // Slider UI with Readout
            const sliderUI = document.createElement('div'); sliderUI.className = \`param-ui param-slider\`;
            const sliderFlex = document.createElement('div'); sliderFlex.style.display = 'flex'; sliderFlex.style.alignItems = 'center'; sliderFlex.style.gap = '8px';
            const inputRange = document.createElement('input'); inputRange.type = 'range'; inputRange.min = param.min; inputRange.max = param.max; inputRange.step = param.step; inputRange.value = param.value; inputRange.style.flex = "1";
            inputRange.id = \`input-\${key}\`;
            inputRange.disabled = param.useFormula; // Treat as a visual-only meter when formula is active

            const btnCalib = document.createElement('button');
            btnCalib.className = \`icon-btn-inline\`;
            btnCalib.style.display = param.useFormula ? 'inline-block' : 'none';
            btnCalib.id = \`btn-calib-\${key}\`;
            btnCalib.textContent = param.calibrated ? 'Cb' : 'C';
            btnCalib.title = 'Calibrate formula outputs to standard range over 5s';
            btnCalib.onclick = () => this.triggerCalibration(param, btnCalib);

            const readout = document.createElement('span'); readout.className = 'param-val-readout'; readout.textContent = param.value;
            readout.id = \`readout-\${key}\`;
            sliderFlex.appendChild(inputRange); sliderFlex.appendChild(btnCalib); sliderFlex.appendChild(readout);
            sliderUI.appendChild(sliderFlex);

            inputRange.oninput = (e) => {
                param.value = parseFloat(e.target.value);
                readout.textContent = param.value;
            };

            // Formula UI
            const formulaUI = document.createElement('div'); formulaUI.className = \`param-ui param-formula \${param.useFormula ? '' : 'hidden'}\`;
            const txtFormula = document.createElement('textarea'); txtFormula.className = 'formula-box'; txtFormula.value = param.formula;
            txtFormula.oninput = (e) => param.formula = e.target.value;
            formulaUI.appendChild(txtFormula);

            // Reset Logic
            btnReset.onclick = () => {
                param.value = param.defaultVal;
                param.formula = param.defaultForm;
                inputRange.value = param.value;
                txtFormula.value = param.formula;
                readout.textContent = param.value;
            };

            // Toggle Logic
            btnTog.onclick = () => {
                param.useFormula = !param.useFormula;
                btnTog.classList.toggle('active', param.useFormula);
                formulaUI.classList.toggle('hidden', !param.useFormula);
                inputRange.disabled = param.useFormula;
                btnCalib.style.display = param.useFormula ? 'inline-block' : 'none';

                if (!param.useFormula) {
                    inputRange.value = param.value;
                    readout.textContent = param.value;
                }
            };

            row.appendChild(sliderUI); row.appendChild(formulaUI); container.appendChild(row);
        });
        this.bindStaticUI();
    },
`;

content = content.replace(/rebuildConfigUI\(\) \{[\s\S]*?        this\.bindStaticUI\(\);\n    \},/, rebuildConfigUIReplacement);

// Add missing photo layer support functions
const imageSelectorsLogic = `
    buildImageSelectorsForLayer(layer) {
        const container = this.safeGet(\`panel-image-select_\${layer.id}\`);
        if (!container || !this.engine.imagePool.length) return;
        container.innerHTML = '<label style="display:block; font-size: 0.65rem; margin-bottom: 8px; color: var(--accent-glow);">Active Images in Pool:</label>';

        const activeIdx = layer.settings.imgIndices || [];

        this.engine.imagePool.forEach((item, idx) => {
            const row = document.createElement('div');
            row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px'; row.style.marginBottom = '6px';

            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.checked = activeIdx.includes(idx);
            chk.onchange = (e) => {
                const current = layer.settings.imgIndices || [];
                if (e.target.checked) {
                    if (!current.includes(idx)) current.push(idx);
                } else {
                    layer.settings.imgIndices = current.filter(i => i !== idx);
                }
            };

            const lbl = document.createElement('span');
            lbl.textContent = item.name.toUpperCase();
            lbl.style.fontSize = '0.7rem';
            lbl.style.color = 'white';

            row.appendChild(chk); row.appendChild(lbl);
            container.appendChild(row);
        });
    },

    buildWebcamSelectorsForLayer(layer) {
        const container = this.safeGet(\`panel-webcam-select_\${layer.id}\`);
        if (!container) return;
        container.innerHTML = '';
        const e = this.engine;

        if (!e.webcamsInitialized) {
            const btn = document.createElement('button');
            btn.className = 'glass-panel';
            btn.textContent = 'Hardware Request: Enable & Scan Webcams';
            btn.style.width = '100%';
            btn.style.fontSize = '0.7rem';
            btn.style.padding = '12px';
            btn.style.color = 'var(--accent-glow)';
            btn.style.border = '1px solid var(--accent-glow)';
            btn.style.textTransform = 'uppercase';
            btn.style.cursor = 'pointer';
            btn.onclick = () => e.requestWebcams(() => this.buildWebcamSelectorsForLayer(layer));
            container.appendChild(btn);
            return;
        }

        if (e.availableWebcams.length === 0) {
            container.innerHTML = '<span style="color:var(--text-secondary); font-size:0.8rem;">No webcams found.</span>';
            return;
        }

        const activeIdxs = layer.settings.webcamIndices || [];
        e.availableWebcams.forEach((cam, i) => {
            const row = document.createElement('div');
            row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px'; row.style.padding = '4px 0';

            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.checked = activeIdxs.includes(i);
            chk.onchange = (ev) => {
                const current = layer.settings.webcamIndices || [];
                if (ev.target.checked) {
                    if (!current.includes(i)) current.push(i);
                } else {
                    layer.settings.webcamIndices = current.filter(x => x !== i);
                }
            };

            const lbl = document.createElement('span');
            lbl.textContent = cam.label;
            lbl.style.fontSize = '0.8rem';
            lbl.style.color = 'white';

            row.appendChild(chk); row.appendChild(lbl);
            container.appendChild(row);
        });
    },
`;

content = content.replace(/buildImageSelectors\(\) \{[\s\S]*?\},/, imageSelectorsLogic);

// Clean up static UI that relied on old format
content = content.replace(/this\.bindPhotoSourceToggle\(\);/g, '');
content = content.replace(/this\.buildImageSelectors\(\);/g, '');
content = content.replace(/this\.buildWebcamSelectors\(\);/g, '');
content = content.replace(/\['imgBlendMode', 'particleShape', 'textSequenceMode', 'textFontFamily', 'textDissolveStyle', 'shaderStyle', 'webglProjection'\]\.forEach\(id => \{ const el = this\.safeGet\(id\); if \(el\) \{ el\.value = active\.settings\[id\]; el\.oninput = ev => active\.settings\[id\] = ev\.target\.value; \} \}\);/,
    `['shaderStyle', 'webglProjection'].forEach(id => { const el = this.safeGet(id); if (el) { el.value = active.settings[id]; el.oninput = ev => active.settings[id] = ev.target.value; } });`);
content = content.replace(/const txtChk = this\.safeGet\('textEnabled'\); if \(txtChk\) \{ txtChk\.checked = active\.settings\.textEnabled; txtChk\.onchange = ev => active\.settings\.textEnabled = ev\.target\.checked; \}/, '');
content = content.replace(/const frzChk = this\.safeGet\('textFreeze'\); if \(frzChk\) \{ frzChk\.checked = active\.settings\.textFreeze; frzChk\.onchange = ev => active\.settings\.textFreeze = ev\.target\.checked; \}/, '');
content = content.replace(/\[0, 1, 2, 3, 4\]\.forEach\(i => \{ const el = this\.safeGet\(\`text\$\{i\}\`\); if \(el\) \{ el\.value = active\.settings\.textList\[i\]; el\.oninput = ev => active\.settings\.textList\[i\] = ev\.target\.value; \} \}\);/, '');


fs.writeFileSync('visualizer/js/ui.js', content, 'utf8');
