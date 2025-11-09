const { chromium } = require('playwright');
const path = require('path');

(async () => {
  // Get HTML filename from command line args, default to 'index.html'
  const htmlFile = process.argv[2] || 'index.html';
  const outputFile = process.argv[3] || 'screenshot.png';

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport size for consistent screenshots
  await page.setViewportSize({ width: 1280, height: 720 });

  // Load the HTML file
  const htmlPath = path.join(__dirname, htmlFile);
  await page.goto(`file://${htmlPath}`);

  // Wait a bit for any animations or fonts to load
  await page.waitForTimeout(500);

  // Take screenshot
  await page.screenshot({ path: outputFile, fullPage: true });

  console.log(`Screenshot saved to ${outputFile}`);

  await browser.close();
})();
