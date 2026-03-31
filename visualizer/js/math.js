const FormulaEngine = {
    eval(formula, context, fallback = 0, min = null, max = null) {
        try {
            const { time, avg, bass, mid, treble, trend, x, y } = context;
            const fn = new Function('time', 'avg', 'bass', 'mid', 'treble', 'trend', 'x', 'y', 'Math', 'window', `try { return ${formula}; } catch(e) { return ${fallback}; }`);
            let val = fn(time, avg, bass, mid, treble, trend, x, y, Math, window);
            if (typeof val !== 'number' || isNaN(val)) return fallback;
            return val;
        } catch (e) { return fallback; }
    }
};

const ColorUtils = {
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
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
    lerpColor(hexA, hexB, t) {
        const a = this.hexToRgb(hexA);
        const b = this.hexToRgb(hexB);
        const r = Math.round(a.r + (b.r - a.r) * t);
        const g = Math.round(a.g + (b.g - a.g) * t);
        const bl = Math.round(a.b + (b.b - a.b) * t);
        return `rgb(${r},${g},${bl})`;
    }
};