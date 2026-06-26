# Impacto y sostenibilidad SmartSched-UC

## PropÃ³sito

Relacionar el proyecto con criterios de sostenibilidad tÃ©cnica, social y acadÃ©mica, sin afirmar implementaciones no verificadas.

## Matriz de impacto

| DimensiÃ³n | Hallazgo | Estado | Evidencia |
|---|---|---|---|
| Green Software | Existe compresiÃ³n HTTP para reducir transferencia. | Implementado | `smartsched-uc/server/src/app.js` |
| Green Software | Existe cachÃ© simple para GET. | Implementado | `smartsched-uc/server/src/middlewares/simpleCache.middleware.js` |
| Green Software | Existen Ã­ndices SQL para consultas frecuentes. | Implementado | `smartsched-uc/server/src/database/smartsched_uc.sql` |
| Green Software | Existe paginaciÃ³n simulada para listados. | Implementado | `academic-data.service.js` |
| Green Software | Existe lÃ­mite de `100kb` para JSON en Express. | Implementado | `smartsched-uc/server/src/app.js` |
| Sostenibilidad operativa | El fallback local evita interrupciÃ³n total por caÃ­da de base. | Implementado | `server/src/config/db.js` |
| Impacto social | La soluciÃ³n busca apoyar matrÃ­cula y compatibilidad con prÃ¡cticas/trabajo. | En validaciÃ³n | `smartsched-uc/docs/SPEC.md`, `client/src/App.js` |
| Impacto econÃ³mico | No existe costo real trazable; solo plantilla acadÃ©mica. | En validaciÃ³n | `01_informe_final_proyecto.md`, `docs/16_presupuesto.md` |
| Impacto ambiental | No se encontrÃ³ mediciÃ³n energÃ©tica formal. | Propuesto | [PENDIENTE: adjuntar mediciÃ³n o justificaciÃ³n manual de impacto energÃ©tico] |
| Seguridad | Hay auditorÃ­as `npm audit`, pero con hallazgos abiertos. | En validaciÃ³n | `EV-SEC-02`, `EV-SEC-03` |
| Accesibilidad | Hay `aria-label` y estructura navegable, pero no auditorÃ­a formal WCAG. | En validaciÃ³n | `client/src/App.js` |
| Escalabilidad futura | PostgreSQL, Ã­ndices y separaciÃ³n frontend/backend favorecen crecimiento. | En validaciÃ³n | `db.js`, `smartsched_uc.sql`, `08_revision_acta_constitucion.md` |

## Observaciones

1. No se hallÃ³ evidencia de Redis ni cachÃ© distribuido.
2. No se hallÃ³ evidencia de lazy loading explÃ­cito en frontend.
3. No se hallÃ³ mediciÃ³n formal de huella energÃ©tica.
4. El proyecto actual usa PostgreSQL; cualquier referencia a MongoDB o MERN debe tratarse como histÃ³rica y no vigente.

## Evidencias relacionadas

- Build compilado y tamaño de artefactos: [`evidencias/pruebas/EV-TEST-04-validacion-completa.txt`](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
- Uso eficiente de recursos de backend: [`evidencias/base-datos/EV-DB-07-reporte-base-datos.html`](./evidencias/base-datos/EV-DB-07-reporte-base-datos.html)

