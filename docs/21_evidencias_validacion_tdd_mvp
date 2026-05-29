                                                 Evidencias de validación, TDD y actualización del MVP - SmartSched-UC

 1. Objetivo

Este documento registra las evidencias de actualización del Producto Mínimo Viable (MVP), pruebas TDD, endpoints, mejoras funcionales y trazabilidad con la consigna de análisis y validación del problema.

 2. Actualizaciones aplicadas al MVP

| Área | Archivo | Mejora realizada | Relación con la consigna |
|---|---|---|---|
| Motor CSP | `server/src/services/scheduler.service.js` | Se refuerza la validación de solapamientos entre cursos, docente y aula. | Restricciones críticas y validación funcional. |
| Motor CSP | `server/src/services/scheduler.service.js` | Se agrega validación de créditos institucionales entre 20 y 25. | Requerimientos académicos. |
| Métricas | `server/src/services/scheduler.service.js` | Se agregan indicadores: cobertura, utilización de recursos, créditos totales y conflictos generados. | Indicadores clave de éxito. |
| Datos semilla | `server/src/data/academic.seed.js` | Se incorpora atributo `credits` a los cursos. | Coherencia entre matrícula y planificación académica. |
| GUI | `client/src/App.js` | Se visualizan créditos y métricas de cobertura. | Finalidad de la GUI y validación operativa. |
| Pruebas | `server/test/scheduler.test.js` | Se agregan pruebas de solapamiento entre cursos y rango de créditos. | Evidencia TDD. |
| Documentación | `docs/00_TOC.md` | Se sincroniza tabla de contenidos documental. | Gestión documental y repositorio. |
| Documentación | `docs/20_analisis_validacion_problema.md` | Se consolida análisis exigido por TP2. | Entregable principal de la consigna. |

 3. Endpoints del MVP

| Método | Endpoint | Función | Resultado esperado |
|---|---|---|---|
| GET | `/api/courses` | Lista cursos disponibles. | Arreglo de cursos con código, horas, créditos y docente. |
| GET | `/api/teachers` | Lista docentes y disponibilidad. | Arreglo de docentes con franjas disponibles. |
| GET | `/api/classrooms` | Lista aulas. | Arreglo de aulas con capacidad y tipo. |
| POST | `/api/schedules/generate` | Genera horario óptimo. | Horario válido, métricas y validación. |
| POST | `/api/schedules/validate` | Valida horario enviado. | Estado válido o lista de incidencias. |

 4. Casos de prueba TDD

| Caso | Descripción | Resultado esperado |
|---|---|---|
| TDD-01 | Detectar conflicto de docente y aula en horarios solapados. | `valid = false` y mensajes de conflicto. |
| TDD-02 | Generar asignación automática válida y repetible. | `valid = true` y misma salida ante misma entrada. |
| TDD-03 | Respetar disponibilidad docente, capacidad de aula y horas asignadas. | Cada curso cumple horas requeridas. |
| TDD-04 | Rechazar solapamientos entre cursos con diferente docente y aula. | `valid = false` por conflicto de estudiante. |
| TDD-05 | Validar rango institucional de créditos. | Rechazo si está fuera de 20 a 25 créditos. |
| TDD-06 | Exponer motor CSP por API. | `POST /api/schedules/generate` responde `201`. |

5. Evidencia técnica del resultado actual

Con el dataset semilla del MVP, el motor genera un horario válido con:

| Métrica | Valor esperado en MVP |
|---|---|
| Estado de validación | Válido |
| Conflictos generados | 0 |
| Cursos asignados | 5 |
| Cobertura de asignación | 1.00 |
| Créditos totales | 20 |
| Sesiones generadas | 9 |
| Eficiencia de aula | ≥ 0.90 en dataset semilla |
| Balance | ≥ 0.50 en dataset semilla |

 6. Comandos sugeridos para validación local

Desde la carpeta `smartsched-uc/server`:

```bash
npm install
npm test
npm start
```

Desde la carpeta `smartsched-uc/client`:

```bash
npm install
npm start
```

Validación manual del endpoint:

```bash
curl -X POST http://localhost:5000/api/schedules/generate \
  -H "Content-Type: application/json" \
  -d '{}'
```

 7. Commits semánticos sugeridos

```bash
git add docs/00_TOC.md docs/20_analisis_validacion_problema.md docs/21_evidencias_validacion_tdd_mvp.md
git commit -m "docs: add problem validation analysis and evidence"

git add smartsched-uc/server/src/services/scheduler.service.js smartsched-uc/server/src/data/academic.seed.js smartsched-uc/server/test/scheduler.test.js smartsched-uc/client/src/App.js
git commit -m "feat: strengthen schedule validation and optimization metrics"

git add README.md
git commit -m "docs: synchronize repository toc and tp2 deliverables"
```

 8. Checklist de cumplimiento TP2

| Requisito de la consigna | Estado | Evidencia |
|---|---|---|
| Validar requerimientos funcionales y no funcionales. | Cumplido | `docs/20_analisis_validacion_problema.md` |
| Identificar actores, restricciones y necesidades. | Cumplido | Secciones 4, 5, 6 y 7 del análisis. |
| Identificar proceso mayor de optimización. | Cumplido | Sección 3 del análisis. |
| Definir indicadores clave de éxito. | Cumplido | Sección 10 del análisis y métricas del MVP. |
| Justificar finalidad de la GUI. | Cumplido | Sección 13 del análisis y actualización de `App.js`. |
| Modelar problema con CSP. | Cumplido | `docs/10_modelado_csp.md` y sección 11 del análisis. |
| Actualizar MVP con MERN y TDD. | Cumplido | Código actualizado y pruebas. |
| Actualizar documentación sin eliminar información previa. | Cumplido | Nuevos documentos agregados y TOC sincronizado. |
| Mantener trazabilidad y commits descriptivos. | Cumplido parcialmente hasta subir a GitHub | Comandos de commit sugeridos. |
