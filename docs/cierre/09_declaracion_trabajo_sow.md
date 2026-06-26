# DeclaraciÃ³n de trabajo (SOW) SmartSched-UC

## PropÃ³sito

Formalizar, con enfoque acadÃ©mico, el trabajo comprometido, sus entregables y criterios de aceptaciÃ³n para la fase de cierre.

## DescripciÃ³n del trabajo

El proyecto SmartSched-UC desarrolla un sistema web de simulaciÃ³n y generaciÃ³n de horarios universitarios con React, Node.js, Express, PostgreSQL, fallback local y un motor CSP/backtracking que valida crÃ©ditos, conflictos, docentes, aulas y restricciones operativas.

## Alcance

- SelecciÃ³n de cursos y simulaciÃ³n de matrÃ­cula.
- GeneraciÃ³n y validaciÃ³n de horarios.
- IntegraciÃ³n con PostgreSQL y fallback local.
- AuditorÃ­a, notificaciones, coordinaciÃ³n y modo demostraciÃ³n.
- Pruebas automatizadas y documentaciÃ³n tÃ©cnica.

## Exclusiones

- MatrÃ­cula institucional real.
- IntegraciÃ³n productiva con ERP universitario.
- AutenticaciÃ³n productiva multiusuario.
- CÃ¡lculo econÃ³mico real certificado.

## Entregables y aceptaciÃ³n

| Entregable | Criterio de aceptaciÃ³n | Resultado | Estado | Evidencia |
|---|---|---|---|---|
| Frontend de simulaciÃ³n | Permite seleccionar cursos, generar horario y revisar resumen | Verificado | Completado | `client/src/App.js`, `client/src/App.test.js` |
| Backend de horarios | Expone endpoints y motor de validaciÃ³n | Verificado | Completado | `server/src/routes/academic.routes.js`, `scheduler.service.js` |
| Soporte PostgreSQL/fallback | `/api/health` y capa de datos dual operativa | Verificado | Completado | `db.js`, `academic-data.service.js` |
| Pruebas automatizadas | Suites backend/frontend disponibles | Verificado | Completado | `EV-TEST-01` a `EV-TEST-04` |
| Evidencias de seguridad/calidad | AuditorÃ­as y configuraciÃ³n disponibles | Parcial | En validaciÃ³n | `EV-SEC-*`, `sonar-project.properties` |
| DocumentaciÃ³n de cierre | Registros y trazabilidad consolidados | Verificado | Completado | carpeta `docs/cierre/` |

## Responsabilidades

- Equipo del proyecto: implementar, documentar y validar el MVP.
- Responsable documental: consolidar el cierre y declarar vacÃ­os de evidencia.
- Docente/evaluador: revisar cumplimiento acadÃ©mico contra la rÃºbrica.

## Restricciones

- No inventar mÃ©tricas, costos, fechas ni evidencias.
- No reescribir la historia del proyecto.
- Mantener coherencia con el cÃ³digo verificable del repositorio.

## ValidaciÃ³n final

La validaciÃ³n final debe complementarse con:

1. revisiÃ³n manual del docente;
2. confirmaciÃ³n de responsables y fechas;
3. capturas y evidencias manuales faltantes;
4. decisiÃ³n acadÃ©mica de aceptaciÃ³n.

## Pendientes

- Completar responsables y fechas reales.
- Adjuntar evidencia SonarQube/WCAG si se ejecuta posteriormente.
- Corregir inconsistencias histÃ³ricas en documentos raÃ­z.

## Evidencias relacionadas

- Interfaz y resumen de matrícula: [`evidencias/aplicacion/EV-APP-09-resumen-matricula.md`](./evidencias/aplicacion/EV-APP-09-resumen-matricula.md)
- Verificación de API y base de datos: [`evidencias/base-datos/EV-DB-01-api-health.json`](./evidencias/base-datos/EV-DB-01-api-health.json)

