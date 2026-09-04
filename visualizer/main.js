/**
 * BATEC VJ ENGINE v6.0 - Modular Architecture
 * Professional Stage Projection Framework
 */

let engine = null;
try {
    engine = new BatecEngine();
    window.engine = engine;
    UI.init(engine);
} catch (err) {
    console.error('Error during engine/UI initialization:', err);
}

// Guaranteed fail-safe listener for Initialize Engine button
const btnStart = document.getElementById('btnStart');
if (btnStart) {
    btnStart.addEventListener('click', () => {
        try {
            if (window.engine) {
                window.engine.startAudio();
            }
        } catch (e) {
            console.warn('Audio start error:', e);
        }
        const overlay = document.getElementById('startOverlay');
        if (overlay) overlay.style.display = 'none';
        const cp = document.getElementById('controlsPanel');
        if (cp) cp.classList.remove('hidden');
        const tp = document.getElementById('telemetryPanel');
        if (tp) tp.classList.remove('hidden');
        const dp = document.getElementById('dmxPanel');
        if (dp) dp.classList.remove('hidden');
    });
}
