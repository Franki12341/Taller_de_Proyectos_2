# Informe final del proyecto SmartSched-UC

## 1. Portada documental

| Campo | Valor |
|---|---|
| Proyecto | SmartSched-UC |
| Tipo de documento | Informe final de control y cierre |
| Curso | Taller de Proyectos 2 |
| Repositorio verificado | `Taller_de_Proyectos_2-git` |
| Aplicación evaluada | `smartsched-uc/` |
| Fecha de consolidación | 2026-06-26 |
| Responsable documental | Equipo SmartSched-UC |

## 2. Control de versiones del documento

| Versión | Fecha | Autor | Cambio |
|---|---|---|---|
| 1.0 | 2026-06-25 | Equipo SmartSched-UC | Consolidación inicial del cierre con evidencia verificable. |
| 1.1 | 2026-06-26 | Equipo SmartSched-UC | Corrección integral de codificación, actualización de evidencias y cierre documental. |

## 3. Resumen ejecutivo

SmartSched-UC es un proyecto académico orientado a la **simulación y generación óptima de horarios universitarios**. La solución utiliza un motor de búsqueda basado en **CSP/backtracking**, una interfaz web desarrollada con React, un backend Node.js/Express y PostgreSQL como fuente principal de datos, con un mecanismo de fallback local para mantener la continuidad de la demostración cuando la base de datos no está disponible.

La fase de cierre confirma una implementación funcional verificable para la selección de cursos, generación de horarios, control del máximo de 25 créditos, detección de conflictos, disponibilidad docente, bloques administrativos, aulas, aforo, ocupación, notificaciones, auditoría, paginación, caché, compresión HTTP y manejo de errores. Las pruebas automatizadas registran **12 de 12 casos aprobados**, mientras que el build de producción concluye correctamente.

El cierre también incorpora evidencia de pruebas, cobertura, auditoría de dependencias, funcionamiento de la aplicación, estado de la base de datos, gestión de configuración y análisis estático con SonarQube. Se reconocen como oportunidades de mejora la cobertura del frontend, la actualización controlada de dependencias vulnerables, la ampliación de la validación de accesibilidad y la consolidación futura de métricas reales de tiempo y costo.

## 4. Contexto y problema complejo de ingeniería

El problema abordado por SmartSched-UC es la **planificación académica universitaria con restricciones múltiples**: cursos, créditos, disponibilidad docente, bloques protegidos, aulas compatibles, aforo y compatibilidad de horario para estudiantes.  

De acuerdo con [`../../smartsched-uc/docs/SPEC.md`](../../smartsched-uc/docs/SPEC.md), el sistema modela la generación de horarios como un problema tipo CSP con restricciones duras y blandas, orientado a producir una asignación válida y explicable.

## 5. Objetivo general

Desarrollar una aplicación web que permita **simular y generar horarios académicos válidos y defendibles**, maximizando la carga académica hasta 25 créditos sin violar cruces, disponibilidad docente ni restricciones de aulas.

## 6. Objetivos específicos

1. Permitir la selección y simulación de cursos desde la interfaz web.
2. Generar horarios con lógica de validación académica en backend.
3. Preparar la solución para PostgreSQL manteniendo continuidad mediante fallback local.
4. Proveer métricas, advertencias, recomendaciones y trazabilidad en la web.
5. Sustentar la calidad mediante pruebas automatizadas y evidencia documental.

## 7. Interesados

| Interesado | Interés | Evidencia |
|---|---|---|
| Estudiantes | Generar una carga académica válida y comprensible. | [`../../smartsched-uc/client/src/App.js`](../../smartsched-uc/client/src/App.js) |
| Coordinación académica | Revisar carga docente, uso de aulas, conflictos y auditoría. | [`../../smartsched-uc/client/src/App.js`](../../smartsched-uc/client/src/App.js) |
| Docente evaluador / curso | Verificar trazabilidad, calidad y coherencia técnica. | [`./11_matriz_trazabilidad.md`](./11_matriz_trazabilidad.md) |
| Equipo del proyecto | Consolidar una base mantenible y defendible. | [`./12_control_configuracion_cambios.md`](./12_control_configuracion_cambios.md) |

## 8. Arquitectura

### 8.1 Arquitectura verificada en código

- **Frontend**: React (`smartsched-uc/client`)
- **Backend**: Node.js + Express (`smartsched-uc/server`)
- **Base de datos**: PostgreSQL con `pg`
- **Fallback**: dataset local estructurado
- **Motor de horarios**: `scheduler.service.js` con heurísticas CSP/backtracking

### 8.2 Evolución y consistencia documental

Durante el desarrollo se detectaron referencias históricas a FastAPI, MERN y MongoDB que no correspondían a la arquitectura vigente. En la fase de cierre se actualizaron los documentos principales para reflejar correctamente la solución basada en React, Node.js, Express y PostgreSQL.

También se corrigieron errores de codificación UTF-8 y enlaces documentales. Los incidentes asociados y sus acciones correctivas se registran en [`04_registro_incidentes.md`](./04_registro_incidentes.md) y [`06_registro_defectos.md`](./06_registro_defectos.md).

## 9. Tecnologías

| Componente | Evidencia verificada | Estado |
|---|---|---|
| React | `smartsched-uc/client/package.json` | Verificado |
| Node.js | `smartsched-uc/server/package.json` | Verificado |
| Express | `smartsched-uc/server/package.json` | Verificado |
| PostgreSQL (`pg`) | `smartsched-uc/server/package.json`, `server/src/config/db.js` | Verificado |
| Jest / Supertest | `smartsched-uc/server/package.json`, `server/test/scheduler.test.js` | Verificado |
| React Testing Library | `smartsched-uc/client/package.json`, `client/src/App.test.js` | Verificado |
| SonarQube | `smartsched-uc/sonar-project.properties`, `evidencias/sonarqube/` | Verificado |
| Husky / Commitlint | repo raíz `package.json`, `.husky/`, `commitlint.config.cjs` | Verificado |

## 10. Metodología adaptativa

El proyecto se desarrolló mediante un enfoque adaptativo e incremental. El backlog, los documentos de análisis, las pruebas, las modificaciones del scheduler, la integración con PostgreSQL, el rediseño de interfaz y las evidencias de cierre muestran ciclos sucesivos de construcción, validación y mejora.

El repositorio conserva trazabilidad técnica mediante commits, ramas, registros de cambios y evidencias. No se dispone de un cronograma consolidado con fechas reales para cada sprint; por ello, el desempeño temporal se declara únicamente hasta el nivel sustentado por la documentación disponible, sin inventar desviaciones.

## 11. Alcance planificado

Según `docs/03_project_charter.md` y `docs/05_requerimientos.md`, el alcance inicial incluía:

- generación automática de horarios,
- validación de créditos,
- interfaz web,
- validación académica,
- restricciones duras y blandas.

No se encontró evidencia verificable de integración institucional real ni despliegue productivo, y ambos puntos permanecen fuera del alcance.

## 12. Alcance ejecutado

### Funcionalidades verificadas en código

| ID | Requisito | Verificación |
|---|---|---|
| RF-01 | Selección de cursos | `client/src/App.js` |
| RF-02 | Generación de horario | `server/src/services/scheduler.service.js` |
| RF-03 | Límite máximo de 25 créditos | `client/src/App.js`, `server/src/services/scheduler.service.js`, `server/test/scheduler.test.js` |
| RF-04 | Detección de cruces | `scheduler.service.js`, `scheduler.test.js` |
| RF-05 | Validación docente | `scheduler.service.js` |
| RF-06 | Respeto de carga administrativa / bloques protegidos | `scheduler.service.js` |
| RF-07 | Validación de aulas, aforo y ocupación | `scheduler.service.js`, `client/src/App.js` |
| RF-08 | PostgreSQL con fallback local | `server/src/config/db.js`, `academic-data.service.js` |
| RF-09 | Auditoría y notificaciones | `client/src/App.js`, `/api/audit/logs` |
| RF-10 | Modo demostración / coordinación | `client/src/App.js` |

## 13. Comparación plan versus ejecución

| Elemento | Planificado | Ejecutado | Estado | Evidencia |
|---|---|---|---|---|
| Horarios automáticos | Sí | Sí | Completado | `RF-02`, `PRB-01` |
| Validación de créditos | Sí | Sí, actualizado a 25 máximos | Completado | `RF-03`, `PRB-06` |
| Prerrequisitos | Sí, documentado | No verificado en código actual | En validación | `docs/05_requerimientos.md` |
| Interfaz web | Sí | Sí | Completado | `client/src/App.js` |
| PostgreSQL | No claro en docs iniciales | Sí, con fallback | Completado | `server/src/config/db.js` |
| SonarQube con resultados | Sí | Análisis ejecutado y evidencias exportadas | Completado | `EV-SONAR-01` a `EV-SONAR-09` |

## 14. Desempeño del cronograma

| Indicador | Resultado de cierre |
|---|---|
| Iteraciones históricas documentadas | 5 sprints mencionados en `docs/16_presupuesto.md` |
| Duración planificada de referencia | 10 semanas según documentación histórica |
| Fechas reales por sprint | No consolidadas en un único registro fechado |
| Desviación cuantitativa | No calculable con la evidencia temporal disponible |
| Evaluación final | El cumplimiento se valida por alcance, pruebas, evidencias y entregables versionados |

La ausencia de un cronograma real consolidado se reconoce como una limitación documental. Para evitar información no sustentada, no se asigna un porcentaje de desviación. Como mejora para futuros proyectos, cada iteración deberá registrar fecha planificada, fecha real, responsable, entregable y causa de cualquier variación.

## 15. Desempeño de costos

### 15.1 Evaluación del costo del ciclo de vida

El proyecto se desarrolló en un contexto académico y no dispone de hojas de tiempo, comprobantes ni tarifas aprobadas que permitan calcular un costo monetario real del trabajo. Por responsabilidad documental, no se presentan montos estimados como si fueran costos ejecutados.

| Componente | Resultado de cierre | Estado |
|---|---|---|
| Trabajo del equipo | No monetizado; no existen horas valorizadas y aprobadas | No cuantificado |
| Licencias de desarrollo | React, Node.js, Express, PostgreSQL, Git, Jest y SonarQube Community se utilizaron sin costo directo de licencia | Verificado |
| Infraestructura | Ejecución local en equipos de desarrollo; consumo energético no medido | No cuantificado |
| Servicios externos | No se acreditó contratación de servicios de pago | Sin costo acreditado |
| Costos indirectos | Conectividad, energía y soporte no fueron registrados contablemente | No cuantificado |
| Ahorro por herramientas gratuitas | Existe ahorro cualitativo por uso de software libre y herramientas comunitarias, pero no se monetiza por falta de una base comparativa aprobada | Documentado |

Para una futura implementación institucional se recomienda considerar análisis, diseño, desarrollo, pruebas, despliegue, infraestructura, soporte, mantenimiento, actualizaciones de seguridad, capacitación y retiro del sistema como componentes del costo total del ciclo de vida.

## 16. Desempeño de calidad

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
| Cobertura backend por líneas | 79.77% | Verificado | `EV-TEST-02` |
| Cobertura frontend por líneas | 43.87% | Requiere mejora | `EV-TEST-03` |
| Cobertura scheduler por líneas | 91.30% | Alto | `EV-TEST-02` |
| Build de producción | Compilado correctamente | Aprobado | `EV-TEST-04` |
| Vulnerabilidades raíz | 0 | Verificado | `EV-SEC-01` |
| Vulnerabilidades backend | 22 | En tratamiento | `EV-SEC-02` |
| Vulnerabilidades frontend | 51 | Prioridad crítica | `EV-SEC-03` |

## 17. Pruebas

| PRB | Descripción | Resultado | Evidencia |
|---|---|---|---|
| PRB-01 | Detección de conflictos de docente, aula y estudiante | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-02 | Generación automática válida y repetible | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-03 | Límite máximo de 25 créditos y optimización hacia el objetivo | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-04 | Selección exacta de 25 créditos cuando existe combinación válida | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-05 | Disponibilidad docente, capacidad de aula y horas asignadas | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-06 | Detección de aula sobreocupada | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-07 | Rechazo de aulas en mantenimiento o inactivas | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-08 | Recomendaciones cuando faltan créditos | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-09 | `POST /api/schedules/generate` expone el motor por API | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-10 | `GET /api/courses` devuelve paginación simulada | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-11 | `GET /api/health` reporta fallback cuando PostgreSQL no está disponible | Aprobada | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-12 | Renderizado del tablero compacto de matrícula | Aprobada | `EV-TEST-01`, `EV-TEST-03`, `EV-TEST-04` |

## 18. SonarQube

El análisis estático fue ejecutado sobre el proyecto `smartsched-uc` y sus resultados se almacenaron dentro de la carpeta de evidencias. Las métricas exportadas constituyen la fuente verificable; el informe evita duplicar valores que puedan cambiar en un análisis posterior.

| Elemento | Estado | Evidencia |
|---|---|---|
| Configuración del proyecto | Verificada | `smartsched-uc/sonar-project.properties` |
| Estado del servidor | Exportado | [`EV-SONAR-01-system-status.json`](./evidencias/sonarqube/EV-SONAR-01-system-status.json) |
| Métricas del proyecto | Exportadas en JSON y CSV | `EV-SONAR-02`, `EV-SONAR-03` |
| Resumen interpretado | Completado | [`EV-SONAR-04-resumen.md`](./evidencias/sonarqube/EV-SONAR-04-resumen.md) |
| Issues | Exportados | `EV-SONAR-05` |
| Security Hotspots | Exportados | `EV-SONAR-06` |
| Actividad de análisis | Exportada | `EV-SONAR-07` |
| Reporte visual | Generado | `EV-SONAR-08` |
| Ejecución del scanner | Registrada | `EV-SONAR-09` |

La interpretación de SonarQube se limita al código, reglas, perfiles y alcance analizados. Un valor de cero en una métrica no demuestra ausencia absoluta de errores o vulnerabilidades.

## 19. OWASP y seguridad de dependencias

| Elemento | Resultado verificado | Estado |
|---|---|---|
| Auditoría de dependencias en la raíz | 0 vulnerabilidades | Verificado mediante `EV-SEC-01` |
| Auditoría de dependencias backend | 22 vulnerabilidades: 1 baja, 20 moderadas y 1 alta | En tratamiento mediante `EV-SEC-02` |
| Auditoría de dependencias frontend | 51 vulnerabilidades: 5 bajas, 30 moderadas, 15 altas y 1 crítica | Prioridad alta mediante `EV-SEC-03` |
| Gestión de secretos | Los tokens y contraseñas deben administrarse mediante variables de entorno y no versionarse | Control obligatorio |
| Actualización de dependencias | Debe realizarse de forma gradual, con pruebas y sin usar `npm audit fix --force` como solución automática | Planificada |

### 19.1 Métricas complementarias de SonarQube

| Indicador | Resultado de cierre | Evidencia |
|---|---|---|
| Code smells | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Bugs | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Vulnerabilidades SonarQube | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Security Hotspots | Detalle exportado para revisión | `EV-SONAR-06` |
| Deuda técnica | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Quality Gate | Estado registrado en las métricas exportadas | `EV-SONAR-02`, `EV-SONAR-04` |

El análisis de dependencias y SonarQube son controles complementarios. Ninguno, por sí solo, permite afirmar que el sistema es totalmente seguro.

## 20. Accesibilidad y WCAG

| Evidencia | Resultado |
|---|---|
| Etiquetas `aria-label` en búsqueda, filtros, navegación y pestañas | Verificado en `client/src/App.js` |
| Interfaz compacta y mensajes de estado | Verificados en las evidencias de aplicación |
| Navegación por teclado | Considerada en el diseño; requiere continuar ampliando pruebas automáticas |
| Auditoría externa o certificación WCAG | No realizada; no forma parte del alcance acreditado |

Estado global: **implementación parcial verificada y mejora continua requerida**. El proyecto incorpora elementos de accesibilidad, pero no declara conformidad total con WCAG sin una auditoría completa.

## 21. Green Software

| Medida | Estado | Evidencia |
|---|---|---|
| Compresión HTTP | Implementado | `server/src/app.js` |
| Caché simple en GET | Implementado | `server/src/middlewares/simpleCache.middleware.js` |
| Paginación | Implementado | `academic-data.service.js` |
| JSON limitado a 100kb | Implementado | `server/src/app.js` |
| Índices SQL | Implementado | `server/src/database/smartsched_uc.sql` |
| Fallback local para continuidad | Implementado | `server/src/config/db.js` |

## 22. Incidentes

Los incidentes se detallan en [`04_registro_incidentes.md`](./04_registro_incidentes.md). Durante el desarrollo y cierre se gestionaron, entre otros:

- diferencias entre la documentación histórica y la arquitectura implementada;
- enlaces documentales incompletos o desactualizados;
- errores de codificación UTF-8 en archivos Markdown;
- dificultades de configuración de Git, Husky y los hooks locales;
- incompatibilidad inicial entre la versión de Java y SonarQube;
- ajustes necesarios para integrar PostgreSQL y mantener un fallback controlado.

Las correcciones documentales, técnicas y de configuración quedaron registradas mediante archivos de evidencia, historial de Git y documentos de control de cambios.

## 23. Riesgos

Los riesgos se encuentran consolidados en [`03_registro_riesgos.md`](./03_registro_riesgos.md). Los principales riesgos residuales son:

- vulnerabilidades presentes en dependencias del backend y frontend;
- cobertura frontend inferior a la cobertura alcanzada por el motor de horarios;
- dependencia del fallback cuando PostgreSQL no se encuentra disponible;
- ausencia de métricas monetarias y temporales completas;
- necesidad de continuar validando accesibilidad, seguridad y mantenibilidad en cada versión.

Cada riesgo debe mantenerse vinculado con su respuesta, responsable, evidencia, estado y riesgo residual.

## 24. Cambios

| CAM | Descripción | Estado | Commit |
|---|---|---|---|
| CAM-01 | Primer funcionamiento del sistema | Verificado | `22f812b` |
| CAM-02 | Constitución documental del proyecto | Verificado | `ec192f3` |
| CAM-03 | Evidencias de validación y TDD | Verificado | `c101868` |
| CAM-04 | Infraestructura de calidad, Husky y Sonar | Verificado | `3804bdd` |
| CAM-05 | Ajustes de PostgreSQL, fallback, scheduler y vistas demostrativas | Verificado | Trazabilidad consolidada en `EV-GEST-02`, `EV-GEST-05` y `EV-GIT-01` |

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
| Generación automática de horarios | Verificado | `PRB-02`, `PRB-09`, `EV-TEST-01`, `EV-APP-04` |
| Límite y optimización hasta 25 créditos | Verificado | `PRB-03`, `PRB-04`, `EV-APP-05` |
| Detección de conflictos | Verificado | `PRB-01`, `EV-APP-06` |
| Validación de aulas, capacidad y mantenimiento | Verificado | `PRB-05`, `PRB-06`, `PRB-07`, `EV-APP-07` |
| PostgreSQL y mecanismo de fallback | Verificado según estado de ejecución | `PRB-11`, `EV-DB-01`, `EV-DB-05`, `EV-DB-06` cuando corresponda |
| Notificaciones y mensajes de estado | Verificado | `EV-APP-08` |
| Resumen de matrícula simulada | Verificado | `EV-APP-09` |
| Modo de demostración con datos sintéticos | Verificado y diferenciado | `EV-APP-10` |
| Pruebas y build de producción | Verificado | `EV-TEST-01` a `EV-TEST-04` |
| Análisis estático SonarQube | Verificado | `EV-SONAR-01` a `EV-SONAR-09` |

## 26. Limitaciones

- El proyecto es un MVP académico y no constituye una integración productiva con los sistemas institucionales de matrícula.
- La cobertura del frontend es menor que la del backend y requiere ampliar pruebas de interacción, errores y navegación.
- Las auditorías de dependencias muestran vulnerabilidades pendientes de actualización controlada.
- No existe evidencia suficiente para cuantificar con precisión la desviación del cronograma ni el costo monetario real.
- La revisión de accesibilidad es parcial y no equivale a una certificación de conformidad WCAG.
- El fallback permite continuidad demostrativa, pero no sustituye la disponibilidad y respaldo de PostgreSQL en un despliegue institucional.

## 27. Riesgos residuales

1. Dependencias con vulnerabilidades pendientes en backend y frontend (`EV-SEC-02`, `EV-SEC-03`).
2. Cobertura frontend insuficiente para validar todos los estados de interacción y error.
3. Posible degradación funcional cuando PostgreSQL no está disponible y se activa el fallback.
4. Riesgo de regresión si se actualizan dependencias sin ejecutar pruebas y build.
5. Necesidad de reforzar accesibilidad, protección de secretos y monitoreo en una futura versión productiva.

## 28. Conclusiones estratégicas

1. SmartSched-UC cumple con el propósito académico de demostrar una solución web para la generación de horarios bajo múltiples restricciones.
2. El motor de horarios constituye la principal fortaleza técnica: su cobertura por líneas alcanza 91.30% y las pruebas verifican conflictos, créditos, docentes y aulas.
3. La arquitectura React, Node.js, Express y PostgreSQL permite separar responsabilidades y facilita evolución, pruebas y mantenimiento.
4. El mecanismo de fallback mejora la resiliencia de la demostración, siempre que se identifique claramente cuándo se usan datos sintéticos.
5. La incorporación de Git, evidencias automatizadas, auditorías, SonarQube y documentos de cierre mejora la trazabilidad y el control de configuración.
6. El proyecto no debe considerarse cerrado desde la perspectiva de seguridad evolutiva: las dependencias vulnerables y la cobertura frontend requieren un plan de mejora posterior.
7. La documentación final ofrece una base histórica reutilizable para transferencia de conocimiento, mantenimiento y futuras iteraciones.

## 29. Recomendaciones

1. Mantener tokens, contraseñas y variables sensibles fuera del repositorio mediante variables de entorno y rotar cualquier credencial que haya sido expuesta durante el desarrollo.
2. Priorizar la vulnerabilidad crítica del frontend y la vulnerabilidad alta del backend mediante actualizaciones compatibles, pruebas de regresión y un nuevo `npm audit`.
3. Incrementar la cobertura frontend con pruebas de selección, generación, conflictos, notificaciones, fallback y manejo de errores.
4. Ejecutar SonarQube en cada entrega relevante y conservar las métricas exportadas para comparar tendencias.
5. Incorporar pruebas automáticas de accesibilidad y una revisión manual sistemática basada en WCAG.
6. Registrar cronograma, horas y costos desde el inicio de futuras iteraciones para medir desviaciones con datos reales.
7. Mantener sincronizados README, arquitectura, especificación, matriz de trazabilidad y evidencia con cada cambio funcional.
8. Para un despliegue institucional, implementar autenticación, autorización por roles, gestión formal de secretos, copias de seguridad, monitoreo y alta disponibilidad de PostgreSQL.

## 30. Referencias a evidencias

- Manifiesto general: [`./evidencias/00_manifiesto_evidencias.md`](./evidencias/00_manifiesto_evidencias.md)
- Validación de evidencias: [`./evidencias/99_validacion_evidencias.md`](./evidencias/99_validacion_evidencias.md)
- Aplicación: [`./evidencias/aplicacion/README.md`](./evidencias/aplicacion/README.md)
- Base de datos: [`./evidencias/base-datos/README.md`](./evidencias/base-datos/README.md)
- Gestión: [`./evidencias/gestion/README.md`](./evidencias/gestion/README.md)
- SonarQube: [`./evidencias/sonarqube/README.md`](./evidencias/sonarqube/README.md)
- Pruebas: `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03`, `EV-TEST-04`
- Seguridad: `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`
- Git: `EV-GIT-01`, `EV-GIT-02`, `EV-GIT-03`, `EV-GIT-04`

## 31. Requerimientos planificados y ejecutados

La documentación inicial formalizó un conjunto reducido de requerimientos, mientras que la implementación final incorporó capacidades adicionales. Para evitar un porcentaje engañoso, el cierre adopta como fuente definitiva la [`11_matriz_trazabilidad.md`](./11_matriz_trazabilidad.md), donde cada requisito se vincula con diseño, código, prueba, evidencia, riesgo, cambio y estado.

| Grupo | Evaluación de cierre |
|---|---|
| Requerimientos funcionales iniciales | Cubiertos de forma total o parcial por la implementación y las pruebas |
| Requerimientos funcionales ampliados | Selección, generación, 25 créditos, conflictos, docentes, aulas, PostgreSQL/fallback, notificaciones, auditoría y modo demostración |
| Requerimientos no funcionales | Calidad, seguridad, accesibilidad, sostenibilidad, mantenibilidad y trazabilidad documentados con diferentes niveles de cumplimiento |
| Fuente de verificación | `11_matriz_trazabilidad.md`, pruebas automatizadas y manifiesto de evidencias |

El cumplimiento debe interpretarse por requisito y evidencia, no únicamente mediante un porcentaje agregado. Los elementos que requieren mejora permanecen identificados como riesgos residuales y recomendaciones, sin ocultar sus limitaciones.

## 32. Evidencias automatizadas adicionales

- Flujo funcional y tablero compacto: [`evidencias/aplicacion/EV-APP-01-pantalla-principal.md`](./evidencias/aplicacion/EV-APP-01-pantalla-principal.md), [`evidencias/aplicacion/EV-APP-04-horario-generado.md`](./evidencias/aplicacion/EV-APP-04-horario-generado.md)
- Estado de base de datos y salud de API: [`evidencias/base-datos/EV-DB-01-api-health.md`](./evidencias/base-datos/EV-DB-01-api-health.md), [`evidencias/base-datos/EV-DB-05-integridad-datos.md`](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
- Gestión y control de configuración: [`evidencias/gestion/EV-GEST-02-historial-commits.md`](./evidencias/gestion/EV-GEST-02-historial-commits.md), [`evidencias/gestion/EV-GEST-08-control-cambios.md`](./evidencias/gestion/EV-GEST-08-control-cambios.md)
- SonarQube y estado del servicio: [`evidencias/sonarqube/EV-SONAR-01-system-status.json`](./evidencias/sonarqube/EV-SONAR-01-system-status.json), [`evidencias/sonarqube/EV-SONAR-04-resumen.md`](./evidencias/sonarqube/EV-SONAR-04-resumen.md)



## 33. Declaración de cierre

Con la documentación, el código, las pruebas y las evidencias disponibles, SmartSched-UC se declara **cerrado para fines académicos de la iteración evaluada**. El producto permanece disponible para mantenimiento evolutivo, corrección de vulnerabilidades, ampliación de pruebas y futuras integraciones institucionales.
