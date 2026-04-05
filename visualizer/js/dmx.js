class BatecDMX {
    constructor(engine) {
        this.engine = engine;
        this.port = null;
        this.writer = null;
        this.connected = false;
        
        // DMX Universe: 1 Start Code (0x00) + 512 Channels. Total 513 bytes.
        this.universe = new Uint8Array(513);
        this.universe[0] = 0x00; // Required DMX Start Code
        
        // Configuration for Open DMX / FTDI chip
        this.baudRate = 250000; // Universal 250 kbps
        this.dataBits = 8;
        this.stopBits = 2; // DMX standard uses 2 stop bits
        this.parity = "none";
    }

    async connect() {
        if (!navigator.serial) {
            alert("Web Serial API not supported in this browser. Please use Google Chrome on desktop.");
            return;
        }
        
        try {
            this.port = await navigator.serial.requestPort();
            await this.port.open({
                baudRate: this.baudRate,
                dataBits: this.dataBits,
                stopBits: this.stopBits,
                parity: this.parity
            });
            this.writer = this.port.writable.getWriter();
            this.connected = true;
            
            const btn = document.getElementById('btnDmxConnect');
            const status = document.getElementById('dmxStatus');
            if (status) status.textContent = "STATUS: CONNECTED";
            if (btn) btn.textContent = "DISCONNECT";
            
            // Start the infinite transmission loop
            this.transmitLoop();
        } catch (e) {
            console.error("DMX Connection Failed:", e);
            const status = document.getElementById('dmxStatus');
            if (status) status.textContent = "STATUS: FAILED";
        }
    }

    disconnect() {
        this.connected = false;
        if (this.writer) {
            this.writer.releaseLock();
            this.writer = null;
        }
        if (this.port) {
            this.port.close();
            this.port = null;
        }
        const btn = document.getElementById('btnDmxConnect');
        const status = document.getElementById('dmxStatus');
        if (status) status.textContent = "STATUS: DISCONNECTED";
        if (btn) btn.textContent = "CONNECT USB";
    }
    
    toggle() {
        if (this.connected) this.disconnect();
        else this.connect();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Experimental CPU Bit-banging for Open DMX
    async transmitLoop() {
        while (this.connected && this.port && this.writer) {
            try {
                // 1. BREAK: Pull DMX line low (Min 92us, 1ms is safe for browsers)
                await this.port.setSignals({ break: true });
                await this.sleep(1); 
                
                // 2. MAB: Mark After Break (DMX line high, Min 12us)
                // We remove the sleep(1) here as the 'await' call itself provides enough micro-delay
                await this.port.setSignals({ break: false });
                
                // 3. FLUSH: Send the 513 bytes of payload data immediately
                await this.writer.write(this.universe);
                
                // Wait for the packets to physically leave the wire (~22ms @ 250kbps)
                await this.sleep(18);
                
            } catch (err) {
                console.error("DMX Write Error. Disconnecting.", err);
                this.disconnect();
            }
        }
    }

    setChannel(channel, value) {
        if (channel < 1 || channel > 512) return;
        this.universe[channel] = Math.max(0, Math.min(255, Math.round(value)));
    }
    
    updateFromEngine(engine) {
        if (!this.connected) return;

        // Auto-reactive Sync: Channel 1 pulses to live music bass
        const autoBass = Math.min(255, engine.smoothed.bass * 2.5); 
        
        for (let i = 1; i <= 14; i++) {
            const el = document.getElementById(`dmxCh${i}`);
            if (!el) continue;
            
            let val = parseInt(el.value) || 0;
            
            // Special Logic: CH 1 uses whichever is higher (Slider vs Bass Kick)
            if (i === 1) {
                val = Math.max(val, autoBass);
            }
            
            this.setChannel(i, val);
        }
    }
}
