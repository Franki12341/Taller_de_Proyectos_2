# Control de configuraciÃ³n y cambios SmartSched-UC

## Objetivo

Registrar los elementos de configuraciÃ³n del proyecto y los cambios verificables que afectaron su evoluciÃ³n tÃ©cnica y documental.

## Elementos de configuraciÃ³n

- Repositorio Git raÃ­z `Taller_de_Proyectos_2-git`
- AplicaciÃ³n `smartsched-uc/`
- Frontend React `smartsched-uc/client/`
- Backend Node.js/Express `smartsched-uc/server/`
- Scripts raÃ­z y de calidad `package.json`
- ConfiguraciÃ³n Git/Husky/Commitlint
- ConfiguraciÃ³n SonarQube
- SQL y documentaciÃ³n de PostgreSQL
- DocumentaciÃ³n raÃ­z y documentaciÃ³n de cierre

## Estrategia de ramas y control

| Elemento | Evidencia |
|---|---|
| Rama actual | `docs/control-cierre` |
| Ramas verificadas | `main`, `ci/quality-standards`, `docs/control-cierre` |
| Remoto | `origin` â†’ `https://github.com/Franki12341/Taller_de_Proyectos_2.git` |
| Pre-commit | `.husky/pre-commit` ejecuta `npm test` |
| Pre-push | `.husky/pre-push` ejecuta `npm run quality:full` |
| Commitlint | `commitlint.config.cjs` |

## GestiÃ³n de entornos

- Variables sensibles deben ir fuera del repositorio.
- `server/.env.example` guÃ­a la configuraciÃ³n local.
- PostgreSQL y fallback local coexisten como estrategia de continuidad.

## Registro de cambios

| ID | Fecha | Solicitud | Origen | Motivo | Impacto | Archivos afectados | Riesgo | AprobaciÃ³n | Responsable | Commit | Estado |
|---|---|---|---|---|---|---|---|---|---|---|---|
| CAM-01 | 2026-05-04 | Primer funcionamiento del sistema | Desarrollo inicial | Construir MVP base | Alto | `smartsched-uc/` inicial | Medio | [PENDIENTE: registrar aprobaciÃ³n tÃ©cnica o acadÃ©mica del cambio] | fran vilca | `22f812b` | Verificado |
| CAM-02 | 2026-05-08 | IncorporaciÃ³n del acta o constituciÃ³n documental | DocumentaciÃ³n | Formalizar base del proyecto | Medio | `docs/14_constitution.md` | Bajo | [PENDIENTE: registrar aprobaciÃ³n documental] | Franki12341 | `ec192f3` | Verificado |
| CAM-03 | 2026-05-29 | Evidencias de validaciÃ³n y TDD | DocumentaciÃ³n/calidad | Sustentar el MVP con pruebas y evidencias | Medio | `docs/21_evidencias_validacion_tdd_mvp*` | Bajo | [PENDIENTE: registrar aprobaciÃ³n documental] | Franki12341 | `c101868` | Verificado en historial |
| CAM-04 | 2026-06-18 | IntegraciÃ³n de calidad, Husky, Commitlint y Sonar | Calidad/configuraciÃ³n | Fortalecer control de cambios | Alto | `.husky/`, `package.json`, `sonar-project.properties` | Medio | [PENDIENTE: registrar aprobaciÃ³n tÃ©cnica o acadÃ©mica del cambio] | Franco Lazo | `3804bdd` | Verificado |
| CAM-05 | [PENDIENTE: identificar fecha del commit exacto de integraciÃ³n PostgreSQL y scheduler] | Ajustes de PostgreSQL, fallback, scheduler y vistas demostrativas | Desarrollo evolutivo | Alinear MVP con la exposiciÃ³n acadÃ©mica | Alto | `client/src/App.js`, `server/src/services/*`, `server/src/database/*` | Alto | [PENDIENTE: registrar aprobaciÃ³n tÃ©cnica o acadÃ©mica del cambio] | [PENDIENTE: confirmar autor del commit exacto en historial] | `[PENDIENTE: identificar commit exacto de integraciÃ³n funcional]` | En validaciÃ³n |
| CAM-06 | 2026-06-25 | ConsolidaciÃ³n documental de control y cierre | Cierre | Cumplir rÃºbrica de Taller de Proyectos 2 | Alto | `docs/cierre/*`, `docs/00_TOC.md`, `README.md` | Bajo | [PENDIENTE: registrar aprobaciÃ³n del cierre acadÃ©mico] | [PENDIENTE: confirmar responsable documental del cierre] | `[PENDIENTE: registrar hash al versionar los documentos de cierre]` | En ejecuciÃ³n |

## Respaldo y recuperaciÃ³n

- Git preserva el historial de cambios verificables.
- El fallback local reduce impacto operativo cuando PostgreSQL falla.
- La fase de cierre recomienda respaldar evidencias manuales fuera del repositorio antes de la sustentaciÃ³n.

## Evidencias automatizadas de gestión

- Historial de commits: [`evidencias/gestion/EV-GEST-01-historial-commits.txt`](./evidencias/gestion/EV-GEST-01-historial-commits.txt)
- Versionamiento: [`evidencias/gestion/EV-GEST-07-versionamiento.md`](./evidencias/gestion/EV-GEST-07-versionamiento.md)
- Resumen gráfico: [`evidencias/gestion/EV-GEST-09-resumen-gestion.png`](./evidencias/gestion/EV-GEST-09-resumen-gestion.png)

