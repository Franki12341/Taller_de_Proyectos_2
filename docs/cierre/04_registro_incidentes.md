# Registro de incidentes SmartSched-UC

## Criterio

Se registran solo eventos **ocurridos y verificables** mediante archivos, commits, salidas de herramientas o estado observable del repositorio.

## Registro

| ID | Fecha | DescripciÃ³n | MÃ³dulo | Prioridad | Impacto | Responsable | Causa raÃ­z | AcciÃ³n inmediata | AcciÃ³n correctiva | Fecha de resoluciÃ³n | Estado | Evidencia | Commit |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| INC-01 | 2026-06-25 | El TOC raÃ­z referenciaba `20_analisis_validacion_problema.md` y `21_evidencias_validacion_tdd_mvp.md` sin contar con esos artefactos presentes en la ruta actual. | DocumentaciÃ³n raÃ­z | Alta | Trazabilidad rota | [PENDIENTE: confirmar responsable de documentaciÃ³n histÃ³rica] | ReestructuraciÃ³n documental incompleta. | Verificar historial Git y confirmar ausencia actual. | Restablecer enlaces y documentar el vacÃ­o en cierre. | 2026-06-25 | En control | `docs/00_TOC.md`, `EV-GIT-01` | `41b23e0`, `c101868`, `3804bdd` |
| INC-02 | 2026-06-25 | Se detectaron referencias obsoletas a MERN, MongoDB y FastAPI en documentos y metadatos durante la revisiÃ³n de cierre, mientras el cÃ³digo actual usa Node.js, Express y PostgreSQL. | DocumentaciÃ³n / metadatos | Alta | Inconsistencia acadÃ©mica | [PENDIENTE: confirmar responsable de actualizaciÃ³n documental] | EvoluciÃ³n del stack sin sincronizaciÃ³n documental completa. | Contrastar docs raÃ­z con `smartsched-uc/`. | Corregir los artefactos en el Ã¡rbol actual y registrar la inconsistencia como hallazgo histÃ³rico. | 2026-06-25 | En control | `docs/08_arquitectura.md`, `smartsched-uc/server/package.json`, `smartsched-uc/docs/SPEC.md` | `[PENDIENTE: identificar commit exacto de introducciÃ³n de la referencia obsoleta]` |
| INC-03 | 2026-06-18 | `sonar-project.properties` contiene un token visible en texto plano. | Calidad / seguridad | CrÃ­tica | ExposiciÃ³n de secreto | [PENDIENTE: confirmar responsable del repositorio o de calidad] | GestiÃ³n insegura de credenciales. | Registrar el hallazgo y evitar su difusiÃ³n adicional. | Rotar token y mover configuraciÃ³n sensible a entorno seguro. | [PENDIENTE: registrar fecha de rotaciÃ³n o remediaciÃ³n] | Abierto | `smartsched-uc/sonar-project.properties` | `3804bdd` |
| INC-04 | 2026-06-25 | Documentos raÃ­z y README presentan mojibake o codificaciÃ³n incorrecta, afectando legibilidad. | DocumentaciÃ³n | Media | Calidad de entrega | [PENDIENTE: confirmar responsable de mantenimiento documental] | Problemas de codificaciÃ³n UTF-8/BOM en archivos histÃ³ricos. | Identificar alcance del problema. | Normalizar codificaciÃ³n en una prÃ³xima correcciÃ³n controlada. | [PENDIENTE: registrar fecha de correcciÃ³n de codificaciÃ³n] | Abierto | `README.md`, `docs/00_TOC.md`, `docs/03_project_charter.md` | `[PENDIENTE: identificar commit exacto de introducciÃ³n del mojibake]` |

## DiferenciaciÃ³n respecto de riesgos

- Estos registros describen **hechos observados**.
- Los riesgos relacionados quedan en [`03_registro_riesgos.md`](./03_registro_riesgos.md).

## Evidencias relacionadas

- Historial y cambios del repositorio: [`evidencias/gestion/EV-GEST-02-historial-commits.md`](./evidencias/gestion/EV-GEST-02-historial-commits.md)
- Validación de evidencias generadas: [`evidencias/99_validacion_evidencias.md`](./evidencias/99_validacion_evidencias.md)

