class BatecShader {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.gl = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        
        if (!this.gl) {
            console.error("WebGL 1.0 not supported.");
            this.supported = false;
            return;
        }
        this.supported = true;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initShaders();
        this.initGeometry();
    }

    resize() {
        if (!this.supported) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    initShaders() {
        const vsSource = `
            attribute vec2 a_position;
            void main() {
                gl_Position = vec4(a_position, 0.0, 1.0);
            }
        `;

        const fsSource = `
            precision mediump float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform float u_trend;
            uniform float u_bass;
            uniform vec3 u_colorA;
            uniform vec3 u_colorB;
            
            // Engine Config Parameters
            uniform float u_speed;
            uniform float u_elevation;
            uniform float u_glow;
            uniform float u_distortion;

            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
                
                // Bass distortion warp on X axis
                float bassWarp = u_bass * u_distortion * 0.05;
                uv.x += sin(uv.y * 10.0 + u_time * 5.0) * bassWarp;

                // Move horizon up/down
                float y = uv.y + 0.3 - (u_elevation * 0.1) - (u_trend * 0.05);
                
                // SKY / HORIZON
                if (y > 0.0) {
                    float starGlow = max(0.0, 1.0 - length(uv) * 0.5);
                    vec3 skyColor = mix(vec3(0.0), u_colorB, starGlow * u_trend * 0.3);
                    
                    // Simple retro "sun" flashing to the beat
                    float sunDist = length(vec2(uv.x, uv.y - 0.1));
                    if (sunDist < 0.3) {
                        float sunGlow = smoothstep(0.3, 0.25, sunDist);
                        // Add scanlines to the sun
                        float lines = sin(uv.y * 150.0 - u_time * 2.0);
                        if (lines > 0.0 || sunDist < 0.15) {
                            skyColor += u_colorA * sunGlow * (0.5 + u_bass * 0.5);
                        }
                    }
                    gl_FragColor = vec4(skyColor, 1.0);
                    return;
                }
                
                // MATH FLOOR PROJECTION (Depth mapping)
                float depth = 1.0 / abs(y);
                vec2 floorUV;
                floorUV.x = uv.x * depth; 
                floorUV.y = depth + (u_time * u_speed * 0.5); 
                
                // Bumpy/Warping Terrain
                float bump = sin(floorUV.x * 5.0) * cos(floorUV.y * 5.0) * u_trend * 0.5;
                floorUV.y += bump;

                // GRID CALCULATION
                // Fract creates the repeating 0.0 - 1.0 tiles
                vec2 grid = fract(floorUV * 4.0);
                
                // Scale line thickness by depth so distant lines aren't huge
                float thickness = 0.05 * depth * u_glow; 
                
                // Smooth edges
                float lineX = smoothstep(1.0 - thickness, 1.0, grid.x) + smoothstep(thickness, 0.0, grid.x);
                float lineY = smoothstep(1.0 - thickness, 1.0, grid.y) + smoothstep(thickness, 0.0, grid.y);
                float glow = max(lineX, lineY);
                
                // Colorize
                vec3 finalColor = mix(u_colorA, u_colorB, mod(floorUV.y * 0.1, 1.0));
                
                // Distance fog / fade out
                float distanceFade = exp(-depth * 0.15);
                
                // Flashing brightness on beat
                finalColor *= (1.0 + (u_bass * u_distortion));
                
                gl_FragColor = vec4(finalColor * glow * distanceFade, 1.0);
            }
        `;

        const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, fsSource);

        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            console.error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.program));
        }

        // Cache uniform locations
        this.uniforms = {
            time: this.gl.getUniformLocation(this.program, 'u_time'),
            resolution: this.gl.getUniformLocation(this.program, 'u_resolution'),
            trend: this.gl.getUniformLocation(this.program, 'u_trend'),
            bass: this.gl.getUniformLocation(this.program, 'u_bass'),
            colorA: this.gl.getUniformLocation(this.program, 'u_colorA'),
            colorB: this.gl.getUniformLocation(this.program, 'u_colorB'),
            speed: this.gl.getUniformLocation(this.program, 'u_speed'),
            elevation: this.gl.getUniformLocation(this.program, 'u_elevation'),
            glow: this.gl.getUniformLocation(this.program, 'u_glow'),
            distortion: this.gl.getUniformLocation(this.program, 'u_distortion')
        };
    }

    compileShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    initGeometry() {
        // Just a massive rectangle covering the screen: (-1, -1) to (1, 1)
        const vertices = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
             1.0,  1.0,
        ]);

        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.positionAttribute = this.gl.getAttribLocation(this.program, 'a_position');
    }

    hexToVec3(hex) {
        if (!hex) return [0,0,0];
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16) / 255.0,
            parseInt(result[2], 16) / 255.0,
            parseInt(result[3], 16) / 255.0
        ] : [1,1,1];
    }

    render(engine, time) {
        if (!this.supported) return;

        this.gl.useProgram(this.program);

        // Bind Standard Variables
        this.gl.uniform1f(this.uniforms.time, time / 1000.0);
        this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
        this.gl.uniform1f(this.uniforms.trend, engine.trend);
        this.gl.uniform1f(this.uniforms.bass, engine.smoothed.bass / 255.0);

        // Bind Colors (Use the active preset's palette)
        // Taking the first and second colors of the palette as the primary and secondary synthwave colors
        const palette = engine.active.settings.palette;
        this.gl.uniform3fv(this.uniforms.colorA, this.hexToVec3(palette[0]));
        this.gl.uniform3fv(this.uniforms.colorB, this.hexToVec3(palette[1]));

        // Bind Engine Parameters (with LERP evaluation built into engine.p())
        this.gl.uniform1f(this.uniforms.speed, engine.p('webglSpeed'));
        this.gl.uniform1f(this.uniforms.elevation, engine.p('webglElevation'));
        this.gl.uniform1f(this.uniforms.glow, engine.p('webglGlow'));
        this.gl.uniform1f(this.uniforms.distortion, engine.p('webglDistortion'));

        // Draw the Quad
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.vertexAttribPointer(this.positionAttribute, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.positionAttribute);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}
