const formulaCache = new Map();

const FormulaEngine = {
    eval(formula, context, fallback = 0, min = null, max = null) {
        try {
            let fn = formulaCache.get(formula);
            if (!fn) {
                fn = new Function('time', 'bpm', 'avg', 'bass', 'mid', 'treble', 'trend', 'x', 'y', 'Math', 'window', `try { return ${formula}; } catch(e) { return ${fallback}; }`);
                formulaCache.set(formula, fn);
            }
            const { time, bpm, avg, bass, mid, treble, trend, x, y } = context;
            let val = fn(time, bpm, avg, bass, mid, treble, trend, x, y, Math, window);
            if (typeof val !== 'number' || isNaN(val)) return fallback;
            return val;
        } catch (e) { return fallback; }
    }
};

const hexToRgbCache = new Map();
const hexToHslCache = new Map();

const ColorUtils = {
    hexToRgb(hex) {
        if (!hex) return { r: 0, g: 0, b: 0 };
        let rgb = hexToRgbCache.get(hex);
        if (!rgb) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            rgb = result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
            hexToRgbCache.set(hex, rgb);
        }
        return rgb;
    },
    rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) { h = s = 0; } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h * 360, s * 100, l * 100];
    },
    hexToHsl(hex) {
        if (!hex) return [0, 0, 0];
        let hsl = hexToHslCache.get(hex);
        if (!hsl) {
            const rgb = this.hexToRgb(hex);
            hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
            hexToHslCache.set(hex, hsl);
        }
        return hsl;
    },
    lerpColor(hexA, hexB, t) {
        const a = this.hexToRgb(hexA);
        const b = this.hexToRgb(hexB);
        const r = Math.round(a.r + (b.r - a.r) * t);
        const g = Math.round(a.g + (b.g - a.g) * t);
        const bl = Math.round(a.b + (b.b - a.b) * t);
        return `rgb(${r},${g},${bl})`;
    }
};