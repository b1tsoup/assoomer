// usage: node render.js <graphics.html> <outDir>
const puppeteer = require('puppeteer-core');
const path = require('path');
(async () => {
  const [html, out] = process.argv.slice(2);
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
  await page.goto(require('url').pathToFileURL(path.resolve(html)).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.ready);
  for (const id of ['banner', 'compare-detailed', 'compare-testimonials', 'results']) {
    const el = await page.$('#' + id);
    await el.screenshot({ path: path.join(out, id + '.png'), omitBackground: true });
    console.log('wrote', id + '.png');
  }
  await browser.close();
})();
