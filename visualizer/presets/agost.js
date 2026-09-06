window.AGOST_DEFAULT_SESSION = {
  "activeIndex": 15,
  "targetIndex": null,
  "transitionStart": 158564.5,
  "transitionDuration": 1000,
  "presets": [
    {
      "name": "Intro",
      "layers": [
        {
          "id": "photos_intro",
          "type": "photos",
          "name": "AGOST COVER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              5
            ],
            "webcamIndices": [],
            "imgBlendMode": "overlay",
            "maskType": "horizontal_band",
            "maskInvert": false
          }
        },
        {
          "id": "rays_intro",
          "type": "rays",
          "name": "STAGE BACKLIGHT",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#d4af37",
              "#f3e5ab",
              "#ffffff",
              "#d4af37",
              "#5a2d48",
              "#f3e5ab"
            ]
          }
        },
        {
          "id": "particles_intro",
          "type": "particles",
          "name": "STAGE DUST MOTES",
          "enabled": true,
          "settings": {
            "particleShape": "mote",
            "useLayerColor": false,
            "layerColors": [
              "#d4af37",
              "#f3e5ab",
              "#ffffff",
              "#d4af37",
              "#f3e5ab",
              "#ffffff"
            ]
          }
        }
      ],
      "settings": {
        "palette": [
          "#08060c",
          "#1c1224",
          "#421e35",
          "#8a4b62",
          "#d4af37",
          "#f3e5ab"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": false,
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#060408",
        "horizonStyle": "montserrat"
      },
      "params": {
        "sensitivity": {
          "value": 1.5,
          "formula": "1.5",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.25,
          "formula": "0.25",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.55,
          "formula": "0.55",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "imgScale_photos_intro": {
          "value": 1,
          "formula": "0.98 + Math.sin(time/4000)*0.02",
          "useFormula": true
        },
        "imgOpacity_photos_intro": {
          "value": 0.95,
          "formula": "0.95",
          "useFormula": false
        },
        "imgGlitch_photos_intro": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "imgBlur_photos_intro": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "imgSaturate_photos_intro": {
          "value": 100,
          "formula": "100",
          "useFormula": false
        },
        "photoRotation_photos_intro": {
          "value": 0,
          "formula": "Math.sin(time/6000)*0.008",
          "useFormula": true
        },
        "photoContrast_photos_intro": {
          "value": 105,
          "formula": "105",
          "useFormula": false
        },
        "rayCount_rays_intro": {
          "value": 16,
          "formula": "16",
          "useFormula": false
        },
        "raySpeed_rays_intro": {
          "value": 0.2,
          "formula": "0.2",
          "useFormula": false
        },
        "rayCenterHole_rays_intro": {
          "value": 80,
          "formula": "80",
          "useFormula": false
        },
        "raySpread_rays_intro": {
          "value": 1.6,
          "formula": "1.6",
          "useFormula": false
        },
        "rayThickness_rays_intro": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "rayChaos_rays_intro": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "rayOpacity_rays_intro": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "particleCount_particles_intro": {
          "value": 180,
          "formula": "180",
          "useFormula": false
        },
        "particleSize_particles_intro": {
          "value": 2.5,
          "formula": "2.5",
          "useFormula": false
        },
        "particleSpeed_particles_intro": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "particleChaos_particles_intro": {
          "value": 8,
          "formula": "8",
          "useFormula": false
        },
        "particleOpacity_particles_intro": {
          "value": 0.65,
          "formula": "0.65",
          "useFormula": false
        },
        "particleDirection_particles_intro": {
          "value": -1.57,
          "formula": "-1.57",
          "useFormula": false
        },
        "particleColorSpeed_particles_intro": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "particleRotation_particles_intro": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleGravity_particles_intro": {
          "value": -0.05,
          "formula": "-0.05",
          "useFormula": false
        },
        "particleWind_particles_intro": {
          "value": 0.1,
          "formula": "0.1",
          "useFormula": false
        },
        "particleBreezeStrength_particles_intro": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_photos_intro": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_photos_intro": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_photos_intro": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_photos_intro": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_rays_intro": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_rays_intro": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_rays_intro": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_rays_intro": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_particles_intro": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_intro": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_intro": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_intro": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Rain",
      "layers": [
        {
          "id": "particles_rain",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "circle",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ]
          }
        },
        {
          "id": "text_rain",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Rain in the street,\nsmell of cold earth.",
              "Searching for a warmth\nthat is no longer there.",
              "Only the wind whistling\nbetween bare trees.",
              "Days slip through fingers,\ncounting the nights."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "maskInvert": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#0d1b2a",
          "#1b263b",
          "#415a77",
          "#00e5ff",
          "#7b2cbf",
          "#e0aaff"
        ],
        "physicsEnabled": true,
        "analogEnabled": false,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#050710"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.03 + (time/210000)*0.09 + (mid/255)*0.08",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.72,
          "formula": "0.72",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.008,
          "formula": "0.004 + (time/210000)*0.015 + (bass/255)*0.012",
          "useFormula": true
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleCount_particles_rain": {
          "value": 500,
          "formula": "400 + (time/210000)*600 + (avg/255)*300",
          "useFormula": true
        },
        "particleSize_particles_rain": {
          "value": 2,
          "formula": "1.8 + (treble/255)*2.5 + trend*1.5",
          "useFormula": true
        },
        "particleSpeed_particles_rain": {
          "value": 3.5,
          "formula": "3.0 + trend*3.0",
          "useFormula": true
        },
        "particleChaos_particles_rain": {
          "value": 25,
          "formula": "20 + (bass/255)*30",
          "useFormula": true
        },
        "particleOpacity_particles_rain": {
          "value": 0.6,
          "formula": "0.5 + (treble/255)*0.4",
          "useFormula": true
        },
        "particleDirection_particles_rain": {
          "value": 1.57,
          "formula": "1.57 + Math.sin(time/3000)*0.2",
          "useFormula": true
        },
        "particleColorSpeed_particles_rain": {
          "value": 9,
          "formula": "15",
          "useFormula": false
        },
        "particleRotation_particles_rain": {
          "value": 0.288407346410207,
          "formula": "0",
          "useFormula": false
        },
        "particleGravity_particles_rain": {
          "value": 4,
          "formula": "3.5 + trend*2.0",
          "useFormula": true
        },
        "particleWind_particles_rain": {
          "value": 2,
          "formula": "1.0 + Math.sin(time/2000)*3.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_rain": {
          "value": 0.54,
          "formula": "0.6",
          "useFormula": false
        },
        "textStartDelay_text_rain": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_rain": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_rain": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_rain": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_rain": {
          "value": 0,
          "formula": "Math.sin(time/2500)*0.04",
          "useFormula": true
        },
        "textOpacity_text_rain": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_rain": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_rain": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_rain": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_rain": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "textInkResolve_text_rain": {
          "value": 0.6,
          "formula": "0.6",
          "useFormula": false
        },
        "textGlow_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "maskX_particles_rain": {
          "value": 0.51,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_rain": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_rain": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_rain": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_rain": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_rain": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Friday",
      "layers": [
        {
          "id": "particles_friday",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "pollen",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": true
          }
        },
        {
          "id": "text_friday",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "A beer or a coffee,\nI don't even know.",
              "Come down now,\nI'm picking you up.",
              "Five days without you... \nthey hurt a lot.",
              "It has gotten late,\nwatching the sun set."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#ff5722",
          "#ffb300",
          "#e65100",
          "#2a1b4e",
          "#5c3d99",
          "#120924"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#120924"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.85) ? (bass/255)*0.6 : 0",
          "useFormula": false
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 6,
          "formula": "5 + (bass/255)*20 + (trend > 0.8 ? 30 : 0)",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.11,
          "formula": "0.1",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.38,
          "formula": "0.05 + trend * 0.1 + (treble/255)*0.08",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 1,
          "formula": "Math.max(0.2, 0.85 - (time/210000)*0.4 + (mid/255)*0.2)",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 1,
          "formula": "0.2 + (time/210000)*0.5 + (bass/255)*0.35 + Math.sin(time/2500)*0.1",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 0,
          "formula": "(mid/255)*0.8",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.1,
          "formula": "0.1",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleCount_particles_friday": {
          "value": 120,
          "formula": "350 + (trend*300)",
          "useFormula": false
        },
        "particleSize_particles_friday": {
          "value": 68.8,
          "formula": "2.5 + (bass/255)*4.0",
          "useFormula": false
        },
        "particleSpeed_particles_friday": {
          "value": 1.5,
          "formula": "1.5 + trend*1.5",
          "useFormula": false
        },
        "particleChaos_particles_friday": {
          "value": 30,
          "formula": "30 + (bass/255)*30",
          "useFormula": false
        },
        "particleOpacity_particles_friday": {
          "value": 0.4,
          "formula": "0.4 + (trend*0.4)",
          "useFormula": false
        },
        "particleDirection_particles_friday": {
          "value": -0.8,
          "formula": "-0.8 + Math.sin(time/2000)*0.2",
          "useFormula": true
        },
        "particleColorSpeed_particles_friday": {
          "value": 13,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_friday": {
          "value": 0.238407346410207,
          "formula": "0",
          "useFormula": false
        },
        "particleGravity_particles_friday": {
          "value": -0.5,
          "formula": "-0.5",
          "useFormula": false
        },
        "particleWind_particles_friday": {
          "value": 0.2,
          "formula": "1.5 + trend*3.0",
          "useFormula": false
        },
        "particleBreezeStrength_particles_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textStartDelay_text_friday": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_friday": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_friday": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_friday": {
          "value": 1.05,
          "formula": "1.0 + trend*0.2",
          "useFormula": true
        },
        "textBlur_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_friday": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_friday": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_friday": {
          "value": 55,
          "formula": "55",
          "useFormula": false
        },
        "textEnvironmentDrift_text_friday": {
          "value": 0.25,
          "formula": "0.25",
          "useFormula": false
        },
        "textInkResolve_text_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_friday": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_friday": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_friday": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Gravel",
      "layers": [
        {
          "id": "particles_gravel",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "circle",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": true
          }
        },
        {
          "id": "text_gravel",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "I don't want to arrive,\nand neither do you.",
              "If we could freeze time,\nwe would stop it right here.",
              "Taking the wrong exit,\nlost on a dirt road.",
              "The radio forgets\nwhich song comes next."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#1a1612",
          "#4a3b32",
          "#8c6d53",
          "#cda34f",
          "#e8c547",
          "#f4ebd9"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#100d0a"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.15 + (time/200000)*0.1",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0.12",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0,
          "formula": "0.1 + (bass/255)*0.1",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "6 + (bass/255)*25",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0,
          "formula": "0.5",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "particleCount_particles_gravel": {
          "value": 2500,
          "formula": "500 + trend*400",
          "useFormula": false
        },
        "particleSize_particles_gravel": {
          "value": 0.9,
          "formula": "2.0 + (bass/255)*3.0",
          "useFormula": false
        },
        "particleSpeed_particles_gravel": {
          "value": 0.7,
          "formula": "4.0 + trend*4.0",
          "useFormula": false
        },
        "particleChaos_particles_gravel": {
          "value": 78,
          "formula": "50 + (bass/255)*60",
          "useFormula": false
        },
        "particleOpacity_particles_gravel": {
          "value": 1,
          "formula": "0.35 + trend*0.35",
          "useFormula": false
        },
        "particleDirection_particles_gravel": {
          "value": -1.39159265358979,
          "formula": "0.2 + Math.sin(time/1500)*0.3",
          "useFormula": false
        },
        "particleColorSpeed_particles_gravel": {
          "value": 0,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_gravel": {
          "value": 1.19840734641021,
          "formula": "time/500",
          "useFormula": false
        },
        "particleGravity_particles_gravel": {
          "value": -1,
          "formula": "0.2",
          "useFormula": false
        },
        "particleWind_particles_gravel": {
          "value": 1.2,
          "formula": "4.0 + trend*6.0",
          "useFormula": false
        },
        "particleBreezeStrength_particles_gravel": {
          "value": 0.48,
          "formula": "0.4",
          "useFormula": false
        },
        "textStartDelay_text_gravel": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_gravel": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_gravel": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_gravel": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_gravel": {
          "value": 0,
          "formula": "Math.sin(time/200)*trend*15",
          "useFormula": true
        },
        "textJitterY_text_gravel": {
          "value": 0,
          "formula": "Math.cos(time/200)*trend*10",
          "useFormula": true
        },
        "textRotation_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_gravel": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_gravel": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_gravel": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_gravel": {
          "value": 50,
          "formula": "50",
          "useFormula": false
        },
        "textEnvironmentDrift_text_gravel": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "textInkResolve_text_gravel": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.55,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": false
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_gravel": {
          "value": 0,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_gravel": {
          "value": 0,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_gravel": {
          "value": 0.01,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_gravel": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_gravel": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_gravel": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Pareces enfadada",
      "layers": [
        {
          "id": "rays_pareces",
          "type": "rays",
          "name": "RAYS LAYER",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ]
          }
        },
        {
          "id": "text_pareces",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Silence is your weapon,\nlying to my face.",
              "You swore to me\nit wasn't about me.",
              "No more laughs,\nno more smiles.",
              "Wondering what I'm worth,\nremembering that winter."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": ""
          }
        }
      ],
      "settings": {
        "palette": [
          "#0f051d",
          "#3b0944",
          "#800e60",
          "#ff0055",
          "#00f5d4",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": false,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": false,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#0a0314"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.82) ? (bass/255)*0.8 : 0",
          "useFormula": true
        },
        "analogDrift": {
          "value": 12,
          "formula": "8 + (bass/255)*35 + (trend > 0.75 ? 40 : 0)",
          "useFormula": true
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (treble/255)*0.1",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.08,
          "formula": "0.05 + (trend*0.1) + (bass/255)*0.08",
          "useFormula": true
        },
        "rayCount_rays_pareces": {
          "value": 179,
          "formula": "16 + Math.floor((treble/255)*20)",
          "useFormula": false
        },
        "raySpeed_rays_pareces": {
          "value": 0,
          "formula": "1.0 + trend*2.0",
          "useFormula": false
        },
        "rayThickness_rays_pareces": {
          "value": 49,
          "formula": "4 + (bass/255)*8",
          "useFormula": false
        },
        "rayCenterHole_rays_pareces": {
          "value": 170,
          "formula": "80 + trend*60",
          "useFormula": false
        },
        "rayChaos_rays_pareces": {
          "value": 0.25,
          "formula": "0.3 + (bass/255)*0.5",
          "useFormula": false
        },
        "rayOpacity_rays_pareces": {
          "value": 0.1,
          "formula": "0.6 + (bass/255)*0.4",
          "useFormula": false
        },
        "textStartDelay_text_pareces": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_pareces": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_pareces": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_pareces": {
          "value": 1.1,
          "formula": "1.0 + (trend*0.3)",
          "useFormula": false
        },
        "textBlur_text_pareces": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_pareces": {
          "value": 0,
          "formula": "(bass/255 > 0.75) ? (Math.random()-0.5)*40 : 0",
          "useFormula": false
        },
        "textJitterY_text_pareces": {
          "value": 0,
          "formula": "(bass/255 > 0.75) ? (Math.random()-0.5)*20 : 0",
          "useFormula": false
        },
        "textRotation_text_pareces": {
          "value": 0,
          "formula": "Math.sin(time/800)*0.08",
          "useFormula": false
        },
        "textOpacity_text_pareces": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_pareces": {
          "value": 6,
          "formula": "6.0",
          "useFormula": false
        },
        "textFadeTime_text_pareces": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textTypeSpeed_text_pareces": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_pareces": {
          "value": 0.2,
          "formula": "0.2",
          "useFormula": false
        },
        "textInkResolve_text_pareces": {
          "value": 0.7,
          "formula": "0.7",
          "useFormula": false
        },
        "textGlow_text_pareces": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_rays_pareces": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_rays_pareces": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_rays_pareces": {
          "value": 0.98,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_rays_pareces": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_pareces": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_pareces": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_pareces": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_pareces": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Summer",
      "layers": [
        {
          "id": "text_summer",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Summer is arriving,\non your lips I stay.",
              "From this August,\nI never want to leave.",
              "In your arms,\nsheltered from the cold.",
              "Now it arrives, now it leaves...\nit's no longer here."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": true
          }
        },
        {
          "id": "rsgn17oum",
          "type": "rays",
          "name": "RAYS LAYER",
          "enabled": true,
          "settings": {
            "maskType": "none",
            "maskInvert": false,
            "useLayerColor": false,
            "layerColor": "#ffffff",
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": true
          }
        }
      ],
      "settings": {
        "palette": [
          "#ffbe0b",
          "#fb5607",
          "#ff006e",
          "#8338ec",
          "#ff3838",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": false,
        "webglEnabled": true,
        "webglProjection": "3d",
        "shaderStyle": "mosaic",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#1a0808"
      },
      "params": {
        "sensitivity": {
          "value": 1.5,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.023,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.88,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.9,
          "formula": "0.8 + (mid/255)*0.2",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.5,
          "formula": "0.35 + (time/200000)*0.4 + (bass/255)*0.3",
          "useFormula": true
        },
        "panotScale": {
          "value": 7,
          "formula": "5.0",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.85,
          "formula": "0.5 + (bass/255)*0.8",
          "useFormula": false
        },
        "panotRotation": {
          "value": -2.83159265358979,
          "formula": "time/8000",
          "useFormula": false
        },
        "textStartDelay_text_summer": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_summer": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_summer": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_summer": {
          "value": 1.05,
          "formula": "1.0 + trend*0.2",
          "useFormula": true
        },
        "textBlur_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_summer": {
          "value": 0,
          "formula": "Math.sin(time/2500)*0.05",
          "useFormula": true
        },
        "textOpacity_text_summer": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_summer": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_summer": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_summer": {
          "value": 50,
          "formula": "50",
          "useFormula": false
        },
        "textEnvironmentDrift_text_summer": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "textInkResolve_text_summer": {
          "value": 0.6,
          "formula": "0.6",
          "useFormula": false
        },
        "textGlow_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 1.3,
          "formula": "5 + (trend * 10)",
          "useFormula": false
        },
        "webglElevation": {
          "value": -0.1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.24,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": false
        },
        "webglDistortion": {
          "value": 0,
          "formula": "1.5 + (trend * 2)",
          "useFormula": false
        },
        "panotMortar": {
          "value": 0.1,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.028,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.028,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.24,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.51,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_text_summer": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_summer": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_summer": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "rayCount_rsgn17oum": {
          "value": 10,
          "formula": "0",
          "useFormula": false
        },
        "raySpeed_rsgn17oum": {
          "value": 0.2,
          "formula": "0.5 + Math.sin(time/5000)",
          "useFormula": false
        },
        "rayThickness_rsgn17oum": {
          "value": 50,
          "formula": "4 + (bass/50)",
          "useFormula": false
        },
        "rayCenterHole_rsgn17oum": {
          "value": 80,
          "formula": "80 + (trend * 150)",
          "useFormula": true
        },
        "rayChaos_rsgn17oum": {
          "value": 0.1,
          "formula": "0.2 + trend",
          "useFormula": false
        },
        "rayOpacity_rsgn17oum": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "maskX_rsgn17oum": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_rsgn17oum": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_rsgn17oum": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_rsgn17oum": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Beach",
      "layers": [
        {
          "id": "particles_beach",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "circle",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": false
          }
        },
        {
          "id": "text_beach",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "When you are no longer here,\nno longer living here.",
              "Searching the shore\nto find an answer.",
              "When you no longer\nlook at me that way.",
              "Fighting until the end\nof this nightmare."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": true
          }
        }
      ],
      "settings": {
        "palette": [
          "#031926",
          "#0d3b66",
          "#468faf",
          "#68d8d6",
          "#a8dadc",
          "#f1faee"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": true,
        "webglProjection": "3d",
        "shaderStyle": "cells",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#08131c"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "particleCount_particles_beach": {
          "value": 350,
          "formula": "250 + (trend*200)",
          "useFormula": true
        },
        "particleSize_particles_beach": {
          "value": 3.5,
          "formula": "2.5 + (treble/255)*3.0",
          "useFormula": true
        },
        "particleSpeed_particles_beach": {
          "value": 1.2,
          "formula": "1.0 + Math.sin(time/3000)*0.5",
          "useFormula": true
        },
        "particleChaos_particles_beach": {
          "value": 20,
          "formula": "15 + (bass/255)*20",
          "useFormula": true
        },
        "particleOpacity_particles_beach": {
          "value": 0.55,
          "formula": "0.45 + (trend*0.3)",
          "useFormula": true
        },
        "particleDirection_particles_beach": {
          "value": 0,
          "formula": "Math.sin(time/3500)*0.5",
          "useFormula": true
        },
        "particleColorSpeed_particles_beach": {
          "value": 8,
          "formula": "8",
          "useFormula": false
        },
        "particleRotation_particles_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleGravity_particles_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "particleWind_particles_beach": {
          "value": 1,
          "formula": "0.8 + Math.sin(time/3000)*1.5",
          "useFormula": true
        },
        "particleBreezeStrength_particles_beach": {
          "value": 0.7,
          "formula": "0.7",
          "useFormula": false
        },
        "textStartDelay_text_beach": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_beach": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_beach": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_beach": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_beach": {
          "value": 0,
          "formula": "Math.sin(time/3000)*0.03",
          "useFormula": true
        },
        "textOpacity_text_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_beach": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_beach": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_beach": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_beach": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "textInkResolve_text_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_beach": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_beach": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "You",
      "layers": [
        {
          "id": "particles_you",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "star",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ]
          }
        },
        {
          "id": "text_you",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "When you look at me,\nI lose the thread of the wind.",
              "When you get angry,\neverything turns grey.",
              "When you hold me,\na new fire ignites.",
              "Without any words,\nonly for you."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": ""
          }
        }
      ],
      "settings": {
        "palette": [
          "#0b091a",
          "#1d1a44",
          "#3d266e",
          "#843b82",
          "#f45d48",
          "#ffd166"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#080613"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.3,
          "formula": "0.2 + (time/200000)*0.6 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleCount_particles_you": {
          "value": 400,
          "formula": "300 + (time/200000)*300",
          "useFormula": true
        },
        "particleSize_particles_you": {
          "value": 3,
          "formula": "2.0 + (treble/255)*3.5",
          "useFormula": true
        },
        "particleSpeed_particles_you": {
          "value": 1.5,
          "formula": "1.2 + trend*1.5",
          "useFormula": true
        },
        "particleChaos_particles_you": {
          "value": 30,
          "formula": "20 + (bass/255)*30",
          "useFormula": true
        },
        "particleOpacity_particles_you": {
          "value": 0.6,
          "formula": "0.45 + (trend*0.4)",
          "useFormula": true
        },
        "particleDirection_particles_you": {
          "value": 0,
          "formula": "Math.sin(time/2000)*0.3",
          "useFormula": true
        },
        "particleColorSpeed_particles_you": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "particleRotation_particles_you": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": true
        },
        "particleGravity_particles_you": {
          "value": -0.2,
          "formula": "-0.2",
          "useFormula": false
        },
        "particleWind_particles_you": {
          "value": 1,
          "formula": "1.0 + trend*2.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textStartDelay_text_you": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_you": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_you": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_you": {
          "value": 1.05,
          "formula": "1.0 + trend*0.2",
          "useFormula": true
        },
        "textBlur_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_you": {
          "value": 0,
          "formula": "Math.sin(time/2800)*0.03",
          "useFormula": true
        },
        "textOpacity_text_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_you": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_you": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_you": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_you": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "textInkResolve_text_you": {
          "value": 0.6,
          "formula": "0.6",
          "useFormula": false
        },
        "textGlow_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_you": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_you": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "You 2",
      "layers": [
        {
          "id": "spectrum_you2",
          "type": "spectrum",
          "name": "SOLO SPECTRUM",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#ff007f",
              "#00f0ff",
              "#ffe600",
              "#ffffff",
              "#ff007f",
              "#00f0ff"
            ],
            "spectrumStyle": "waveform"
          }
        },
        {
          "id": "rays_you2",
          "type": "rays",
          "name": "CONCERT LASERS",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#ff007f",
              "#00f0ff",
              "#ffe600",
              "#ffffff",
              "#ff007f",
              "#00f0ff"
            ]
          }
        },
        {
          "id": "particles_you2",
          "type": "particles",
          "name": "EXPLOSIVE BURST",
          "enabled": true,
          "settings": {
            "particleShape": "star",
            "useLayerColor": false,
            "layerColors": [
              "#ff007f",
              "#00f0ff",
              "#ffe600",
              "#ffffff",
              "#ff007f",
              "#00f0ff"
            ]
          }
        }
      ],
      "settings": {
        "palette": [
          "#0a0518",
          "#ff007f",
          "#00f0ff",
          "#ffe600",
          "#7928ca",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "grid",
        "horizonEnabled": false,
        "gpu_fxEnabled": true,
        "isPaused": false,
        "bgColor": "#06020e",
        "horizonStyle": "montserrat"
      },
      "params": {
        "sensitivity": {
          "value": 1.6,
          "formula": "3.5",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.08,
          "formula": "0.08",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.07,
          "formula": "0.08",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.12,
          "formula": "0.08 + (bass/255)*0.25",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.55,
          "formula": "0.55",
          "useFormula": false
        },
        "spectrumCount_spectrum_you2": {
          "value": 128,
          "formula": "128",
          "useFormula": false
        },
        "spectrumHeight_spectrum_you2": {
          "value": 280,
          "formula": "180 + (mid/255)*350",
          "useFormula": true
        },
        "spectrumWidth_spectrum_you2": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "spectrumX_spectrum_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "spectrumY_spectrum_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "spectrumThickness_spectrum_you2": {
          "value": 4,
          "formula": "3 + (bass/255)*4",
          "useFormula": true
        },
        "spectrumChaos_spectrum_you2": {
          "value": 12,
          "formula": "12",
          "useFormula": false
        },
        "rayCount_rays_you2": {
          "value": 24,
          "formula": "16 + (bass/255)*16",
          "useFormula": true
        },
        "raySpeed_rays_you2": {
          "value": 3.5,
          "formula": "2.5 + trend*3.0",
          "useFormula": true
        },
        "rayCenterHole_rays_you2": {
          "value": 40,
          "formula": "40",
          "useFormula": false
        },
        "raySpread_rays_you2": {
          "value": 1.4,
          "formula": "1.4",
          "useFormula": false
        },
        "rayThickness_rays_you2": {
          "value": 4,
          "formula": "4",
          "useFormula": false
        },
        "rayChaos_rays_you2": {
          "value": 0.4,
          "formula": "0.2 + (bass/255)*0.5",
          "useFormula": true
        },
        "rayOpacity_rays_you2": {
          "value": 0.85,
          "formula": "0.85",
          "useFormula": false
        },
        "particleCount_particles_you2": {
          "value": 650,
          "formula": "400 + trend*400",
          "useFormula": true
        },
        "particleSize_particles_you2": {
          "value": 5,
          "formula": "3.5 + (bass/255)*6.0",
          "useFormula": true
        },
        "particleSpeed_particles_you2": {
          "value": 4.5,
          "formula": "3.0 + trend*5.0",
          "useFormula": true
        },
        "particleChaos_particles_you2": {
          "value": 85,
          "formula": "85",
          "useFormula": false
        },
        "particleOpacity_particles_you2": {
          "value": 0.85,
          "formula": "0.85",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "spectrumOpacity_spectrum_you2": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "maskX_spectrum_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_spectrum_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_spectrum_you2": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_spectrum_you2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_rays_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_rays_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_rays_you2": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_rays_you2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleDirection_particles_you2": {
          "value": 0,
          "formula": "Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)",
          "useFormula": true
        },
        "particleColorSpeed_particles_you2": {
          "value": 10,
          "formula": "10 + trend*50",
          "useFormula": false
        },
        "particleRotation_particles_you2": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_you2": {
          "value": 0,
          "formula": "trend > 0.8 ? -2 : 1",
          "useFormula": false
        },
        "particleWind_particles_you2": {
          "value": 2,
          "formula": "2.0 + (trend * 10)",
          "useFormula": true
        },
        "particleBreezeStrength_particles_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskX_particles_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_you2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_you2": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_you2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Us",
      "layers": [
        {
          "id": "spectrum_us",
          "type": "spectrum",
          "name": "SPECTRUM LAYER",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "spectrumStyle": "bars"
          }
        },
        {
          "id": "text_us",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Waking up today,\nthinking of calling you.",
              "A couple of cold beers,\nnot thinking about us.",
              "No photo can depict\nhow beautiful you are.",
              "No mirror can reflect\nthe depth of this ache."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": ""
          }
        }
      ],
      "settings": {
        "palette": [
          "#1b1b2f",
          "#2c3e50",
          "#8e44ad",
          "#e74c3c",
          "#ecf0f1",
          "#f39c12"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#111122"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0.2,
          "formula": "0.2",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.25,
          "formula": "0.2 + (time/200000)*0.2",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.45,
          "formula": "0.45",
          "useFormula": false
        },
        "spectrumCount_spectrum_us": {
          "value": 93,
          "formula": "64",
          "useFormula": false
        },
        "spectrumHeight_spectrum_us": {
          "value": 180,
          "formula": "120 + (bass/255)*180",
          "useFormula": true
        },
        "spectrumWidth_spectrum_us": {
          "value": 0.85,
          "formula": "0.85",
          "useFormula": false
        },
        "spectrumX_spectrum_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "spectrumY_spectrum_us": {
          "value": 0.75,
          "formula": "0.75",
          "useFormula": false
        },
        "spectrumOpacity_spectrum_us": {
          "value": 0.7,
          "formula": "0.5 + (mid/255)*0.4",
          "useFormula": true
        },
        "spectrumThickness_spectrum_us": {
          "value": 3,
          "formula": "2 + (bass/255)*3",
          "useFormula": true
        },
        "textStartDelay_text_us": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_us": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_us": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_us": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_us": {
          "value": 0,
          "formula": "Math.sin(time/2600)*0.03",
          "useFormula": true
        },
        "textOpacity_text_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_us": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_us": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_us": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_us": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "textInkResolve_text_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_spectrum_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_spectrum_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_spectrum_us": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_spectrum_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_us": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Marxeu de la ciutat",
      "layers": [
        {
          "id": "text_marxeu",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Let's leave the city,\nnothing left for us here.",
              "The noise is too heavy,\nI can't breathe anymore.",
              "Chasing a new horizon\nwhere we can be free.",
              "Waking up far away,\nescaping the disaster."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": true
          }
        }
      ],
      "settings": {
        "palette": [
          "#0d0c1d",
          "#00e8c6",
          "#262335",
          "#f18f01",
          "#ff5722",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": false,
        "webglEnabled": true,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "rooftops",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#090814"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "webglSpeed": {
          "value": 0.3,
          "formula": "Math.pow(time / 100000, 2.0)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 0.9,
          "formula": "0.75",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0,
          "formula": "0.6 + (bass/255)*0.8",
          "useFormula": false
        },
        "webglDistortion": {
          "value": 0,
          "formula": "(bass/255)*0.4",
          "useFormula": false
        },
        "panotScale": {
          "value": 4,
          "formula": "5.0",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.35,
          "formula": "0.3 + (bass/255)*0.4",
          "useFormula": false
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.045,
          "formula": "0.045",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.007,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.45,
          "formula": "0.45",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 8,
          "formula": "8",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0,
          "formula": "0.15 + (time / 120000) * 0.8 + (trend * 0.4)",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.08,
          "formula": "Math.max(0.02, 0.1 - (time/200000)*0.06 + (bass/255)*0.04)",
          "useFormula": true
        },
        "analogNoise": {
          "value": 0.12,
          "formula": "0.12",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.4,
          "formula": "0.2 + (time/200000)*0.5",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textStartDelay_text_marxeu": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_marxeu": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_marxeu": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_marxeu": {
          "value": 1.05,
          "formula": "1.0 + trend*0.2",
          "useFormula": true
        },
        "textBlur_text_marxeu": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_marxeu": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_marxeu": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_marxeu": {
          "value": 0,
          "formula": "Math.sin(time/2500)*0.04",
          "useFormula": true
        },
        "textOpacity_text_marxeu": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_marxeu": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_marxeu": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_marxeu": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_marxeu": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "textInkResolve_text_marxeu": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_marxeu": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "panotRotation": {
          "value": -3.14159265358979,
          "formula": "time / 10",
          "useFormula": false
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_text_marxeu": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_marxeu": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_marxeu": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_marxeu": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Chestnut",
      "layers": [
        {
          "id": "particles_chestnut",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "star",
            "useLayerColor": true,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": false,
            "maskType": "none"
          }
        },
        {
          "id": "text_chestnut",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Morning sun on the street,\nchestnut blossoms falling.",
              "Watching the full moon\nfrom the quiet balcony.",
              "If you ever doubt,\nthere's nothing like you and me.",
              "Blossoms will return\nwhen the winter leaves."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": true
          }
        }
      ],
      "settings": {
        "palette": [
          "#162619",
          "#2d4a22",
          "#59703f",
          "#c8963e",
          "#f4e285",
          "#f7f4ea"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "2d",
        "shaderStyle": "mosaic",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#0c150e"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.7,
          "formula": "0.6 + (mid/255)*0.3",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.35,
          "formula": "0.25 + (time/200000)*0.3 + (bass/255)*0.2",
          "useFormula": true
        },
        "particleCount_particles_chestnut": {
          "value": 190,
          "formula": "350 + (trend*250)",
          "useFormula": false
        },
        "particleSize_particles_chestnut": {
          "value": 9,
          "formula": "3.5 + (treble/255)*3.0",
          "useFormula": false
        },
        "particleSpeed_particles_chestnut": {
          "value": 1.8,
          "formula": "1.5 + trend*1.0",
          "useFormula": true
        },
        "particleChaos_particles_chestnut": {
          "value": 35,
          "formula": "25 + (bass/255)*30",
          "useFormula": true
        },
        "particleOpacity_particles_chestnut": {
          "value": 0.6,
          "formula": "0.45 + trend*0.35",
          "useFormula": false
        },
        "particleDirection_particles_chestnut": {
          "value": 1.57,
          "formula": "1.57 + Math.sin(time/2500)*0.4",
          "useFormula": true
        },
        "particleColorSpeed_particles_chestnut": {
          "value": 10,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_chestnut": {
          "value": 0,
          "formula": "time/700",
          "useFormula": true
        },
        "particleGravity_particles_chestnut": {
          "value": 1.8,
          "formula": "1.4 + trend*0.8",
          "useFormula": true
        },
        "particleWind_particles_chestnut": {
          "value": 2,
          "formula": "1.5 + Math.sin(time/2500)*2.5",
          "useFormula": true
        },
        "particleBreezeStrength_particles_chestnut": {
          "value": 0.7,
          "formula": "0.7",
          "useFormula": false
        },
        "textStartDelay_text_chestnut": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_chestnut": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_chestnut": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_chestnut": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_chestnut": {
          "value": 0,
          "formula": "Math.sin(time/2400)*0.03",
          "useFormula": true
        },
        "textOpacity_text_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_chestnut": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_chestnut": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_chestnut": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_chestnut": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "textInkResolve_text_chestnut": {
          "value": 0.55,
          "formula": "0.55",
          "useFormula": false
        },
        "textGlow_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.41,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 0,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_chestnut": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_chestnut": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Nothing",
      "layers": [
        {
          "id": "particles_nothing",
          "type": "particles",
          "name": "COSMIC STARS",
          "enabled": true,
          "settings": {
            "particleShape": "star",
            "useLayerColor": false,
            "layerColors": [
              "#90e0ef",
              "#ffffff",
              "#00b4d8",
              "#e0aaff",
              "#ffffff",
              "#caf0f8"
            ]
          }
        },
        {
          "id": "rays_nothing",
          "type": "rays",
          "name": "GALACTIC AURA",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#36123d",
              "#0077b6",
              "#90e0ef",
              "#ffffff",
              "#36123d",
              "#0077b6"
            ]
          }
        },
        {
          "id": "waves_nothing",
          "type": "waves",
          "name": "GRAVITATIONAL RIPPLES",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#0077b6",
              "#90e0ef",
              "#ffffff",
              "#36123d",
              "#0077b6",
              "#90e0ef"
            ]
          }
        },
        {
          "id": "text_nothing",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "No more denying it,\nthere is no time left.",
              "The clock runs ahead,\nthe future a thin grey thread.",
              "Coffee on the balcony,\nlast ray of sunlight.",
              "Packing my suitcase\nwith a frozen heart."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": ""
          }
        }
      ],
      "settings": {
        "palette": [
          "#020108",
          "#120824",
          "#36123d",
          "#0077b6",
          "#90e0ef",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": true,
        "webglProjection": "2d",
        "shaderStyle": "galaxy",
        "horizonEnabled": false,
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#020108",
        "horizonStyle": "montserrat"
      },
      "params": {
        "sensitivity": {
          "value": 2.2,
          "formula": "2.2",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "webglSpeed": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "webglElevation": {
          "value": 0,
          "formula": "0.0",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.85,
          "formula": "0.85",
          "useFormula": false
        },
        "webglDistortion": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotScale": {
          "value": 4,
          "formula": "4.0",
          "useFormula": false
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 80000",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.05,
          "formula": "0.05",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.7,
          "formula": "0.7",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.06,
          "formula": "0.06",
          "useFormula": false
        },
        "particleCount_particles_nothing": {
          "value": 280,
          "formula": "280",
          "useFormula": false
        },
        "particleSize_particles_nothing": {
          "value": 9.4,
          "formula": "2.8",
          "useFormula": false
        },
        "particleSpeed_particles_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "particleChaos_particles_nothing": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "particleOpacity_particles_nothing": {
          "value": 0.75,
          "formula": "0.75",
          "useFormula": false
        },
        "particleDirection_particles_nothing": {
          "value": 1.57,
          "formula": "Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2) + 1.57",
          "useFormula": true
        },
        "particleColorSpeed_particles_nothing": {
          "value": 3,
          "formula": "3",
          "useFormula": false
        },
        "particleRotation_particles_nothing": {
          "value": 0,
          "formula": "time / 8000",
          "useFormula": true
        },
        "particleGravity_particles_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleWind_particles_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleBreezeStrength_particles_nothing": {
          "value": 0.1,
          "formula": "0.1",
          "useFormula": false
        },
        "rayCount_rays_nothing": {
          "value": 12,
          "formula": "12",
          "useFormula": false
        },
        "raySpeed_rays_nothing": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "rayCenterHole_rays_nothing": {
          "value": 60,
          "formula": "60",
          "useFormula": false
        },
        "raySpread_rays_nothing": {
          "value": 1.5,
          "formula": "1.5",
          "useFormula": false
        },
        "rayThickness_rays_nothing": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "rayChaos_rays_nothing": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "rayOpacity_rays_nothing": {
          "value": 0.25,
          "formula": "0.25",
          "useFormula": false
        },
        "waveCount_waves_nothing": {
          "value": 3,
          "formula": "3",
          "useFormula": false
        },
        "waveSpeed_waves_nothing": {
          "value": 0.35,
          "formula": "0.35",
          "useFormula": false
        },
        "waveThickness_waves_nothing": {
          "value": 3,
          "formula": "3",
          "useFormula": false
        },
        "waveChaos_waves_nothing": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "waveOpacity_waves_nothing": {
          "value": 0.2,
          "formula": "0.2",
          "useFormula": false
        },
        "textStartDelay_text_nothing": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_nothing": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_nothing": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_nothing": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_nothing": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_nothing": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_nothing": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_nothing": {
          "value": 0.25,
          "formula": "0.25",
          "useFormula": false
        },
        "textInkResolve_text_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_nothing": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_rays_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_rays_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_rays_nothing": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_rays_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_waves_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_waves_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_waves_nothing": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_waves_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_nothing": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_nothing": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Nothing 2",
      "layers": [
        {
          "id": "particles_nothing2",
          "type": "particles",
          "name": "COSMIC STARS",
          "enabled": true,
          "settings": {
            "particleShape": "nova",
            "useLayerColor": false,
            "layerColors": [
              "#90e0ef",
              "#ffffff",
              "#00b4d8",
              "#e0aaff",
              "#ffffff",
              "#caf0f8"
            ]
          }
        },
        {
          "id": "rays_nothing2",
          "type": "rays",
          "name": "GALACTIC AURA",
          "enabled": true,
          "settings": {
            "useLayerColor": false,
            "layerColors": [
              "#4d194d",
              "#00b4d8",
              "#90e0ef",
              "#ffffff",
              "#4d194d",
              "#00b4d8"
            ]
          }
        }
      ],
      "settings": {
        "palette": [
          "#020108",
          "#1a0b2e",
          "#4d194d",
          "#00b4d8",
          "#90e0ef",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": true,
        "webglProjection": "2d",
        "shaderStyle": "galaxy",
        "horizonEnabled": false,
        "gpu_fxEnabled": true,
        "isPaused": false,
        "bgColor": "#020108",
        "horizonStyle": "montserrat"
      },
      "params": {
        "sensitivity": {
          "value": 3,
          "formula": "3.0",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.08,
          "formula": "0.08",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.06,
          "formula": "(bass/255)*0.15",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 1.6,
          "formula": "1.2 + trend*1.4",
          "useFormula": true
        },
        "webglElevation": {
          "value": 0,
          "formula": "0.0",
          "useFormula": false
        },
        "webglGlow": {
          "value": 1.4,
          "formula": "1.1 + (bass/255)*0.9",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 0.18,
          "formula": "0.10 + (bass/255)*0.38",
          "useFormula": true
        },
        "panotScale": {
          "value": 4.5,
          "formula": "4.5",
          "useFormula": false
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 18000 + Math.sin(time/250)*0.03*(bass/255)",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.05,
          "formula": "0.05",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.65,
          "formula": "0.65",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08",
          "useFormula": false
        },
        "particleCount_particles_nothing2": {
          "value": 850,
          "formula": "700 + trend*350",
          "useFormula": true
        },
        "particleSize_particles_nothing2": {
          "value": 3.8,
          "formula": "2.8 + (bass/255)*3.2",
          "useFormula": true
        },
        "particleSpeed_particles_nothing2": {
          "value": 2.2,
          "formula": "1.6 + trend*1.4",
          "useFormula": true
        },
        "particleChaos_particles_nothing2": {
          "value": 45,
          "formula": "25 + (bass/255)*40",
          "useFormula": true
        },
        "particleOpacity_particles_nothing2": {
          "value": 0.85,
          "formula": "0.75 + trend*0.25",
          "useFormula": true
        },
        "particleDirection_particles_nothing2": {
          "value": 1.57,
          "formula": "Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2) + 1.57 + Math.sin(time/400)*0.15",
          "useFormula": true
        },
        "particleColorSpeed_particles_nothing2": {
          "value": 6,
          "formula": "6",
          "useFormula": false
        },
        "particleRotation_particles_nothing2": {
          "value": 0,
          "formula": "time / 2000",
          "useFormula": true
        },
        "particleGravity_particles_nothing2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleWind_particles_nothing2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleBreezeStrength_particles_nothing2": {
          "value": 0.25,
          "formula": "0.25",
          "useFormula": false
        },
        "rayCount_rays_nothing2": {
          "value": 197,
          "formula": "24",
          "useFormula": false
        },
        "raySpeed_rays_nothing2": {
          "value": 1.5,
          "formula": "1.5 + trend*1.5",
          "useFormula": true
        },
        "rayCenterHole_rays_nothing2": {
          "value": 135,
          "formula": "70",
          "useFormula": false
        },
        "raySpread_rays_nothing2": {
          "value": 5,
          "formula": "1.8",
          "useFormula": false
        },
        "rayThickness_rays_nothing2": {
          "value": 3,
          "formula": "3",
          "useFormula": false
        },
        "rayChaos_rays_nothing2": {
          "value": 0.15,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "rayOpacity_rays_nothing2": {
          "value": 0.35,
          "formula": "0.45",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.4 + (trend * 0.3)",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_particles_nothing2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_nothing2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_nothing2": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_nothing2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_rays_nothing2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_rays_nothing2": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_rays_nothing2": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_rays_nothing2": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "Coming back home",
      "layers": [
        {
          "id": "photos_backhome",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              0
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen",
            "collapsed": true
          }
        },
        {
          "id": "particles_backhome",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "mote",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": true
          }
        },
        {
          "id": "text_backhome",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Father and mother, I'm here,\nthe long road has ended.",
              "The old neighborhood streets\nhave all been paved.",
              "My sister on the balcony,\neyes full of emotion.",
              "In the closet, my jacket...\nit doesn't fit me anymore."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": true
          }
        }
      ],
      "settings": {
        "palette": [
          "#140905",
          "#38160d",
          "#702e17",
          "#b85d19",
          "#e89838",
          "#fcedd8"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#0d0604"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.85,
          "formula": "0.75 + (mid/255)*0.2",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.3 + (time/200000)*0.3 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08",
          "useFormula": false
        },
        "analogVignette": {
          "value": 0.45,
          "formula": "0.45",
          "useFormula": false
        },
        "imgScale_photos_backhome": {
          "value": 1.15,
          "formula": "1.1 + (trend*0.2)",
          "useFormula": true
        },
        "imgOpacity_photos_backhome": {
          "value": 0.55,
          "formula": "0.4 + (mid/255)*0.3",
          "useFormula": true
        },
        "imgGlitch_photos_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "imgBlur_photos_backhome": {
          "value": 16,
          "formula": "12 + (1-trend)*18",
          "useFormula": true
        },
        "imgSaturate_photos_backhome": {
          "value": 130,
          "formula": "115 + (mid/255)*40",
          "useFormula": true
        },
        "photoRotation_photos_backhome": {
          "value": 0,
          "formula": "Math.sin(time/3500)*0.03",
          "useFormula": true
        },
        "photoContrast_photos_backhome": {
          "value": 110,
          "formula": "110",
          "useFormula": false
        },
        "particleCount_particles_backhome": {
          "value": 400,
          "formula": "300 + (trend*200)",
          "useFormula": true
        },
        "particleSize_particles_backhome": {
          "value": 4,
          "formula": "3.0 + (bass/255)*3.0",
          "useFormula": true
        },
        "particleSpeed_particles_backhome": {
          "value": 1,
          "formula": "0.8 + trend*0.8",
          "useFormula": true
        },
        "particleChaos_particles_backhome": {
          "value": 30,
          "formula": "20 + (bass/255)*25",
          "useFormula": true
        },
        "particleOpacity_particles_backhome": {
          "value": 0.55,
          "formula": "0.45 + trend*0.3",
          "useFormula": true
        },
        "particleDirection_particles_backhome": {
          "value": -1,
          "formula": "-1.0 + Math.sin(time/2500)*0.3",
          "useFormula": true
        },
        "particleColorSpeed_particles_backhome": {
          "value": 10,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleGravity_particles_backhome": {
          "value": -0.3,
          "formula": "-0.3",
          "useFormula": false
        },
        "particleWind_particles_backhome": {
          "value": 1,
          "formula": "0.8 + Math.sin(time/2000)*1.2",
          "useFormula": true
        },
        "particleBreezeStrength_particles_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textStartDelay_text_backhome": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_backhome": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_backhome": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_backhome": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_backhome": {
          "value": 0,
          "formula": "Math.sin(time/2600)*0.03",
          "useFormula": true
        },
        "textOpacity_text_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_backhome": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_backhome": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_backhome": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_backhome": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "textInkResolve_text_backhome": {
          "value": 0.55,
          "formula": "0.55",
          "useFormula": false
        },
        "textGlow_text_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_photos_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_photos_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_photos_backhome": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_photos_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_particles_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_backhome": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_backhome": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_backhome": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_backhome": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    },
    {
      "name": "House",
      "layers": [
        {
          "id": "photos_house",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              4
            ],
            "webcamIndices": [],
            "imgBlendMode": "source-over",
            "collapsed": true
          }
        },
        {
          "id": "particles_house",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "mote",
            "useLayerColor": false,
            "layerColors": [
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff",
              "#ffffff"
            ],
            "collapsed": true
          }
        },
        {
          "id": "text_house",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "Waking in the morning,\nstaying in bed.",
              "Sunlight through the glass,\nmelting the anxiety away.",
              "Just one more day,\nfeeling that time has stopped.",
              "Let the days pass slowly,\nwith you by my side."
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "fade",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": "",
            "collapsed": true
          }
        }
      ],
      "settings": {
        "palette": [
          "#1c0f06",
          "#4a230c",
          "#8c4618",
          "#d97d27",
          "#f2b705",
          "#fff9e6"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "2d",
        "shaderStyle": "grid",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "isPaused": false,
        "bgColor": "#0f0803"
      },
      "params": {
        "sensitivity": {
          "value": 2.8,
          "formula": "2.8 + bass/100",
          "useFormula": false
        },
        "trendRate": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "clearOpacity": {
          "value": 0.12,
          "formula": "0.12 + (1 - trend) * 0.1",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.4,
          "formula": "Math.max(0.05, 0.45 - (time / 210000) * 0.4)",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.25,
          "formula": "Math.max(0, 0.3 - (time / 210000) * 0.3)",
          "useFormula": true
        },
        "imgScale_photos_house": {
          "value": 1.2,
          "formula": "1.15 + trend*0.2",
          "useFormula": true
        },
        "imgOpacity_photos_house": {
          "value": 0.5,
          "formula": "Math.min(1.0, 0.45 + (time / 210000) * 0.55)",
          "useFormula": true
        },
        "imgGlitch_photos_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "imgBlur_photos_house": {
          "value": 35,
          "formula": "Math.max(0, 35 * Math.pow(Math.max(0, 1.0 - time / 210000), 1.4))",
          "useFormula": true
        },
        "imgSaturate_photos_house": {
          "value": 100,
          "formula": "100",
          "useFormula": false
        },
        "photoRotation_photos_house": {
          "value": 0,
          "formula": "Math.sin(time/3500)*0.03",
          "useFormula": true
        },
        "photoContrast_photos_house": {
          "value": 100,
          "formula": "100",
          "useFormula": false
        },
        "particleCount_particles_house": {
          "value": 350,
          "formula": "250 + (trend*150)",
          "useFormula": true
        },
        "particleSize_particles_house": {
          "value": 4.5,
          "formula": "3.5 + (bass/255)*3.0",
          "useFormula": true
        },
        "particleSpeed_particles_house": {
          "value": 0.6,
          "formula": "0.5 + trend*0.4",
          "useFormula": true
        },
        "particleChaos_particles_house": {
          "value": 25,
          "formula": "20 + (bass/255)*20",
          "useFormula": true
        },
        "particleOpacity_particles_house": {
          "value": 0.4,
          "formula": "Math.max(0.05, 0.4 - (time / 210000) * 0.35)",
          "useFormula": true
        },
        "particleDirection_particles_house": {
          "value": -0.8,
          "formula": "-0.8 + Math.sin(time/3000)*0.2",
          "useFormula": true
        },
        "particleColorSpeed_particles_house": {
          "value": 8,
          "formula": "8",
          "useFormula": false
        },
        "particleRotation_particles_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleGravity_particles_house": {
          "value": -0.2,
          "formula": "-0.2",
          "useFormula": false
        },
        "particleWind_particles_house": {
          "value": 0.6,
          "formula": "0.5 + Math.sin(time/2500)*0.8",
          "useFormula": true
        },
        "particleBreezeStrength_particles_house": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "textStartDelay_text_house": {
          "value": 30,
          "formula": "30",
          "useFormula": false
        },
        "textStopDelay_text_house": {
          "value": 240,
          "formula": "240",
          "useFormula": false
        },
        "textPauseTime_text_house": {
          "value": 15,
          "formula": "15",
          "useFormula": false
        },
        "textScale_text_house": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "textBlur_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_house": {
          "value": 0,
          "formula": "Math.sin(time/2800)*0.03",
          "useFormula": true
        },
        "textOpacity_text_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textHoldTime_text_house": {
          "value": 6.5,
          "formula": "6.5",
          "useFormula": false
        },
        "textFadeTime_text_house": {
          "value": 1.2,
          "formula": "1.2",
          "useFormula": false
        },
        "textTypeSpeed_text_house": {
          "value": 45,
          "formula": "45",
          "useFormula": false
        },
        "textEnvironmentDrift_text_house": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "textInkResolve_text_house": {
          "value": 0.55,
          "formula": "0.55",
          "useFormula": false
        },
        "textGlow_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogFlash": {
          "value": 0,
          "formula": "(bass/255 > 0.8) ? (bass/255) : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "trend > 0.8 ? 50 : 5",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.08,
          "formula": "0.08 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5 + (avg/255)*0.2",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "0.5 + (bass/255)*4.0",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2 + (trend * 0.3)",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 5,
          "formula": "5 + (trend * 10)",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/1000)",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.8,
          "formula": "0.5 + (bass/255)*0.5",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1.5,
          "formula": "1.5 + (trend * 2)",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.5 + bass",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": true
        },
        "panotMortar": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.04,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.02,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.3,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.05 + (bass/255)*0.1",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.7,
          "formula": "0.5",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": 0.005,
          "formula": "0.005 + (trend * 0.01)",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "6",
          "useFormula": false
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "maskX_photos_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_photos_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_photos_house": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_photos_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_particles_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_particles_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_particles_house": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_particles_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "maskX_text_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskY_text_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "maskSize_text_house": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "maskFeather_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    }
  ],
  "imported": true
};
