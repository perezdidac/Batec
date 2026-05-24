const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/visualizer/index.html');
  await page.waitForTimeout(1000);

  await page.click('#btnStart');
  await page.waitForTimeout(500);

  await page.selectOption('#uiLayout', 'layout-bottom');
  await page.waitForTimeout(500);

  const controlsRect = await page.evaluate(() => {
    const el = document.getElementById('controlsContainer');
    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);
    return {
      top: rect.top, bottom: rect.bottom, height: rect.height,
      computedTop: computed.top, computedBottom: computed.bottom
    };
  });
  console.log("Controls:", controlsRect);

  const telemetryRect = await page.evaluate(() => {
    const el = document.getElementById('telemetryContainer');
    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);
    return {
      top: rect.top, bottom: rect.bottom, height: rect.height,
      computedTop: computed.top, computedBottom: computed.bottom
    };
  });
  console.log("Telemetry:", telemetryRect);

  await browser.close();
})();
