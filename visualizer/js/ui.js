const UI = {
    init(engine) {
        this.engine = engine;
        this.buildSlots(); this.rebuildConfigUI(); this.bindStaticUI();


        this.initCollapsibleSections();
        this.initInteractionTimer(); this.initHotkeys();
    },
    safeGet(id) { return document.getElementById(id); },


    buildImageSelectorsForLayer(layer) {
        const container = this.safeGet(`panel-image-select_${layer.id}`);
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
        const container = this.safeGet(`panel-webcam-select_${layer.id}`);
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


    buildWebcamSelectors() {
        const container = this.safeGet('panel-webcam-select');
        if (!container) return;
        container.innerHTML = '';
        const e = this.engine;

        if (!e.webcamsInitialized) {
            const btn = document.createElement('button');
            btn.className = 'glass-panel'; // Use glass-panel for visibility
            btn.textContent = 'Hardware Request: Enable & Scan Webcams';
            btn.style.width = '100%';
            btn.style.fontSize = '0.7rem';
            btn.style.padding = '12px';
            btn.style.color = 'var(--accent-glow)';
            btn.style.border = '1px solid var(--accent-glow)';
            btn.style.textTransform = 'uppercase';
            btn.style.cursor = 'pointer';
            btn.onclick = () => e.requestWebcams(() => this.buildWebcamSelectors());
            container.appendChild(btn);
            return;
        }

        if (e.availableWebcams.length === 0) {
            container.innerHTML = '<span style="color:var(--text-secondary); font-size:0.8rem;">No webcams found.</span>';
            return;
        }

        const instr = document.createElement('div');
        instr.style.color = 'var(--accent-glow)'; instr.style.fontSize = '0.65rem'; instr.style.marginBottom = '8px';
        instr.textContent = 'SELECT VIDEO INPUTS:';
        container.appendChild(instr);
        
        const activeIdxs = e.active.settings.webcamIndices || [];
        e.availableWebcams.forEach((cam, i) => {
            const row = document.createElement('div');
            row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px'; row.style.padding = '4px 0';
            
            const chk = document.createElement('input'); 
            chk.type = 'checkbox';
            chk.checked = activeIdxs.includes(i);
            chk.onchange = (ev) => {
                const current = this.engine.active.settings.webcamIndices || [];
                if (ev.target.checked) {
                    if (!current.includes(i)) current.push(i);
                } else {
                    this.engine.active.settings.webcamIndices = current.filter(x => x !== i);
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

    initCollapsibleSections() {
        document.querySelectorAll('.config-section').forEach(section => {
            const h4 = section.querySelector('h4');
            if (!h4) return;

            const cat = section.getAttribute('data-cat');
            if (cat && cat !== 'session' && cat !== 'physics') {
                const toggle = document.createElement('input');
                toggle.type = 'checkbox';
                toggle.id = `toggle_${cat}`;
                toggle.className = 'cat-toggle';
                toggle.checked = this.engine.active.settings[cat + 'Enabled'] !== false;
                toggle.onchange = (e) => {
                    this.engine.active.settings[cat + 'Enabled'] = e.target.checked;
                };
                h4.prepend(toggle);
            }

            // Add icon
            const icon = document.createElement('span');
            icon.className = 'collapse-icon';
            icon.textContent = '▼';

            const btnLearnCat = document.createElement('button');
            btnLearnCat.className = 'icon-btn-inline learn-btn';
            btnLearnCat.textContent = 'M';
            btnLearnCat.title = 'MIDI Learn (Toggle Layer)';
            if (this.engine.midi && this.engine.midi.learnTarget && this.engine.midi.learnTarget.cat === cat) {
                btnLearnCat.classList.add('learning');
            }
            btnLearnCat.onclick = (e) => {
                e.stopPropagation();
                if (this.engine.midi) this.engine.midi.enterLearnMode({ type: 'toggle', cat: cat });
            };

            h4.appendChild(btnLearnCat);
            h4.appendChild(icon);
            h4.classList.add('collapsible-header');

            // Wrap contents
            const wrapper = document.createElement('div');
            wrapper.className = 'section-content';

            // Move all siblings after h4 into wrapper
            while (h4.nextSibling) {
                wrapper.appendChild(h4.nextSibling);
            }
            section.appendChild(wrapper);

            // Click listener
            h4.onclick = (e) => {
                if(e.target.tagName === 'INPUT') return;
                const isCollapsed = wrapper.classList.toggle('collapsed');
                icon.classList.toggle('collapsed', isCollapsed);
            };
        });

        const btnExp = this.safeGet('btnExpandAll');
        if (btnExp) btnExp.onclick = () => {
            document.querySelectorAll('.section-content').forEach(w => w.classList.remove('collapsed'));
            document.querySelectorAll('.collapse-icon').forEach(i => i.classList.remove('collapsed'));
        };
        const btnCol = this.safeGet('btnCollapseAll');
        if (btnCol) btnCol.onclick = () => {
            document.querySelectorAll('.section-content').forEach(w => w.classList.add('collapsed'));
            document.querySelectorAll('.collapse-icon').forEach(i => i.classList.add('collapsed'));
        };
    },

    // Sync telemetry to the DOM
    updateTelemetry(engine, time) {
        if (!engine.audio.analyser) return;
        const b = engine.smoothed.bass, m = engine.smoothed.mid, t = engine.smoothed.treble, a = engine.smoothed.avg;
        const elB = this.safeGet('meter-bass'), elM = this.safeGet('meter-mid'), elT = this.safeGet('meter-treble'), elA = this.safeGet('meter-avg');
        if (elB) elB.style.width = `${(b / 255) * 100}%`;
        if (elM) elM.style.width = `${(m / 255) * 100}%`;
        if (elT) elT.style.width = `${(t / 255) * 100}%`;
        if (elA) elA.style.width = `${(a / 255) * 100}%`;

        const vB = this.safeGet('val-bass'), vM = this.safeGet('val-mid'), vT = this.safeGet('val-treble'), vA = this.safeGet('val-avg');
        if (vB) vB.textContent = Math.round(b);
        if (vM) vM.textContent = Math.round(m);
        if (vT) vT.textContent = Math.round(t);
        if (vA) vA.textContent = Math.round(a);

        const trendEl = this.safeGet('txt-trend'); if (trendEl) trendEl.textContent = engine.trend.toFixed(3);
        const bpmEl = document.getElementById('txt-bpm'); if (bpmEl) bpmEl.textContent = engine.bpmTracker.bpm;
        const timeEl = this.safeGet('txt-time'); if (timeEl) timeEl.textContent = Math.floor(time - engine.timeOffset);

        // Advanced Panel Metering: If Advanced UI is open, visually pulse the Fx Sliders
        const advPanel = document.getElementById('advancedPanel');
        if (advPanel && !advPanel.classList.contains('hidden') && engine.active && engine.active.params) {
            const params = engine.active.params;
            for (const key in params) {
                if (params[key].useFormula) {
                    const input = document.getElementById(`input-${key}`);
                    const read = document.getElementById(`readout-${key}`);
                    if (input && read) {
                        const v = engine.p(key);
                        input.value = v;
                        read.textContent = (v % 1 === 0 ? v : v.toFixed(2));
                    }
                }
            }
        }
    },

    buildSlots() {
        const grid = this.safeGet('presetSlots'); if (!grid) return;
        grid.innerHTML = '';
        this.engine.session.presets.forEach((p, i) => {
            const btn = document.createElement('div');
            const isTarget = i === this.engine.session.targetIndex;
            const isActiveState = (this.engine.session.targetIndex !== null) ? isTarget : (i === this.engine.session.activeIndex);
            btn.className = `slot ${isActiveState ? 'active' : ''}`;
            btn.style.zIndex = "1200"; // Ensure slots are always on top
            btn.style.pointerEvents = "auto";
            btn.textContent = (i + 1) % 10; btn.title = `Stage: ${p.name}`;
            btn.onclick = (ev) => {
                ev.stopPropagation();
                this.engine.switchTo(i);
                this.buildSlots();
                this.rebuildConfigUI();
                 // Ensure checkboxes update
            };
            grid.appendChild(btn);
        });
        
        const activePreset = this.engine.target || this.engine.active;
        const nameInput = this.safeGet('activePresetName'); 
        if (nameInput && document.activeElement !== nameInput) {
            nameInput.value = activePreset.name;
        }
    },


    rebuildConfigUI() {
        const activePreset = this.engine.target || this.engine.active;
        ['panel-physics', 'panel-webgl', 'panel-gpu_fx', 'panel-analog'].forEach(id => {
            const el = this.safeGet(id); if (el) el.innerHTML = '';
            const cat = id.replace('panel-', '');
            const chk = this.safeGet(`toggle_${cat}`) || this.safeGet(`${cat}Enabled`);
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
                    controlsDiv.innerHTML = `
                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Compositing Mode</label>
                        <select id="imgBlendMode_${layer.id}">
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
                                <input type="radio" name="photoSourceMode_${layer.id}" value="photos" id="radioSourcePhotos_${layer.id}"
                                    style="width:auto;"> Photos
                            </label>
                            <label style="display:flex; align-items:center; gap:6px; cursor:pointer;">
                                <input type="radio" name="photoSourceMode_${layer.id}" value="webcams" id="radioSourceWebcams_${layer.id}"
                                    style="width:auto;"> Webcams
                            </label>
                        </div>
                    </div>
                    <div id="panel-image-select_${layer.id}"
                        style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;"></div>
                    <div id="panel-webcam-select_${layer.id}"
                        style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px; display:none;">
                    </div>`;
                    layerDiv.appendChild(controlsDiv);

                } else if (layer.type === 'particles') {
                    const controlsDiv = document.createElement('div');
                    controlsDiv.innerHTML = `
                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Shape Architecture</label>
                        <select id="particleShape_${layer.id}">
                            <option value="circle">Organic Circle</option>
                            <option value="square">Abstract Square</option>
                            <option value="triangle">Geometric Delta</option>
                            <option value="star">Celestial Star</option>
                            <option value="petal">Organic Petal</option>
                            <option value="leaf">Sharp Leaf</option>
                            <option value="pollen">Dust Pollen</option>
                            <option value="mote">Dust Mote</option>
                        </select>
                    </div>`;
                    layerDiv.appendChild(controlsDiv);
                } else if (layer.type === 'text') {
                    const controlsDiv = document.createElement('div');
                    controlsDiv.innerHTML = `
                    <div class="control-group" style="margin-bottom: 12px; display: flex; gap: 10px;">
                        <label style="flex:1; display:flex; justify-content:space-between; align-items:center;">
                            Freeze Sequence
                            <input type="checkbox" id="textFreeze_${layer.id}" style="width:auto; margin:0;">
                        </label>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Text Sequences (Up to 5)</label>
                        <div class="lyric-inputs-grid">
                            <input type="text" id="text0_${layer.id}" placeholder="Phrase 1" class="text-input-minimal">
                            <input type="text" id="text1_${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                            <input type="text" id="text2_${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                            <input type="text" id="text3_${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                            <input type="text" id="text4_${layer.id}" placeholder="Empty (Optional)" class="text-input-minimal">
                        </div>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Sequencing Logic</label>
                        <select id="textSequenceMode_${layer.id}">
                            <option value="order">Sequential Loop</option>
                            <option value="random">Randomized Shuffle</option>
                        </select>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Typography Style</label>
                        <select id="textFontFamily_${layer.id}">
                            <option value="'Lora', serif">Lora (Serif)</option>
                            <option value="'Inter', sans-serif">Inter (Modern)</option>
                            <option value="'Courier New', monospace">Typewriter</option>
                            <option value="'Homemade Apple', cursive">Handwritten</option>
                        </select>
                    </div>

                    <div class="control-group" style="margin-bottom: 12px;">
                        <label>Dissolve Animation</label>
                        <select id="textDissolveStyle_${layer.id}">
                            <option value="fade">Classic Fade</option>
                            <option value="ink">Ink Resolve</option>
                        </select>
                    </div>`;
                    layerDiv.appendChild(controlsDiv);
                }

                const contentDiv = document.createElement('div');
                contentDiv.id = 'layer-content-' + layer.id;
                contentDiv.className = 'control-grid';
                layerDiv.appendChild(contentDiv);

                layersContainer.appendChild(layerDiv);

                // Bind specific controls values
                if (layer.type === 'photos') {
                    const sel = this.safeGet(`imgBlendMode_${layer.id}`);
                    if(sel) { sel.value = layer.settings.imgBlendMode || 'screen'; sel.onchange = e => layer.settings.imgBlendMode = e.target.value; }

                    const pRad = this.safeGet(`radioSourcePhotos_${layer.id}`);
                    const wRad = this.safeGet(`radioSourceWebcams_${layer.id}`);
                    if (pRad && wRad) {
                        pRad.checked = layer.settings.photoSourceMode !== 'webcams';
                        wRad.checked = layer.settings.photoSourceMode === 'webcams';
                        const changeFn = () => {
                            layer.settings.photoSourceMode = pRad.checked ? 'photos' : 'webcams';
                            this.buildImageSelectorsForLayer(layer);
                            this.buildWebcamSelectorsForLayer(layer);

                            const pSel = this.safeGet(`panel-image-select_${layer.id}`);
                            const wSel = this.safeGet(`panel-webcam-select_${layer.id}`);
                            if (pSel) pSel.style.display = pRad.checked ? 'block' : 'none';
                            if (wSel) wSel.style.display = wRad.checked ? 'block' : 'none';
                        }
                        pRad.onchange = changeFn;
                        wRad.onchange = changeFn;
                    }
                    this.buildImageSelectorsForLayer(layer);
                    this.buildWebcamSelectorsForLayer(layer);
                } else if (layer.type === 'particles') {
                    const sel = this.safeGet(`particleShape_${layer.id}`);
                    if(sel) { sel.value = layer.settings.particleShape || 'mote'; sel.onchange = e => layer.settings.particleShape = e.target.value; }
                } else if (layer.type === 'text') {
                    const frz = this.safeGet(`textFreeze_${layer.id}`);
                    if(frz) { frz.checked = layer.settings.textFreeze; frz.onchange = e => layer.settings.textFreeze = e.target.checked; }
                    [0, 1, 2, 3, 4].forEach(i => {
                        const el = this.safeGet(`text${i}_${layer.id}`);
                        if(el) { el.value = layer.settings.textList[i] || ""; el.oninput = e => layer.settings.textList[i] = e.target.value; }
                    });
                    const seq = this.safeGet(`textSequenceMode_${layer.id}`);
                    if(seq) { seq.value = layer.settings.textSequenceMode || 'order'; seq.onchange = e => layer.settings.textSequenceMode = e.target.value; }
                    const fnt = this.safeGet(`textFontFamily_${layer.id}`);
                    if(fnt) { fnt.value = layer.settings.textFontFamily || 'Lora'; fnt.onchange = e => layer.settings.textFontFamily = e.target.value; }
                    const dis = this.safeGet(`textDissolveStyle_${layer.id}`);
                    if(dis) { dis.value = layer.settings.textDissolveStyle || 'ink'; dis.onchange = e => layer.settings.textDissolveStyle = e.target.value; }
                }
            });
        }

        sortedKeys.forEach(key => {
            const param = params[key];
            let container = this.safeGet(`panel-${param.cat}`);

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
            row.id = `param-row-${key}`;
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

            const btnTog = document.createElement('button'); btnTog.className = `fx-toggle ${param.useFormula ? 'active' : ''}`; btnTog.textContent = 'Fx';
            header.appendChild(labelGroup); header.appendChild(btnTog); row.appendChild(header);

            // Slider UI with Readout
            const sliderUI = document.createElement('div'); sliderUI.className = `param-ui param-slider`;
            const sliderFlex = document.createElement('div'); sliderFlex.style.display = 'flex'; sliderFlex.style.alignItems = 'center'; sliderFlex.style.gap = '8px';
            const inputRange = document.createElement('input'); inputRange.type = 'range'; inputRange.min = param.min; inputRange.max = param.max; inputRange.step = param.step; inputRange.value = param.value; inputRange.style.flex = "1";
            inputRange.id = `input-${key}`;
            inputRange.disabled = param.useFormula; // Treat as a visual-only meter when formula is active
            
            const btnCalib = document.createElement('button');
            btnCalib.className = `icon-btn-inline`;
            btnCalib.style.display = param.useFormula ? 'inline-block' : 'none';
            btnCalib.id = `btn-calib-${key}`;
            btnCalib.textContent = param.calibrated ? 'Cb' : 'C';
            btnCalib.title = 'Calibrate formula outputs to standard range over 5s';
            btnCalib.onclick = () => this.triggerCalibration(param, btnCalib);

            const readout = document.createElement('span'); readout.className = 'param-val-readout'; readout.textContent = param.value;
            readout.id = `readout-${key}`;
            sliderFlex.appendChild(inputRange); sliderFlex.appendChild(btnCalib); sliderFlex.appendChild(readout);
            sliderUI.appendChild(sliderFlex);

            inputRange.oninput = (e) => {
                param.value = parseFloat(e.target.value);
                readout.textContent = param.value;
            };

            // Formula UI
            const formulaUI = document.createElement('div'); formulaUI.className = `param-ui param-formula ${param.useFormula ? '' : 'hidden'}`;
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


    bindStaticUI() {
        const e = this.engine; const active = e.target || e.active;

        const uiOpacity = this.safeGet('uiOpacity');
        if (uiOpacity) {
            uiOpacity.oninput = (ev) => {
                const val = ev.target.value;
                document.getElementById('uiOpacityVal').textContent = parseFloat(val).toFixed(2);
                document.documentElement.style.setProperty('--panel-bg', `rgba(10, 10, 10, ${val * 0.45})`);
                // Force panels to update their background opacity
                document.querySelectorAll('.glass-panel').forEach(p => {
                    p.style.backgroundColor = `rgba(10, 10, 10, ${val})`;
                    p.style.backdropFilter = `blur(${val * 28}px)`;
                });
            };
        }

        this.safeGet('btnStart').onclick = () => { e.startAudio(); this.safeGet('startOverlay').style.display = 'none'; this.safeGet('controlsPanel').classList.remove('hidden'); this.safeGet('telemetryPanel').classList.remove('hidden'); if(this.safeGet('dmxPanel')) this.safeGet('dmxPanel').classList.remove('hidden'); };
        this.safeGet('btnAdvanced').onclick = () => this.safeGet('advancedPanel').classList.toggle('hidden');

        const dmxHeader = this.safeGet('dmxHeader');
        if (dmxHeader) {
            dmxHeader.onclick = (ev) => {
                if(ev.target.tagName === 'BUTTON') return;
                const dmxSectionContent = this.safeGet('dmxSectionContent');
                const dmxCollapseIcon = this.safeGet('dmxCollapseIcon');
                if (dmxSectionContent && dmxCollapseIcon) {
                    const isCollapsed = dmxSectionContent.classList.toggle('collapsed');
                    dmxCollapseIcon.classList.toggle('collapsed', isCollapsed);
                }
            };
        }
        this.safeGet('btnCloseAdvanced').onclick = () => this.safeGet('advancedPanel').classList.add('hidden');
        this.safeGet('btnHelp').onclick = () => this.safeGet('helpModal').classList.toggle('hidden');
        this.safeGet('btnCloseHelp').onclick = () => this.safeGet('helpModal').classList.add('hidden');
        this.safeGet('btnMidiHelp').onclick = () => this.safeGet('midiHelpModal').classList.remove('hidden');
        this.safeGet('btnCloseMidiHelp').onclick = () => this.safeGet('midiHelpModal').classList.add('hidden');
        
        const btnResetTime = document.getElementById('btnResetTime');
        if (btnResetTime) btnResetTime.onclick = () => e.timeOffset = performance.now();
        
        const btnCalibrateAll = document.getElementById('btnCalibrateAll');
        if (btnCalibrateAll) {
            btnCalibrateAll.onclick = () => {
                if (!e.active || !e.active.params) return;
                btnCalibrateAll.classList.add('learning');
                btnCalibrateAll.textContent = 'CALIBRATING... (5s)';
                Object.keys(e.active.params).forEach(k => {
                    const p = e.active.params[k];
                    if (p.useFormula) {
                        const btn = document.getElementById(`btn-calib-${k}`);
                        this.triggerCalibration(p, btn);
                    }
                });
                setTimeout(() => {
                    btnCalibrateAll.classList.remove('learning');
                    btnCalibrateAll.innerHTML = '[ ! ] CALIBRATE ALL FORMULAS';
                }, 5000);
            };
        }
        
        this.safeGet('btnPause').onclick = (ev) => { active.settings.isPaused = !active.settings.isPaused; if (active.settings.isPaused) e.audio.ctx?.suspend(); else e.audio.ctx?.resume(); ev.target.textContent = active.settings.isPaused ? 'Resume Audio' : 'Pause Audio'; };
        this.safeGet('btnHideUI').onclick = () => {
            document.querySelectorAll('.glass-panel').forEach(p => p.classList.add('hidden'));
            this.safeGet('telemetryPanel').classList.add('hidden');
            if(this.safeGet('dmxPanel')) this.safeGet('dmxPanel').classList.add('hidden');
            this.safeGet('btnShowUI').classList.remove('hidden');
            this.safeGet('btnShowUI').classList.remove('inactive');
            e.lastInteraction = Date.now();
        };
        this.safeGet('btnShowUI').onclick = () => {
            this.safeGet('controlsPanel').classList.remove('hidden');
            this.safeGet('telemetryPanel').classList.remove('hidden'); // Bring telemetry back
            if(this.safeGet('dmxPanel')) this.safeGet('dmxPanel').classList.remove('hidden');
            this.safeGet('btnShowUI').classList.add('hidden');
        };

        window.onclick = (ev) => {
            const hMod = this.safeGet('helpModal');
            const mMod = this.safeGet('midiHelpModal');
            if (ev.target === hMod) hMod.classList.add('hidden');
            if (ev.target === mMod) mMod.classList.add('hidden');
        };

        // Stage Management
        this.safeGet('btnNewPreset').onclick = () => { e.session.presets.push(createDefaultPreset(`Stage ${e.session.presets.length + 1}`)); this.buildSlots(); };
        this.safeGet('btnDeletePreset').onclick = () => { if (e.session.presets.length <= 1) return; e.session.presets.splice(e.session.activeIndex, 1); e.session.activeIndex = 0; this.buildSlots(); this.rebuildConfigUI(); };
        this.safeGet('activePresetName').oninput = (ev) => {
            const currentActive = this.engine.target || this.engine.active;
            currentActive.name = ev.target.value;
            this.buildSlots();
        };


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


        // Static Settings
        ['shaderStyle', 'webglProjection'].forEach(id => { const el = this.safeGet(id); if (el) { el.value = active.settings[id]; el.oninput = ev => active.settings[id] = ev.target.value; } });
        const hChk = this.safeGet('horizonEnabled'); if (hChk) { hChk.checked = active.settings.horizonEnabled; hChk.onchange = ev => active.settings.horizonEnabled = ev.target.checked; }


        const gpuChk = this.safeGet('gpu_fxEnabled'); if (gpuChk) { gpuChk.checked = active.settings.gpu_fxEnabled; gpuChk.onchange = ev => active.settings.gpu_fxEnabled = ev.target.checked; }
        const anaChk = this.safeGet('analogEnabled'); if (anaChk) { anaChk.checked = active.settings.analogEnabled; anaChk.onchange = ev => active.settings.analogEnabled = ev.target.checked; }

        [1, 2, 3, 4, 5, 6].forEach(i => { const el = this.safeGet(`palette${i}`); if (el) { el.value = active.settings.palette[i - 1]; el.oninput = (ev) => active.settings.palette[i - 1] = ev.target.value; } });

        // Project Import/Export
        this.safeGet('btnCopySession').onclick = () => {
            const clone = JSON.parse(JSON.stringify(e.session));
            clone.presets.forEach(p => {
                for (const key in p.params) {
                    const obj = p.params[key];
                    delete obj.cat; delete obj.name; delete obj.desc;
                    delete obj.step; delete obj.defaultVal; delete obj.defaultForm;
                    if (!obj.calibrated) {
                        delete obj.min; delete obj.max;
                    }
                    delete obj.isCalibrating;
                    // Delete dynamically injected dom nodes
                    delete obj.elSlider; delete obj.elReadout;
                }
            });
            this.safeGet('styleIO').value = JSON.stringify(clone, null, 2); 
        };
        this.safeGet('btnImportSession').onclick = () => {
            try {
                const raw = JSON.parse(this.safeGet('styleIO').value);
                raw.presets.forEach(p => p.params = establishDefaults(p.params));
                e.session = raw;
                e.session.imported = true;
                e.healPresets();
                this.buildSlots(); this.rebuildConfigUI();


            } catch (err) { alert('Invalid Project JSON.'); }
        };

        // Reset All Button
        const btnResetAll = this.safeGet('btnResetAll');
        if (btnResetAll) {
            btnResetAll.onclick = () => {
                if (e.session.imported) {
                    Object.keys(active.params).forEach(k => {
                        active.params[k].value = active.params[k].defaultVal;
                        active.params[k].formula = active.params[k].defaultForm;
                    });
                    this.rebuildConfigUI();
                } else {
                    alert("No JSON project loaded to revert to. Export your session to save states!");
                }
            };
        }

        const btnRand = this.safeGet('btnRandom');
        if (btnRand) btnRand.onclick = () => this.randomizeActivePreset();


    },

    randomizeActivePreset() {
        const active = this.engine.active;
        Object.keys(active.params).forEach(k => {
            const p = active.params[k];
            // Randomly set value within range
            p.value = p.min + Math.random() * (p.max - p.min);
            // 20% chance to toggle formula mode for extra chaos
            if (Math.random() > 0.8) p.useFormula = !p.useFormula;
        });
        
        // Randomize Palette
        active.settings.palette = active.settings.palette.map(() => 
            '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
        );
        
        this.rebuildConfigUI();
    },



    initHotkeys() {
        window.addEventListener('keydown', (ev) => {
            if (ev.key >= '0' && ev.key <= '9' && ev.target.tagName !== 'INPUT' && ev.target.tagName !== 'TEXTAREA') {
                const idx = ev.key === '0' ? 9 : parseInt(ev.key) - 1;
                this.engine.switchTo(idx);
                this.buildSlots();
                setTimeout(() => {
                    this.rebuildConfigUI();

                }, 500);
            }
        });
    },

    initInteractionTimer() {
        const r = () => { if (this.engine) this.engine.lastInteraction = Date.now(); };
        ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(ev => window.addEventListener(ev, r));
    },

    updateSliderValue(key, val) {
        const inp = document.getElementById(`input-${key}`);
        const read = document.getElementById(`readout-${key}`);
        if(inp) inp.value = val;
        if(read) read.textContent = typeof val === 'number' ? val.toFixed(2) : val;
    },

    highlightSelectedParam() {
        document.querySelectorAll('.param-row').forEach(r => r.classList.remove('midi-selected'));
        if(this.engine.midi && this.engine.midi.selectedParam) {
            const el = document.getElementById(`param-row-${this.engine.midi.selectedParam}`);
            if(el) el.classList.add('midi-selected');
        }
    },

    triggerCalibration(param, btn) {
        if (!param.useFormula) return;
        param.isCalibrating = true;
        param.calibrated = false;
        param.calibRawMin = Infinity;
        param.calibRawMax = -Infinity;
        if (btn) { btn.classList.add('learning'); btn.textContent = '...'; }

        setTimeout(() => {
            param.isCalibrating = false;
            param.calibrated = true;
            if (btn) { btn.classList.remove('learning'); btn.textContent = 'Cb'; }
            console.log(`Calibrated ${param.name}: min=${param.calibRawMin.toFixed(2)}, max=${param.calibRawMax.toFixed(2)}`);
        }, 5000);
    }
};