const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

function getArg(name, fallback = "") {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

async function main() {
  const target = getArg("target");
  const output = getArg("output");
  if (!target || !output) throw new Error("Uso: node capture-local.js --target=<url|file> --output=<png>");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
  await page.goto(target, { waitUntil: "networkidle" });
  await page.screenshot({ path: output, fullPage: true });
  await browser.close();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
