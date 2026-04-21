class BatecGLPostFX {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl', { preserveDrawingBuffer: true }) || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error("WebGL 1.0 not supported. GPU PostFX disabled.");
            this.supported = false;
            return;
        }
        this.supported = true;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.initShaders();
        this.initGeometry();
        this.initFBOs();

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        if (!this.supported) return;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.gl.viewport(0, 0, this.width, this.height);
        this.initFBOs(); // Rebuild FBOs for new resolution
    }

    createTexture() {
        const tex = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.width, this.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        return tex;
    }

    createFBO(texture) {
        const fbo = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, texture, 0);
        return fbo;
    }

    initFBOs() {
        // Destroy old if exists
        if(this.texA) this.gl.deleteTexture(this.texA);
        if(this.texB) this.gl.deleteTexture(this.texB);
        if(this.mainTex) this.gl.deleteTexture(this.mainTex);
        if(this.fboA) this.gl.deleteFramebuffer(this.fboA);
        if(this.fboB) this.gl.deleteFramebuffer(this.fboB);

        this.texA = this.createTexture();
        this.fboA = this.createFBO(this.texA);
        
        this.texB = this.createTexture();
        this.fboB = this.createFBO(this.texB);
        
        // Texture for uploading the 2D canvas frame
        this.mainTex = this.createTexture();

        this.readIndex = 0; // 0 means Read from A, Write to B. 1 means Read B, Write A.
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }

    initShaders() {
        const vsSource = `
            attribute vec2 a_position;
            varying vec2 v_uv;
            void main() {
                v_uv = (a_position * 0.5) + 0.5; // Map from -1,1 to 0,1
                v_uv.y = 1.0 - v_uv.y; // Flip Y because WebGL reads textures upside down sometimes
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fsSource = `
            precision mediump float;
            varying vec2 v_uv;
            uniform sampler2D u_mainTex;  // The current 2D frame
            uniform sampler2D u_prevTex;  // The smeared previous frame
            
            // Audio & Config
            uniform float u_time;
            uniform float u_bass;
            uniform float u_aberration;   // Chromatic scale
            uniform float u_smearRatio;   // Trail density 
            uniform float u_meltSpeed;    // Advection vector
            uniform float u_kaleidoSegments;
            uniform float u_kaleidoRot;
            
            // ANALOG OPTICS
            uniform float u_grain;
            uniform float u_vignette;
            uniform float u_blurRadius;
            uniform float u_inkBleed;
            uniform float u_scanlines;
            uniform float u_paperGrain;
            uniform float u_stainIntensity;
            uniform float u_scratches;

            // --- PROCEDURAL TEXTURE GENERATORS ---
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                           mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
            }

            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 3; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 activeUV = v_uv;

                // 0. KALEIDOSCOPE MIRRORING
                if (u_kaleidoSegments > 0.0) {
                    vec2 p = activeUV - vec2(0.5);
                    float r = length(p);
                    float a = atan(p.y, p.x);
                    
                    a += u_kaleidoRot;
                    float seg = 6.28318530718 / u_kaleidoSegments;
                    
                    a = mod(a, seg);
                    a = abs(a - seg / 2.0);
                    
                    activeUV = vec2(0.5) + vec2(cos(a), sin(a)) * r;
                }

                // 1. FLUID NOISE (Create a swirling melt direction)
                float meltNoise = sin(activeUV.y * 10.0 + u_time * 2.0) * cos(activeUV.x * 12.0 - u_time);
                vec2 advectionOffset = vec2(meltNoise * u_meltSpeed * 0.5, u_meltSpeed);
                
                // --- WATERCOLOR INK BLEED FEEDBACK ---
                vec4 prevColor = vec4(0.0);
                if (u_inkBleed > 0.0) {
                    vec4 centerPrev = texture2D(u_prevTex, activeUV - advectionOffset);
                    // Improved Bleed: Use a base spread + luminance to ensure it works on mid-tones
                    float lum = length(centerPrev.rgb) + 0.1; 
                    
                    // Radial bloom direction
                    vec2 dirOut = normalize(activeUV - 0.5 + 0.0001); 
                    vec2 inkDist = dirOut * (u_inkBleed * lum * 0.006);
                    
                    // 4-Tap Gaussian Capillary Bleed
                    prevColor += texture2D(u_prevTex, activeUV - advectionOffset - inkDist * 2.0) * 0.2;
                    prevColor += texture2D(u_prevTex, activeUV - advectionOffset - inkDist) * 0.3;
                    prevColor += centerPrev * 0.3;
                    prevColor += texture2D(u_prevTex, activeUV - advectionOffset + inkDist * 1.5) * 0.2;
                } else {
                    prevColor = texture2D(u_prevTex, activeUV - advectionOffset);
                }
                
                // Slowly fade out over time if smearRatio < 1
                prevColor *= u_smearRatio;
                
                // 2. DEPTH OF FIELD & CHROMATIC ABERRATION (Current Frame)
                vec2 centerDist = activeUV - 0.5;
                vec3 finalColor = vec3(0.0);
                float blurSamples = 0.0;
                float rad = u_blurRadius / 1500.0; // Scaled resolution factor
                
                // Fast 9-Tap Multi-Channel Bokeh
                for(float x = -1.0; x <= 1.0; x += 1.0) {
                    for(float y = -1.0; y <= 1.0; y += 1.0) {
                        vec2 offsetUV = centerDist + vec2(x, y) * rad;
                        float distMag = length(offsetUV);
                        
                        // Lens splits outwards radially
                        float rS = 1.0 + (u_aberration * distMag);
                        float bS = 1.0 - (u_aberration * distMag);
                        
                        float r = texture2D(u_mainTex, 0.5 + offsetUV * rS).r;
                        float g = texture2D(u_mainTex, 0.5 + offsetUV).g;
                        float b = texture2D(u_mainTex, 0.5 + offsetUV * bS).b;
                        
                        finalColor += vec3(r, g, b);
                        blurSamples += 1.0;
                    }
                }
                finalColor /= blurSamples;
                
                // 3. ANALOG FILM GRAIN
                // Generate a pseudo-random hash using UV coordinates and the chronological chronological offset
                float filmNoise = fract(sin(dot(activeUV, vec2(12.9898, 78.233)) + u_time*10.0) * 43758.5453);
                finalColor += (filmNoise - 0.5) * u_grain;
                
                // 4. VINTAGE LENS VIGNETTE
                float vignetteLens = length(centerDist); 
                float vigSoftness = smoothstep(0.4, 1.2, vignetteLens); // Roll-off darkness towards the absolute edges
                finalColor = mix(finalColor, vec3(0.0), vigSoftness * u_vignette);

                // 4.5 VINTAGE FILM SCRATCHES
                if (u_scratches > 0.0) {
                    float scratchPos = fract(activeUV.x * 12.0 + noise(vec2(u_time * 5.0, 0.0)) * 5.0);
                    float scratchNoise = hash(vec2(activeUV.x, floor(u_time * 15.0)));
                    if (scratchPos > 0.99 && scratchNoise > 0.8) {
                        float scratchBrightness = 0.5 + hash(activeUV) * 0.5;
                        finalColor += vec3(u_scratches * scratchBrightness);
                    }
                }

                // 5. CRT SCANLINES (Hardware Emulation)
                if (u_scanlines > 0.0) {
                    float sCount = 800.0; // Simulated vertical resolution
                    float line = sin(v_uv.y * sCount);
                    if (line < 0.0) finalColor *= (1.0 - u_scanlines);
                }

                // 6. PROCEDURAL PAPER FIBERS
                if (u_paperGrain > 0.0) {
                    float n = fbm(activeUV * 400.0);
                    float fiber = smoothstep(0.4, 0.6, n);
                    finalColor *= (1.0 - (1.0 - fiber) * u_paperGrain * 0.5);
                    finalColor += (n - 0.5) * u_paperGrain * 0.1;
                }

                // 7. ORGANIC INK STAINS
                if (u_stainIntensity > 0.0) {
                    float stain = fbm(activeUV * 3.0 + u_time * 0.05);
                    stain = smoothstep(0.6, 1.0, stain);
                    finalColor = mix(finalColor, finalColor * 0.8, stain * u_stainIntensity);
                }

                vec4 newColor = vec4(finalColor, texture2D(u_mainTex, activeUV).a);
                
                // 8. POST-COMPOSITE SMEAR
                // We use Additive composite max(a,b) to keep bright trails bright like light painting
                gl_FragColor = max(newColor, prevColor);
            }
        `;

        this.program = this.compileProgram(vsSource, fsSource);
        
        this.uniforms = {
            mainTex: this.gl.getUniformLocation(this.program, 'u_mainTex'),
            prevTex: this.gl.getUniformLocation(this.program, 'u_prevTex'),
            time: this.gl.getUniformLocation(this.program, 'u_time'),
            bass: this.gl.getUniformLocation(this.program, 'u_bass'),
            aberration: this.gl.getUniformLocation(this.program, 'u_aberration'),
            smearRatio: this.gl.getUniformLocation(this.program, 'u_smearRatio'),
            meltSpeed: this.gl.getUniformLocation(this.program, 'u_meltSpeed'),
            kaleidoSegments: this.gl.getUniformLocation(this.program, 'u_kaleidoSegments'),
            kaleidoRot: this.gl.getUniformLocation(this.program, 'u_kaleidoRot'),
            grain: this.gl.getUniformLocation(this.program, 'u_grain'),
            vignette: this.gl.getUniformLocation(this.program, 'u_vignette'),
            blurRadius: this.gl.getUniformLocation(this.program, 'u_blurRadius'),
            inkBleed: this.gl.getUniformLocation(this.program, 'u_inkBleed'),
            scanlines: this.gl.getUniformLocation(this.program, 'u_scanlines'),
            paperGrain: this.gl.getUniformLocation(this.program, 'u_paperGrain'),
            stainIntensity: this.gl.getUniformLocation(this.program, 'u_stainIntensity'),
            scratches: this.gl.getUniformLocation(this.program, 'u_scratches')
        };
    }

    compileProgram(vs, fs) {
        const gl = this.gl;
        const vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, vs); gl.compileShader(vShader);
        
        const fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, fs); gl.compileShader(fShader);
        
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
            console.error("Fragment Shader failed: ", gl.getShaderInfoLog(fShader));
        }

        const prog = gl.createProgram();
        gl.attachShader(prog, vShader);
        gl.attachShader(prog, fShader);
        gl.linkProgram(prog);
        return prog;
    }

    initGeometry() {
        const vertices = new Float32Array([
            -1.0, -1.0,  1.0, -1.0,  -1.0,  1.0,  1.0,  1.0
        ]);
        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
        this.positionAttribute = this.gl.getAttribLocation(this.program, 'a_position');
    }

    render(engine, sourceCanvas, time) {
        if (!this.supported) return;
        
        const gl = this.gl;
        gl.useProgram(this.program);

        // Upload Source Canvas to Texture 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.mainTex);
        try {
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
        } catch(e) {
            if (e.name === 'SecurityError') {
                return false; // Skip this frame due to taint, but do not destroy the session capability
            } else throw e;
        }
        gl.uniform1i(this.uniforms.mainTex, 0);

        // Determine Ping/Pong reads & writes
        const readTex = this.readIndex === 0 ? this.texA : this.texB;
        const writeFBO = this.readIndex === 0 ? this.fboB : this.fboA;

        // Bind Previous Frame Texture to Texture 1
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, readTex);
        gl.uniform1i(this.uniforms.prevTex, 1);

        // Bind Parameters
        gl.uniform1f(this.uniforms.time, time / 1000.0);
        gl.uniform1f(this.uniforms.bass, (engine.smoothed.bass / 255.0) || 0);
        gl.uniform1f(this.uniforms.aberration, engine.p('gpuAberration'));
        gl.uniform1f(this.uniforms.smearRatio, engine.p('gpuSmearRatio'));
        gl.uniform1f(this.uniforms.meltSpeed, engine.p('gpuMeltSpeed'));
        gl.uniform1f(this.uniforms.kaleidoSegments, engine.p('gpuKaleidoSegments'));
        gl.uniform1f(this.uniforms.kaleidoRot, engine.p('gpuKaleidoRot'));
        gl.uniform1f(this.uniforms.grain, engine.p('analogNoise'));
        gl.uniform1f(this.uniforms.vignette, engine.p('analogVignette'));
        gl.uniform1f(this.uniforms.blurRadius, engine.p('opticsFocusPull'));
        gl.uniform1f(this.uniforms.inkBleed, engine.p('analogInkBleed'));
        gl.uniform1f(this.uniforms.scanlines, engine.p('analogScanlines'));
        gl.uniform1f(this.uniforms.paperGrain, engine.p('analogPaperGrain'));
        gl.uniform1f(this.uniforms.stainIntensity, engine.p('analogStainIntensity'));
        gl.uniform1f(this.uniforms.scratches, engine.p('analogScratches'));

        // STEP 1: Draw FBO Ping/Pong Logic (Write smeared output to memory)
        gl.bindFramebuffer(gl.FRAMEBUFFER, writeFBO);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.vertexAttribPointer(this.positionAttribute, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.positionAttribute);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // STEP 2: Draw the EXACT SAME FBO to the actual on-screen WebGL Canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        // We reuse the geometry, we just read from the FBO we just wrote to.
        // Wait, simply unbinding the FBO and running the shader again won't output the previous frame perfectly if we re-run the melt.
        // We must do a pure passthrough to the screen. 
        // Best approach: Swap textures, then just blit readTex to screen?
        // Actually, just drawing the whole shader directly to 'null' fbo works if we don't need multiple post-passes, but we DO need to save the frame.
        // Since we wrote to writeFBO, we can just bind writeTex as TEXTURE0, and pass a bypass flag to a shader, OR simpler: 
        // Swap read/write index. Now the NEW frame is in readTex. 
        this.readIndex = 1 - this.readIndex; // SWAP
        
        // Wait! We can't easily blit FBO to screen in WebGL 1.0 without another shader pass... UNLESS! 
        // We just draw the shader output TWICE (once to FBO, once to screen)! 
        // It's technically 2 draws, but it's exceptionally fast. Let's do that for simplicity:
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); 
    }
}
