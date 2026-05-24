const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8000/visualizer/index.html');
  await page.waitForTimeout(1000);

  await page.click('#btnStart');
  await page.waitForTimeout(500);

  // Take screenshot of UI colors functionality
  await page.click('#btnAdvanced'); // Open advanced panel
  await page.waitForTimeout(500);
  await page.selectOption('#selAddLayer', 'particles');
  await page.click('#btnAddLayer');
  await page.waitForTimeout(500);

  // Check the checkbox to use custom layer colors
  const checkboxes = await page.$$('input[id^="useLayerColor_"]');
  if (checkboxes.length > 0) {
    await checkboxes[0].check();
  }

  // Change a color picker
  const pickers = await page.$$('input[type="color"][id^="layerColor_0_"]');
  if(pickers.length > 0) {
      await pickers[0].fill('#ff0000');
  }

  await page.waitForTimeout(500);
  await page.screenshot({ path: 'ui_colors.png' });

  await browser.close();
})();
