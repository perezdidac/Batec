const fs = require('fs');

let content = fs.readFileSync('visualizer/js/config.js', 'utf8');

// The goal is to move waves, rays, photos, particles, text out of createDefaultParams
// and into a getLayerParams function. Also add layers support to createDefaultPreset.

const layerParamsCode = `
function getLayerParams(type, layerId) {
    const params = {};
    if (type === 'waves') {
        params[\`waveCount_\${layerId}\`] = { cat: \`waves_\${layerId}\`, name: 'Emanation Rings', min: 0, max: 50, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Number of circular waves expanding from the center.' };
        params[\`waveSpeed_\${layerId}\`] = { cat: \`waves_\${layerId}\`, name: 'Wave Velocity', min: -10, max: 10, step: 0.1, value: 2.0, formula: '2.0 * (1 + trend)', useFormula: false, desc: 'The speed at which rings expand. Negative values make rings collapse inward.' };
        params[\`waveThickness_\${layerId}\`] = { cat: \`waves_\${layerId}\`, name: 'Stroke Width [px]', min: 1, max: 100, step: 1, value: 10, formula: '10 + bass/5', useFormula: false, desc: 'Thickness of the circular wave outlines.' };
        params[\`waveChaos_\${layerId}\`] = { cat: \`waves_\${layerId}\`, name: 'Distortion Field', min: 0, max: 200, step: 1, value: 20, formula: 'Math.sin(time/200) * 50', useFormula: false, desc: 'Adds Perlin-like noise distortion to the wave perimeter for an organic, liquid look.' };
        params[\`waveOpacity_\${layerId}\`] = { cat: \`waves_\${layerId}\`, name: 'Global Opacity', min: 0, max: 1, step: 0.05, value: 0.8, formula: '0.8', useFormula: false, desc: 'Alpha transparency for the entire wave layer.' };
    } else if (type === 'rays') {
        params[\`rayCount_\${layerId}\`] = { cat: \`rays_\${layerId}\`, name: 'Laser Beams', min: 0, max: 200, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Number of light rays emanating from the center point.' };
        params[\`raySpeed_\${layerId}\`] = { cat: \`rays_\${layerId}\`, name: 'Tunnel Rotation', min: -5, max: 5, step: 0.1, value: 0.5, formula: '0.5 + Math.sin(time/5000)', useFormula: false, desc: 'Rotation speed of the beam array.' };
        params[\`rayThickness_\${layerId}\`] = { cat: \`rays_\${layerId}\`, name: 'Beam Width', min: 1, max: 50, step: 1, value: 4, formula: '4 + (bass/50)', useFormula: true, desc: 'Width of each individual light ray.' };
        params[\`rayCenterHole_\${layerId}\`] = { cat: \`rays_\${layerId}\`, name: 'Void Radius', min: 0, max: 800, step: 5, value: 80, formula: '80 + (trend * 150)', useFormula: true, desc: 'Creates a black circular "Eye" in the center where no rays are drawn.' };
        params[\`rayChaos_\${layerId}\`] = { cat: \`rays_\${layerId}\`, name: 'Jitter Distortion', min: 0, max: 2, step: 0.05, value: 0.2, formula: '0.2 + trend', useFormula: false, desc: 'Adds aggressive jitter to the beam position for a glitched, strobe-like effect.' };
        params[\`rayOpacity_\${layerId}\`] = { cat: \`rays_\${layerId}\`, name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.9, formula: '0.9', useFormula: false, desc: 'Alpha transparency for the laser beams.' };
    } else if (type === 'photos') {
        params[\`imgScale_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Base Scale [x]', min: 0.5, max: 5, step: 0.1, value: 1.6, formula: '1.6 + trend*0.5', useFormula: false, desc: 'The zoom level of the background media.' };
        params[\`imgOpacity_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Global Opacity', min: 0, max: 1, step: 0.01, value: 0.7, formula: '0.2 + (avg/255)*0.8', useFormula: false, desc: 'Transparency of the background media pool.' };
        params[\`imgGlitch_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Glitch Intensity', min: 0, max: 500, step: 1, value: 0, formula: '120 + bass', useFormula: false, desc: 'Randomized X/Y offset applied to the image based on music energy.' };
        params[\`imgBlur_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Optical Blur [px]', min: 0, max: 200, step: 1, value: 20, formula: '20 + bass/10', useFormula: true, desc: 'Real-time gaussian-style blur applied to the media pool.' };
        params[\`imgSaturate_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Saturation [%]', min: 0, max: 500, step: 1, value: 150, formula: '100 + trend*200', useFormula: true, desc: 'Deepens or washes out colors. 100% is natural, 0% is B&W.' };
        params[\`photoRotation_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Tilt Axis [rad]', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'Math.sin(time/2000) * 0.2', useFormula: false, desc: 'Slow rotation of the background media for a floating sensation.' };
        params[\`photoContrast_\${layerId}\`] = { cat: \`photos_\${layerId}\`, name: 'Contrast Mod [%]', min: 0, max: 500, step: 1, value: 110, formula: '100 + bass', useFormula: false, desc: 'Digital contrast boost. High values (>200) create a high-fashion, high-energy look.' };
    } else if (type === 'particles') {
        params[\`particleCount_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Kinetic Volume', min: 0, max: 2500, step: 10, value: 500, formula: '500 + Math.floor(trend*1000)', useFormula: false, desc: 'Number of active debris particles.' };
        params[\`particleSize_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Geometry Scale', min: 0.1, max: 150, step: 0.1, value: 4.0, formula: '3 + (bass/255) * 8 * trend', useFormula: true, desc: 'Size of individual particles.' };
        params[\`particleSpeed_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Speed Limit', min: 0.1, max: 20, step: 0.1, value: 2.0, formula: '2.0 + trend*5', useFormula: false, desc: 'How fast particles move.' };
        params[\`particleChaos_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Brownian Force', min: 0, max: 200, step: 1, value: 60, formula: '60 + bass', useFormula: false, desc: 'Random force applied to particle movement.' };
        params[\`particleOpacity_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Alpha Blend', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.2 + trend*0.5', useFormula: false, desc: 'Transparency of the particle field.' };
        params[\`particleDirection_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Force Vector', min: -Math.PI, max: Math.PI, step: 0.05, value: 0, formula: 'Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)', useFormula: true, desc: 'The direction particles travel.' };
        params[\`particleColorSpeed_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Hue Pulse', min: 0, max: 100, step: 1, value: 10, formula: '10 + trend*50', useFormula: false, desc: 'Speed at which particles cycle through the palette colors.' };
        params[\`particleRotation_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Geometry Spin', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'time/1000', useFormula: false, desc: 'Rotation of shapes like squares and triangles.' };
        params[\`particleGravity_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Gravity Y-Pull', min: -10, max: 10, step: 0.1, value: 0, formula: 'trend > 0.8 ? -2 : 1', useFormula: false, desc: 'Simulates weight pulling particles up or down.' };
        params[\`particleWind_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Atmospheric Wind', min: -20, max: 20, step: 0.1, value: 2.0, formula: '2.0 + (trend * 10)', useFormula: true, desc: 'A global force that causes all particles to drift collectively. Best mapped to overall song energy.' };
        params[\`particleBreezeStrength_\${layerId}\`] = { cat: \`particles_\${layerId}\`, name: 'Organic Breeze', min: 0, max: 1, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'The intensity of the collective rhythmic swaying of particles.' };
    } else if (type === 'text') {
        params[\`textScale_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Typography Zoom [x]', min: 0.1, max: 5.0, step: 0.05, value: 1.0, formula: '1.0 + trend', useFormula: false, desc: 'Size multiplier for the lyric text.' };
        params[\`textBlur_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Atmosphere Fog [px]', min: 0, max: 200, step: 1, value: 30, formula: '30 + (1-trend)*20', useFormula: false, desc: 'Blur applied to text for a cinematic, hazy glow.' };
        params[\`textJitterX_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Glitch Shift X [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.sin(time/200) * trend * 30', useFormula: true, desc: 'Horizontal jitter applied to lyrics.' };
        params[\`textJitterY_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Glitch Shift Y [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.cos(time/200) * trend * 30', useFormula: true, desc: 'Vertical jitter applied to lyrics.' };
        params[\`textRotation_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Z-Rotation [rad]', min: -0.5, max: 0.5, step: 0.01, value: 0, formula: 'Math.sin(time/1000) * 0.1', useFormula: false, desc: 'Subtle weaving rotation for text.' };
        params[\`textOpacity_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.4 + trend*0.6', useFormula: false, desc: 'Transparency of the text layer.' };
        params[\`textHoldTime_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Text Duration [s]', min: 1, max: 60, step: 0.5, value: 5.0, formula: '5', useFormula: false, desc: 'How long each word stays on screen.' };
        params[\`textFadeTime_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Text Transition [s]', min: 0.1, max: 10, step: 0.1, value: 1.0, formula: '1', useFormula: false, desc: 'Duration of the fade-in/out transition.' };
        params[\`textTypeSpeed_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Typewriter Speed', min: 10, max: 200, step: 5, value: 60, formula: '60', useFormula: false, desc: 'Milliseconds delay between characters for the nostalgic typewriter effect.' };
        params[\`textEnvironmentDrift_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Atmospheric Breeze', min: 0, max: 1, step: 0.01, value: 0.2, formula: '0.2 + trend', useFormula: true, desc: 'How much the text sways in the collective rhythmic drift.' };
        params[\`textInkResolve_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Ink Resolve Speed', min: 0, max: 1, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'How quickly the text "soaks" into existence during its resolve animation.' };
        params[\`textGlow_\${layerId}\`] = { cat: \`text_\${layerId}\`, name: 'Text Aura [px]', min: 0, max: 200, step: 1, value: 0, formula: '(bass/255)*20', useFormula: true, desc: 'Adds an atmospheric glowing drop-shadow behind text.' };
    }
    return establishDefaults(params);
}
`;

content = layerParamsCode + "\n" + content;

// Remove the old params from createDefaultParams
content = content.replace(/\/\/ WAVES[\s\S]*?\/\/ ANALOG POST-PROCESSING/, '// ANALOG POST-PROCESSING');

// Update createDefaultPreset to include layers
const presetCode = `
function createDefaultPreset(name = "New Preset") {
    // Generate initial layers using random IDs
    const layerId1 = Math.random().toString(36).substr(2, 9);

    // We add the layers config
    const params = establishDefaults(createDefaultParams());

    return {
        name: name,
        layers: [
            // { id: layerId1, type: 'waves', enabled: false, settings: {} }
            // Let's add default backwards compatible layers but make them part of the layers list instead of global toggles
        ],
        settings: {
            palette: ['#FFD700', '#FF8C00', '#FF4500', '#87CEEB', '#00BFFF', '#228B22'],

            // Global Toggles
            physicsEnabled: true,
            analogEnabled: false,
            webglEnabled: false,
            webglProjection: '3d', // '3d' or '2d'
            shaderStyle: 'panot', // 'grid', 'panot', 'mosaic', 'cells'
            horizonEnabled: true,
            horizonStyle: 'montserrat', // 'montserrat', 'pines', 'rooftops'
            gpu_fxEnabled: false
        },
        params: params
    };
}`;

content = content.replace(/function createDefaultPreset[\s\S]*?};[\n\r]*}/, presetCode);

fs.writeFileSync('visualizer/js/config.js', content, 'utf8');
