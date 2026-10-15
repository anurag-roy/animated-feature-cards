/** Capture the actual HTML/SVG source at deterministic timeline positions. */
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require(process.env.EXAMPLE_PLAYWRIGHT_MODULE || 'playwright'));
} catch {
  throw new Error('Install Playwright or set EXAMPLE_PLAYWRIGHT_MODULE. See README.md for renderer setup.');
}
const args = process.argv.slice(2);
const value = flag => args[args.indexOf(flag) + 1];
if (!args.includes('--output')) throw new Error('--output <directory> is required');
const output = resolve(value('--output'));
const root = fileURLToPath(new URL('..', import.meta.url));
const scenes = ['assistant-tool-calls', 'release-pipeline', 'support-triage', 'inventory-forecast'];
const chosen = args.includes('--scene') ? [value('--scene')] : scenes;
if (chosen.some(scene => !scenes.includes(scene))) throw new Error('Unknown example scene');
const stills = args.includes('--stills');
const browser = await chromium.launch({
  ...(process.env.EXAMPLE_CHROMIUM_PATH ? { executablePath: process.env.EXAMPLE_CHROMIUM_PATH } : {}),
  headless: true,
});
try {
  const context = await browser.newContext({ viewport: { width: 400, height: 520 }, deviceScaleFactor: 2, reducedMotion: 'no-preference' });
  for (const scene of chosen) {
    const directory = join(output, scene);
    await mkdir(directory, { recursive: true });
    const page = await context.newPage();
    page.on('pageerror', error => { throw error; });
    const url = pathToFileURL(join(root, 'examples/index.html'));
    url.search = new URLSearchParams({ scene, capture: '1' }).toString();
    await page.goto(url.href);
    await page.evaluate(() => window.exampleDemo.ready);
    const card = page.locator('.feature-card');
    await page.evaluate(() => window.exampleDemo.seek(9000));
    await card.screenshot({ path: join(directory, 'still.png') });
    if (!stills) {
      // 240 × 50 ms = 12 s. Include the exact loop boundary as the last frame.
      for (let index = 0; index < 240; index++) {
        const time = index === 239 ? 12000 : index * 50;
        await page.evaluate(time => window.exampleDemo.seek(time), time);
        await card.screenshot({ path: join(directory, `${String(index).padStart(3, '0')}.png`) });
      }
    }
    await page.close();
    console.log(`Captured ${scene}${stills ? ' still' : ' · 240 frames + still'}`);
  }
  await context.close();
} finally {
  await browser.close();
}
