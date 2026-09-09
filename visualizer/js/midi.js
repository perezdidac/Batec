class BatecMIDI {
    constructor(engine) {
        this.engine = engine;
        
        // Ensure persistent MIDI storage on the session object
        if (!this.engine.session.midiMappings) {
            this.engine.session.midiMappings = { pads: {} };
        }
        
        this.learnTarget = null; // e.g. { type: 'select', key: 'rayCount' } or { type: 'toggle', cat: 'waves' }
        this.selectedParam = null; // Actively targeted by Knob 1

        this.init();
    }

    get mappings() {
        return this.engine.session.midiMappings;
    }

    init() {
        if (!navigator.requestMIDIAccess) return;
        navigator.requestMIDIAccess().then(access => {
            const ind = document.getElementById('midiIndicator');
            const inputs = Array.from(access.inputs.values());
            if (inputs.length > 0) {
                if (ind) ind.textContent = `MIDI: ${inputs[0].name.toUpperCase()}`;
                inputs.forEach(input => {
                    input.onmidimessage = (msg) => this.handleMessage(msg);
                });
            }
        });
    }

    enterLearnMode(target) {
        // If clicking the same target again, cancel learning
        if (this.learnTarget && this.learnTarget.key === target.key && this.learnTarget.cat === target.cat) {
            this.learnTarget = null;
            const ind = document.getElementById('midiIndicator');
            if (ind) ind.textContent = 'MIDI: LEARN CANCELLED';
        } else {
            this.learnTarget = target;
            const targetName = target.key ? target.key : (target.cat || 'TARGET');
            const ind = document.getElementById('midiIndicator');
            if (ind) ind.textContent = `LEARNING: SEND [${targetName.toUpperCase()}]...`;
        }
        UI.rebuildConfigUI(); // Refresh UI to show pulsing indicators
    }

    handleMessage(msg) {
        const [status, data1, data2] = msg.data;
        const type = status & 0xf0;
        const val = data2 / 127;
        
        const ind = document.getElementById('midiIndicator');
        if (ind && !this.learnTarget) {
            ind.textContent = `MIDI: [${type === 0xb0 ? 'CC' : 'NT'}] ${data1} VAL ${data2}`;
        }

        // 1. LEARN MODE ACTIVE
        if (this.learnTarget) { 
            // Learn from Note On (0x90 with velocity > 0)
            if (type === 0x90 && data2 > 0) { 
                const learned = this.learnTarget;
                this.mappings.pads[`note_${data1}`] = learned;
                this.mappings.pads[data1] = learned; // backward compatibility
                if (learned.type === 'select') this.selectedParam = learned.key;
                this.learnTarget = null;
                if (ind) ind.textContent = `MIDI: BOUND NOTE ${data1} -> ${learned.key || learned.cat}`;
                UI.rebuildConfigUI(); 
                UI.highlightSelectedParam();
                return;
            }
            // Learn from CC button/footswitch (0xB0 with val > 0)
            if (type === 0xb0 && data2 > 0) {
                const learned = this.learnTarget;
                this.mappings.pads[`cc_${data1}`] = learned;
                if (learned.type === 'select') this.selectedParam = learned.key;
                this.learnTarget = null;
                if (ind) ind.textContent = `MIDI: BOUND CC ${data1} -> ${learned.key || learned.cat}`;
                UI.rebuildConfigUI();
                UI.highlightSelectedParam();
                return;
            }
            // Learn from Program Change (0xC0)
            if (type === 0xc0) {
                const learned = this.learnTarget;
                this.mappings.pads[`pc_${data1}`] = learned;
                if (learned.type === 'select') this.selectedParam = learned.key;
                this.learnTarget = null;
                if (ind) ind.textContent = `MIDI: BOUND PC ${data1} -> ${learned.key || learned.cat}`;
                UI.rebuildConfigUI();
                UI.highlightSelectedParam();
                return;
            }
        }

        // 2. NORMAL EXECUTION MODE
        
        // Helper to run mapped action or toggle
        const triggerMap = (map) => {
            if (!map) return false;
            if (map.type === 'action') {
                if (map.key === 'nextPreset') {
                    this.engine.nextPreset();
                    return true;
                } else if (map.key === 'prevPreset') {
                    this.engine.prevPreset();
                    return true;
                }
            } else if (map.type === 'toggle') {
                const preset = this.engine.active;
                preset.settings[map.cat + 'Enabled'] = !preset.settings[map.cat + 'Enabled'];
                UI.rebuildConfigUI();
                return true;
            } else if (map.type === 'select') {
                this.selectedParam = map.key;
                UI.highlightSelectedParam();
                return true;
            }
            return false;
        };

        // --- PROGRAM CHANGE (0xC0) Trigger ---
        if (type === 0xc0) {
            const map = this.mappings.pads[`pc_${data1}`];
            if (triggerMap(map)) return;
        }

        // --- PAD / NOTE ON Logic ---
        if (type === 0x90 && data2 > 0) {
            if (data1 === 43) {
                this.engine.advanceManualLyrics();
                return;
            }
            const map = this.mappings.pads[`note_${data1}`] || this.mappings.pads[data1];
            if (triggerMap(map)) return;

            // FALLBACK: Default hardcoded mappings if unassigned
            const padMap = { 36: 'physics', 37: 'waves', 38: 'rays', 39: 'photos', 40: 'particles', 41: 'text', 42: 'analog' };
            if (padMap[data1]) {
                const cat = padMap[data1];
                this.engine.active.settings[cat + 'Enabled'] = !this.engine.active.settings[cat + 'Enabled'];
                UI.rebuildConfigUI();
                return;
            }
        }

        // --- KNOB / CC Logic ---
        if (type === 0xb0) {
            // First check if this CC is mapped as a button trigger (e.g. from footswitch)
            if (data2 > 0) {
                const map = this.mappings.pads[`cc_${data1}`];
                if (triggerMap(map)) return;

                // FALLBACK: Default footswitch triggers if CC 22 / 23 are tapped and unassigned
                if (data1 === 22 && !this.mappings.pads['cc_22']) {
                    this.engine.prevPreset();
                    return;
                }
                if (data1 === 23 && !this.mappings.pads['cc_23']) {
                    this.engine.nextPreset();
                    return;
                }
            }

            // KNOB 1 (CC 20) -> Universally assigned to the SELECTED PARAMETER
            if (data1 === 20 && this.selectedParam) {
                const p = this.engine.active.params[this.selectedParam];
                if (p) {
                    p.value = p.min + (p.max - p.min) * val;
                    UI.updateSliderValue(this.selectedParam, p.value); 
                }
            } else {
                // FALLBACK: Other knobs use default behaviors (excluding CC 22 and CC 23 which are footswitches)
                const knobMap = { 21: 'waveCount', 1: 'imgGlitch' };
                if (knobMap[data1]) {
                    const p = this.engine.active.params[knobMap[data1]];
                    if (p) {
                        p.value = p.min + (p.max - p.min) * val;
                        UI.updateSliderValue(knobMap[data1], p.value);
                    }
                }
            }
        }
    }
}
