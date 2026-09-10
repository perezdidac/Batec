
function getLayerParams(type, layerId) {
    const params = {};
    if (type === 'waves') {
        params[`waveCount_${layerId}`] = { cat: `waves_${layerId}`, name: 'Emanation Rings', min: 0, max: 50, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Number of circular waves expanding from the center.' };
        params[`waveSpeed_${layerId}`] = { cat: `waves_${layerId}`, name: 'Wave Velocity', min: -10, max: 10, step: 0.1, value: 2.0, formula: '2.0 * (1 + trend)', useFormula: false, desc: 'The speed at which rings expand. Negative values make rings collapse inward.' };
        params[`waveThickness_${layerId}`] = { cat: `waves_${layerId}`, name: 'Stroke Width [px]', min: 1, max: 100, step: 1, value: 10, formula: '10 + bass/5', useFormula: false, desc: 'Thickness of the circular wave outlines.' };
        params[`waveChaos_${layerId}`] = { cat: `waves_${layerId}`, name: 'Distortion Field', min: 0, max: 200, step: 1, value: 20, formula: 'Math.sin(time/200) * 50', useFormula: false, desc: 'Adds Perlin-like noise distortion to the wave perimeter for an organic, liquid look.' };
        params[`waveOpacity_${layerId}`] = { cat: `waves_${layerId}`, name: 'Global Opacity', min: 0, max: 1, step: 0.05, value: 0.8, formula: '0.8', useFormula: false, desc: 'Alpha transparency for the entire wave layer.' };
    } else if (type === 'rays') {
        params[`rayCount_${layerId}`] = { cat: `rays_${layerId}`, name: 'Laser Beams', min: 0, max: 200, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Number of light rays emanating from the center point.' };
        params[`raySpeed_${layerId}`] = { cat: `rays_${layerId}`, name: 'Tunnel Rotation', min: -5, max: 5, step: 0.1, value: 0.5, formula: '0.5 + Math.sin(time/5000)', useFormula: false, desc: 'Rotation speed of the beam array.' };
        params[`rayThickness_${layerId}`] = { cat: `rays_${layerId}`, name: 'Beam Width', min: 1, max: 50, step: 1, value: 4, formula: '4 + (bass/50)', useFormula: true, desc: 'Width of each individual light ray.' };
        params[`rayCenterHole_${layerId}`] = { cat: `rays_${layerId}`, name: 'Void Radius', min: 0, max: 800, step: 5, value: 80, formula: '80 + (trend * 150)', useFormula: true, desc: 'Creates a black circular "Eye" in the center where no rays are drawn.' };
        params[`rayChaos_${layerId}`] = { cat: `rays_${layerId}`, name: 'Jitter Distortion', min: 0, max: 2, step: 0.05, value: 0.2, formula: '0.2 + trend', useFormula: false, desc: 'Adds aggressive jitter to the beam position for a glitched, strobe-like effect.' };
        params[`rayOpacity_${layerId}`] = { cat: `rays_${layerId}`, name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.9, formula: '0.9', useFormula: false, desc: 'Alpha transparency for the laser beams.' };
    } else if (type === 'photos') {
        params[`imgScale_${layerId}`] = { cat: `photos_${layerId}`, name: 'Base Scale [x]', min: 0.5, max: 5, step: 0.1, value: 1.6, formula: '1.6 + trend*0.5', useFormula: false, desc: 'The zoom level of the background media.' };
        params[`imgOpacity_${layerId}`] = { cat: `photos_${layerId}`, name: 'Global Opacity', min: 0, max: 1, step: 0.01, value: 0.7, formula: '0.2 + (avg/255)*0.8', useFormula: false, desc: 'Transparency of the background media pool.' };
        params[`imgGlitch_${layerId}`] = { cat: `photos_${layerId}`, name: 'Glitch Intensity', min: 0, max: 500, step: 1, value: 0, formula: '120 + bass', useFormula: false, desc: 'Randomized X/Y offset applied to the image based on music energy.' };
        params[`imgBlur_${layerId}`] = { cat: `photos_${layerId}`, name: 'Optical Blur [px]', min: 0, max: 200, step: 1, value: 20, formula: '20 + bass/10', useFormula: true, desc: 'Real-time gaussian-style blur applied to the media pool.' };
        params[`imgSaturate_${layerId}`] = { cat: `photos_${layerId}`, name: 'Saturation [%]', min: 0, max: 500, step: 1, value: 150, formula: '100 + trend*200', useFormula: true, desc: 'Deepens or washes out colors. 100% is natural, 0% is B&W.' };
        params[`photoRotation_${layerId}`] = { cat: `photos_${layerId}`, name: 'Tilt Axis [rad]', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'Math.sin(time/2000) * 0.2', useFormula: false, desc: 'Slow rotation of the background media for a floating sensation.' };
        params[`photoContrast_${layerId}`] = { cat: `photos_${layerId}`, name: 'Contrast Mod [%]', min: 0, max: 500, step: 1, value: 110, formula: '100 + bass', useFormula: false, desc: 'Digital contrast boost. High values (>200) create a high-fashion, high-energy look.' };
    } else if (type === 'particles') {
        params[`particleCount_${layerId}`] = { cat: `particles_${layerId}`, name: 'Kinetic Volume', min: 0, max: 2500, step: 10, value: 500, formula: '500 + Math.floor(trend*1000)', useFormula: false, desc: 'Number of active debris particles.' };
        params[`particleSize_${layerId}`] = { cat: `particles_${layerId}`, name: 'Geometry Scale', min: 0.1, max: 150, step: 0.1, value: 4.0, formula: '3 + (bass/255) * 8 * trend', useFormula: true, desc: 'Size of individual particles.' };
        params[`particleSpeed_${layerId}`] = { cat: `particles_${layerId}`, name: 'Speed Limit', min: 0.1, max: 20, step: 0.1, value: 2.0, formula: '2.0 + trend*5', useFormula: false, desc: 'How fast particles move.' };
        params[`particleChaos_${layerId}`] = { cat: `particles_${layerId}`, name: 'Brownian Force', min: 0, max: 200, step: 1, value: 60, formula: '60 + bass', useFormula: false, desc: 'Random force applied to particle movement.' };
        params[`particleOpacity_${layerId}`] = { cat: `particles_${layerId}`, name: 'Alpha Blend', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.2 + trend*0.5', useFormula: false, desc: 'Transparency of the particle field.' };
        params[`particleDirection_${layerId}`] = { cat: `particles_${layerId}`, name: 'Force Vector', min: -Math.PI, max: Math.PI, step: 0.05, value: 0, formula: 'Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)', useFormula: true, desc: 'The direction particles travel.' };
        params[`particleColorSpeed_${layerId}`] = { cat: `particles_${layerId}`, name: 'Hue Pulse', min: 0, max: 100, step: 1, value: 10, formula: '10 + trend*50', useFormula: false, desc: 'Speed at which particles cycle through the palette colors.' };
        params[`particleRotation_${layerId}`] = { cat: `particles_${layerId}`, name: 'Geometry Spin', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'time/1000', useFormula: false, desc: 'Rotation of shapes like squares and triangles.' };
        params[`particleGravity_${layerId}`] = { cat: `particles_${layerId}`, name: 'Gravity Y-Pull', min: -10, max: 10, step: 0.1, value: 0, formula: 'trend > 0.8 ? -2 : 1', useFormula: false, desc: 'Simulates weight pulling particles up or down.' };
        params[`particleWind_${layerId}`] = { cat: `particles_${layerId}`, name: 'Atmospheric Wind', min: -20, max: 20, step: 0.1, value: 2.0, formula: '2.0 + (trend * 10)', useFormula: true, desc: 'A global force that causes all particles to drift collectively. Best mapped to overall song energy.' };
        params[`particleBreezeStrength_${layerId}`] = { cat: `particles_${layerId}`, name: 'Organic Breeze', min: 0, max: 1, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'The intensity of the collective rhythmic swaying of particles.' };
    } else if (type === 'text') {
        params[`textStartDelay_${layerId}`] = { cat: `text_${layerId}`, name: 'Intro Delay [s]', min: 0, max: 120, step: 1, value: 30, formula: '30', useFormula: false, desc: 'Seconds of visual ambiance before lyrics begin appearing after selecting a preset.' };
        params[`textStopDelay_${layerId}`] = { cat: `text_${layerId}`, name: 'Stop Time [s]', min: 60, max: 600, step: 5, value: 240, formula: '240', useFormula: false, desc: 'Seconds after which lyrics stop displaying (e.g. 240s = 4 minutes).' };
        params[`textPauseTime_${layerId}`] = { cat: `text_${layerId}`, name: 'Pause Between Texts [s]', min: 0, max: 60, step: 1, value: 15, formula: '15', useFormula: false, desc: 'Seconds of silent visual ambiance between different lyric lines.' };
        params[`textScale_${layerId}`] = { cat: `text_${layerId}`, name: 'Typography Zoom [x]', min: 0.1, max: 5.0, step: 0.05, value: 1.0, formula: '1.0 + trend', useFormula: false, desc: 'Size multiplier for the lyric text.' };
        params[`textBlur_${layerId}`] = { cat: `text_${layerId}`, name: 'Atmosphere Fog [px]', min: 0, max: 200, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Blur applied to text for a cinematic, hazy glow.' };
        params[`textJitterX_${layerId}`] = { cat: `text_${layerId}`, name: 'Glitch Shift X [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.sin(time/200) * trend * 30', useFormula: true, desc: 'Horizontal jitter applied to lyrics.' };
        params[`textJitterY_${layerId}`] = { cat: `text_${layerId}`, name: 'Glitch Shift Y [px]', min: -500, max: 500, step: 1, value: 0, formula: 'Math.cos(time/200) * trend * 30', useFormula: true, desc: 'Vertical jitter applied to lyrics.' };
        params[`textRotation_${layerId}`] = { cat: `text_${layerId}`, name: 'Z-Rotation [rad]', min: -0.5, max: 0.5, step: 0.01, value: 0, formula: 'Math.sin(time/1000) * 0.1', useFormula: false, desc: 'Subtle weaving rotation for text.' };
        params[`textOpacity_${layerId}`] = { cat: `text_${layerId}`, name: 'Optical Weight', min: 0, max: 1, step: 0.05, value: 0.5, formula: '0.5', useFormula: false, desc: 'Transparency of the text layer.' };
        params[`textHoldTime_${layerId}`] = { cat: `text_${layerId}`, name: 'Text Duration [s]', min: 1, max: 60, step: 0.5, value: 5.0, formula: '5', useFormula: false, desc: 'How long each word stays on screen.' };
        params[`textFadeTime_${layerId}`] = { cat: `text_${layerId}`, name: 'Text Transition [s]', min: 0.1, max: 10, step: 0.1, value: 1.0, formula: '1', useFormula: false, desc: 'Duration of the fade-in/out transition.' };
        params[`textTypeSpeed_${layerId}`] = { cat: `text_${layerId}`, name: 'Typewriter Speed', min: 10, max: 200, step: 5, value: 60, formula: '60', useFormula: false, desc: 'Milliseconds delay between characters for the nostalgic typewriter effect.' };
        params[`textEnvironmentDrift_${layerId}`] = { cat: `text_${layerId}`, name: 'Atmospheric Breeze', min: 0, max: 1, step: 0.01, value: 0.2, formula: '0.2 + trend', useFormula: true, desc: 'How much the text sways in the collective rhythmic drift.' };
        params[`textInkResolve_${layerId}`] = { cat: `text_${layerId}`, name: 'Ink Resolve Speed', min: 0, max: 1, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'How quickly the text "soaks" into existence during its resolve animation.' };
        params[`textGlow_${layerId}`] = { cat: `text_${layerId}`, name: 'Text Aura [px]', min: 0, max: 200, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Adds an atmospheric glowing drop-shadow behind text.' };
    } else if (type === 'spectrum') {
        params[`spectrumCount_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Spectrum Detail', min: 10, max: 256, step: 1, value: 64, formula: '64', useFormula: false, desc: 'Number of frequency bands or analyzer points.' };
        params[`spectrumHeight_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Amplitude Scale', min: 10, max: 1000, step: 10, value: 200, formula: '200 + bass', useFormula: false, desc: 'Vertical height/scale of spectrum visualization.' };
        params[`spectrumWidth_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Visualizer Span', min: 0.1, max: 2.0, step: 0.05, value: 0.8, formula: '0.8', useFormula: false, desc: 'Width of the visualizer line on screen.' };
        params[`spectrumX_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Center X', min: 0, max: 1.0, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'Horizontal position of center.' };
        params[`spectrumY_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Center Y', min: 0, max: 1.0, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'Vertical position of center.' };
        params[`spectrumOpacity_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Layer Weight', min: 0, max: 1, step: 0.05, value: 0.9, formula: '0.9', useFormula: false, desc: 'Transparency of the spectrum layer.' };
        params[`spectrumThickness_${layerId}`] = { cat: `spectrum_${layerId}`, name: 'Line Thickness', min: 1, max: 50, step: 1, value: 3, formula: '3', useFormula: false, desc: 'Line stroke width.' };
    } else if (type === 'rain_glass') {
        params[`rainDensity_${layerId}`] = { cat: `rain_glass_${layerId}`, name: 'Water Bead Density', min: 0.05, max: 1.0, step: 0.05, value: 0.6, formula: '0.6', useFormula: false, desc: 'Number of active condensing raindrops on the glass.' };
        params[`rainDropSize_${layerId}`] = { cat: `rain_glass_${layerId}`, name: 'Droplet Diameter', min: 0.2, max: 3.0, step: 0.1, value: 1.0, formula: '1.0 + (trend * 0.5)', useFormula: false, desc: 'Scale factor for droplet size.' };
        params[`rainDripSpeed_${layerId}`] = { cat: `rain_glass_${layerId}`, name: 'Trickle Velocity', min: 0.1, max: 5.0, step: 0.1, value: 1.0, formula: '0.8 + (trend * 1.5)', useFormula: true, desc: 'Speed at which runner droplets run down the windowpane.' };
        params[`rainRefraction_${layerId}`] = { cat: `rain_glass_${layerId}`, name: 'Optical Lens Power', min: 0, max: 50, step: 1, value: 18, formula: '18 + (bass/255)*10', useFormula: false, desc: 'Intensity of optical distortion refracting layers behind droplets.' };
        params[`rainFog_${layerId}`] = { cat: `rain_glass_${layerId}`, name: 'Condensation Mist', min: 0, max: 1.0, step: 0.02, value: 0.25, formula: '0.25', useFormula: false, desc: 'Milky glass condensation fog across the window.' };
        params[`rainOpacity_${layerId}`] = { cat: `rain_glass_${layerId}`, name: 'Optical Weight', min: 0, max: 1.0, step: 0.05, value: 0.9, formula: '0.9', useFormula: false, desc: 'Global alpha transparency of the rain on glass layer.' };
    } else if (type === 'topography') {
        params[`topoScale_${layerId}`] = { cat: `topography_${layerId}`, name: 'Terrain Scale', min: 0.5, max: 10.0, step: 0.1, value: 3.0, formula: '3.0', useFormula: false, desc: 'Zoom scale of the elevation noise landscape.' };
        params[`topoLines_${layerId}`] = { cat: `topography_${layerId}`, name: 'Contour Isolines', min: 4, max: 60, step: 1, value: 24, formula: '24', useFormula: false, desc: 'Number of elevation contour lines.' };
        params[`topoSpeed_${layerId}`] = { cat: `topography_${layerId}`, name: 'Drift Speed', min: -2.0, max: 2.0, step: 0.05, value: 0.4, formula: '0.4 + (trend * 0.4)', useFormula: true, desc: 'Speed at which the landscape scrolls toward the horizon.' };
        params[`topoChaos_${layerId}`] = { cat: `topography_${layerId}`, name: 'Mountain Ruggedness', min: 0, max: 2.0, step: 0.05, value: 0.5, formula: '0.5 + (bass/255)*0.5', useFormula: true, desc: 'Fractal noise complexity of peaks and ravines.' };
        params[`topoLineWidth_${layerId}`] = { cat: `topography_${layerId}`, name: 'Stroke Width', min: 0.5, max: 10.0, step: 0.5, value: 1.5, formula: '1.5', useFormula: false, desc: 'Width of contour pen lines.' };
        params[`topoOpacity_${layerId}`] = { cat: `topography_${layerId}`, name: 'Layer Weight', min: 0, max: 1.0, step: 0.05, value: 0.85, formula: '0.85', useFormula: false, desc: 'Transparency of the topographic map.' };
    } else if (type === 'caustics') {
        params[`causticScale_${layerId}`] = { cat: `caustics_${layerId}`, name: 'Network Scale', min: 0.5, max: 5.0, step: 0.1, value: 1.8, formula: '1.8', useFormula: false, desc: 'Scale of the interwoven light ripple network.' };
        params[`causticSpeed_${layerId}`] = { cat: `caustics_${layerId}`, name: 'Wave Shimmer Speed', min: 0.1, max: 3.0, step: 0.05, value: 0.6, formula: '0.6 + (trend * 0.5)', useFormula: true, desc: 'Speed of sunlight oscillation dancing through water.' };
        params[`causticIntensity_${layerId}`] = { cat: `caustics_${layerId}`, name: 'Sunlight Glint', min: 0, max: 2.0, step: 0.05, value: 0.85, formula: '0.7 + (treble/255)*0.6', useFormula: true, desc: 'Brightness of the caustic highlights.' };
        params[`causticDepth_${layerId}`] = { cat: `caustics_${layerId}`, name: 'Marine Depth Fog', min: 0, max: 1.0, step: 0.05, value: 0.35, formula: '0.35', useFormula: false, desc: 'Deep ocean atmosphere gradient fog.' };
        params[`causticTurbulence_${layerId}`] = { cat: `caustics_${layerId}`, name: 'Surface Churn', min: 0, max: 2.0, step: 0.05, value: 0.5, formula: '0.5 + (mid/255)*0.5', useFormula: false, desc: 'Wave turbulence warping the caustic lines.' };
    } else if (type === 'cinematic_light') {
        params[`lightAngle_${layerId}`] = { cat: `cinematic_light_${layerId}`, name: 'Sunbeam Angle [deg]', min: -80, max: 80, step: 1, value: 40, formula: '40 + Math.sin(time/4000)*5', useFormula: false, desc: 'Angle of incoming light slanting into the room.' };
        params[`lightIntensity_${layerId}`] = { cat: `cinematic_light_${layerId}`, name: 'Luminance Volume', min: 0, max: 1.5, step: 0.05, value: 0.65, formula: '0.6 + (mid/255)*0.4', useFormula: true, desc: 'Intensity and reach of the volumetric window light.' };
        params[`lightWarmth_${layerId}`] = { cat: `cinematic_light_${layerId}`, name: 'Golden Hour Tint', min: 0, max: 1.0, step: 0.05, value: 0.75, formula: '0.75', useFormula: false, desc: '0 = Morning cool mist, 1 = Rich afternoon amber sunset.' };
        params[`blindCount_${layerId}`] = { cat: `cinematic_light_${layerId}`, name: 'Venetian Slat Count', min: 2, max: 30, step: 1, value: 14, formula: '14', useFormula: false, desc: 'Number of horizontal window blind shadows.' };
        params[`blindOpen_${layerId}`] = { cat: `cinematic_light_${layerId}`, name: 'Blind Aperture', min: 0.05, max: 0.95, step: 0.05, value: 0.6, formula: '0.6', useFormula: false, desc: 'Aperture gap between blind slats.' };
        params[`dustDensity_${layerId}`] = { cat: `cinematic_light_${layerId}`, name: 'Sunlit Dust Motes', min: 0, max: 1.0, step: 0.05, value: 0.65, formula: '0.65', useFormula: false, desc: 'Density of floating illuminated air particulates.' };
    } else if (type === 'super8') {
        params[`filmJitter_${layerId}`] = { cat: `super8_${layerId}`, name: 'Gate Weave [px]', min: 0, max: 5.0, step: 0.1, value: 0.5, formula: '0.3 + (trend * 0.5)', useFormula: false, desc: 'Mechanical film projector frame jitter.' };
        params[`filmLightLeak_${layerId}`] = { cat: `super8_${layerId}`, name: 'Warm Flare Leak', min: 0, max: 1.0, step: 0.05, value: 0.5, formula: '0.4 + (trend * 0.4)', useFormula: true, desc: 'Anamorphic amber/vermilion edge light leaks.' };
        params[`filmBurnRate_${layerId}`] = { cat: `super8_${layerId}`, name: 'Emulsion Burn Peak', min: 0, max: 1.0, step: 0.05, value: 0.4, formula: '0.4', useFormula: false, desc: 'Likelihood of film frame burn flashes during loud musical drops.' };
    } else if (type === 'anamorphic') {
        params[`flareCount_${layerId}`] = { cat: `anamorphic_${layerId}`, name: 'Streetlight Beams', min: 1, max: 8, step: 1, value: 5, formula: '5', useFormula: false, desc: 'Number of horizontal anamorphic lens flares.' };
        params[`flareLength_${layerId}`] = { cat: `anamorphic_${layerId}`, name: 'Beam Span [x]', min: 0.2, max: 3.0, step: 0.1, value: 1.2, formula: '1.0 + (trend * 0.5)', useFormula: false, desc: 'Horizontal stretch width of the optical flare.' };
        params[`flareSpeed_${layerId}`] = { cat: `anamorphic_${layerId}`, name: 'Highway Travel Speed', min: 0.1, max: 3.0, step: 0.05, value: 0.8, formula: '0.7 + (trend * 0.6)', useFormula: true, desc: 'Speed at which flares streak horizontally across the screen.' };
        params[`flareIntensity_${layerId}`] = { cat: `anamorphic_${layerId}`, name: 'Optical Brilliance', min: 0, max: 2.0, step: 0.05, value: 0.75, formula: '0.6 + (mid/255)*0.5', useFormula: true, desc: 'Luminance of the horizontal streak and core.' };
    } else if (type === 'polaroid') {
        params[`polaroidDevelop_${layerId}`] = { cat: `polaroid_${layerId}`, name: 'Chemical Development', min: 0, max: 1.0, step: 0.02, value: 0.85, formula: 'Math.min(1.0, 0.2 + (time / 210000) * 0.8)', useFormula: true, desc: 'Chemical resolution of the instant picture over time.' };
        params[`polaroidBleed_${layerId}`] = { cat: `polaroid_${layerId}`, name: 'Paper Fiber Bleed', min: 0, max: 1.0, step: 0.05, value: 0.4, formula: '0.4', useFormula: false, desc: 'Subtle stain and paper texture aging on the frame.' };
        params[`polaroidSepia_${layerId}`] = { cat: `polaroid_${layerId}`, name: 'Thermal Tint Shift', min: 0, max: 1.0, step: 0.05, value: 0.35, formula: '0.35', useFormula: false, desc: 'Warm sepia / cyan cross-processing chemical shift.' };
    }

    // Append Masking Parameters globally for all layers
    params[`maskX_${layerId}`] = { cat: `mask_${layerId}`, name: 'Mask Center X', min: 0, max: 1.0, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'Horizontal position of the mask center.' };
    params[`maskY_${layerId}`] = { cat: `mask_${layerId}`, name: 'Mask Center Y', min: 0, max: 1.0, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'Vertical position of the mask center.' };
    params[`maskSize_${layerId}`] = { cat: `mask_${layerId}`, name: 'Mask Size', min: 0.01, max: 2.0, step: 0.01, value: 1.0, formula: '1.0', useFormula: false, desc: 'Sizing scale of the mask shape.' };
    params[`maskFeather_${layerId}`] = { cat: `mask_${layerId}`, name: 'Mask Feather', min: 0, max: 200, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Feather / softness of the mask edges.' };

    return establishDefaults(params);
}

function createDefaultParams() {
    return {
        // PHYSICS
        sensitivity: { cat: 'physics', name: 'Mic Sens. [x]', min: 0.1, max: 20, step: 0.1, value: 2.8, formula: '2.8 + bass/100', useFormula: false, desc: 'Multiplies incoming audio energy. Higher values make the visualizer more reactive to quiet music.' },
        trendRate: { cat: 'physics', name: 'Trend Rate', min: 0.001, max: 0.2, step: 0.001, value: 0.04, formula: '0.04', useFormula: false, desc: 'Determines how fast the "Energy Trend" (0-1) updates. Low values create a smooth long-term average.' },
        clearOpacity: { cat: 'physics', name: 'Trail Persistence', min: 0, max: 1, step: 0.01, value: 0.12, formula: '0.12 + (1 - trend) * 0.1', useFormula: false, desc: 'Controls how much of the previous frame remains. 0 = Permanent trails, 1 = No trails.' },

        // ANALOG POST-PROCESSING
        analogFlash: { cat: 'analog', name: 'Lightning Flash', min: 0, max: 1, step: 0.05, value: 0, formula: '(bass/255 > 0.8) ? (bass/255) : 0', useFormula: true, desc: 'Sudden blinding screen flashes triggered by intense audio peaks.' },
        analogScratches: { cat: 'analog', name: 'Film Scratches', min: 0, max: 1, step: 0.01, value: 0, formula: '0.2', useFormula: false, desc: 'Vertical erratic lines mimicking old damaged film stock.' },
        analogDrift: { cat: 'analog', name: 'RGB Ghosting [px]', min: 0, max: 200, step: 1, value: 5, formula: 'trend > 0.8 ? 50 : 5', useFormula: true, desc: 'Offsets Color Channels for a nostalgic double-vision effect.' },
        analogScanlines: { cat: 'analog', name: 'CRT Scanlines', min: 0, max: 0.3, step: 0.01, value: 0.15, formula: '0.15', useFormula: false, desc: 'Simulates old TV hardware by drawing horizontal bars across the entire image.' },
        analogNoise: { cat: 'analog', name: 'Film Grain', min: 0, max: 1, step: 0.01, value: 0.08, formula: '0.08 + (bass/255)*0.2', useFormula: true, desc: 'Adds digital noise for a cinematic, film-like texture.' },
        analogWarmth: { cat: 'analog', name: 'Mediterranean Glow', min: 0, max: 1, step: 0.05, value: 0.3, formula: '0.3', useFormula: false, desc: 'Applies a sunset-inspired warm color wash specifically tailored for Agost projections.' },
        analogLightLeak: { cat: 'analog', name: 'Sun Flare Leaks', min: 0, max: 1, step: 0.05, value: 0.4, formula: '0.4 + (trend * 0.3)', useFormula: true, desc: 'Simulates light leaking into a film camera lens.' },
        analogVignette: { cat: 'analog', name: 'Vignette Darkening', min: 0, max: 1, step: 0.05, value: 0.5, formula: '0.5 + (avg/255)*0.2', useFormula: true, desc: 'Darkens the corners of the screen to draw focus to the center.' },
        opticsFocusPull: { cat: 'analog', name: 'Depth of Field', min: 0, max: 200, step: 1, value: 0, formula: '0', useFormula: false, desc: 'Gaussian blur simulating camera bokeh. Blurry during quiet ambiance, snaps sharp during loud hits.' },
        analogInkBleed: { cat: 'analog', name: 'Ink Spread Speed', min: 0, max: 10.0, step: 0.1, value: 1.0, formula: '0.5 + (bass/255)*4.0', useFormula: true, desc: 'Controls how fast ink spreads across the fibers. High values create a "soaked" watercolor look.' },
        analogPaperGrain: { cat: 'analog', name: 'Paper Fiber Detail', min: 0, max: 1, step: 0.01, value: 0.15, formula: '0.15', useFormula: false, desc: 'Intensifies the procedural paper texture detail.' },
        analogStainIntensity: { cat: 'analog', name: 'Vintage Stains', min: 0, max: 1, step: 0.05, value: 0.2, formula: '0.2 + (trend * 0.3)', useFormula: true, desc: 'Adds subtle organic coffee/ink stains to the paper corners.' },
        // WEBGL BACKGROUND
        webglSpeed: { cat: 'webgl', name: 'Grid Speed', min: 0, max: 20, step: 0.1, value: 5.0, formula: '5 + (trend * 10)', useFormula: true, desc: 'Forward scrolling speed of the 3D Cyber Grid.' },
        webglElevation: { cat: 'webgl', name: 'Floor Elevation', min: -5, max: 5, step: 0.1, value: 1.0, formula: '1.0 + Math.sin(time/1000)', useFormula: false, desc: 'Camera height above the infinite 3D plane.' },
        webglGlow: { cat: 'webgl', name: 'Grid Glow', min: 0, max: 2, step: 0.01, value: 0.8, formula: '0.5 + (bass/255)*0.5', useFormula: true, desc: 'Intensity and thickness of the neon grid lines.' },
        webglDistortion: { cat: 'webgl', name: 'Bass Distortion', min: 0, max: 5, step: 0.1, value: 1.5, formula: '1.5 + (trend * 2)', useFormula: true, desc: 'How violently the grid bumps and warps to the audio.' },
        panotScale: { cat: 'webgl', name: 'Panot Tiling', min: 1, max: 20, step: 1, value: 5.0, formula: '5', useFormula: false, desc: 'The number of flower tiles across the screen.' },
        panotBloom: { cat: 'webgl', name: 'Panot Bloom', min: 0, max: 2, step: 0.05, value: 0.5, formula: '0.5 + bass', useFormula: true, desc: 'Music-reactive light pulsing and sizing of the flower petals.' },
        panotRotation: { cat: 'webgl', name: 'Panot Rotation', min: -Math.PI, max: Math.PI, step: 0.01, value: 0, formula: 'time / 10', useFormula: true, desc: 'Rotating the entire city grid.' },
        panotMortar: { cat: 'webgl', name: 'Panot Mortar', min: 0, max: 0.1, step: 0.001, value: 0.04, formula: '0.04', useFormula: false, desc: 'Thickness of the grout lines between tiles.' },
        panotThickness: { cat: 'webgl', name: 'Panot Line Width', min: 0.001, max: 0.1, step: 0.001, value: 0.04, formula: '0.04', useFormula: false, desc: 'Thickness of the ring lines.' },
        panotRoundness: { cat: 'webgl', name: 'Panot Softness', min: 0.001, max: 0.1, step: 0.001, value: 0.02, formula: '0.02', useFormula: false, desc: 'Smoothness of the tile edges.' },
        panotShadow: { cat: 'webgl', name: 'Panot Depth', min: 0, max: 1, step: 0.01, value: 0.3, formula: '0.3', useFormula: false, desc: '3D shadow depth for an embossed stone look.' },
        horizonSpeed: { cat: 'webgl', name: 'Horizon Scroll', min: 0, max: 2, step: 0.01, value: 0.5, formula: '0.5', useFormula: false, desc: 'Speed at which the background landscape drifts by.' },
        horizonComplexity: { cat: 'webgl', name: 'Scenery Layers', min: 1, max: 20, step: 1, value: 5, formula: '5', useFormula: false, desc: 'Number of parallax mountain layers.' },

        // GPU POST PROCESSING (Melting & Smear)
        gpuAberration: { cat: 'gpu_fx', name: 'Chromatic Warp', min: 0, max: 0.5, step: 0.01, value: 0.05, formula: '0.05 + (bass/255)*0.1', useFormula: true, desc: 'Splits R, G, B channels radially outwards.' },
        gpuSmearRatio: { cat: 'gpu_fx', name: 'Fluid Density', min: 0, max: 0.99, step: 0.01, value: 0.7, formula: '0.5', useFormula: false, desc: 'Amount of previous frames left on screen. 0 is none, 0.99 is infinite smearing trails.' },
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
            bgColor: '#000000',

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
}