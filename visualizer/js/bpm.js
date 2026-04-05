class BatecBpmAnalyzer {
    constructor() {
        this.bpm = 120;
        this.prevSpectrum = null;
        this.fluxHistory = [];
        this.historySize = 40; // Approx 600-700ms window at 60 FPS
        this.beatBuffer = [];
        this.lastBeatTime = 0;
        this.thresholdMultiplier = 1.4; // Flux must be 40% louder than local average
    }

    analyze(spectrum, now) {
        // Initialize history array sizes based on WebAudio context
        if (!this.prevSpectrum || this.prevSpectrum.length !== spectrum.length) {
            this.prevSpectrum = new Uint8Array(spectrum.length);
        }

        // 1. Calculate Spectral Flux (Positive energy variations across the entire FFT spectrogram)
        let flux = 0;
        for (let i = 0; i < spectrum.length; i++) {
            const diff = spectrum[i] - this.prevSpectrum[i];
            if (diff > 0) flux += diff; // Only sum positive attacks/transients
            this.prevSpectrum[i] = spectrum[i];
        }

        // 2. Manage sliding window for dynamic thresholding
        this.fluxHistory.push(flux);
        if (this.fluxHistory.length > this.historySize) {
            this.fluxHistory.shift();
        }

        if (this.fluxHistory.length === this.historySize) {
            // 3. Extract local mean from the recent timeline to establish a noise floor curve
            const mean = this.fluxHistory.reduce((a, b) => a + b, 0) / this.historySize;
            
            // 4. Onset Trigger: The current flux must pierce the average threshold robustly
            const threshold = mean * this.thresholdMultiplier;
            const isBeat = flux > threshold && flux > 500; // 500 = baseline silence floor prevention

            if (isBeat && (now - this.lastBeatTime) > 330) { // ~180 BPM Max
                const delta = now - this.lastBeatTime;
                this.lastBeatTime = now;
                
                // Validate if delta represents a musical interval (approx 60 - 180 BPM ranges)
                if (delta > 330 && delta < 1000) {
                    this.beatBuffer.push(delta);
                    if (this.beatBuffer.length > 6) this.beatBuffer.shift();
                    
                    // Cleanse outliers by sorting and dropping the extremes if we have enough data
                    let sorted = [...this.beatBuffer].sort((a,b) => a-b);
                    if (sorted.length >= 4) sorted = sorted.slice(1, -1);
                    
                    // Derive smooth realtime BPM from the rolling delta
                    const avgDelta = sorted.reduce((a, b) => a + b, 0) / sorted.length;
                    this.bpm = Math.round(60000 / avgDelta);
                }
            }
        }
    }
}
