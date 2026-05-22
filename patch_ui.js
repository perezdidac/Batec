const fs = require('fs');
let content = fs.readFileSync('visualizer/js/ui.js', 'utf8');

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

                const contentDiv = document.createElement('div');
                contentDiv.id = 'layer-content-' + layer.id;
                contentDiv.className = 'control-grid';
                layerDiv.appendChild(contentDiv);

                layersContainer.appendChild(layerDiv);
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

                // When toggling off formula, restore the visual meter to the static state variable
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

fs.writeFileSync('visualizer/js/ui.js', content, 'utf8');
