# EvaluaciÃ³n de competencias SmartSched-UC

## PropÃ³sito

Vincular el proyecto con competencias del curso y con marcos de calidad relevantes, usando solo evidencia verificable o campos pendientes explÃ­citos.

## Matriz de competencias

| Competencia | Criterio | Actividad realizada | DecisiÃ³n tÃ©cnica | Evidencia | Resultado | Aprendizaje |
|---|---|---|---|---|---|---|
| 1. Aprendizaje experiencial | Resolver un problema realista con restricciones | ConstrucciÃ³n de un MVP de horarios universitarios | Uso de CSP/backtracking y fallback dual | `smartsched-uc/docs/SPEC.md`, `scheduler.service.js` | Evidenciado | Integrar teorÃ­a algorÃ­tmica con una interfaz usable fortalece la comprensiÃ³n aplicada. |
| 2. Trabajo colaborativo | Coordinar repositorio y artefactos comunes | Uso de Git, ramas y documentaciÃ³n compartida | Husky, commitlint y organizaciÃ³n por capas | `.husky/`, `EV-GIT-*` | Parcialmente evidenciado | La colaboraciÃ³n mejora con control de configuraciÃ³n explÃ­cito. |
| 3. CiudadanÃ­a glocal | Considerar necesidades acadÃ©micas locales con estÃ¡ndares globales | SimulaciÃ³n de matrÃ­cula con restricciones universitarias | RelaciÃ³n con OWASP, WCAG e ISO/IEC 25010 | `01_informe_final_proyecto.md` | Parcialmente evidenciado | El contexto local puede documentarse con marcos internacionales sin perder pertinencia. |
| 4. Diversidad | Considerar perfiles estudiantiles distintos | Compatibilidad con prÃ¡cticas/trabajo en la narrativa funcional | Recomendaciones y mensajes orientados al estudiante | `client/src/App.js`, `SPEC.md` | En validaciÃ³n | Hace falta evidencia de validaciÃ³n con usuarios reales. |
| 5. Ã‰tica | No inventar resultados ni evidencias | Cierre con pendientes especÃ­ficos donde falta dato real | Transparencia documental | carpeta `docs/cierre/` | Evidenciado | Declarar vacÃ­os de evidencia es parte de la calidad Ã©tica del proyecto. |
| 6. Contexto local y global | Resolver matrÃ­cula universitaria con prÃ¡cticas de ingenierÃ­a | AplicaciÃ³n a un contexto universitario peruano | Arquitectura web + PostgreSQL + pruebas | `README.md`, `smartsched-uc/README.md` | Parcialmente evidenciado | Debe corregirse la documentaciÃ³n histÃ³rica para reducir ruido. |
| 7. ComunicaciÃ³n escrita | DocumentaciÃ³n tÃ©cnica consistente | TOC, cierre, manual y trazabilidad | EstructuraciÃ³n por documentos de control | `docs/cierre/*` | Evidenciado | La documentaciÃ³n necesita mantenimiento continuo, no solo al final. |
| 8. ComunicaciÃ³n oral | Sustentar decisiones del MVP | Modo demostraciÃ³n, auditorÃ­a y notificaciones | Separar vista tÃ©cnica y vista funcional | `client/src/App.js` | En validaciÃ³n | Requiere demostraciÃ³n en exposiciÃ³n, no solo existencia en cÃ³digo. |
| 9. Escucha y coevaluaciÃ³n | Incorporar retroalimentaciÃ³n | EvoluciÃ³n del frontend y backend hacia una demo mÃ¡s clara | Ajustes por iteraciÃ³n | Historial Git y cambios recientes | En validaciÃ³n | [PENDIENTE: adjuntar acta, retroalimentaciÃ³n o evidencia humana de coevaluaciÃ³n] |
| 10. Sostenibilidad | Uso responsable de recursos | CachÃ©, compresiÃ³n, paginaciÃ³n, fallback | OptimizaciÃ³n ligera sin complejidad excesiva | `server/src/app.js`, `simpleCache.middleware.js` | Evidenciado | PequeÃ±as optimizaciones sostenibles aportan valor real en MVP. |
| 11. Impacto | Aporte al proceso acadÃ©mico | SimulaciÃ³n y explicaciÃ³n de horarios | Validaciones, advertencias y coordinaciÃ³n | `client/src/App.js`, `scheduler.service.js` | Evidenciado | El valor aumenta cuando la aplicaciÃ³n explica sus decisiones. |
| 12. DiseÃ±o y desarrollo de soluciones | IntegraciÃ³n end-to-end | React + Express + PostgreSQL + pruebas | Arquitectura por capas en backend | `academic.controller.js`, `academic.routes.js`, `academic-data.service.js` | Evidenciado | La separaciÃ³n de responsabilidades facilita evoluciÃ³n y defensa tÃ©cnica. |

## Marcos de referencia relacionados

- W3C / WCAG: accesibilidad bÃ¡sica verificada, auditorÃ­a formal pendiente.
- ISO/IEC 25010: se observan atributos de mantenibilidad, fiabilidad y adecuaciÃ³n funcional, con vacÃ­os de evidencia en usabilidad formal.
- OWASP Top 10: existe verificaciÃ³n parcial vÃ­a `npm audit`, con hallazgos abiertos.
- Green Software: existen medidas bÃ¡sicas de eficiencia y continuidad.

## Evidencias relacionadas

- Trabajo verificable en código y pruebas: [`evidencias/pruebas/EV-TEST-01-pruebas-generales.txt`](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt)
- Trazabilidad técnica: [`evidencias/gestion/EV-GEST-08-control-cambios.md`](./evidencias/gestion/EV-GEST-08-control-cambios.md)
- Demostración funcional: [`evidencias/aplicacion/EV-APP-10-modo-demostracion.png`](./evidencias/aplicacion/EV-APP-10-modo-demostracion.png)

