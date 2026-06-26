# DeclaraciÃ³n de trabajo (SOW) SmartSched-UC

## PropÃ³sito

Formalizar, con enfoque acadÃ©mico, el trabajo comprometido, sus entregables y criterios de aceptaciÃ³n para la fase de cierre.

## DescripciÃ³n del trabajo

El proyecto SmartSched-UC desarrolla un sistema web de simulaciÃ³n y generaciÃ³n de horarios universitarios con React, Node.js, Express, PostgreSQL, fallback local y un motor CSP/backtracking que valida crÃ©ditos, conflictos, docentes, aulas y restricciones operativas.

## Alcance

- Seleccion de cursos y simulacion de matrÃ­cula.
- Generacion y validacion de horarios.
- Integracion con PostgreSQL y fallback local.
- Auditori­a, notificaciones, coordinacion y modo demostracion.
- Pruebas automatizadas y documentacion tecnica.

## Exclusiones

- Matricula institucional real.
- Integracion productiva con ERP universitario.
- Autenticacion productiva multiusuario.
- Calculo economico real certificado.

## Entregables y aceptaciÃ³n

| Entregable | Criterio de aceptacion | Resultado | Estado | Evidencia |
|---|---|---|---|---|
| Frontend de simulaciÃ³n | Permite seleccionar cursos, generar horario y revisar resumen | Verificado | Completado | `client/src/App.js`, `client/src/App.test.js` |
| Backend de horarios | Expone endpoints y motor de validaciÃ³n | Verificado | Completado | `server/src/routes/academic.routes.js`, `scheduler.service.js` |
| Soporte PostgreSQL/fallback | `/api/health` y capa de datos dual operativa | Verificado | Completado | `db.js`, `academic-data.service.js` |
| Pruebas automatizadas | Suites backend/frontend disponibles | Verificado | Completado | `EV-TEST-01` a `EV-TEST-04` |
| Evidencias de seguridad/calidad | AuditorÃ­as y configuraciÃ³n disponibles | Parcial | En validaciÃ³n | `EV-SEC-*`, `sonar-project.properties` |
| Documentacion de cierre | Registros y trazabilidad consolidados | Verificado | Completado | carpeta `docs/cierre/` |

## Responsabilidades

- Equipo del proyecto: implementar, documentar y validar el MVP.
- Responsable documental: consolidar el cierre y declarar vacÃios de evidencia.
- Docente/evaluador: revisar cumplimiento academico contra la rubrica.

## Restricciones

- No inventar metricas, costos, fechas ni evidencias.
- No reescribir la historia del proyecto.
- Mantener coherencia con el cÃ³digo verificable del repositorio.

## Validacion final

La validacion final debe complementarse con:

1. revision manual del docente;
2. confirmacion de responsables y fechas;
3. capturas y evidencias manuales faltantes;
4. decision academica de aceptacion.

## Pendientes

- Completar responsables y fechas reales.
- Adjuntar evidencia SonarQube/WCAG si se ejecuta posteriormente.
- Corregir inconsistencias historicas en documentos rai­z.

## Evidencias relacionadas

- Interfaz y resumen de matrícula: [`evidencias/aplicacion/EV-APP-09-resumen-matricula.md`](./evidencias/aplicacion/EV-APP-09-resumen-matricula.md)
- Verificación de API y base de datos: [`evidencias/base-datos/EV-DB-01-api-health.json`](./evidencias/base-datos/EV-DB-01-api-health.json)

