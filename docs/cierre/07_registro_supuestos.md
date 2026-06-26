# Registro de supuestos SmartSched-UC

## PropÃ³sito

Documentar supuestos operativos y tÃ©cnicos que condicionan la validez acadÃ©mica del MVP.

## Registro

| ID | Supuesto | Origen | Impacto potencial | MÃ©todo de validaciÃ³n | Resultado | DecisiÃ³n tomada | Estado | Evidencia |
|---|---|---|---|---|---|---|---|---|
| SUP-01 | El lÃ­mite de simulaciÃ³n vigente es 25 crÃ©ditos. | CÃ³digo actual y pruebas | Afecta generaciÃ³n, resumen y validaciÃ³n del horario. | Revisar `client/src/App.js`, `scheduler.service.js` y `scheduler.test.js`. | Verificado en cÃ³digo y pruebas. | Usar 25 crÃ©ditos como referencia oficial del cierre tÃ©cnico. | Validado | `smartsched-uc/client/src/App.js`, `smartsched-uc/server/test/scheduler.test.js` |
| SUP-02 | La disponibilidad docente y los bloques protegidos representan la carga administrativa mÃ­nima necesaria. | Modelo de scheduler | Si el dato estÃ¡ incompleto, el horario puede ser menos realista. | Revisar `scheduler.service.js` y dataset/SQL. | Existe soporte lÃ³gico, pero depende de calidad de datos. | Declarar la dependencia de calidad de datos. | Parcialmente validado | `scheduler.service.js`, `smartsched_uc.sql` |
| SUP-03 | La ocupaciÃ³n de aulas se calcula con `estimated_students` y `capacity`. | Motor de horarios | Una mala calidad del dato distorsiona alertas de aforo. | Revisar pruebas y funciones de ocupaciÃ³n. | Verificado en lÃ³gica y pruebas. | Mantenerlo como supuesto explÃ­cito del MVP. | Validado | `scheduler.service.js`, `PRB-07`, `PRB-08` |
| SUP-04 | PostgreSQL es la fuente principal cuando estÃ¡ disponible; el fallback local preserva continuidad. | ConfiguraciÃ³n backend | Afecta resiliencia y demostraciÃ³n. | Revisar `db.js`, `/api/health`, `academic-data.service.js`. | Verificado. | Mantener el fallback como comportamiento oficial documentado. | Validado | `server/src/config/db.js`, `academic.routes.js` |
| SUP-05 | Los estudiantes que trabajan o realizan prÃ¡cticas requieren horarios compatibles y compactos. | Problema acadÃ©mico descrito en README/SPEC | Afecta recomendaciones y valor de negocio. | Revisar `SPEC.md`, frontend y dataset. | Parcialmente soportado mediante mensajes y lÃ³gica general, no por un perfil real completo. | Declarar el alcance como simulaciÃ³n acadÃ©mica, no sistema productivo final. | Parcialmente validado | `smartsched-uc/docs/SPEC.md`, `client/src/App.js` |
| SUP-06 | El servidor y los scripts de prueba estÃ¡n disponibles en entorno acadÃ©mico local. | Contexto de ejecuciÃ³n | Si faltan dependencias o base, algunas evidencias no se regeneran. | Verificar scripts en `package.json` y evidencia existente. | Verificado a nivel de configuraciÃ³n; ejecuciÃ³n manual pendiente del entorno del evaluador. | Mantener instrucciones de capacitaciÃ³n y validaciÃ³n. | Parcialmente validado | `package.json`, `EV-TEST-01`, `EV-GIT-03` |

## Evidencias relacionadas

- Estado real de PostgreSQL/fallback: [`evidencias/base-datos/EV-DB-01-api-health.md`](./evidencias/base-datos/EV-DB-01-api-health.md)
- Integridad y conteos agregados: [`evidencias/base-datos/EV-DB-04-conteo-registros.csv`](./evidencias/base-datos/EV-DB-04-conteo-registros.csv)

