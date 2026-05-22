const fs = require('fs');
let content = fs.readFileSync('visualizer/index.html', 'utf8');

// Wrap DMX content and add collapse icon
const dmxPanelRegex = /<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba\(255,255,255,0\.1\); padding-bottom: 8px;">\s*<h3 style="font-size: 0\.75rem; color: var\(--accent-glow\); margin: 0; text-transform: uppercase;">DMX 512 Link<\/h3>\s*<button id="btnDmxConnect" class="primary-btn glass-btn" style="font-size: 0\.55rem; padding: 4px 8px;">CONNECT USB<\/button>\s*<\/div>\s*<div id="dmxStatus" style="font-size: 0\.6rem; color: var\(--text-secondary\); font-family: monospace; text-align: right;">STATUS: DISCONNECTED<\/div>\s*<div class="control-grid" style="gap: 4px; margin-top: 4px; max-height: 200px; overflow-y: auto; padding-right: 4px;">[\s\S]*?<div style="margin-top: 6px; font-size: 0\.55rem; color: var\(--text-secondary\); line-height:1\.3;">\s*<b>Live Mode:<\/b> CH 1 pulses to music\. <b style="color:#fff;">IMPORTANT:<\/b> Most fixtures won't light up unless the <b>DIMMER<\/b> \(CH 4\) is all the way up!\s*<\/div>/;

const dmxReplacement = `<div id="dmxHeader" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px; cursor: pointer;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="font-size: 0.75rem; color: var(--accent-glow); margin: 0; text-transform: uppercase;">DMX 512 Link</h3>
                    <span id="dmxCollapseIcon" class="collapse-icon collapsed" style="font-size:10px;">▼</span>
                </div>
                <button id="btnDmxConnect" class="primary-btn glass-btn" style="font-size: 0.55rem; padding: 4px 8px; width:auto;" onclick="event.stopPropagation()">CONNECT USB</button>
            </div>

            <div id="dmxContent" class="section-content collapsed">
                <div id="dmxStatus" style="font-size: 0.6rem; color: var(--text-secondary); font-family: monospace; text-align: right; margin-top: 8px;">STATUS: DISCONNECTED</div>

                <div class="control-grid" style="gap: 4px; margin-top: 4px; max-height: 200px; overflow-y: auto; padding-right: 4px;">
                    <!-- 14-Channel Hardware Control faders -->
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#ff4444;">CH 1</span>
                        <input type="range" id="dmxCh1" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#44ff44;">CH 2</span>
                        <input type="range" id="dmxCh2" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#4444ff;">CH 3</span>
                        <input type="range" id="dmxCh3" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#fff;">DIMMER</span>
                        <input type="range" id="dmxCh4" min="0" max="255" value="255" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 5</span>
                        <input type="range" id="dmxCh5" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 6</span>
                        <input type="range" id="dmxCh6" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 7</span>
                        <input type="range" id="dmxCh7" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 8</span>
                        <input type="range" id="dmxCh8" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 9</span>
                        <input type="range" id="dmxCh9" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 10</span>
                        <input type="range" id="dmxCh10" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 11</span>
                        <input type="range" id="dmxCh11" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 12</span>
                        <input type="range" id="dmxCh12" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 13</span>
                        <input type="range" id="dmxCh13" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                    <div class="meter-row" style="margin-bottom: 2px;">
                        <span class="meter-label" style="width: 35px; color:#888;">CH 14</span>
                        <input type="range" id="dmxCh14" min="0" max="255" value="0" style="flex: 1; height: 10px;">
                    </div>
                </div>
                <div style="margin-top: 6px; font-size: 0.55rem; color: var(--text-secondary); line-height:1.3;">
                    <b>Live Mode:</b> CH 1 pulses to music. <b style="color:#fff;">IMPORTANT:</b> Most fixtures won't light up unless the <b>DIMMER</b> (CH 4) is all the way up!
                </div>
            </div>`;

content = content.replace(dmxPanelRegex, dmxReplacement);

fs.writeFileSync('visualizer/index.html', content, 'utf8');
