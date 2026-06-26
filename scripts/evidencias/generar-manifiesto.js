const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../../docs/cierre/evidencias");
const mdOut = path.join(root, "00_manifiesto_evidencias.md");
const csvOut = path.join(root, "00_manifiesto_evidencias.csv");

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  return items.flatMap((item) => {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) return walk(full);
    return [full];
  });
}

function category(rel) {
  if (rel.includes("aplicacion")) return "aplicacion";
  if (rel.includes("base-datos")) return "base-datos";
  if (rel.includes("gestion")) return "gestion";
  if (rel.includes("sonarqube")) return "sonarqube";
  if (rel.includes("pruebas")) return "pruebas";
  if (rel.includes("calidad")) return "calidad";
  if (rel.includes("github")) return "github";
  return "otro";
}

const files = walk(root)
  .filter((file) => !file.endsWith("00_manifiesto_evidencias.md") && !file.endsWith("00_manifiesto_evidencias.csv"))
  .sort();

const rows = files.map((file) => {
  const rel = path.relative(root, file).replace(/\\/g, "/");
  const stat = fs.statSync(file);
  const simulated = rel.includes("/simulacion/");
  return {
    code: path.basename(rel, path.extname(rel)),
    file: rel,
    category: category(rel),
    date: stat.mtime.toISOString().slice(0, 10),
    source: simulated ? "simulacion" : "automatizacion",
    mode: simulated ? "simulado" : "real",
    description: `Artefacto generado: ${rel}`,
    requirement: "",
    test: "",
    document: "docs/cierre/evidencias/README.md",
    status: stat.size > 0 ? (simulated ? "Verificado con datos sintéticos" : "Verificado") : "Pendiente de ejecución",
    observation: simulated ? "DATOS SINTÉTICOS PARA DEMOSTRACIÓN ACADÉMICA" : ""
  };
});

const md = [
  "# Manifiesto de evidencias",
  "",
  "| código | archivo | categoría | fecha | origen | real o simulado | descripción | requisito | prueba | documento relacionado | estado | observación |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map((row) => `| ${row.code} | \`${row.file}\` | ${row.category} | ${row.date} | ${row.source} | ${row.mode} | ${row.description} | ${row.requirement} | ${row.test} | ${row.document} | ${row.status} | ${row.observation} |`)
].join("\n");
fs.writeFileSync(mdOut, md, "utf8");

const csv = [
  "codigo,archivo,categoria,fecha,origen,real_o_simulado,descripcion,requisito,prueba,documento_relacionado,estado,observacion",
  ...rows.map((row) => [row.code, row.file, row.category, row.date, row.source, row.mode, row.description, row.requirement, row.test, row.document, row.status, row.observation].map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
].join("\n");
fs.writeFileSync(csvOut, csv, "utf8");
