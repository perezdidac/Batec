window.AGOST_DEFAULT_SESSION = {
  "presets": [
    {
      "name": "Friday",
      "layers": [
        {
          "id": "photos_friday",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              3,
              4
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
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
            ]
          }
        },
        {
          "id": "text_friday",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "CRAVING A BEER",
              "SUN IS SETTING",
              "FIVE DAYS WITHOUT YOU",
              "SEE YOU SOON",
              "IT HURTS A LOT",
              "I WILL RETURN"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "'Inter', sans-serif",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
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
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "5 + (bass/255)*20 + (trend > 0.8 ? 30 : 0)",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.1,
          "formula": "0.1",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.05,
          "formula": "0.05 + trend * 0.1 + (treble/255)*0.08",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.8,
          "formula": "Math.max(0.2, 0.85 - (time/210000)*0.4 + (mid/255)*0.2)",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.3,
          "formula": "0.2 + (time/210000)*0.5 + (bass/255)*0.35 + Math.sin(time/2500)*0.1",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 30,
          "formula": "15 + (1.0 - trend)*25 + (bass/255)*20",
          "useFormula": true
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
        "imgScale_photos_friday": {
          "value": 1.2,
          "formula": "1.2 + (trend*0.4) + (bass/255)*0.2",
          "useFormula": true
        },
        "imgOpacity_photos_friday": {
          "value": 0.3,
          "formula": "0.2 + (time/210000)*0.3 + (mid/255)*0.3",
          "useFormula": true
        },
        "imgGlitch_photos_friday": {
          "value": 0,
          "formula": "bass > 200 ? (bass-200)*2 : 0",
          "useFormula": true
        },
        "imgBlur_photos_friday": {
          "value": 20,
          "formula": "5 + (time/210000)*25 + Math.sin(time/4000)*10",
          "useFormula": true
        },
        "imgSaturate_photos_friday": {
          "value": 150,
          "formula": "100 + trend*150 + (bass/255)*100",
          "useFormula": true
        },
        "photoRotation_photos_friday": {
          "value": 0,
          "formula": "Math.sin(time/4000) * 0.05",
          "useFormula": true
        },
        "photoContrast_photos_friday": {
          "value": 110,
          "formula": "100 + bass/2",
          "useFormula": true
        },
        "particleCount_particles_friday": {
          "value": 150,
          "formula": "120 + (time/210000)*350 + (trend * 250)",
          "useFormula": true
        },
        "particleSize_particles_friday": {
          "value": 42.4,
          "formula": "3 + (bass/255)*10*trend",
          "useFormula": true
        },
        "particleSpeed_particles_friday": {
          "value": 2,
          "formula": "1.5 + (treble/255)*3.0 + trend*2.0",
          "useFormula": true
        },
        "particleChaos_particles_friday": {
          "value": 10,
          "formula": "10 + (bass/255)*40",
          "useFormula": true
        },
        "particleOpacity_particles_friday": {
          "value": 0.05,
          "formula": "0.2 + trend*0.4 + (mid/255)*0.3",
          "useFormula": true
        },
        "particleDirection_particles_friday": {
          "value": 2.8,
          "formula": "2.8",
          "useFormula": false
        },
        "particleColorSpeed_particles_friday": {
          "value": 27,
          "formula": "10 + trend*50",
          "useFormula": false
        },
        "particleRotation_particles_friday": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_friday": {
          "value": 0,
          "formula": "trend > 0.8 ? -2 : 1",
          "useFormula": false
        },
        "particleWind_particles_friday": {
          "value": 5,
          "formula": "3.0 + Math.sin(time/3000)*4.0 + (mid/255)*4.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_friday": {
          "value": 0.78,
          "formula": "0.5",
          "useFormula": false
        },
        "textScale_text_friday": {
          "value": 1.3,
          "formula": "1.3",
          "useFormula": false
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
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_friday": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_friday": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_friday": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_friday": {
          "value": 0,
          "formula": "0",
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
        }
      }
    },
    {
      "name": "Gravel",
      "layers": [
        {
          "id": "photos_gravel",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              0,
              3
            ],
            "webcamIndices": [],
            "imgBlendMode": "multiply"
          }
        },
        {
          "id": "particles_gravel",
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
            ]
          }
        },
        {
          "id": "text_gravel",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "NEVER ARRIVE",
              "STOP THE TIME",
              "DIRT ROAD",
              "NORMAL THINGS",
              "NO GOODBYES",
              "WRONG EXIT"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false,
            "timedLyricsEnabled": false,
            "timedLyricsText": ""
          }
        }
      ],
      "settings": {
        "palette": [
          "#8d6e63",
          "#5d4037",
          "#388e3c",
          "#1b5e20",
          "#0288d1",
          "#d7ccc8"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": true,
        "bgColor": "#100c0a"
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
          "formula": "0",
          "useFormula": false
        },
        "analogScratches": {
          "value": 0.2,
          "formula": "0.1 + (time/210000)*0.4 + (treble/255)*0.3",
          "useFormula": true
        },
        "analogDrift": {
          "value": 2,
          "formula": "3 + (time/210000)*25 + (bass/255)*15",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.1,
          "formula": "0.1 + (bass/255)*0.25",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.3,
          "formula": "0.3 + (mid/255)*0.2",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.85,
          "formula": "0.3 + (trend * 0.4) + (bass/255)*0.3",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.45,
          "formula": "0.5",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 30,
          "formula": "(1.0 - trend) * 40 + (bass/255)*15",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 1.3,
          "formula": "1.0 + (mid/255)*0.6",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.12 + (time/200000)*0.35 + (mid/255)*0.2",
          "useFormula": true
        },
        "analogStainIntensity": {
          "value": 0.3,
          "formula": "0.2 + (time/210000)*0.5 + (bass/255)*0.2",
          "useFormula": true
        },
        "imgScale_photos_gravel": {
          "value": 1.2,
          "formula": "1.2 + trend*0.3 + (bass/255)*0.15",
          "useFormula": true
        },
        "imgOpacity_photos_gravel": {
          "value": 0.5,
          "formula": "0.35 + trend*0.3 + (mid/255)*0.2",
          "useFormula": true
        },
        "imgGlitch_photos_gravel": {
          "value": 0,
          "formula": "bass > 180 ? (bass - 180)/3 : 0",
          "useFormula": true
        },
        "imgBlur_photos_gravel": {
          "value": 15,
          "formula": "Math.max(2, 15 - trend*10)",
          "useFormula": true
        },
        "imgSaturate_photos_gravel": {
          "value": 150,
          "formula": "100 + trend*150",
          "useFormula": true
        },
        "photoRotation_photos_gravel": {
          "value": 0,
          "formula": "Math.sin(time/2000) * 0.15",
          "useFormula": true
        },
        "photoContrast_photos_gravel": {
          "value": 160,
          "formula": "110 + bass/3",
          "useFormula": true
        },
        "particleCount_particles_gravel": {
          "value": 600,
          "formula": "250 + (time/210000)*700 + (bass/255)*250",
          "useFormula": true
        },
        "particleSize_particles_gravel": {
          "value": 2,
          "formula": "2.0 + trend*3.0 + (bass/255)*2.0",
          "useFormula": true
        },
        "particleSpeed_particles_gravel": {
          "value": 4,
          "formula": "3.0 + (time/210000)*4.0 + (avg/255)*5.0",
          "useFormula": true
        },
        "particleChaos_particles_gravel": {
          "value": 60,
          "formula": "30 + (bass/255)*50",
          "useFormula": true
        },
        "particleOpacity_particles_gravel": {
          "value": 0.4,
          "formula": "0.3 + trend*0.4",
          "useFormula": true
        },
        "particleDirection_particles_gravel": {
          "value": 0,
          "formula": "Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)",
          "useFormula": true
        },
        "particleColorSpeed_particles_gravel": {
          "value": 10,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_gravel": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_gravel": {
          "value": -0.2,
          "formula": "-0.2",
          "useFormula": false
        },
        "particleWind_particles_gravel": {
          "value": 15,
          "formula": "10.0 + Math.sin(time/1500)*8.0 + (mid/255)*6.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_gravel": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textScale_text_gravel": {
          "value": 1.3,
          "formula": "1.3",
          "useFormula": false
        },
        "textBlur_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterX_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textJitterY_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textRotation_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_gravel": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_gravel": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_gravel": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_gravel": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_gravel": {
          "value": 0,
          "formula": "0",
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
        }
      }
    },
    {
      "name": "Rain",
      "layers": [
        {
          "id": "photos_rain",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              1,
              3
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
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
          "id": "waves_rain",
          "type": "waves",
          "name": "WAVES LAYER",
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
          "id": "text_rain",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "AUTUMN CLOUDS",
              "SMELL OF EARTH",
              "FOG OF MEMORY",
              "COLD TO THE BONE",
              "WHISTLING WIND",
              "DEAD LEAF",
              "COUNTING NIGHTS"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "'Courier New', monospace",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
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
        "gpu_fxEnabled": true,
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
          "value": 0.7,
          "formula": "0.7",
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
        "imgScale_photos_rain": {
          "value": 1.1,
          "formula": "1.1 + trend*0.3",
          "useFormula": true
        },
        "imgOpacity_photos_rain": {
          "value": 0.35,
          "formula": "0.2 + (time/210000)*0.3 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleCount_particles_rain": {
          "value": 400,
          "formula": "300 + (time/210000)*600 + (avg/255)*300",
          "useFormula": true
        },
        "particleSize_particles_rain": {
          "value": 1.5,
          "formula": "1.5 + (treble/255)*2.5 + trend*2.0",
          "useFormula": true
        },
        "particleSpeed_particles_rain": {
          "value": 10,
          "formula": "8.0 + (treble/255)*8.0 + trend*4.0",
          "useFormula": true
        },
        "particleChaos_particles_rain": {
          "value": 60,
          "formula": "40 + (bass/255)*40",
          "useFormula": true
        },
        "particleOpacity_particles_rain": {
          "value": 0.3,
          "formula": "0.3 + trend*0.4 + (mid/255)*0.3",
          "useFormula": true
        },
        "particleDirection_particles_rain": {
          "value": 1.57,
          "formula": "Math.PI/2 + (Math.sin(time/4000) * 0.1)",
          "useFormula": true
        },
        "particleColorSpeed_particles_rain": {
          "value": 10,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_rain": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_rain": {
          "value": 8,
          "formula": "5.0 + (time/210000)*10.0 + (bass/255)*8.0",
          "useFormula": true
        },
        "particleWind_particles_rain": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "particleBreezeStrength_particles_rain": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "waveCount_waves_rain": {
          "value": 3,
          "formula": "2 + Math.floor((time/210000)*4 + (bass/255)*4)",
          "useFormula": true
        },
        "waveSpeed_waves_rain": {
          "value": 1.5,
          "formula": "1.0 + (time/210000)*2.5 + (avg/255)*1.5",
          "useFormula": true
        },
        "waveThickness_waves_rain": {
          "value": 10,
          "formula": "2.0 + (bass/255)*12.0",
          "useFormula": true
        },
        "waveChaos_waves_rain": {
          "value": 20,
          "formula": "5.0 + Math.sin(time/1000)*15.0 + (bass/255)*15.0",
          "useFormula": true
        },
        "waveOpacity_waves_rain": {
          "value": 0.4,
          "formula": "0.3 + (mid/255)*0.4",
          "useFormula": true
        },
        "textScale_text_rain": {
          "value": 1.3,
          "formula": "1.3",
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_rain": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_rain": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_rain": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_rain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textInkResolve_text_rain": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_rain": {
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
          "id": "photos_summer",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              1,
              2
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
        {
          "id": "waves_summer",
          "type": "waves",
          "name": "WAVES LAYER",
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
          "id": "text_summer",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "SUMMER ARRIVES",
              "IN YOUR ARMS",
              "WHAT A DRAG",
              "THIS AUGUST",
              "NOW IT LEAVES",
              "DON'T FORGET"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#ffb703",
          "#fb8500",
          "#00b4d8",
          "#0077b6",
          "#f72585",
          "#7209b7"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": true,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "bgColor": "#1a0808"
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
          "formula": "(bass/255 > 0.85) ? (bass/255)*0.5 : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "trend > 0.8 ? 30 : 0",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0,
          "formula": "0.08",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.9,
          "formula": "0.7 + (mid/255)*0.3",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.5,
          "formula": "0.25 + (time/210000)*0.5 + (trend * 0.45)",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.4,
          "formula": "0.4 + trend * 0.3",
          "useFormula": true
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "(1.0 - trend) * 40",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "1",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.1 + (time/210000)*0.5 + (mid/255)*0.3",
          "useFormula": true
        },
        "webglSpeed": {
          "value": 6,
          "formula": "3.0 + (time/200000)*8.0 + (bass/255)*7.0",
          "useFormula": true
        },
        "webglElevation": {
          "value": 1,
          "formula": "1.0",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.5,
          "formula": "0.3 + (time/200000)*1.2 + (mid/255)*1.0",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/3000)*1.5 + (bass/255)*1.0",
          "useFormula": true
        },
        "panotScale": {
          "value": 5,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 0.5,
          "formula": "0.3 + (time/210000)*1.2 + (bass/255)*1.2",
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
        "imgScale_photos_summer": {
          "value": 1.2,
          "formula": "1.2 + trend*0.3 + (bass/255)*0.2",
          "useFormula": true
        },
        "imgOpacity_photos_summer": {
          "value": 0.3,
          "formula": "0.2 + (time/210000)*0.4 + (mid/255)*0.3",
          "useFormula": true
        },
        "waveCount_waves_summer": {
          "value": 2,
          "formula": "2 + Math.floor(trend*4 + (bass/255)*3)",
          "useFormula": true
        },
        "waveSpeed_waves_summer": {
          "value": 1,
          "formula": "1.0 + Math.sin(time/2000)*1.5 + (avg/255)*2.0",
          "useFormula": true
        },
        "waveThickness_waves_summer": {
          "value": 4,
          "formula": "3.0 + (bass/255)*10.0",
          "useFormula": true
        },
        "waveChaos_waves_summer": {
          "value": 10,
          "formula": "6.0 + (time/210000)*30.0 + (mid/255)*25.0",
          "useFormula": true
        },
        "waveOpacity_waves_summer": {
          "value": 0.3,
          "formula": "0.3 + trend*0.4",
          "useFormula": true
        },
        "textScale_text_summer": {
          "value": 1.3,
          "formula": "1.3",
          "useFormula": false
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_summer": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_summer": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_summer": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_summer": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textInkResolve_text_summer": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_summer": {
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
          "id": "photos_nothing",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              2,
              4
            ],
            "webcamIndices": [],
            "imgBlendMode": "multiply"
          }
        },
        {
          "id": "rays_nothing",
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
          "id": "text_nothing",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "NO TIME LEFT",
              "THIN GREY THREAD",
              "FROZEN HEART",
              "LAST RAY OF SUN",
              "LEAVING IN TWO DAYS",
              "SMELL OF COFFEE"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#000000",
          "#1a0003",
          "#9d0208",
          "#6a040f",
          "#370617",
          "#d00000"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": true,
        "bgColor": "#000000"
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
          "formula": "(bass > 210) ? 0.8 : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.05,
          "formula": "0.05 + (treble/255)*0.1",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.7,
          "formula": "0.4 + (mid/255)*0.5",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "(1.0 - trend)*30",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "gpuAberration": {
          "value": 0.05,
          "formula": "0.02 + (time/210000)*0.18 + (treble/255)*0.12",
          "useFormula": true
        },
        "gpuSmearRatio": {
          "value": 0.95,
          "formula": "0.95",
          "useFormula": false
        },
        "gpuMeltSpeed": {
          "value": -0.003,
          "formula": "-0.003",
          "useFormula": false
        },
        "gpuKaleidoSegments": {
          "value": 0,
          "formula": "trend > 0.75 ? Math.floor(4 + (bass/255)*4) : (time > 140000 ? 4 : 0)",
          "useFormula": true
        },
        "gpuKaleidoRot": {
          "value": 0,
          "formula": "(time/1000) * 0.2",
          "useFormula": true
        },
        "imgScale_photos_nothing": {
          "value": 1.2,
          "formula": "1.2 + trend*0.4",
          "useFormula": true
        },
        "imgOpacity_photos_nothing": {
          "value": 0.25,
          "formula": "0.1 + (time/210000)*0.4 + (mid/255)*0.2",
          "useFormula": true
        },
        "rayCount_rays_nothing": {
          "value": 15,
          "formula": "4 + Math.floor((time/210000)*30 + (bass/255)*12)",
          "useFormula": true
        },
        "raySpeed_rays_nothing": {
          "value": 0.2,
          "formula": "0.2 + Math.sin(time/10000)*0.6 + (avg/255)*0.4",
          "useFormula": true
        },
        "rayThickness_rays_nothing": {
          "value": 8,
          "formula": "4.0 + (bass/255)*14.0",
          "useFormula": true
        },
        "rayCenterHole_rays_nothing": {
          "value": 50,
          "formula": "50.0 + trend*180.0",
          "useFormula": true
        },
        "rayChaos_rays_nothing": {
          "value": 0.4,
          "formula": "0.4 + trend*1.0",
          "useFormula": true
        },
        "rayOpacity_rays_nothing": {
          "value": 0.2,
          "formula": "0.1 + (time/210000)*0.6 + (mid/255)*0.3",
          "useFormula": true
        },
        "textScale_text_nothing": {
          "value": 1.3,
          "formula": "1.3",
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
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_nothing": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_nothing": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_nothing": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_nothing": {
          "value": 0,
          "formula": "0",
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
        }
      }
    },
    {
      "name": "Us",
      "layers": [
        {
          "id": "photos_us",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              2,
              4
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
        {
          "id": "particles_us",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "petal",
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
          "id": "text_us",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "WOKE UP TODAY",
              "CALLED YOU INSTEAD",
              "WITH SOMEONE ELSE",
              "BEERS WITH FRIENDS",
              "NO MIRROR KNOWS",
              "STOOD ME UP"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#3d261d",
          "#8d5b4c",
          "#d7ccc8",
          "#e0a96d",
          "#f4b393",
          "#ffcc80"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "bgColor": "#1a120f"
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
          "formula": "0",
          "useFormula": false
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 5,
          "formula": "5 + (bass/255)*10",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.05,
          "formula": "0.05",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.1,
          "formula": "0.1",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.7,
          "formula": "0.5 + (mid/255)*0.3",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.3 + (mid/255)*0.3",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 60,
          "formula": "15 + (1.0 - trend)*40 + (bass/255)*30",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "(time/210000)*1.2 + (mid/255)*0.6",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0.2,
          "formula": "0.2",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "imgScale_photos_us": {
          "value": 1.1,
          "formula": "1.1 + Math.sin(time/10000)*0.1 + (bass/255)*0.1",
          "useFormula": true
        },
        "imgOpacity_photos_us": {
          "value": 0.15,
          "formula": "0.1 + (time/210000)*0.4 + (mid/255)*0.3",
          "useFormula": true
        },
        "imgGlitch_photos_us": {
          "value": 0,
          "formula": "bass > 220 ? 80 : 0",
          "useFormula": true
        },
        "imgBlur_photos_us": {
          "value": 40,
          "formula": "Math.max(2, 45 - (time/200000)*35 - (mid/255)*10)",
          "useFormula": true
        },
        "imgSaturate_photos_us": {
          "value": 150,
          "formula": "150",
          "useFormula": false
        },
        "photoRotation_photos_us": {
          "value": 0,
          "formula": "0.1",
          "useFormula": false
        },
        "photoContrast_photos_us": {
          "value": 110,
          "formula": "110",
          "useFormula": false
        },
        "particleCount_particles_us": {
          "value": 300,
          "formula": "150 + (time/210000)*450 + (mid/255)*200",
          "useFormula": true
        },
        "particleSize_particles_us": {
          "value": 6,
          "formula": "5.0 + (bass/255)*8.0 + trend*5.0",
          "useFormula": true
        },
        "particleSpeed_particles_us": {
          "value": 1.5,
          "formula": "1.2 + (treble/255)*2.0 + trend*1.5",
          "useFormula": true
        },
        "particleChaos_particles_us": {
          "value": 15,
          "formula": "15.0 + Math.sin(time/4000)*10.0",
          "useFormula": true
        },
        "particleOpacity_particles_us": {
          "value": 0.3,
          "formula": "0.3 + trend*0.4 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleDirection_particles_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleColorSpeed_particles_us": {
          "value": 9,
          "formula": "9",
          "useFormula": false
        },
        "particleRotation_particles_us": {
          "value": 0,
          "formula": "time/2000",
          "useFormula": true
        },
        "particleGravity_particles_us": {
          "value": 0.8,
          "formula": "0.3 + (time/210000)*1.8 + (bass/255)*1.0",
          "useFormula": true
        },
        "particleWind_particles_us": {
          "value": -3,
          "formula": "-3.0 + Math.sin(time/5000)*2.0 + (mid/255)*2.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_us": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textScale_text_us": {
          "value": 1.3,
          "formula": "1.3",
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_us": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_us": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_us": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_us": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_us": {
          "value": 0,
          "formula": "0",
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
        }
      }
    },
    {
      "name": "You",
      "layers": [
        {
          "id": "photos_you",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              0,
              3
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
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
          "id": "waves_you",
          "type": "waves",
          "name": "WAVES LAYER",
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
          "id": "rays_you",
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
          "id": "text_you",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "THREAD OF THE WIND",
              "MIND FREEZES",
              "OPEN BOOK",
              "LOST IN THE NIGHT",
              "NEW FIRE LIT",
              "ONLY FOR YOU"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#03071e",
          "#0f2b46",
          "#00b4d8",
          "#90e0ef",
          "#fff3b0",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "bgColor": "#03071e"
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
          "formula": "0",
          "useFormula": false
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.4,
          "formula": "0.4",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0.7,
          "formula": "0.3 + (time/210000)*0.5 + (mid/255)*0.4",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.3",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "60 + Math.sin(time/5000)*30 + (bass/255)*25",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.25,
          "formula": "0.25",
          "useFormula": false
        },
        "imgScale_photos_you": {
          "value": 1.2,
          "formula": "1.2 + trend*0.3",
          "useFormula": true
        },
        "imgOpacity_photos_you": {
          "value": 0.3,
          "formula": "0.2 + (time/210000)*0.3 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleCount_particles_you": {
          "value": 400,
          "formula": "200 + (time/210000)*600 + (treble/255)*300",
          "useFormula": true
        },
        "particleSize_particles_you": {
          "value": 1.5,
          "formula": "1.5 + (treble/255)*3.0 + trend*2.0",
          "useFormula": true
        },
        "particleSpeed_particles_you": {
          "value": 0.4,
          "formula": "0.3 + (time/210000)*2.0 + (avg/255)*1.5",
          "useFormula": true
        },
        "particleChaos_particles_you": {
          "value": 5,
          "formula": "5.0 + (bass/255)*15.0",
          "useFormula": true
        },
        "particleOpacity_particles_you": {
          "value": 0.8,
          "formula": "0.3 + (treble/255)*0.5 + trend*0.2",
          "useFormula": true
        },
        "particleDirection_particles_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "particleColorSpeed_particles_you": {
          "value": 10,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_you": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_you": {
          "value": -0.2,
          "formula": "-0.2 - trend*0.3",
          "useFormula": true
        },
        "particleWind_particles_you": {
          "value": 2,
          "formula": "Math.sin(time/6000)*2.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_you": {
          "value": 0.1,
          "formula": "0.1",
          "useFormula": false
        },
        "waveCount_waves_you": {
          "value": 2,
          "formula": "1 + Math.floor(trend*3 + (bass/255)*2)",
          "useFormula": true
        },
        "waveSpeed_waves_you": {
          "value": -4.4,
          "formula": "0.6 + trend*1.0",
          "useFormula": true
        },
        "waveThickness_waves_you": {
          "value": 13,
          "formula": "3.0 + (bass/255)*8.0",
          "useFormula": true
        },
        "waveChaos_waves_you": {
          "value": 20,
          "formula": "20",
          "useFormula": false
        },
        "waveOpacity_waves_you": {
          "value": 0.5,
          "formula": "0.2 + (mid/255)*0.4",
          "useFormula": true
        },
        "rayCount_rays_you": {
          "value": 13,
          "formula": "6 + Math.floor((time/210000)*20 + (bass/255)*8)",
          "useFormula": true
        },
        "raySpeed_rays_you": {
          "value": 0.1,
          "formula": "0.05 + Math.sin(time/12000)*0.1",
          "useFormula": true
        },
        "rayThickness_rays_you": {
          "value": 5,
          "formula": "3.0 + (bass/255)*10.0",
          "useFormula": true
        },
        "rayCenterHole_rays_you": {
          "value": 610,
          "formula": "100.0 + (time/200000)*550.0 + (bass/255)*200.0",
          "useFormula": true
        },
        "rayChaos_rays_you": {
          "value": 1.7,
          "formula": "1.7",
          "useFormula": false
        },
        "rayOpacity_rays_you": {
          "value": 0.9,
          "formula": "0.3 + (mid/255)*0.4 + trend*0.3",
          "useFormula": true
        },
        "textScale_text_you": {
          "value": 1.3,
          "formula": "1.3",
          "useFormula": false
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_you": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_you": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_you": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_you": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textInkResolve_text_you": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_you": {
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
          "id": "photos_beach",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              1,
              3
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
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
            ]
          }
        },
        {
          "id": "text_beach",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "NO LONGER HERE",
              "FIND AN ANSWER",
              "END THE NIGHTMARE",
              "STILL FIGHTING",
              "SAY YES",
              "INTO THE WHITE"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#2b3a42",
          "#4f6d7a",
          "#78909c",
          "#c0c5c1",
          "#e8eddf",
          "#ffffff"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": true,
        "webglProjection": "3d",
        "shaderStyle": "cells",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "bgColor": "#101518"
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
          "formula": "Math.max(0.01, 0.15 - (time/180000)*0.13 - (trend*0.02))",
          "useFormula": true
        },
        "analogFlash": {
          "value": 1,
          "formula": "Math.min(1.0, (time/170000) + (bass/255)*0.35)",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0.23,
          "formula": "0.23",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "10 + bass/20",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogLightLeak": {
          "value": 0,
          "formula": "Math.min(1.0, (time/170000) + (trend*0.3))",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.7,
          "formula": "0.7",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "100 * (1 - trend)",
          "useFormula": true
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
          "value": 0.85,
          "formula": "0.5",
          "useFormula": false
        },
        "webglSpeed": {
          "value": 1,
          "formula": "1.0 + trend*2.0 + (bass/255)*1.5",
          "useFormula": true
        },
        "webglElevation": {
          "value": -0.6,
          "formula": "-0.6",
          "useFormula": false
        },
        "webglGlow": {
          "value": 0.3,
          "formula": "0.3 + (time/170000)*2.0 + (mid/255)*1.0",
          "useFormula": true
        },
        "webglDistortion": {
          "value": 1,
          "formula": "0.5 + trend*1.0",
          "useFormula": true
        },
        "panotScale": {
          "value": 10,
          "formula": "5",
          "useFormula": false
        },
        "panotBloom": {
          "value": 1.85,
          "formula": "0.5 + (bass/255)*1.5",
          "useFormula": true
        },
        "panotRotation": {
          "value": 0,
          "formula": "time / 10",
          "useFormula": false
        },
        "panotMortar": {
          "value": 0.052,
          "formula": "0.04",
          "useFormula": false
        },
        "panotThickness": {
          "value": 0.025,
          "formula": "0.04",
          "useFormula": false
        },
        "panotRoundness": {
          "value": 0.026,
          "formula": "0.02",
          "useFormula": false
        },
        "panotShadow": {
          "value": 0.31,
          "formula": "0.3",
          "useFormula": false
        },
        "horizonSpeed": {
          "value": 0.68,
          "formula": "0.68",
          "useFormula": false
        },
        "horizonComplexity": {
          "value": 20,
          "formula": "15",
          "useFormula": false
        },
        "imgScale_photos_beach": {
          "value": 1.2,
          "formula": "1.2 + trend*0.3",
          "useFormula": true
        },
        "imgOpacity_photos_beach": {
          "value": 0.4,
          "formula": "0.3 + (time/170000)*0.4 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleCount_particles_beach": {
          "value": 800,
          "formula": "300 + (time/170000)*700 + (bass/255)*300",
          "useFormula": true
        },
        "particleSize_particles_beach": {
          "value": 2.1,
          "formula": "1.5 + trend*3.0",
          "useFormula": true
        },
        "particleSpeed_particles_beach": {
          "value": 20,
          "formula": "10.0 + (avg/255)*15.0",
          "useFormula": true
        },
        "particleChaos_particles_beach": {
          "value": 200,
          "formula": "30 + (bass/255)*50",
          "useFormula": true
        },
        "particleOpacity_particles_beach": {
          "value": 1,
          "formula": "0.3 + (time/170000)*0.5 + (treble/255)*0.2",
          "useFormula": true
        },
        "particleDirection_particles_beach": {
          "value": -1.29,
          "formula": "Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)",
          "useFormula": false
        },
        "particleColorSpeed_particles_beach": {
          "value": 0,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_beach": {
          "value": 0.128,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_beach": {
          "value": 10,
          "formula": "0.1",
          "useFormula": false
        },
        "particleWind_particles_beach": {
          "value": -11.9,
          "formula": "-4.0 - Math.sin(time/4000)*2.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_beach": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textScale_text_beach": {
          "value": 1.3,
          "formula": "1.3",
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_beach": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_beach": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_beach": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_beach": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_beach": {
          "value": 0,
          "formula": "0",
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
        }
      }
    },
    {
      "name": "Chestnut",
      "layers": [
        {
          "id": "photos_chestnut",
          "type": "photos",
          "name": "PHOTOS LAYER",
          "enabled": true,
          "settings": {
            "photoSourceMode": "photos",
            "imgIndices": [
              0,
              4
            ],
            "webcamIndices": [],
            "imgBlendMode": "screen"
          }
        },
        {
          "id": "particles_chestnut",
          "type": "particles",
          "name": "PARTICLES LAYER",
          "enabled": true,
          "settings": {
            "particleShape": "leaf",
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
          "id": "waves_chestnut",
          "type": "waves",
          "name": "WAVES LAYER",
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
          "id": "text_chestnut",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "SUNNY MORNING",
              "CHESTNUT BLOSSOMS",
              "FALLING IN THE STREET",
              "SOFA AT DUSK",
              "FULL MOON RISING",
              "WINTER LEAVES",
              "TOGETHER HERE"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#1b4332",
          "#2d6a4f",
          "#74c69d",
          "#f8bbd0",
          "#ff80ab",
          "#fff59d"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "3d",
        "shaderStyle": "panot",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "bgColor": "#101812"
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
          "formula": "(bass/255 > 0.82) ? (bass/255)*0.5 : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "analogDrift": {
          "value": 0,
          "formula": "trend > 0.8 ? 30 : 0",
          "useFormula": false
        },
        "analogScanlines": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0,
          "formula": "0.08",
          "useFormula": false
        },
        "analogWarmth": {
          "value": 0.6,
          "formula": "0.5 + (time/210000)*0.3 + (bass/255)*0.2",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 0.4,
          "formula": "0.2 + (time/210000)*0.5 + (mid/255)*0.35 + Math.sin(time/2000)*0.15",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 30,
          "formula": "(1.0 - trend) * 40",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 1,
          "formula": "1",
          "useFormula": false
        },
        "analogPaperGrain": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0.2,
          "formula": "0.2",
          "useFormula": false
        },
        "imgScale_photos_chestnut": {
          "value": 1.2,
          "formula": "1.2 + trend*0.3 + (bass/255)*0.15",
          "useFormula": true
        },
        "imgOpacity_photos_chestnut": {
          "value": 0.3,
          "formula": "0.2 + (time/210000)*0.3 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleCount_particles_chestnut": {
          "value": 400,
          "formula": "150 + (time/210000)*650 + (mid/255)*200",
          "useFormula": true
        },
        "particleSize_particles_chestnut": {
          "value": 2.1,
          "formula": "3.0 + trend*5.0 + (bass/255)*3.0",
          "useFormula": true
        },
        "particleSpeed_particles_chestnut": {
          "value": 18.6,
          "formula": "2.0 + (treble/255)*3.0 + trend*2.0",
          "useFormula": true
        },
        "particleChaos_particles_chestnut": {
          "value": 31,
          "formula": "20 + (bass/255)*40",
          "useFormula": true
        },
        "particleOpacity_particles_chestnut": {
          "value": 0.4,
          "formula": "0.3 + (mid/255)*0.3 + trend*0.2",
          "useFormula": true
        },
        "particleDirection_particles_chestnut": {
          "value": 0.65,
          "formula": "Math.PI/3 + Math.sin(time/2000)*0.2",
          "useFormula": true
        },
        "particleColorSpeed_particles_chestnut": {
          "value": 30,
          "formula": "15 + trend*20",
          "useFormula": true
        },
        "particleRotation_particles_chestnut": {
          "value": 3.01,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_chestnut": {
          "value": 3.4,
          "formula": "0.5 + (time/210000)*3.0 + (bass/255)*2.0",
          "useFormula": true
        },
        "particleWind_particles_chestnut": {
          "value": 3,
          "formula": "2.0 + (time/210000)*9.0 + Math.sin(time/2500)*4.0 + (treble/255)*3.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "waveCount_waves_chestnut": {
          "value": 1,
          "formula": "1 + Math.floor((time/210000)*5 + (bass/255)*3)",
          "useFormula": true
        },
        "waveSpeed_waves_chestnut": {
          "value": 1.5,
          "formula": "1.2 + trend*1.5",
          "useFormula": true
        },
        "waveThickness_waves_chestnut": {
          "value": 10,
          "formula": "2.0 + (bass/255)*8.0",
          "useFormula": true
        },
        "waveChaos_waves_chestnut": {
          "value": 20,
          "formula": "20",
          "useFormula": false
        },
        "waveOpacity_waves_chestnut": {
          "value": 0.8,
          "formula": "0.2 + (mid/255)*0.4",
          "useFormula": true
        },
        "textScale_text_chestnut": {
          "value": 1.3,
          "formula": "1.3",
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_chestnut": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_chestnut": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_chestnut": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_chestnut": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textInkResolve_text_chestnut": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_chestnut": {
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
            "imgBlendMode": "screen"
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
            ]
          }
        },
        {
          "id": "text_house",
          "type": "text",
          "name": "TEXT LAYER",
          "enabled": true,
          "settings": {
            "textList": [
              "SUN THROUGH WINDOW",
              "MORNING IN BED",
              "NEITHER COLD NOR HOT",
              "TIME HAS STOPPED",
              "STAY ONE MORE DAY",
              "LITTLE BY LITTLE"
            ],
            "textSequenceMode": "order",
            "textFontFamily": "Lora",
            "textDissolveStyle": "ink",
            "textFreeze": false,
            "textManualMode": false
          }
        }
      ],
      "settings": {
        "palette": [
          "#1f0a03",
          "#6a1b0a",
          "#bf360c",
          "#ff8a65",
          "#ffcc80",
          "#fff3e0"
        ],
        "physicsEnabled": true,
        "analogEnabled": true,
        "webglEnabled": false,
        "webglProjection": "2d",
        "shaderStyle": "grid",
        "horizonEnabled": true,
        "horizonStyle": "montserrat",
        "gpu_fxEnabled": false,
        "bgColor": "#100502"
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
          "formula": "(bass > 210) ? 0.5 : 0",
          "useFormula": true
        },
        "analogScratches": {
          "value": 0.15,
          "formula": "0.15",
          "useFormula": false
        },
        "analogDrift": {
          "value": 10,
          "formula": "5 + (bass/255)*15",
          "useFormula": true
        },
        "analogScanlines": {
          "value": 0.05,
          "formula": "0.05",
          "useFormula": false
        },
        "analogNoise": {
          "value": 0.3,
          "formula": "0.2 + (treble/255)*0.2",
          "useFormula": true
        },
        "analogWarmth": {
          "value": 0.95,
          "formula": "0.6 + (time/200000)*0.35 + (bass/255)*0.15",
          "useFormula": true
        },
        "analogLightLeak": {
          "value": 1,
          "formula": "0.3 + (time/200000)*0.5 + (mid/255)*0.35",
          "useFormula": true
        },
        "analogVignette": {
          "value": 0.6,
          "formula": "0.6",
          "useFormula": false
        },
        "opticsFocusPull": {
          "value": 0,
          "formula": "(1.0 - trend) * 40",
          "useFormula": true
        },
        "analogInkBleed": {
          "value": 0,
          "formula": "(mid/255)*0.5",
          "useFormula": true
        },
        "analogPaperGrain": {
          "value": 0,
          "formula": "0.15",
          "useFormula": false
        },
        "analogStainIntensity": {
          "value": 0,
          "formula": "0.2",
          "useFormula": false
        },
        "imgScale_photos_house": {
          "value": 1.1,
          "formula": "1.0 + (time/210000)*0.3 + (bass/255)*0.15",
          "useFormula": true
        },
        "imgOpacity_photos_house": {
          "value": 0.7,
          "formula": "0.25 + (time/210000)*0.5 + (trend*0.25)",
          "useFormula": true
        },
        "imgGlitch_photos_house": {
          "value": 0,
          "formula": "bass > 210 ? 60 : 0",
          "useFormula": true
        },
        "imgBlur_photos_house": {
          "value": 0,
          "formula": "Math.max(0, 8 - trend*8)",
          "useFormula": true
        },
        "imgSaturate_photos_house": {
          "value": 0,
          "formula": "100",
          "useFormula": false
        },
        "photoRotation_photos_house": {
          "value": 0,
          "formula": "Math.sin(time/2000) * 0.1",
          "useFormula": true
        },
        "photoContrast_photos_house": {
          "value": 85,
          "formula": "110 + trend*60",
          "useFormula": true
        },
        "particleCount_particles_house": {
          "value": 300,
          "formula": "120 + (time/210000)*380 + (avg/255)*150",
          "useFormula": true
        },
        "particleSize_particles_house": {
          "value": 1,
          "formula": "1.0 + trend*2.5 + (bass/255)*2.0",
          "useFormula": true
        },
        "particleSpeed_particles_house": {
          "value": 2,
          "formula": "0.5 + (treble/255)*1.5",
          "useFormula": true
        },
        "particleChaos_particles_house": {
          "value": 60,
          "formula": "20 + (bass/255)*40",
          "useFormula": true
        },
        "particleOpacity_particles_house": {
          "value": 0.4,
          "formula": "0.2 + trend*0.3 + (mid/255)*0.2",
          "useFormula": true
        },
        "particleDirection_particles_house": {
          "value": 0,
          "formula": "Math.atan2(y - window.innerHeight/2, x - window.innerWidth/2)",
          "useFormula": true
        },
        "particleColorSpeed_particles_house": {
          "value": 10,
          "formula": "10",
          "useFormula": false
        },
        "particleRotation_particles_house": {
          "value": 0,
          "formula": "time/1000",
          "useFormula": false
        },
        "particleGravity_particles_house": {
          "value": 0,
          "formula": "trend > 0.8 ? -2 : 1",
          "useFormula": false
        },
        "particleWind_particles_house": {
          "value": 2,
          "formula": "2.0 + Math.sin(time/2500)*3.0",
          "useFormula": true
        },
        "particleBreezeStrength_particles_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textScale_text_house": {
          "value": 1.3,
          "formula": "1.3",
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
          "formula": "0",
          "useFormula": false
        },
        "textOpacity_text_house": {
          "value": 0.9,
          "formula": "0.9",
          "useFormula": false
        },
        "textHoldTime_text_house": {
          "value": 18,
          "formula": "18",
          "useFormula": false
        },
        "textFadeTime_text_house": {
          "value": 2,
          "formula": "2",
          "useFormula": false
        },
        "textTypeSpeed_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textEnvironmentDrift_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        },
        "textInkResolve_text_house": {
          "value": 0.5,
          "formula": "0.5",
          "useFormula": false
        },
        "textGlow_text_house": {
          "value": 0,
          "formula": "0",
          "useFormula": false
        }
      }
    }
  ],
  "activeIndex": 0,
  "targetIndex": null,
  "transitionStart": 0,
  "transitionDuration": 1000,
  "midiMappings": {
    "pads": {}
  },
  "imported": true
};
