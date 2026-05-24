const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/visualizer/index.html');
  await page.waitForTimeout(1000);

  // Click start
  await page.click('#btnStart');
  await page.waitForTimeout(500);

  // Take screenshot of default layout
  await page.screenshot({ path: 'layout-default.png' });

  // Change layout to Live Layout
  await page.selectOption('#uiLayout', 'layout-live');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'layout-live.png' });

  // Change layout to Bottom Dock
  await page.selectOption('#uiLayout', 'layout-bottom');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'layout-bottom.png' });

  await browser.close();
})();
