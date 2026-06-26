const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

function arg(name, fallback = "") {
  const prefix = `--${name}=`;
  const found = process.argv.find((item) => item.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

async function safeScreenshot(page, filePath) {
  try {
    await page.screenshot({ path: filePath, fullPage: true });
  } catch {
    await page.screenshot({ path: filePath, fullPage: false });
  }
}

async function main() {
  const baseUrl = arg("baseUrl", "http://127.0.0.1:3000");
  const outputDir = arg("outputDir");
  const reportPath = arg("reportPath");
  if (!outputDir || !reportPath) throw new Error("Faltan --outputDir y --reportPath");
  fs.mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByRole("button", { name: /Vista docente/i }).click();
  await page.getByRole("button", { name: /Modo demostracion/i }).click();
  await page.getByText("Casos reales simulables").waitFor({ timeout: 20000 });

  const observations = {};
  await page.getByRole("button", { name: /Simular cruce de horario/i }).click();
  await page.waitForTimeout(1000);
  observations.conflict = (await page.locator("body").innerText()).slice(0, 2000);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-06-conflicto-horario.png"));

  await page.getByRole("button", { name: /Simular aula sobreocupada/i }).click();
  await page.waitForTimeout(1000);
  observations.capacity = (await page.locator("body").innerText()).slice(0, 2000);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-07-capacidad-aula.png"));
  await safeScreenshot(page, path.join(outputDir, "EV-APP-08-notificacion.png"));

  fs.writeFileSync(reportPath, JSON.stringify(observations, null, 2));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
