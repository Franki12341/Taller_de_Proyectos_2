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

async function clickFirst(page, selector, timeout = 15000) {
  const locator = page.locator(selector).first();
  await locator.waitFor({ state: "visible", timeout });
  await locator.click();
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
  await page.getByText("SmartSched-UC").waitFor({ timeout: 30000 });
  await page.waitForTimeout(1500);

  const observations = {};
  await safeScreenshot(page, path.join(outputDir, "EV-APP-01-pantalla-principal.png"));
  await safeScreenshot(page, path.join(outputDir, "EV-APP-02-listado-cursos.png"));

  await clickFirst(page, "button:has-text('Ver horarios')");
  await page.waitForTimeout(800);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-03-seleccion-cursos.png"));

  await clickFirst(page, "button:has-text('Agregar')");
  await page.waitForTimeout(1200);
  observations.creditosSeleccionados = (await page.locator("body").innerText()).slice(0, 1200);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-05-creditos-seleccionados.png"));

  await page.getByRole("button", { name: /Generar horario optimo hasta 25 creditos|Generando/i }).click();
  await page.waitForTimeout(3000);
  await page.getByRole("button", { name: /^Horario$/i }).click();
  await page.getByText("Mi horario generado").waitFor({ timeout: 15000 });
  observations.horario = (await page.locator("body").innerText()).slice(0, 2000);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-04-horario-generado.png"));

  await page.getByRole("button", { name: /^Resumen$/i }).click();
  await page.waitForTimeout(1000);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-09-resumen-matricula.png"));

  await page.getByRole("button", { name: /Vista docente/i }).click();
  await page.getByRole("button", { name: /Modo demostracion/i }).click();
  await page.waitForTimeout(1000);
  observations.demo = (await page.locator("body").innerText()).slice(0, 2000);
  await safeScreenshot(page, path.join(outputDir, "EV-APP-10-modo-demostracion.png"));

  fs.writeFileSync(reportPath, JSON.stringify(observations, null, 2));
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
