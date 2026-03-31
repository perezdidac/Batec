const UI = {
    init(engine) {
        this.engine = engine;
        this.buildSlots(); this.rebuildConfigUI(); this.bindStaticUI();
        this.buildImageSelectors();
        this.buildWebcamSelectors();
        this.initCollapsibleSections();
        this.initInteractionTimer(); this.initHotkeys();
    },
    safeGet(id) { return document.getElementById(id); },

    buildImageSelectors() {
        const container = this.safeGet('panel-image-select');
        if (!container || !this.engine.imagePool.length) return;
        container.innerHTML = '<label style="display:block; font-size: 0.65rem; margin-bottom: 8px; color: var(--accent-glow);">Active Images in Pool:</label>';

        const activeIdx = this.engine.active.settings.imgIndices || [];

        this.engine.imagePool.forEach((item, idx) => {
            const row = document.createElement('div');
            row.style.display = 'flex'; row.style.alignItems = 'center'; row.style.gap = '8px'; row.style.marginBottom = '6px';

            const chk = document.createElement('input');
            chk.type = 'checkbox';
            chk.checked = activeIdx.includes(idx);
            chk.onchange = (e) => {
                const current = this.engine.active.settings.imgIndices || [];
                if (e.target.checked) {
                    if (!current.includes(idx)) current.push(idx);
                } else {
                    this.engine.active.settings.imgIndices = current.filter(i => i !== idx);
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

        const trendEl = this.safeGet('txt-trend'); if (trendEl) trendEl.textContent = engine.trend.toFixed(2);
        const timeEl = this.safeGet('txt-time'); if (timeEl) timeEl.textContent = Math.floor(time);
    },

    buildSlots() {
        const grid = this.safeGet('presetSlots'); if (!grid) return;
        grid.innerHTML = '';
        this.engine.session.presets.forEach((p, i) => {
            const btn = document.createElement('div');
            btn.className = `slot ${i === this.engine.session.activeIndex ? 'active' : ''} ${i === this.engine.session.targetIndex ? 'switching' : ''}`;
            btn.style.zIndex = "1200"; // Ensure slots are always on top
            btn.style.pointerEvents = "auto";
            btn.textContent = (i + 1) % 10; btn.title = p.name;
            btn.onclick = (ev) => {
                ev.stopPropagation();
                this.engine.switchTo(i);
                this.buildSlots();
                this.rebuildConfigUI();
                this.buildImageSelectors(); // Ensure checkboxes update
            };
            grid.appendChild(btn);
        });
        const nameInput = this.safeGet('activePresetName'); if (nameInput) nameInput.value = this.engine.active.name;
    },

    rebuildConfigUI() {
        ['panel-physics', 'panel-waves', 'panel-rays', 'panel-photos', 'panel-particles', 'panel-text', 'panel-analog'].forEach(id => {
            const el = this.safeGet(id); if (el) el.innerHTML = '';
            const cat = id.replace('panel-', '');
            const chk = this.safeGet(`toggle_${cat}`);
            if (chk) chk.checked = this.engine.active.settings[cat + 'Enabled'] !== false;
        });

        const params = this.engine.active.params;
        const sortedKeys = Object.keys(params).sort((a, b) => {
            const pA = params[a], pB = params[b];
            const isOpaA = pA.name.toLowerCase().includes('weight') || a.toLowerCase().includes('opacity');
            const isOpaB = pB.name.toLowerCase().includes('weight') || b.toLowerCase().includes('opacity');
            if (isOpaA && !isOpaB) return -1;
            if (!isOpaA && isOpaB) return 1;
            return 0; // retain relative order otherwise
        });

        sortedKeys.forEach(key => {
            const param = params[key];
            const container = this.safeGet(`panel-${param.cat}`);
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
            const sliderUI = document.createElement('div'); sliderUI.className = `param-ui param-slider ${param.useFormula ? 'hidden' : ''}`;
            const sliderFlex = document.createElement('div'); sliderFlex.style.display = 'flex'; sliderFlex.style.alignItems = 'center'; sliderFlex.style.gap = '8px';
            const inputRange = document.createElement('input'); inputRange.type = 'range'; inputRange.min = param.min; inputRange.max = param.max; inputRange.step = param.step; inputRange.value = param.value; inputRange.style.flex = "1";
            inputRange.id = `input-${key}`;
            const readout = document.createElement('span'); readout.className = 'param-val-readout'; readout.textContent = param.value;
            readout.id = `readout-${key}`;
            sliderFlex.appendChild(inputRange); sliderFlex.appendChild(readout);
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
                param.useFormula = !param.useFormula; btnTog.classList.toggle('active');
                sliderUI.classList.toggle('hidden'); formulaUI.classList.toggle('hidden');
            };

            row.appendChild(sliderUI); row.appendChild(formulaUI); container.appendChild(row);
        });
        this.bindStaticUI();
    },

    bindStaticUI() {
        const e = this.engine; const active = e.active;
        this.safeGet('btnStart').onclick = () => { e.startAudio(); this.safeGet('startOverlay').style.display = 'none'; this.safeGet('controlsPanel').classList.remove('hidden'); };
        this.safeGet('btnAdvanced').onclick = () => this.safeGet('advancedPanel').classList.toggle('hidden');
        this.safeGet('btnCloseAdvanced').onclick = () => this.safeGet('advancedPanel').classList.add('hidden');
        this.safeGet('btnHelp').onclick = () => this.safeGet('helpModal').classList.toggle('hidden');
        this.safeGet('btnCloseHelp').onclick = () => this.safeGet('helpModal').classList.add('hidden');
        this.safeGet('btnMidiHelp').onclick = () => this.safeGet('midiHelpModal').classList.remove('hidden');
        this.safeGet('btnCloseMidiHelp').onclick = () => this.safeGet('midiHelpModal').classList.add('hidden');
        this.safeGet('btnPause').onclick = (ev) => { active.settings.isPaused = !active.settings.isPaused; if (active.settings.isPaused) e.audio.ctx?.suspend(); else e.audio.ctx?.resume(); ev.target.textContent = active.settings.isPaused ? 'Resume Audio' : 'Pause Audio'; };
        this.safeGet('btnHideUI').onclick = () => {
            document.querySelectorAll('.glass-panel').forEach(p => p.classList.add('hidden'));
            this.safeGet('telemetryPanel').classList.add('hidden'); // Ensure telemetry hides too
            this.safeGet('btnShowUI').classList.remove('hidden');
            this.safeGet('btnShowUI').classList.remove('inactive');
            e.lastInteraction = Date.now();
        };
        this.safeGet('btnShowUI').onclick = () => {
            this.safeGet('controlsPanel').classList.remove('hidden');
            this.safeGet('telemetryPanel').classList.remove('hidden'); // Bring telemetry back
            this.safeGet('btnShowUI').classList.add('hidden');
        };

        window.onclick = (ev) => {
            const hMod = this.safeGet('helpModal');
            const mMod = this.safeGet('midiHelpModal');
            if (ev.target === hMod) hMod.classList.add('hidden');
            if (ev.target === mMod) mMod.classList.add('hidden');
        };

        // Slot Management
        this.safeGet('btnNewPreset').onclick = () => { e.session.presets.push(createDefaultPreset(`Preset ${e.session.presets.length + 1}`)); this.buildSlots(); };
        this.safeGet('btnDeletePreset').onclick = () => { if (e.session.presets.length <= 1) return; e.session.presets.splice(e.session.activeIndex, 1); e.session.activeIndex = 0; this.buildSlots(); this.rebuildConfigUI(); };
        this.safeGet('activePresetName').oninput = (ev) => { active.name = ev.target.value; this.buildSlots(); };

        // Static Settings
        ['imgBlendMode', 'particleShape', 'textSequenceMode'].forEach(id => { const el = this.safeGet(id); if (el) { el.value = active.settings[id]; el.oninput = ev => active.settings[id] = ev.target.value; } });
        const txtChk = this.safeGet('textEnabled'); if (txtChk) { txtChk.checked = active.settings.textEnabled; txtChk.onchange = ev => active.settings.textEnabled = ev.target.checked; }
        [0, 1, 2, 3, 4].forEach(i => { const el = this.safeGet(`text${i}`); if (el) { el.value = active.settings.textList[i]; el.oninput = ev => active.settings.textList[i] = ev.target.value; } });
        [1, 2, 3, 4, 5, 6].forEach(i => { const el = this.safeGet(`palette${i}`); if (el) { el.value = active.settings.palette[i - 1]; el.oninput = (ev) => active.settings.palette[i - 1] = ev.target.value; } });

        // Project Import/Export
        this.safeGet('btnCopySession').onclick = () => { this.safeGet('styleIO').value = JSON.stringify(e.session, null, 2); };
        this.safeGet('btnImportSession').onclick = () => {
            try {
                const raw = JSON.parse(this.safeGet('styleIO').value);
                raw.presets.forEach(p => p.params = establishDefaults(p.params));
                e.session = raw;
                e.session.imported = true;
                e.healPresets();
                this.buildSlots(); this.rebuildConfigUI();
                this.buildImageSelectors(); this.buildWebcamSelectors();
                this.bindPhotoSourceToggle();
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

        this.bindPhotoSourceToggle();
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

    bindPhotoSourceToggle() {
        const e = this.engine;
        const radPhotos = this.safeGet('radioSourcePhotos');
        const radWebcams = this.safeGet('radioSourceWebcams');
        const pnlPhotos = this.safeGet('panel-image-select');
        const pnlWebcams = this.safeGet('panel-webcam-select');
        
        const updateView = () => {
            const mode = e.active.settings.photoSourceMode || 'photos';
            if (radPhotos) radPhotos.checked = (mode === 'photos');
            if (radWebcams) radWebcams.checked = (mode === 'webcams');
            if (pnlPhotos) pnlPhotos.style.display = (mode === 'photos') ? 'block' : 'none';
            if (pnlWebcams) pnlWebcams.style.display = (mode === 'webcams') ? 'block' : 'none';
            
            // Re-run builder if empty
            if (mode === 'webcams' && pnlWebcams.innerHTML === '') this.buildWebcamSelectors();
        };
        
        const setMode = (m) => { e.active.settings.photoSourceMode = m; updateView(); };
        
        if (radPhotos) {
            radPhotos.onchange = () => setMode('photos');
            radPhotos.parentElement.onclick = () => setMode('photos'); // Robust label click
        }
        if (radWebcams) {
            radWebcams.onchange = () => setMode('webcams');
            radWebcams.parentElement.onclick = () => setMode('webcams'); // Robust label click
        }
        updateView();
    },

    initHotkeys() {
        window.addEventListener('keydown', (ev) => {
            if (ev.key >= '0' && ev.key <= '9' && ev.target.tagName !== 'INPUT' && ev.target.tagName !== 'TEXTAREA') {
                const idx = ev.key === '0' ? 9 : parseInt(ev.key) - 1;
                this.engine.switchTo(idx);
                this.buildSlots();
                setTimeout(() => {
                    this.rebuildConfigUI();
                    this.buildImageSelectors();
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
    }
};