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
                // 1. BREAK: Pull DMX line low
                await this.port.setSignals({ break: true });
                await this.sleep(1); // Hold break (min 88us, JS timeouts are ~1-4ms)
                
                // 2. MAB: Mark After Break (DMX line high)
                await this.port.setSignals({ break: false });
                await this.sleep(1); // Min 8us
                
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

        const m1 = document.getElementById('dmxCh1');
        const m2 = document.getElementById('dmxCh2');
        const m3 = document.getElementById('dmxCh3');
        const m4 = document.getElementById('dmxCh4');
        
        // HARDCODED VJ LOGIC: 
        // We tie the physical drum bass to Channel 1 (often Red or Dimmer).
        // Multiplying by 2.0 ensures we hit Max brightness on heavy hits before fading.
        const autoBass = Math.min(255, engine.smoothed.bass * 2.5); 
        
        // Read manual sliders
        const manual1 = m1 ? parseInt(m1.value) : 0;
        const manual2 = m2 ? parseInt(m2.value) : 0;
        const manual3 = m3 ? parseInt(m3.value) : 0;
        const manual4 = m4 ? parseInt(m4.value) : 0;

        // Channel 1 receives whichever is stronger: The slider floor, or the music kick!
        this.setChannel(1, Math.max(manual1, autoBass)); 
        this.setChannel(2, manual2);
        this.setChannel(3, manual3);
        this.setChannel(4, manual4); 
    }
}
