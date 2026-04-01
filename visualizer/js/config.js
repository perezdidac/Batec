function createDefaultParams() {
    return {
        // PHYSICS
        sensitivity: { cat: 'physics', name: 'Mic Sens. [x]', min: 0.1, max: 20, step: 0.1, value: 2.8, formula: '2.8 + bass/100', useFormula: false, desc: 'Multiplies incoming audio energy. Higher values make the visualizer more reactive to quiet music.' },
        trendRate: { cat: 'physics', name: 'Trend Rate', min: 0.001, max: 0.2, step: 0.001, value: 0.04, formula: '0.04', useFormula: false, desc: 'Determines how fast the "Energy Trend" (0-1) updates. Low values create a smooth long-term average.' },
        clearOpacity: { cat: 'physics', name: 'Trail Persistence', min: 0, max: 1, step: 0.01, value: 0.12, formula: '0.12 + (1 - trend) * 0.1', useFormula: false, desc: 'Controls how much of the previous frame remains. 0 = Permanent trails, 1 = No trails.' },

        // WAVES
        waveCount: { cat: 'waves', name: 'Emanation Rings', min: 0, max: 50, step: 1, value: 0, formula: 'Math.floor(bass/50)', useFormula: false, desc: 'Number of circular waves expanding from the center. Works best when tied to Bass via formula.' },
        waveSpeed: { cat: 'waves', name: 'Wave Velocity', min: -10, max: 10, step: 0.1, value: 2.0, formula: '2.0 * (1 + trend)', useFormula: false, desc: 'The speed at which rings expand. Negative values make rings collapse inward.' },
        waveThickness: { cat: 'waves', name: 'Stroke Width [px]', min: 1, max: 100, step: 1, value: 10, formula: '10 + bass/5', useFormula: false, desc: 'Thickness of the circular wave outlines.' },
        waveChaos: { cat: 'waves', name: 'Distortion Field', min: 0, max: 200, step: 1, value: 20, formula: 'Math.sin(time/200) * 50', useFormula: false, desc: 'Adds Perlin-like noise distortion to the wave perimeter for an organic, liquid look.' },
        waveOpacity: { cat: 'waves', name: 'Global Opacity', min: 0, max: 1, step: 0.05, value: 0.8, formula: '0.8', useFormula: false, desc: 'Alpha transparency for the entire wave layer.' },

        // RAYS (HYPERSPACE)
        rayCount: { cat: 'rays', name: 'Laser Beams', min: 0, max: 200, step: 1, value: 24, formula: '24 + (trend > 0.8 ? 16 : 0)', useFormula: true, desc: 'Number of light rays emanating from the center point.' },
        raySpeed: { cat: 'rays', name: 'Tunnel Rotation', min: -5, max: 5, step: 0.1, value: 0.5, formula: '0.5 + Math.sin(time/5000)', useFormula: false, desc: 'Rotation speed of the beam array.' },
        rayThickness: { cat: 'rays', name: 'Beam Width', min: 1, max: 50, step: 1, value: 4, formula: '4 + (bass/50)', useFormula: true, desc: 'Width of each individual light ray.' },
        rayCenterHole: { cat: 'rays', name: 'Void Radius', min: 0, max: 800, step: 5, value: 80, formula: '80 + (trend * 150)', useFormula: true, desc: 'Creates a black circular "Eye" in the center where no rays are drawn.' },
        rayChaos: { cat: 'rays', name: 'Jitter Distortion', min: 0, max: 2, step: 0.05, value: 0.2, formula: '0.2 + trend', useFormula: false, desc: 'Adds aggressive jitter to the beam position for a glitched, strobe-like effect.' },
        rayOpacity: { cat: 'rays', name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.9, formula: '0.9', useFormula: false, desc: 'Alpha transparency for the laser beams.' },

        // PHOTOS
        imgScale: { cat: 'photos', name: 'Base Scale [x]', min: 0.5, max: 5, step: 0.1, value: 1.6, formula: '1.6 + trend*0.5', useFormula: false, desc: 'The zoom level of the background media. Values > 1 ensure Mediterranean artifacts fill the screen.' },
        imgGlitch: { cat: 'photos', name: 'Glitch Intensity', min: 0, max: 500, step: 1, value: 120, formula: '120 + bass', useFormula: false, desc: 'Randomized X/Y offset applied to the image based on music energy.' },
        imgBlur: { cat: 'photos', name: 'Optical Blur [px]', min: 0, max: 200, step: 1, value: 20, formula: '20 + bass/10', useFormula: true, desc: 'Real-time gaussian-style blur applied to the media pool.' },
        imgSaturate: { cat: 'photos', name: 'Saturation [%]', min: 0, max: 500, step: 1, value: 150, formula: '100 + trend*200', useFormula: true, desc: 'Deepens or washes out colors. 100% is natural, 0% is B&W.' },
        photoRotation: { cat: 'photos', name: 'Tilt Axis [rad]', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'Math.sin(time/2000) * 0.2', useFormula: false, desc: 'Slow rotation of the background media for a floating sensation.' },
        photoContrast: { cat: 'photos', name: 'Contrast Mod [%]', min: 0, max: 500, step: 1, value: 110, formula: '100 + bass', useFormula: false, desc: 'Digital contrast boost. High values (>200) create a high-fashion, high-energy look.' },

        // PARTICLES
        particleCount: { cat: 'particles', name: 'Kinetic Volume', min: 0, max: 2500, step: 10, value: 500, formula: '500 + Math.floor(trend*1000)', useFormula: false, desc: 'Number of active debris particles.' },
        particleSize: { cat: 'particles', name: 'Geometry Scale', min: 0.1, max: 150, step: 0.1, value: 4.0, formula: '3 + (bass/255) * 8 * trend', useFormula: true, desc: 'Size of individual particles.' },
        particleSpeed: { cat: 'particles', name: 'Speed Limit', min: 0.1, max: 20, step: 0.1, value: 2.0, formula: '2.0 + trend*5', useFormula: false, desc: 'How fast particles move.' },
        particleChaos: { cat: 'particles', name: 'Brownian Force', min: 0, max: 200, step: 1, value: 60, formula: '60 + bass', useFormula: false, desc: 'Random force applied to particle movement.' },
        particleOpacity: { cat: 'particles', name: 'Alpha Blend', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.2 + trend*0.5', useFormula: false, desc: 'Transparency of the particle field.' },
        particleDirection: { cat: 'particles', name: 'Force Vector', min: -Math.PI, max: Math.PI, step: 0.05, value: 0, formula: 'Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)', useFormula: true, desc: 'The direction particles travel.' },
        particleColorSpeed: { cat: 'particles', name: 'Hue Pulse', min: 0, max: 100, step: 1, value: 10, formula: '10 + trend*50', useFormula: false, desc: 'Speed at which particles cycle through the palette colors.' },
        particleRotation: { cat: 'particles', name: 'Geometry Spin', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'time/1000', useFormula: false, desc: 'Rotation of shapes like squares and triangles.' },
        particleGravity: { cat: 'particles', name: 'Gravity Y-Pull', min: -10, max: 10, step: 0.1, value: 0, formula: 'trend > 0.8 ? -2 : 1', useFormula: false, desc: 'Simulates weight pulling particles up or down.' },

        // TEXT
        textScale: { cat: 'text', name: 'Typography Zoom [x]', min: 0.1, max: 5.0, step: 0.05, value: 1.0, formula: '1.0 + trend', useFormula: false, desc: 'Size multiplier for the lyric text.' },
        textBlur: { cat: 'text', name: 'Atmosphere Fog [px]', min: 0, max: 200, step: 1, value: 30, formula: '30 + (1-trend)*20', useFormula: false, desc: 'Blur applied to text for a cinematic, hazy glow.' },
        textJitterX: { cat: 'text', name: 'Glitch Shift X [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.sin(time/200) * trend * 30', useFormula: true, desc: 'Horizontal jitter applied to lyrics.' },
        textJitterY: { cat: 'text', name: 'Glitch Shift Y [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.cos(time/200) * trend * 30', useFormula: true, desc: 'Vertical jitter applied to lyrics.' },
        textRotation: { cat: 'text', name: 'Z-Rotation [rad]', min: -0.5, max: 0.5, step: 0.01, value: 0, formula: 'Math.sin(time/1000) * 0.1', useFormula: false, desc: 'Subtle weaving rotation for text.' },
        textOpacity: { cat: 'text', name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.4 + trend*0.6', useFormula: false, desc: 'Transparency of the text layer.' },
        textHoldTime: { cat: 'text', name: 'Text Duration [s]', min: 1, max: 60, step: 0.5, value: 5.0, formula: '5', useFormula: false, desc: 'How long each word stays on screen.' },
        textFadeTime: { cat: 'text', name: 'Text Transition [s]', min: 0.1, max: 10, step: 0.1, value: 1.0, formula: '1', useFormula: false, desc: 'Duration of the fade-in/out transition.' },

        // ANALOG POST-PROCESSING
        analogDrift: { cat: 'analog', name: 'RGB Ghosting [px]', min: 0, max: 200, step: 1, value: 5, formula: 'trend > 0.8 ? 50 : 5', useFormula: true, desc: 'Offsets Color Channels for a nostalgic double-vision effect.' },
        analogScanlines: { cat: 'analog', name: 'CRT Scanlines', min: 0, max: 0.3, step: 0.01, value: 0.15, formula: '0.15', useFormula: false, desc: 'Simulates old TV hardware by drawing horizontal bars across the entire image.' },
        analogNoise: { cat: 'analog', name: 'Film Grain', min: 0, max: 1, step: 0.01, value: 0.08, formula: '0.08 + (bass/255)*0.2', useFormula: true, desc: 'Adds digital noise for a cinematic, film-like texture.' },
        analogWarmth: { cat: 'analog', name: 'Mediterranean Glow', min: 0, max: 1, step: 0.05, value: 0.3, formula: '0.3', useFormula: false, desc: 'Applies a sunset-inspired warm color wash specifically tailored for Agost projections.' },
        analogLightLeak: { cat: 'analog', name: 'Sun Flare Leaks', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.4 + (trend * 0.3)', useFormula: true, desc: 'Simulates light leaking into a film camera lens.' },
        analogVignette: { cat: 'analog', name: 'Vignette Darkening', min: 0, max: 1, step: 0.05, value: 0.5, formula: '0.5 + (avg/255)*0.2', useFormula: true, desc: 'Darkens the corners of the screen to draw focus to the center.' },
        // WEBGL BACKGROUND
        webglSpeed: { cat: 'webgl', name: 'Grid Speed', min: 0, max: 20, step: 0.1, value: 5.0, formula: '5 + (trend * 10)', useFormula: true, desc: 'Forward scrolling speed of the 3D Cyber Grid.' },
        webglElevation: { cat: 'webgl', name: 'Floor Elevation', min: -5, max: 5, step: 0.1, value: 1.0, formula: '1.0 + Math.sin(time/1000)', useFormula: false, desc: 'Camera height above the infinite 3D plane.' },
        webglGlow: { cat: 'webgl', name: 'Grid Glow', min: 0, max: 2, step: 0.01, value: 0.8, formula: '0.5 + (bass/255)*0.5', useFormula: true, desc: 'Intensity and thickness of the neon grid lines.' },
        webglDistortion: { cat: 'webgl', name: 'Bass Distortion', min: 0, max: 5, step: 0.1, value: 1.5, formula: '1.5 + (trend * 2)', useFormula: true, desc: 'How violently the grid bumps and warps to the audio.' },

        // GPU POST PROCESSING (Melting & Smear)
        gpuAberration: { cat: 'gpu_fx', name: 'Chromatic Warp', min: 0, max: 0.5, step: 0.01, value: 0.05, formula: '0.05 + (bass/255)*0.1', useFormula: true, desc: 'Splits R, G, B channels radially outwards.' },
        gpuSmearRatio: { cat: 'gpu_fx', name: 'Fluid Density', min: 0, max: 0.99, step: 0.01, value: 0.0, formula: '0.5', useFormula: false, desc: 'Amount of previous frames left on screen. 0 is none, 0.99 is infinite smearing trails.' },
        gpuMeltSpeed: { cat: 'gpu_fx', name: 'Gravity Drip', min: -0.05, max: 0.05, step: 0.001, value: 0.005, formula: '0.005 + (trend * 0.01)', useFormula: false, desc: 'Pulls the smeared pixels downwards like dripping paint. Negative values drift up.' },
        gpuKaleidoSegments: { cat: 'gpu_fx', name: 'Kaleidoscope Slices', min: 0, max: 16, step: 1, value: 0, formula: '6', useFormula: false, desc: 'Folds the screen geometry into Polar mirrored segments.' },
        gpuKaleidoRot: { cat: 'gpu_fx', name: 'Mirror Spin [rad]', min: -Math.PI, max: Math.PI, step: 0.1, value: 0, formula: '(time/1000) * 0.2', useFormula: true, desc: 'Rotates the physical reflection array.' }
    };
}

function establishDefaults(params) {
    Object.keys(params).forEach(k => {
        if (params[k].defaultVal === undefined) {
            params[k].defaultVal = params[k].value;
            params[k].defaultForm = params[k].formula;
        }
    });
    return params;
}

function createDefaultPreset(name = "New Preset") {
    return {
        name: name,
        settings: {
            palette: ['#FFD700', '#FF8C00', '#FF4500', '#87CEEB', '#00BFFF', '#228B22'],
            particleShape: 'circle',
            imgBlendMode: 'screen',
            imgIndices: [], // Default photos off
            photoSourceMode: 'photos', // 'photos' or 'webcams'
            webcamIndices: [],
            textEnabled: true, // RE-ENABLED by default so user can see it works
            textList: ["AGOST", "", "", "", ""],
            textSequenceMode: 'order',

            // Category Toggles
            physicsEnabled: true,
            wavesEnabled: true,
            raysEnabled: true,
            photosEnabled: true,
            particlesEnabled: true,
            analogEnabled: true,
            webglEnabled: true,
            gpu_fxEnabled: true
        },
        params: establishDefaults(createDefaultParams())
    };
}