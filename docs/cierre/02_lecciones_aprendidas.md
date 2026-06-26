# Lecciones aprendidas SmartSched-UC

## PropÃ³sito

Consolidar aprendizajes verificables del proyecto, enlazando causa, impacto, acciÃ³n correctiva y evidencia.

## Registro consolidado

| ID | Tema | QuÃ© saliÃ³ bien | QuÃ© saliÃ³ mal | Causa | Impacto | AcciÃ³n correctiva / preventiva | Resultado | Conocimiento transferible | Evidencia |
|---|---|---|---|---|---|---|---|---|---|
| LL-01 | Fallback local | El sistema mantiene continuidad cuando PostgreSQL no estÃ¡ disponible. | La documentaciÃ³n histÃ³rica no siempre explica claramente el doble modo de datos. | EvoluciÃ³n progresiva del backend y de la documentaciÃ³n. | Se evitÃ³ bloqueo funcional, pero se generÃ³ riesgo de confusiÃ³n. | Formalizar el modo `postgresql` / `local-mock-data` en cierre y manuales. | Capacidad de continuidad verificada. | DiseÃ±ar fallback explÃ­cito mejora resiliencia en MVP acadÃ©micos. | `server/src/config/db.js`, `PRB-05`, `server/src/database/README.md` |
| LL-02 | IntegraciÃ³n PostgreSQL | La base quedÃ³ integrada con `pg`, healthcheck, inspecciÃ³n de esquema y persistencia de horarios. | PersistiÃ³ riesgo de deriva entre esquema y consultas. | Cambios graduales en el modelo de datos. | PodÃ­a activarse fallback aun con base disponible si habÃ­a desalineaciÃ³n. | Centralizar alias, mapeo y `inspect-schema.js`. | Se mejorÃ³ la trazabilidad del esquema. | Antes de estabilizar consultas, conviene instrumentar inspecciÃ³n automÃ¡tica. | `academic-data.service.js`, `server/src/database/inspect-schema.js`, `postgres.notes.md` |
| LL-03 | Calidad automatizada | Las pruebas backend verifican conflictos, crÃ©ditos, aulas y fallback. | La cobertura frontend sigue baja. | Enfoque de pruebas priorizÃ³ lÃ³gica de negocio sobre UX detallada. | Riesgo de regresiÃ³n visual o de estados de interacciÃ³n. | Mantener `App.test.js` y ampliar pruebas sobre tabs, errores y resumen. | Hay base mÃ­nima de automatizaciÃ³n, pero aÃºn no suficiente para UX robusta. | La cobertura funcional crÃ­tica debe comenzar por el nÃºcleo de negocio, pero no detenerse ahÃ­. | `EV-TEST-02`, `EV-TEST-03`, `client/src/App.test.js` |
| LL-04 | DocumentaciÃ³n raÃ­z vs aplicaciÃ³n | El cÃ³digo actual muestra una arquitectura mÃ¡s madura que la documentaciÃ³n histÃ³rica. | Existen referencias obsoletas a MERN, MongoDB y FastAPI, ademÃ¡s de enlaces rotos y mojibake. | El sistema evolucionÃ³ mÃ¡s rÃ¡pido que los artefactos raÃ­z. | Disminuye la defendibilidad acadÃ©mica si no se corrige en cierre. | Registrar incidentes y defectos documentales; actualizar TOC y README de cierre. | La trazabilidad documental queda restablecida en esta fase. | En proyectos acadÃ©micos, la deuda documental puede volverse mÃ¡s visible que la deuda tÃ©cnica. | `docs/08_arquitectura.md`, `smartsched-uc/server/package.json`, `README.md`, `docs/00_TOC.md` |
| LL-05 | ConfiguraciÃ³n y calidad | Se incorporaron Husky, Commitlint y scripts de calidad en la raÃ­z. | No se encontrÃ³ evidencia exportada de SonarQube, y el token quedÃ³ expuesto. | La automatizaciÃ³n de calidad se incorporÃ³ sin cierre completo del circuito de seguridad. | Riesgo de filtraciÃ³n y de calidad â€œdeclaradaâ€ sin reporte final. | Documentar el hallazgo, rotar credenciales y archivar reporte Sonar futuro. | El control de configuraciÃ³n es verificable; la seguridad aÃºn requiere saneamiento. | Las herramientas de calidad deben integrarse con gestiÃ³n segura de secretos. | commit `3804bdd`, `.husky/`, `commitlint.config.cjs`, `sonar-project.properties` |
| LL-06 | Cobertura del scheduler | El motor `scheduler.service.js` alcanzÃ³ 92.08% de sentencias y 91.30% de lÃ­neas. | La cobertura del frontend quedÃ³ bastante menor. | La priorizaciÃ³n inicial favoreciÃ³ lÃ³gica de negocio y API. | El nÃºcleo del algoritmo queda mejor protegido que la interfaz. | Mantener la cobertura alta del backend y ampliar pruebas en React. | Se valida el corazÃ³n del motor con evidencia textual. | Las coberturas deben analizarse por componente, no solo por promedio global. | `EV-TEST-02`, `EV-TEST-03` |
| LL-07 | Build y seguridad | El build de producciÃ³n compilÃ³ correctamente. | La compilaciÃ³n exitosa no eliminÃ³ vulnerabilidades abiertas en auditorÃ­as. | Build y seguridad responden a controles distintos. | PodrÃ­a asumirse falsamente que â€œcompilaâ€ equivale a â€œseguroâ€. | Documentar `npm audit` por componente y evitar afirmaciones absolutas. | El cierre distingue claramente compilaciÃ³n, pruebas y seguridad. | Una pipeline saludable necesita controles complementarios. | `EV-TEST-04`, `EV-SEC-02`, `EV-SEC-03` |
| LL-08 | Evidencia textual | Los archivos `EV-TEST` y `EV-SEC` permiten reconstruir decisiones y resultados. | Si faltan fechas, responsables o capturas, la trazabilidad queda incompleta. | No todos los artefactos humanos quedaron archivados. | Parte del cierre depende de completar evidencia manual. | Convertir cada vacÃ­o en pendiente especÃ­fico, no genÃ©rico. | La documentaciÃ³n gana precisiÃ³n y honestidad. | La evidencia textual es valiosa si se enlaza a requisitos, riesgos y commits. | `docs/cierre/evidencias/README.md`, `11_matriz_trazabilidad.md` |

## SÃ­ntesis

- La soluciÃ³n evolucionÃ³ desde un prototipo hacia un MVP mÃ¡s defendible.
- La mayor mejora observable se dio en backend, pruebas, trazabilidad y resiliencia.
- La principal deuda abierta es **documental y de gobierno de calidad**, no de capacidad funcional bÃ¡sica.

## Evidencias relacionadas

- Validación integral de pruebas: [`evidencias/pruebas/EV-TEST-04-validacion-completa.txt`](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
- Evidencia funcional del tablero: [`evidencias/aplicacion/EV-APP-10-modo-demostracion.md`](./evidencias/aplicacion/EV-APP-10-modo-demostracion.md)
- Resumen de gestión: [`evidencias/gestion/EV-GEST-09-resumen-gestion.html`](./evidencias/gestion/EV-GEST-09-resumen-gestion.html)

