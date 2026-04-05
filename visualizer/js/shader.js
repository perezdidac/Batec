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

            // Panot Parameters
            uniform float u_panotScale;
            uniform float u_panotBloom;
            uniform float u_panotRotation;
            uniform float u_panotMortar;
            uniform float u_panotThickness;
            uniform float u_panotRoundness;
            uniform float u_panotShadow;
            uniform float u_projectionMode; // 0: 2D, 1: 3D
            uniform float u_shaderStyle; // 0: Grid, 1: Panot, 2: Mosaic, 3: Cells

            // Horizon Parameters
            uniform float u_horizonSpeed;
            uniform float u_horizonComplexity;
            uniform float u_horizonEnabled; // 0 or 1

            // NOISE UTILS FOR CONCRETE
            float hash(vec2 p) {
                p = fract(p * vec2(123.34, 456.21));
                p += dot(p, p + 45.32);
                return fract(p.x * p.y);
            }

            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }

            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 4; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            mat2 rotate2d(float _angle){
                return mat2(cos(_angle),-sin(_angle),
                            sin(_angle),cos(_angle));
            }

            float sdCircle(vec2 p, float r) {
                return length(p) - r;
            }

            float sdPetal(vec2 p, float s) {
                p = abs(p);
                if (p.y > p.x) p = p.yx;
                return length(p - vec2(s, 0.0)) - s * 0.5;
            }

            float drawHorizon(vec2 uv) {
                float h = 0.0;
                float layers = min(u_horizonComplexity, 20.0);
                
                for (float i = 1.0; i <= 20.0; i++) {
                    if (i > layers) break;
                    
                    float speed = u_horizonSpeed * i * 0.05;
                    float x = uv.x * (0.8 + i * 0.1) + u_time * speed;
                    
                    // Montserrat peaks: jagged, steep noise
                    float n = noise(vec2(x, 0.0));
                    float peak = pow(n, 1.5) * (0.8 / i); // Adjust intensity based on layers
                    
                    // Map uv.y to a visible range near horizon
                    if (uv.y < (peak / sqrt(i)) - 0.1) {
                         h = 1.0 - (i / layers); 
                    }
                }
                return h;
            }

            // Gaudí Trencadís Mosaic Logic
            float drawMosaic(vec2 uv, out float outD) {
                vec2 st = uv * u_panotScale;
                st *= rotate2d(u_panotRotation);
                
                // Voronoi-based broken tile pattern
                vec2 ipos = floor(st);
                vec2 fpos = fract(st);
                float m_dist = 1.0;
                vec2 m_point;
                
                for (int y= -1; y <= 1; y++) {
                    for (int x= -1; x <= 1; x++) {
                        vec2 neighbor = vec2(float(x),float(y));
                        vec2 point = vec2(hash(ipos + neighbor), hash(ipos + neighbor + 13.5));
                        point = 0.5 + 0.5*sin(u_time * 0.2 + 6.2831*point); // Animate pieces
                        vec2 diff = neighbor + point - fpos;
                        float dist = length(diff);
                        if (dist < m_dist) {
                            m_dist = dist;
                            m_point = point;
                        }
                    }
                }
                outD = m_dist;
                return m_dist < 0.05 ? 0.0 : 1.0; // Grout between pieces
            }

            // Organic Cells Logic
            float drawCells(vec2 uv) {
                vec2 st = uv * u_panotScale * 0.5;
                st *= rotate2d(u_panotRotation + u_time * 0.1);
                float d = 0.0;
                d = noise(st + u_time * 0.2);
                return smoothstep(0.4, 0.6, d);
            }

            float drawPanot(vec2 uv, out float outD) {
                vec2 st = uv * u_panotScale;
                st *= rotate2d(u_panotRotation);
                vec2 fpos = fract(st);

                vec2 p = fpos - 0.5;
                
                // SVG GEOMETRY: 5 Interlocking Rings (All circumferences)
                float R = 0.15 + u_panotBloom * 0.05; // Base radius
                float thickness = u_panotThickness;
                float offset = R * 0.85; // Diagonal offset for interlocking
                
                // 1. Central CIRCUMFERENCE (No fill)
                float centralRing = abs(length(p) - R) - thickness;
                
                // 2. 4 "Petal" rings placed diagonally 
                vec2 q = abs(p) - vec2(offset);
                float petalRings = abs(length(q) - R) - thickness;
                
                // 3. MASK: Ensure NOTHING is inside the central circle
                // We "subtract" the area inside the central ring from the petals
                float centralHole = length(p) - (R - thickness);
                float hollowPetals = max(petalRings, -centralHole);
                
                // Combined Panot shape (Union of the central ring and the hollowed petals)
                float d = min(centralRing, hollowPetals);

                // Add the tile separation (Mortar)
                float border = max(abs(p.x), abs(p.y));
                float tile = border - (0.5 - u_panotMortar);
                d = max(d, tile); 
                
                outD = d;
                return 1.0 - smoothstep(0.0, u_panotRoundness, d);
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
                
                // Bass distortion warp on X axis
                float bassWarp = u_bass * u_distortion * 0.05;
                uv.x += sin(uv.y * 10.0 + u_time * 5.0) * bassWarp;

                // Move horizon up/down with stronger scaling for the min/max (-5 to 5)
                float y = uv.y + 0.3 - (u_elevation * 0.3) - (u_trend * 0.05);
                
                // SKY / HORIZON
                if (y > 0.0) {
                    // SKY AREA
                    float starGlow = max(0.0, 1.0 - length(uv) * 0.5);
                    vec3 skyColor = mix(vec3(0.02), u_colorB, starGlow * u_trend * 0.3);
                    
                    if (u_horizonEnabled > 0.5) {
                        float scenery = drawHorizon(uv);
                        skyColor = mix(skyColor, vec3(0.01), scenery); // Silhouette color
                        // Add star-fringe/edge lighting
                        skyColor += u_colorB * scenery * 0.1 * u_trend;
                    } else if (u_shaderStyle < 0.5) {
                        // Old retro "sun" flashing to the beat
                        float sunDist = length(vec2(uv.x, uv.y - 0.1));
                        if (sunDist < 0.3) {
                            float sunGlow = smoothstep(0.3, 0.25, sunDist);
                            float lines = sin(uv.y * 150.0 - u_time * 2.0);
                            if (lines > 0.0 || sunDist < 0.15) {
                                skyColor += u_colorA * sunGlow * (0.5 + u_bass * 0.5);
                            }
                        }
                    }
                    gl_FragColor = vec4(skyColor, 1.0);
                    return;
                }
                
                // MATH FLOOR PROJECTION
                float depth = u_projectionMode > 0.5 ? 1.0 / abs(y) : 1.0;
                vec2 floorUV;
                
                if (u_projectionMode > 0.5) {
                    floorUV.x = uv.x * depth; 
                    floorUV.y = (depth * 2.0) + (u_time * u_speed * 1.0); 
                } else {
                    floorUV = uv * 2.0; 
                    floorUV *= rotate2d(u_panotRotation);
                    floorUV += vec2(0.0, u_time * u_speed * 0.1);
                }

                if (u_shaderStyle > 0.5 && u_shaderStyle < 1.5) {
                    // 3D PANOT FLOOR (1.0)
                    float dist;
                    float pattern = drawPanot(floorUV * 0.1, dist);
                    float stone = fbm(floorUV * 10.0) * 0.1;
                    vec2 lightDir = normalize(vec2(1.0, 1.0));
                    float gradX = drawPanot((floorUV + vec2(0.005, 0.0)) * 0.1, dist) - pattern;
                    float gradY = drawPanot((floorUV + vec2(0.0, 0.005)) * 0.1, dist) - pattern;
                    float diff = clamp(dot(normalize(vec3(gradX, gradY, 0.01/depth)), vec3(lightDir, 1.0)), 0.0, 1.0);
                    vec3 baseColor = mix(vec3(0.2), u_colorA, 0.15); 
                    vec3 col = baseColor + stone;
                    col *= (1.0 - pattern * 0.4); 
                    col += diff * u_panotShadow * 0.5;
                    col += u_colorB * pattern * (0.2 + u_bass * 0.3) * (0.5 + u_glow * 1.5);
                    float distanceFade = u_projectionMode > 0.5 ? exp(-depth * 0.15) : 1.0;
                    gl_FragColor = vec4(col * distanceFade, 1.0);
                } else if (u_shaderStyle > 1.5 && u_shaderStyle < 2.5) {
                    // 3D TRENCADÍS MOSAIC (2.0)
                    float dist;
                    float pattern = drawMosaic(floorUV * 0.15, dist);
                    vec3 col = mix(u_colorA, u_colorB, dist * (0.5 + u_glow));
                    col *= pattern; // Grout
                    float distanceFade = u_projectionMode > 0.5 ? exp(-depth * 0.15) : 1.0;
                    gl_FragColor = vec4(col * distanceFade, 1.0);
                } else if (u_shaderStyle > 2.5) {
                    // 3D ORGANIC CELLS (3.0)
                    float pattern = drawCells(floorUV * 0.2);
                    vec3 col = mix(u_colorA, vec3(0.0), pattern);
                    col += u_colorB * (1.0 - pattern) * (0.2 + u_bass * 0.5) * (0.5 + u_glow * 2.0);
                    float distanceFade = u_projectionMode > 0.5 ? exp(-depth * 0.15) : 1.0;
                    gl_FragColor = vec4(col * distanceFade, 1.0);
                } else {
                    // OLD RETRO GRID FLOOR (0.0)
                    vec2 grid = fract(floorUV * 4.0);
                    float thickness = 0.05 * depth; // Keep line thickness consistent 
                    float lineX = smoothstep(1.0 - thickness, 1.0, grid.x) + smoothstep(thickness, 0.0, grid.x);
                    float lineY = smoothstep(1.0 - thickness, 1.0, grid.y) + smoothstep(thickness, 0.0, grid.y);
                    float glow = max(lineX, lineY);
                    vec3 finalColor = mix(u_colorA, u_colorB, mod(floorUV.y * 0.1, 1.0));
                    float distanceFade = u_projectionMode > 0.5 ? exp(-depth * 0.15) : 1.0;
                    finalColor *= (1.0 + (u_bass * u_distortion));
                    finalColor *= (1.0 + u_glow * 2.0); // True emissive glow effect
                    gl_FragColor = vec4(finalColor * glow * distanceFade, 1.0);
                }
                return;
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
            distortion: this.gl.getUniformLocation(this.program, 'u_distortion'),
            panotScale: this.gl.getUniformLocation(this.program, 'u_panotScale'),
            panotBloom: this.gl.getUniformLocation(this.program, 'u_panotBloom'),
            panotRotation: this.gl.getUniformLocation(this.program, 'u_panotRotation'),
            panotMortar: this.gl.getUniformLocation(this.program, 'u_panotMortar'),
            panotThickness: this.gl.getUniformLocation(this.program, 'u_panotThickness'),
            panotRoundness: this.gl.getUniformLocation(this.program, 'u_panotRoundness'),
            panotShadow: this.gl.getUniformLocation(this.program, 'u_panotShadow'),
            horizonSpeed: this.gl.getUniformLocation(this.program, 'u_horizonSpeed'),
            horizonComplexity: this.gl.getUniformLocation(this.program, 'u_horizonComplexity'),
            horizonEnabled: this.gl.getUniformLocation(this.program, 'u_horizonEnabled'),
            projectionMode: this.gl.getUniformLocation(this.program, 'u_projectionMode'),
            shaderStyle: this.gl.getUniformLocation(this.program, 'u_shaderStyle')
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

        // Panot Uniforms
        this.gl.uniform1f(this.uniforms.panotScale, engine.p('panotScale'));
        this.gl.uniform1f(this.uniforms.panotBloom, engine.p('panotBloom'));
        this.gl.uniform1f(this.uniforms.panotRotation, engine.p('panotRotation'));
        this.gl.uniform1f(this.uniforms.panotMortar, engine.p('panotMortar'));
        this.gl.uniform1f(this.uniforms.panotThickness, engine.p('panotThickness'));
        this.gl.uniform1f(this.uniforms.panotRoundness, engine.p('panotRoundness'));
        this.gl.uniform1f(this.uniforms.panotShadow, engine.p('panotShadow'));
        this.gl.uniform1f(this.uniforms.horizonSpeed, engine.p('horizonSpeed'));
        this.gl.uniform1f(this.uniforms.horizonComplexity, engine.p('horizonComplexity'));
        this.gl.uniform1f(this.uniforms.horizonEnabled, engine.active.settings.horizonEnabled ? 1.0 : 0.0);
        this.gl.uniform1f(this.uniforms.projectionMode, engine.active.settings.webglProjection === '3d' ? 1.0 : 0.0);
        
        let styleVal = 0.0;
        if (engine.active.settings.shaderStyle === 'panot') styleVal = 1.0;
        else if (engine.active.settings.shaderStyle === 'mosaic') styleVal = 2.0;
        else if (engine.active.settings.shaderStyle === 'cells') styleVal = 3.0;
        this.gl.uniform1f(this.uniforms.shaderStyle, styleVal);

        // Draw the Quad
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
        this.gl.vertexAttribPointer(this.positionAttribute, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(this.positionAttribute);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}
