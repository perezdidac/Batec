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
        } else {
            this.learnTarget = target;
        }
        UI.rebuildConfigUI(); // Refresh UI to show pulsing indicators
    }

    handleMessage(msg) {
        const [status, data1, data2] = msg.data;
        const type = status & 0xf0;
        const val = data2 / 127;
        
        const ind = document.getElementById('midiIndicator');
        if (ind) ind.textContent = `MIDI: [${type === 0xb0 ? 'CC' : 'NT'}] ${data1} VAL ${data2}`;

        // 1. LEARN MODE ACTIVE
        if (this.learnTarget && (type === 0x90 || type === 0x80)) { 
            // Only accept Note On (velocity > 0) to bind
            if (type === 0x90 && data2 > 0) { 
                this.mappings.pads[data1] = this.learnTarget;
                
                // Immediately switch to the parameter if it was a select
                if (this.learnTarget.type === 'select') {
                    this.selectedParam = this.learnTarget.key;
                }
                
                this.learnTarget = null;
                UI.rebuildConfigUI(); 
                UI.highlightSelectedParam();
                return;
            }
        }

        // 2. NORMAL EXECUTION MODE
        
        // --- PAD / NOTE ON Logic ---
        if (type === 0x90 && data2 > 0) {
            const map = this.mappings.pads[data1];
            if (map) {
                if (map.type === 'toggle') {
                    const preset = this.engine.active;
                    preset.settings[map.cat + 'Enabled'] = !preset.settings[map.cat + 'Enabled'];
                    UI.rebuildConfigUI();
                } else if (map.type === 'select') {
                    this.selectedParam = map.key;
                    UI.highlightSelectedParam(); 
                }
            } else {
                // FALLBACK: Default hardcoded mappings if unassigned
                const padMap = { 36: 'physics', 37: 'waves', 38: 'rays', 39: 'photos', 40: 'particles', 41: 'text', 42: 'analog' };
                if (padMap[data1]) {
                    const cat = padMap[data1];
                    this.engine.active.settings[cat + 'Enabled'] = !this.engine.active.settings[cat + 'Enabled'];
                    UI.rebuildConfigUI();
                }
            }
        }

        // --- KNOB / CC Logic ---
        if (type === 0xb0) {
            // KNOB 1 (CC 20) -> Universally assigned to the SELECTED PARAMETER
            if (data1 === 20 && this.selectedParam) {
                const p = this.engine.active.params[this.selectedParam];
                if (p) {
                    p.value = p.min + (p.max - p.min) * val;
                    UI.updateSliderValue(this.selectedParam, p.value); 
                }
            } else {
                // FALLBACK: Other knobs use default behaviors
                const knobMap = { 21: 'waveCount', 22: 'rayCount', 23: 'particleCount', 1: 'imgGlitch' };
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
