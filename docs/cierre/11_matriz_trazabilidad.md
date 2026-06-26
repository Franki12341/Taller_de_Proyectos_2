# Matriz de trazabilidad SmartSched-UC

## PropÃ³sito

Relacionar requerimientos, diseÃ±o, cÃ³digo, pruebas, evidencias, registros y commits verificables.

## Matriz

| Requisito | DescripciÃ³n | Actor | Prioridad | MÃ³dulo | Archivo | Prueba | Resultado | Evidencia | Riesgo | Incidente | Defecto | Cambio | Commit | Estado |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RF-01 | SelecciÃ³n de cursos | Estudiante | Alta | Frontend | `smartsched-uc/client/src/App.js` | `PRB-12` | Verificado | [EV-TEST-01](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt) | RSK-09 | â€” | â€” | CAM-01 | `22f812b` | Completado |
| RF-02 | GeneraciÃ³n de horario | Estudiante | Alta | Scheduler/API | `smartsched-uc/server/src/services/scheduler.service.js` | `PRB-02`, `PRB-09` | Verificado | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-05 | â€” | â€” | CAM-01 | `22f812b` | Completado |
| RF-03 | LÃ­mite mÃ¡ximo de 25 crÃ©ditos | Estudiante | Alta | Frontend + Scheduler | `smartsched-uc/client/src/App.js`, `smartsched-uc/server/test/scheduler.test.js` | `PRB-03`, `PRB-04` | Verificado | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-06 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de integraciÃ³n de 25 crÃ©ditos]` | Completado |
| RF-04 | DetecciÃ³n de cruces entre cursos | Estudiante | Alta | Scheduler | `smartsched-uc/server/src/services/scheduler.service.js` | `PRB-01` | Verificado | `EV-TEST-04` | RSK-04 | â€” | â€” | CAM-01 | `22f812b` | Completado |
| RF-05 | ValidaciÃ³n de docentes | CoordinaciÃ³n | Alta | Scheduler | `smartsched-uc/server/src/services/scheduler.service.js` | `PRB-01` | Verificado | `EV-TEST-04` | RSK-04 | â€” | â€” | CAM-01 | `22f812b` | Completado |
| RF-06 | Respeto de carga administrativa y bloques protegidos | CoordinaciÃ³n | Alta | Scheduler/datos | `scheduler.service.js`, `academic-data.service.js` | `PRB-05` | Verificado | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-05 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de bloques protegidos]` | Completado |
| RF-07 | ValidaciÃ³n de aulas, aforo y ocupaciÃ³n | CoordinaciÃ³n | Alta | Scheduler/UI | `scheduler.service.js`, `client/src/App.js` | `PRB-06`, `PRB-07` | Verificado | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-05 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de validaciÃ³n de aulas]` | Completado |
| RF-08 | PostgreSQL con fallback local | Estudiante/CoordinaciÃ³n | Alta | Backend | `server/src/config/db.js`, `academic-data.service.js` | `PRB-11` | Verificado para fallback | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-05 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de integraciÃ³n PostgreSQL/fallback]` | Completado |
| RF-09 | AuditorÃ­a y notificaciones | Estudiante/CoordinaciÃ³n | Media | Frontend/API | `client/src/App.js`, `academic.routes.js` | `PRB-12` | Verificado funcionalmente | [EV-TEST-01](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt) | RSK-09 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de auditorÃ­a y notificaciones]` | Completado |
| RF-10 | Modo demostraciÃ³n y vista de coordinaciÃ³n | Docente evaluador | Media | Frontend | `client/src/App.js` | `PRB-12` | Verificado | [EV-TEST-01](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt) | RSK-09 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de modo demostraciÃ³n]` | Completado |
| RNF-01 | Respuestas eficientes con cachÃ© y paginaciÃ³n | Sistema | Media | Backend | `simpleCache.middleware.js`, `academic-data.service.js` | `PRB-10` | Verificado | `server/src/app.js` | RSK-09 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de paginaciÃ³n/cachÃ©]` | Completado |
| RNF-02 | Manejo de errores y continuidad | Sistema | Alta | Frontend/Backend | `client/src/App.js`, `db.js` | `PRB-11`, `PRB-12` | Verificado para fallback y mensajes de continuidad | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-05 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de manejo de errores]` | Completado |
| RNF-03 | Pruebas automatizadas | Equipo | Alta | QA | `server/test/scheduler.test.js`, `client/src/App.test.js` | `PRB-01` a `PRB-04` | Verificado | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03` | RSK-03 | â€” | â€” | CAM-04 | `3804bdd` | Completado |
| RNF-04 | Seguridad bÃ¡sica de dependencias | Equipo | Alta | Seguridad | `package-lock.json`, auditorÃ­as | `PRB-09` | Hallazgos abiertos | `EV-SEC-02`, `EV-SEC-03` | RSK-SEC-01 | INC-03 | DEF-SEC-01, DEF-SEC-02 | CAM-04 | `3804bdd` | En validaciÃ³n |
| RNF-05 | Accesibilidad bÃ¡sica | Estudiante | Media | Frontend | `client/src/App.js` | `PRB-12` | Parcialmente verificado | `client/src/App.js` | RSK-08 | â€” | â€” | CAM-05 | `[PENDIENTE: identificar commit exacto de mejoras de accesibilidad]` | En validaciÃ³n |
| RNF-06 | Sostenibilidad y uso responsable de recursos | Sistema | Media | Backend/DB | `server/src/app.js`, `smartsched_uc.sql` | `PRB-10`, `PRB-11` | Parcialmente verificado | `13_impacto_sostenibilidad.md` | RSK-07 | â€” | â€” | CAM-04 | `3804bdd` | En validaciÃ³n |
| RNF-CAL-01 | Pruebas generales del proyecto | Equipo | Alta | QA | `docs/cierre/evidencias/pruebas/EV-TEST-01-pruebas-generales.txt` | `PRB-01` a `PRB-12` | Verificado | [EV-TEST-01](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt) | RSK-04 | â€” | â€” | CAM-04 | `3804bdd` | Completado |
| RNF-CAL-02 | Cobertura backend | Equipo | Alta | QA | `docs/cierre/evidencias/pruebas/EV-TEST-02-cobertura-backend.txt` | `PRB-01` a `PRB-11` | Verificado | [EV-TEST-02](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt) | RSK-04 | â€” | â€” | CAM-04 | `3804bdd` | Completado |
| RNF-CAL-03 | Cobertura frontend | Equipo | Media | QA | `docs/cierre/evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt` | `PRB-12` | Requiere mejora | [EV-TEST-03](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt) | RSK-04 | â€” | â€” | CAM-04 | `3804bdd` | En validaciÃ³n |
| RNF-CAL-04 | Build de producciÃ³n | Equipo | Alta | Frontend | `docs/cierre/evidencias/pruebas/EV-TEST-04-validacion-completa.txt` | `PRB-12` | Compilado correctamente | [EV-TEST-04](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt) | RSK-09 | â€” | â€” | CAM-04 | `3804bdd` | Completado |
| RNF-SEC-01 | AuditorÃ­a de dependencias raÃ­z | Equipo | Media | Seguridad | `docs/cierre/evidencias/calidad/EV-SEC-01-audit-raiz.txt` | `PRB-09` | Verificado | [EV-SEC-01](./evidencias/calidad/EV-SEC-01-audit-raiz.txt) | â€” | â€” | â€” | CAM-04 | `3804bdd` | Completado |
| RNF-SEC-02 | AuditorÃ­a de dependencias backend | Equipo | Alta | Seguridad | `docs/cierre/evidencias/calidad/EV-SEC-02-audit-backend.txt` | `PRB-09` | Hallazgos abiertos | [EV-SEC-02](./evidencias/calidad/EV-SEC-02-audit-backend.txt) | RSK-SEC-01 | INC-03 | DEF-SEC-01 | CAM-04 | `3804bdd` | En validaciÃ³n |
| RNF-SEC-03 | AuditorÃ­a de dependencias frontend | Equipo | Alta | Seguridad | `docs/cierre/evidencias/calidad/EV-SEC-03-audit-frontend.txt` | `PRB-09` | Hallazgos abiertos | [EV-SEC-03](./evidencias/calidad/EV-SEC-03-audit-frontend.txt) | RSK-SEC-02 | INC-03 | DEF-SEC-02 | CAM-04 | `3804bdd` | En validaciÃ³n |

## Referencias

- Riesgos: [`03_registro_riesgos.md`](./03_registro_riesgos.md)
- Incidentes: [`04_registro_incidentes.md`](./04_registro_incidentes.md)
- Defectos: [`06_registro_defectos.md`](./06_registro_defectos.md)

## Evidencias funcionales complementarias

- Flujo estudiante: [`evidencias/aplicacion/EV-APP-02-listado-cursos.md`](./evidencias/aplicacion/EV-APP-02-listado-cursos.md), [`evidencias/aplicacion/EV-APP-05-creditos-seleccionados.md`](./evidencias/aplicacion/EV-APP-05-creditos-seleccionados.md)
- Flujo coordinación / demostración: [`evidencias/aplicacion/EV-APP-10-modo-demostracion.md`](./evidencias/aplicacion/EV-APP-10-modo-demostracion.md)
- Estado de plataforma y base de datos: [`evidencias/base-datos/EV-DB-01-api-health.md`](./evidencias/base-datos/EV-DB-01-api-health.md)

