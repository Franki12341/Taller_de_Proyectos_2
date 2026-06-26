# Registro de riesgos SmartSched-UC

## Criterio de evaluaciÃ³n

- Probabilidad: `1` a `5`
- Impacto: `1` a `5`
- ExposiciÃ³n = `Probabilidad Ã— Impacto`
- Prioridad:
  - `1â€“4`: Bajo
  - `5â€“9`: Medio
  - `10â€“16`: Alto
  - `17â€“25`: CrÃ­tico

## Registro

| ID | CategorÃ­a | Riesgo | Causa | Consecuencia | Prob. | Impacto | ExposiciÃ³n | Prioridad | Estrategia | Respuesta aplicada | Responsable | Disparador | Estado final | Riesgo residual | Evidencia |
|---|---|---|---|---|---:|---:|---:|---|---|---|---|---|---|---|---|
| RSK-SEC-01 | Seguridad | Dependencias vulnerables en backend. | La auditorÃ­a `npm audit` del backend reporta 22 vulnerabilidades abiertas (`1 low`, `20 moderate`, `1 high`). | Riesgo de exposiciÃ³n tÃ©cnica y necesidad de actualizaciÃ³n controlada. | 3 | 4 | 12 | Alto | Mitigar | Analizar actualizaciones compatibles, priorizar la vulnerabilidad alta, ejecutar pruebas antes y despuÃ©s, y evitar actualizaciones forzadas. | [PENDIENTE: asignar responsable tÃ©cnico de dependencias backend] | RevisiÃ³n periÃ³dica de `npm audit` en backend | En tratamiento | Medio | [EV-SEC-02](./evidencias/calidad/EV-SEC-02-audit-backend.txt) |
| RSK-SEC-02 | Seguridad | Dependencias vulnerables en frontend. | La auditorÃ­a `npm audit` del frontend reporta 51 vulnerabilidades abiertas (`5 low`, `30 moderate`, `15 high`, `1 critical`). | Riesgo crÃ­tico sobre dependencias de build y ejecuciÃ³n del frontend. | 4 | 5 | 20 | CrÃ­tico | Mitigar | Revisar dependencias directas y transitivas, separar vulnerabilidades de desarrollo y producciÃ³n, migrar gradualmente desde dependencias obsoletas, y ejecutar pruebas y build tras cada cambio. | [PENDIENTE: asignar responsable tÃ©cnico de dependencias frontend] | RevisiÃ³n periÃ³dica de `npm audit` en frontend | En tratamiento | Alto | [EV-SEC-03](./evidencias/calidad/EV-SEC-03-audit-frontend.txt) |
| RSK-03 | Seguridad | Token SonarQube visible en `sonar-project.properties`. | Se almacenÃ³ un secreto en texto plano. | Riesgo de uso indebido del entorno de anÃ¡lisis. | 5 | 4 | 20 | CrÃ­tico | Evitar / corregir | Se documenta como hallazgo de cierre; requiere rotaciÃ³n inmediata. | [PENDIENTE: asignar responsable de seguridad o repositorio] | ExposiciÃ³n del repositorio | Abierto | CrÃ­tico | `smartsched-uc/sonar-project.properties`, `DEF-03` |
| RSK-04 | Calidad | Cobertura frontend insuficiente. | Solo existe una prueba de interfaz automatizada y la cobertura global es 43.87% de lÃ­neas. | Mayor probabilidad de regresiones de UX no detectadas. | 4 | 3 | 12 | Alto | Mitigar | Se documentÃ³ el gap y se recomienda ampliar pruebas por flujo. | [PENDIENTE: asignar responsable de pruebas frontend] | Cambios en `client/src/App.js` o nuevas vistas | Abierto | Medio | [EV-TEST-03](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt) |
| RSK-05 | Base de datos | Deriva entre esquema PostgreSQL y consultas del backend. | EvoluciÃ³n progresiva del modelo y del mapeo. | ActivaciÃ³n innecesaria del fallback o fallas parciales de lectura. | 3 | 4 | 12 | Alto | Mitigar | Se incorporÃ³ `inspect-schema.js` y mapeo centralizado. | [PENDIENTE: asignar responsable de modelo de datos] | Cambios de columnas o tablas | En control | Medio | `server/src/database/inspect-schema.js`, `academic-data.service.js` |
| RSK-06 | GestiÃ³n | Inconsistencia entre documentaciÃ³n raÃ­z y cÃ³digo actual. | Documentos histÃ³ricos no se actualizaron al ritmo del sistema. | Riesgo de evaluaciÃ³n acadÃ©mica confusa o contradictoria. | 5 | 3 | 15 | Alto | Mitigar | Se consolida la fase de cierre y se registran defectos e incidentes documentales. | [PENDIENTE: asignar responsable de documentaciÃ³n] | RevisiÃ³n documental final | En control | Medio | `INC-01`, `INC-02`, `DEF-01`, `DEF-02`, `DEF-05` |
| RSK-07 | Sostenibilidad | Ausencia de costos y cronograma reales trazables. | No se hallaron hojas de tiempo ni mÃ©tricas financieras reales. | No se puede cerrar con precisiÃ³n costo y cronograma. | 4 | 3 | 12 | Alto | Aceptar con plan | Se reemplazan montos no verificables por pendientes especÃ­ficos de carga manual. | [PENDIENTE: asignar responsable de cronograma y costos] | PreparaciÃ³n de informe final | Abierto | Medio | `01_informe_final_proyecto.md`, `16_presupuesto.md` |
| RSK-08 | UX / Calidad | Ausencia de auditorÃ­a formal WCAG. | No se encontrÃ³ reporte de accesibilidad. | Las afirmaciones de accesibilidad quedarÃ­an incompletas. | 3 | 3 | 9 | Medio | Mitigar | Se documentan evidencias bÃ¡sicas y se deja pendiente evaluaciÃ³n formal. | [PENDIENTE: asignar responsable de accesibilidad] | RevisiÃ³n de rÃºbrica | Abierto | Medio | `client/src/App.js`, `13_impacto_sostenibilidad.md` |
| RSK-09 | TÃ©cnico | `client/src/App.js` concentra demasiada lÃ³gica. | EvoluciÃ³n incremental del MVP en un solo componente. | Riesgo de mantenibilidad y defectos futuros. | 3 | 3 | 9 | Medio | Mitigar | Se documenta como deuda tÃ©cnica y recomendaciÃ³n de refactor futuro. | [PENDIENTE: asignar responsable de refactor frontend] | Nuevos cambios funcionales | Abierto | Medio | `client/src/App.js`, `12_control_configuracion_cambios.md` |

## Trazabilidad relacionada

- Riesgos â†’ incidentes: ver [`04_registro_incidentes.md`](./04_registro_incidentes.md)
- Riesgos â†’ defectos: ver [`06_registro_defectos.md`](./06_registro_defectos.md)
- Riesgos â†’ cambios: ver [`12_control_configuracion_cambios.md`](./12_control_configuracion_cambios.md)

## Evidencias relacionadas

- Vulnerabilidades y tratamiento: [`evidencias/calidad/EV-SEC-02-audit-backend.txt`](./evidencias/calidad/EV-SEC-02-audit-backend.txt), [`evidencias/calidad/EV-SEC-03-audit-frontend.txt`](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)
- SonarQube disponible sin credenciales de proyecto: [`evidencias/sonarqube/EV-SONAR-01-system-status.json`](./evidencias/sonarqube/EV-SONAR-01-system-status.json)

