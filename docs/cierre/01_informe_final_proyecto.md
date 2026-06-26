# Informe final del proyecto SmartSched-UC

## 1. Portada documental

| Campo | Valor |
|---|---|
| Proyecto | SmartSched-UC |
| Tipo de documento | Informe final de control y cierre |
| Curso | Taller de Proyectos 2 |
| Repositorio verificado | `Taller_de_Proyectos_2-git` |
| AplicaciÃ³n evaluada | `smartsched-uc/` |
| Fecha de consolidaciÃ³n | 2026-06-25 |
| Responsable documental | [PENDIENTE: confirmar responsable documental en portada acadÃ©mica] |

## 2. Control de versiones del documento

| VersiÃ³n | Fecha | Autor | Cambio |
|---|---|---|---|
| 1.0 | 2026-06-25 | [PENDIENTE: confirmar autor documental de esta versiÃ³n] | ConsolidaciÃ³n inicial del cierre con evidencia verificable. |

## 3. Resumen ejecutivo

SmartSched-UC es un MVP acadÃ©mico para la **simulaciÃ³n y generaciÃ³n de horarios universitarios** mediante un motor de bÃºsqueda tipo **CSP/backtracking**, con interfaz web en React, backend en Node.js/Express y soporte dual de datos: **PostgreSQL** como fuente preferente y **fallback local** cuando la base no estÃ¡ disponible.  

La revisiÃ³n de cierre confirma que el proyecto **sÃ­ cuenta con implementaciÃ³n funcional verificable** para selecciÃ³n de cursos, generaciÃ³n de horarios, control del mÃ¡ximo de 25 crÃ©ditos, validaciÃ³n de cruces, docentes, bloques protegidos, aulas, ocupaciÃ³n, auditorÃ­a, notificaciones, modo demostraciÃ³n, pruebas automatizadas, cachÃ© simple, compresiÃ³n HTTP y control bÃ¡sico de errores.  

TambiÃ©n se identificaron **brechas documentales y de calidad** que deben declararse de forma transparente: inconsistencias entre documentaciÃ³n histÃ³rica y el stack actual, referencias histÃ³ricas obsoletas ya detectadas durante el cierre, problemas de codificaciÃ³n de caracteres, token de SonarQube visible en archivo de configuraciÃ³n, ausencia de reporte SonarQube exportado, ausencia de evidencia formal WCAG/OWASP mÃ¡s allÃ¡ de `npm audit`, y falta de datos reales trazables de cronograma y costos.

## 4. Contexto y problema complejo de ingenierÃ­a

El problema abordado por SmartSched-UC es la **planificaciÃ³n acadÃ©mica universitaria con restricciones mÃºltiples**: cursos, crÃ©ditos, disponibilidad docente, bloques protegidos, aulas compatibles, aforo y compatibilidad de horario para estudiantes.  

De acuerdo con [`../../smartsched-uc/docs/SPEC.md`](../../smartsched-uc/docs/SPEC.md), el sistema modela la generaciÃ³n de horarios como un problema tipo CSP con restricciones duras y blandas, orientado a producir una asignaciÃ³n vÃ¡lida y explicable.

## 5. Objetivo general

Desarrollar una aplicaciÃ³n web que permita **simular y generar horarios acadÃ©micos vÃ¡lidos y defendibles**, maximizando la carga acadÃ©mica hasta 25 crÃ©ditos sin violar cruces, disponibilidad docente ni restricciones de aulas.

## 6. Objetivos especÃ­ficos

1. Permitir la selecciÃ³n y simulaciÃ³n de cursos desde la interfaz web.
2. Generar horarios con lÃ³gica de validaciÃ³n acadÃ©mica en backend.
3. Preparar la soluciÃ³n para PostgreSQL manteniendo continuidad mediante fallback local.
4. Proveer mÃ©tricas, advertencias, recomendaciones y trazabilidad en la web.
5. Sustentar la calidad mediante pruebas automatizadas y evidencia documental.

## 7. Interesados

| Interesado | InterÃ©s | Evidencia |
|---|---|---|
| Estudiantes | Generar una carga acadÃ©mica vÃ¡lida y comprensible. | [`../../smartsched-uc/client/src/App.js`](../../smartsched-uc/client/src/App.js) |
| CoordinaciÃ³n acadÃ©mica | Revisar carga docente, uso de aulas, conflictos y auditorÃ­a. | [`../../smartsched-uc/client/src/App.js`](../../smartsched-uc/client/src/App.js) |
| Docente evaluador / curso | Verificar trazabilidad, calidad y coherencia tÃ©cnica. | [`./11_matriz_trazabilidad.md`](./11_matriz_trazabilidad.md) |
| Equipo del proyecto | Consolidar una base mantenible y defendible. | [`./12_control_configuracion_cambios.md`](./12_control_configuracion_cambios.md) |

## 8. Arquitectura

### 8.1 Arquitectura verificada en cÃ³digo

- **Frontend**: React (`smartsched-uc/client`)
- **Backend**: Node.js + Express (`smartsched-uc/server`)
- **Base de datos**: PostgreSQL con `pg`
- **Fallback**: dataset local estructurado
- **Motor de horarios**: `scheduler.service.js` con heurÃ­sticas CSP/backtracking

### 8.2 Inconsistencias histÃ³ricas detectadas

- Durante la revisiÃ³n del cierre se detectaron referencias histÃ³ricas a **FastAPI**, **MERN** y **MongoDB** en artefactos de documentaciÃ³n y metadatos.
- En el Ã¡rbol de trabajo actual ya se corrigieron `README.md`, `docs/00_TOC.md`, `docs/08_arquitectura.md`, `smartsched-uc/docs/SPEC.md` y `smartsched-uc/server/package.json`, pero el historial conserva la inconsistencia como hecho verificable de evoluciÃ³n documental.
- `README.md` y varios documentos histÃ³ricos presentan codificaciÃ³n de caracteres defectuosa.

Estas inconsistencias se registran ademÃ¡s en [`04_registro_incidentes.md`](./04_registro_incidentes.md) y [`06_registro_defectos.md`](./06_registro_defectos.md).

## 9. TecnologÃ­as

| Componente | Evidencia verificada | Estado |
|---|---|---|
| React | `smartsched-uc/client/package.json` | Verificado |
| Node.js | `smartsched-uc/server/package.json` | Verificado |
| Express | `smartsched-uc/server/package.json` | Verificado |
| PostgreSQL (`pg`) | `smartsched-uc/server/package.json`, `server/src/config/db.js` | Verificado |
| Jest / Supertest | `smartsched-uc/server/package.json`, `server/test/scheduler.test.js` | Verificado |
| React Testing Library | `smartsched-uc/client/package.json`, `client/src/App.test.js` | Verificado |
| SonarQube | `smartsched-uc/sonar-project.properties`, commit `3804bdd` | En validaciÃ³n |
| Husky / Commitlint | repo raÃ­z `package.json`, `.husky/`, `commitlint.config.cjs` | Verificado |

## 10. MetodologÃ­a adaptativa

La documentaciÃ³n histÃ³rica hace referencia a Sprints, backlog y mÃ©tricas Ã¡giles (`docs/04_backlog.md`, `docs/19_metricas_agiles.md`). La evidencia permite sostener un enfoque **adaptativo e incremental**, pero no se encontrÃ³ un registro cronolÃ³gico completo con fechas reales por sprint, por lo que la cuantificaciÃ³n temporal detallada queda **en validaciÃ³n**.

## 11. Alcance planificado

SegÃºn `docs/03_project_charter.md` y `docs/05_requerimientos.md`, el alcance inicial incluÃ­a:

- generaciÃ³n automÃ¡tica de horarios,
- validaciÃ³n de crÃ©ditos,
- interfaz web,
- validaciÃ³n acadÃ©mica,
- restricciones duras y blandas.

No se encontrÃ³ evidencia verificable de integraciÃ³n institucional real ni despliegue productivo, y ambos puntos permanecen fuera del alcance.

## 12. Alcance ejecutado

### Funcionalidades verificadas en cÃ³digo

| ID | Requisito | VerificaciÃ³n |
|---|---|---|
| RF-01 | SelecciÃ³n de cursos | `client/src/App.js` |
| RF-02 | GeneraciÃ³n de horario | `server/src/services/scheduler.service.js` |
| RF-03 | LÃ­mite mÃ¡ximo de 25 crÃ©ditos | `client/src/App.js`, `server/src/services/scheduler.service.js`, `server/test/scheduler.test.js` |
| RF-04 | DetecciÃ³n de cruces | `scheduler.service.js`, `scheduler.test.js` |
| RF-05 | ValidaciÃ³n docente | `scheduler.service.js` |
| RF-06 | Respeto de carga administrativa / bloques protegidos | `scheduler.service.js` |
| RF-07 | ValidaciÃ³n de aulas, aforo y ocupaciÃ³n | `scheduler.service.js`, `client/src/App.js` |
| RF-08 | PostgreSQL con fallback local | `server/src/config/db.js`, `academic-data.service.js` |
| RF-09 | AuditorÃ­a y notificaciones | `client/src/App.js`, `/api/audit/logs` |
| RF-10 | Modo demostraciÃ³n / coordinaciÃ³n | `client/src/App.js` |

## 13. ComparaciÃ³n plan versus ejecuciÃ³n

| Elemento | Planificado | Ejecutado | Estado | Evidencia |
|---|---|---|---|---|
| Horarios automÃ¡ticos | SÃ­ | SÃ­ | Completado | `RF-02`, `PRB-01` |
| ValidaciÃ³n de crÃ©ditos | SÃ­ | SÃ­, actualizado a 25 mÃ¡ximos | Completado | `RF-03`, `PRB-06` |
| Prerrequisitos | SÃ­, documentado | No verificado en cÃ³digo actual | En validaciÃ³n | `docs/05_requerimientos.md` |
| Interfaz web | SÃ­ | SÃ­ | Completado | `client/src/App.js` |
| PostgreSQL | No claro en docs iniciales | SÃ­, con fallback | Completado | `server/src/config/db.js` |
| SonarQube con resultados | Esperable | Solo configuraciÃ³n y workflow | En validaciÃ³n | commit `3804bdd` |

## 14. DesempeÃ±o del cronograma

| Indicador | Dato |
|---|---|
| Sprints histÃ³ricos mencionados | 5 (`docs/16_presupuesto.md`) |
| Fechas reales por sprint | [PENDIENTE: incorporar cronograma real o actas fechadas por sprint] |
| DuraciÃ³n planificada total | 10 semanas (documento histÃ³rico, no validado con agenda real) |
| DesviaciÃ³n real | [PENDIENTE: calcular contra cronograma real una vez documentado] |

> Nota: el repositorio no contiene un cronograma fechado y cerrado con suficiente trazabilidad para afirmar desempeÃ±o temporal real sin completar evidencia humana.

## 15. DesempeÃ±o de costos

### 15.1 Estado de evidencia

- Existe un presupuesto histÃ³rico en `docs/16_presupuesto.md`.
- **No se encontraron hojas de horas reales, comprobantes ni tarifa confirmada**.
- Por ello, el cierre **no valida montos como costo real**.

### 15.2 Plantilla de costos de cierre

| Componente | FÃ³rmula | Dato real | Estado |
|---|---|---|---|
| Costo de personal acadÃ©mico real | horas reales Ã— tarifa real | [PENDIENTE: registrar horas reales y tarifa real] | En validaciÃ³n |
| Costo referencial de mercado | horas reales Ã— tarifa referencial | [PENDIENTE: registrar horas reales para estimaciÃ³n de mercado] | En validaciÃ³n |
| Infraestructura | consumo real o plan | [PENDIENTE: documentar consumo o presupuesto de infraestructura] | En validaciÃ³n |
| Herramientas | licencias efectivamente usadas | [PENDIENTE: confirmar licencias y costos efectivos] | En validaciÃ³n |
| Costo indirecto | conectividad, energÃ­a, soporte | [PENDIENTE: consolidar costos indirectos reales] | En validaciÃ³n |
| Costo evitado por herramientas gratuitas | estimaciÃ³n sustentada | [PENDIENTE: justificar ahorro con base comparativa real] | En validaciÃ³n |

## 16. DesempeÃ±o de calidad

| Indicador | Resultado verificado | Evidencia |
|---|---|---|
| Suite backend | 11/11 pruebas pasadas | `EV-TEST-01`, `EV-TEST-04` |
| Suite frontend | 1/1 prueba pasada | `EV-TEST-01`, `EV-TEST-04` |
| Build frontend | Correcto | `EV-TEST-04` |
| Cobertura backend | 80.42% statements / 60.46% branches / 84.42% funcs / 79.77% lines | `EV-TEST-02` |
| Cobertura frontend | 44.05% statements / 43.77% branches / 42.85% funcs / 43.87% lines | `EV-TEST-03` |

### 16.1 Indicadores consolidados verificados

| Indicador | Resultado | Estado | Evidencia |
|---|---:|---|---|
| Pruebas backend | 11/11 | Aprobado | `EV-TEST-01` |
| Pruebas frontend | 1/1 | Aprobado | `EV-TEST-01` |
| Pruebas totales | 12/12 | Aprobado | `EV-TEST-01` |
| Cobertura backend por lÃ­neas | 79.77% | Verificado | `EV-TEST-02` |
| Cobertura frontend por lÃ­neas | 43.87% | Requiere mejora | `EV-TEST-03` |
| Cobertura scheduler por lÃ­neas | 91.30% | Alto | `EV-TEST-02` |
| Build de producciÃ³n | Compilado correctamente | Aprobado | `EV-TEST-04` |
| Vulnerabilidades raÃ­z | 0 | Verificado | `EV-SEC-01` |
| Vulnerabilidades backend | 22 | En tratamiento | `EV-SEC-02` |
| Vulnerabilidades frontend | 51 | Prioridad crÃ­tica | `EV-SEC-03` |

## 17. Pruebas

| PRB | DescripciÃ³n | Resultado | Evidencia |
|---|---|---|---|
| PRB-01 | DetecciÃ³n de conflictos de docente, aula y estudiante | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-02 | GeneraciÃ³n automÃ¡tica vÃ¡lida y repetible | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-03 | LÃ­mite mÃ¡ximo de 25 crÃ©ditos y optimizaciÃ³n hacia el objetivo | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-04 | SelecciÃ³n exacta de 25 crÃ©ditos cuando existe combinaciÃ³n vÃ¡lida | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-05 | Disponibilidad docente, capacidad de aula y horas asignadas | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-06 | DetecciÃ³n de aula sobreocupada | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-07 | Rechazo de aulas en mantenimiento o inactivas | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-08 | Recomendaciones cuando faltan crÃ©ditos | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-09 | `POST /api/schedules/generate` expone el motor por API | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-10 | `GET /api/courses` devuelve paginaciÃ³n simulada | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-11 | `GET /api/health` reporta fallback cuando PostgreSQL no estÃ¡ disponible | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-12 | Renderizado del tablero compacto de matrÃ­cula | Aprobada | `EV-TEST-01`, `EV-TEST-03`, `EV-TEST-04` |

## 18. SonarQube

| Elemento | Estado | Evidencia |
|---|---|---|
| Archivo de configuraciÃ³n | Verificado | `smartsched-uc/sonar-project.properties` |
| AutomatizaciÃ³n de calidad | Verificada en commit `3804bdd` | `EV-GIT-01` |
| Resultado de anÃ¡lisis exportado | No encontrado | [PENDIENTE: adjuntar exportaciÃ³n real de SonarQube desde el dashboard] |

## 19. OWASP

| Elemento | Resultado verificado |
|---|---|
| RevisiÃ³n de dependencias backend | 22 vulnerabilidades (`1 low`, `20 moderate`, `1 high`) en evidencia `EV-SEC-02` |
| RevisiÃ³n de dependencias frontend | 51 vulnerabilidades (`5 low`, `30 moderate`, `15 high`, `1 critical`) en evidencia `EV-SEC-03` |
| Hallazgo adicional | `sonar-project.properties` expone un token en texto plano |

### 19.1 Resumen cuantitativo de calidad y seguridad

| Indicador | Resultado verificado | Evidencia |
|---|---|---|
| Vulnerabilidades raÃ­z | 0 | `EV-SEC-01` |
| Vulnerabilidades backend | 22 | `EV-SEC-02` |
| Vulnerabilidades frontend | 51 | `EV-SEC-03` |
| Code smells | [PENDIENTE: copiar mÃ©trica exacta desde SonarQube] | [PENDIENTE: adjuntar exportaciÃ³n real de SonarQube] |
| Bugs Sonar | [PENDIENTE: copiar mÃ©trica exacta desde SonarQube] | [PENDIENTE: adjuntar exportaciÃ³n real de SonarQube] |
| Deuda tÃ©cnica | [PENDIENTE: copiar mÃ©trica exacta desde SonarQube] | [PENDIENTE: adjuntar exportaciÃ³n real de SonarQube] |

## 20. WCAG

| Evidencia | Resultado |
|---|---|
| `aria-label` en bÃºsqueda, filtros, navegaciÃ³n y tabs | Verificado en `client/src/App.js` |
| AuditorÃ­a formal WCAG exportada | No encontrada |

Estado global: **En validaciÃ³n**.

## 21. Green Software

| Medida | Estado | Evidencia |
|---|---|---|
| CompresiÃ³n HTTP | Implementado | `server/src/app.js` |
| CachÃ© simple en GET | Implementado | `server/src/middlewares/simpleCache.middleware.js` |
| PaginaciÃ³n | Implementado | `academic-data.service.js` |
| JSON limitado a 100kb | Implementado | `server/src/app.js` |
| Ãndices SQL | Implementado | `server/src/database/smartsched_uc.sql` |
| Fallback local para continuidad | Implementado | `server/src/config/db.js` |

## 22. Incidentes

Se documentan en [`04_registro_incidentes.md`](./04_registro_incidentes.md). Se verificaron, al menos:

- inconsistencia de stack entre documentaciÃ³n y cÃ³digo;
- enlaces rotos o ausentes a documentos histÃ³ricos 20 y 21;
- exposiciÃ³n de token SonarQube;
- degradaciÃ³n de codificaciÃ³n UTF-8 en varios documentos raÃ­z.

## 23. Riesgos

Se documentan en [`03_registro_riesgos.md`](./03_registro_riesgos.md). Riesgos residuales relevantes:

- vulnerabilidades de dependencias;
- baja cobertura frontend;
- documentaciÃ³n histÃ³rica divergente;
- dependencia de evidencias manuales para cierre completo.

## 24. Cambios

| CAM | DescripciÃ³n | Estado | Commit |
|---|---|---|---|
| CAM-01 | Primer funcionamiento del sistema | Verificado | `22f812b` |
| CAM-02 | ConstituciÃ³n documental del proyecto | Verificado | `ec192f3` |
| CAM-03 | Evidencias de validaciÃ³n y TDD | Verificado | `c101868` |
| CAM-04 | Infraestructura de calidad, Husky y Sonar | Verificado | `3804bdd` |
| CAM-05 | Ajustes de PostgreSQL, fallback, scheduler y vistas demostrativas | En validaciÃ³n | `[PENDIENTE: identificar commit exacto de integraciÃ³n funcional en el historial]` |

### 24.1 Totales de control

| Registro | Total verificado | Documento |
|---|---:|---|
| Riesgos | 8 | `03_registro_riesgos.md` |
| Incidentes | 4 | `04_registro_incidentes.md` |
| Impedimentos | 4 | `05_registro_impedimentos.md` |
| Defectos | 5 | `06_registro_defectos.md` |
| Supuestos | 6 | `07_registro_supuestos.md` |
| Cambios | 6 | `12_control_configuracion_cambios.md` |

## 25. Resultados verificables

| Resultado | Estado | Evidencia |
|---|---|---|
| Horarios generados por API | Verificado | `PRB-01`, `PRB-06`, `EV-TEST-04` |
| ValidaciÃ³n de aulas | Verificado | `PRB-07`, `PRB-08` |
| PostgreSQL/fallback | Verificado | `PRB-05`, `server/src/config/db.js` |
| AuditorÃ­a y notificaciones | Verificado | `client/src/App.js`, `academic.routes.js` |
| Modo demostraciÃ³n | Verificado | `client/src/App.js` |

## 26. Limitaciones

- No se encontrÃ³ reporte SonarQube exportado.
- No se encontrÃ³ auditorÃ­a formal WCAG.
- No se encontrÃ³ evidencia completa de cronograma real.
- No se encontrÃ³ trazabilidad suficiente para costos reales.
- Persisten documentos histÃ³ricos desalineados con el stack actual.

## 27. Riesgos residuales

1. Dependencias con vulnerabilidades pendientes (`EV-SEC-02`, `EV-SEC-03`).
2. Token visible en `sonar-project.properties`.
3. Cobertura frontend insuficiente para sostener una afirmaciÃ³n fuerte de calidad integral.
4. Riesgo de confusiÃ³n por documentaciÃ³n histÃ³rica si no se versionan las correcciones recientes.

## 28. Conclusiones estratÃ©gicas

- El proyecto **sÃ­ cumple con una base funcional demostrable** para la consigna acadÃ©mica.
- La mayor fortaleza actual es la **coherencia entre backend, pruebas automatizadas y experiencia demostrativa de la web**.
- La mayor debilidad no estÃ¡ en el MVP funcional, sino en la **gobernanza documental e higiene de calidad** del repositorio raÃ­z.

## 29. Recomendaciones

1. Remover o rotar inmediatamente el token expuesto de SonarQube.
2. Ejecutar y archivar un anÃ¡lisis SonarQube real.
3. Versionar y revisar las correcciones aplicadas a documentos raÃ­z y metadatos para que el historial de cierre quede consistente.
4. Elevar cobertura frontend con pruebas de interacciÃ³n y error states.
5. Consolidar cronograma y costos con evidencias reales antes de la entrega final.

## 30. Referencias a evidencias

- Git: [`./evidencias/README.md`](./evidencias/README.md)
- Pruebas: `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03`, `EV-TEST-04`
- Seguridad: `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`
- Historial: `EV-GIT-01`, `EV-GIT-02`, `EV-GIT-03`, `EV-GIT-04`

## 31. Requerimientos planificados y ejecutados

Base histÃ³rica usada: `docs/05_requerimientos.md` (`3 RF` + `3 RNF`).

| Tipo | Planificados | Completamente verificados | En validaciÃ³n | No verificados | Cumplimiento exacto |
|---|---:|---:|---:|---:|---:|
| RF | 3 | 2 | 0 | 1 | 66.67% |
| RNF | 3 | 0 | 3 | 0 | 0.00% |
| Total | 6 | 2 | 3 | 1 | 33.33% |

> InterpretaciÃ³n: el repositorio actual supera el alcance histÃ³rico mÃ­nimo en varias capacidades, pero la documentaciÃ³n inicial solo formalizÃ³ seis requerimientos. Por eso la mÃ©trica anterior refleja **cumplimiento exacto del set documentado**, no del producto total implementado.

## 32. Evidencias automatizadas adicionales

- Flujo funcional y tablero compacto: [`evidencias/aplicacion/EV-APP-01-pantalla-principal.md`](./evidencias/aplicacion/EV-APP-01-pantalla-principal.md), [`evidencias/aplicacion/EV-APP-04-horario-generado.md`](./evidencias/aplicacion/EV-APP-04-horario-generado.md)
- Estado de base de datos y salud de API: [`evidencias/base-datos/EV-DB-01-api-health.md`](./evidencias/base-datos/EV-DB-01-api-health.md), [`evidencias/base-datos/EV-DB-05-integridad-datos.md`](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
- Gestión y control de configuración: [`evidencias/gestion/EV-GEST-02-historial-commits.md`](./evidencias/gestion/EV-GEST-02-historial-commits.md), [`evidencias/gestion/EV-GEST-08-control-cambios.md`](./evidencias/gestion/EV-GEST-08-control-cambios.md)
- SonarQube y estado del servicio: [`evidencias/sonarqube/EV-SONAR-01-system-status.json`](./evidencias/sonarqube/EV-SONAR-01-system-status.json), [`evidencias/sonarqube/EV-SONAR-04-resumen.md`](./evidencias/sonarqube/EV-SONAR-04-resumen.md)

