# Informe final del proyecto SmartSched-UC

## 1. Portada documental

| Campo                  | Valor                             |
| ---------------------- | --------------------------------- |
| Proyecto               | SmartSched-UC                     |
| Tipo de documento      | Informe final de control y cierre |
| Curso                  | Taller de Proyectos 2             |
| Repositorio verificado | `Taller_de_Proyectos_2-git`       |
| Aplicación evaluada    | `smartsched-uc/`                  |
| Fecha de consolidación | 2026-06-26                        |
| Responsable documental | Equipo SmartSched-UC              |

## 2. Control de versiones del documento

| Versión | Fecha      | Autor                | Cambio                                                                                                                 |
| ------- | ---------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-06-25 | Equipo SmartSched-UC | Consolidación inicial del cierre con evidencia verificable.                                                            |
| 1.1     | 2026-06-26 | Equipo SmartSched-UC | Corrección integral de codificación, actualización de evidencias y cierre documental.                                  |
| 1.2     | 2026-06-27 | Equipo SmartSched-UC | Fortalecimiento del análisis de alcance, cronograma, costos, calidad, riesgos, resultados y conclusiones estratégicas. |

## 3. Resumen ejecutivo

SmartSched-UC es un proyecto académico orientado a la **simulación y generación optimizada de horarios universitarios**. La solución utiliza un motor de búsqueda basado en **CSP y backtracking**, una interfaz web desarrollada con React, un backend implementado con Node.js y Express, y PostgreSQL como fuente principal de datos. También incorpora un mecanismo de fallback local para mantener la continuidad de la demostración cuando la base de datos no se encuentra disponible.

El problema abordado corresponde a la planificación académica universitaria bajo restricciones múltiples, debido a que una propuesta de horario debe considerar simultáneamente los cursos seleccionados, la cantidad de créditos, los cruces entre asignaturas, la disponibilidad docente, los bloques administrativos, las aulas disponibles, su capacidad, su estado operativo y la cantidad estimada de estudiantes.

La fase de cierre confirma una implementación funcional verificable para:

* selección y búsqueda de cursos;
* simulación de matrícula;
* generación automática de horarios;
* control del máximo de 25 créditos;
* detección de conflictos de estudiantes;
* detección de conflictos docentes;
* detección de conflictos de aulas;
* validación de disponibilidad docente;
* respeto de bloques administrativos o protegidos;
* validación de aulas, aforo y ocupación;
* exclusión de aulas inactivas o en mantenimiento;
* recomendaciones académicas;
* notificaciones y mensajes de estado;
* auditoría básica;
* paginación;
* caché;
* compresión HTTP;
* manejo de errores;
* integración con PostgreSQL;
* continuidad mediante fallback local;
* modo de demostración.

Las pruebas automatizadas registran **12 de 12 casos aprobados**, distribuidos en 11 pruebas del backend y una prueba del frontend. La cobertura del backend alcanza 79.77 % de líneas, mientras que el componente central `scheduler.service.js` alcanza 91.30 %. La cobertura del frontend es de 43.87 % de líneas, por lo que se mantiene como una oportunidad de mejora. El build de producción concluye correctamente.

El cierre incorpora evidencia de pruebas, cobertura, auditoría de dependencias, funcionamiento de la aplicación, estado de la base de datos, gestión de configuración, control de versiones y análisis estático con SonarQube.

Como parte del análisis de desempeño se realizó una reconstrucción retrospectiva del esfuerzo del equipo. Se estima una ejecución de aproximadamente **14 semanas y 266 horas acumuladas**, considerando planificación, diseño, desarrollo, integración, pruebas, calidad, documentación y cierre.

El costo académico valorizado del MVP se estima en aproximadamente **S/ 5,400.00**. Este monto considera el trabajo técnico del equipo, conectividad, energía, uso parcial de equipos y reprocesos. No representa una cotización empresarial, una factura ni un costo contable certificado. Se utiliza como una aproximación razonable del esfuerzo realmente requerido para desarrollar el proyecto en un contexto universitario.

Las principales oportunidades de mejora se relacionan con:

* cobertura automatizada del frontend;
* actualización controlada de dependencias vulnerables;
* ampliación de la validación de accesibilidad;
* modularización de `client/src/App.js`;
* registro formal de horas y costos desde el inicio;
* ejecución futura de pruebas con usuarios reales;
* fortalecimiento de seguridad, despliegue y monitoreo para un posible uso institucional.

## 4. Contexto y problema complejo de ingeniería

El problema abordado por SmartSched-UC es la **planificación académica universitaria con restricciones múltiples**, entre ellas:

* cursos;
* créditos;
* disponibilidad docente;
* carga académica;
* bloques protegidos;
* aulas compatibles;
* aforo;
* ocupación;
* mantenimiento;
* cruces de horarios;
* compatibilidad con actividades de trabajo o prácticas;
* disponibilidad de infraestructura.

De acuerdo con [`../../smartsched-uc/docs/SPEC.md`](../../smartsched-uc/docs/SPEC.md), el sistema modela la generación de horarios como un problema tipo CSP con restricciones duras y blandas, orientado a producir una asignación válida, comprensible y explicable.

### 4.1 Restricciones duras

Las restricciones duras son condiciones que no deben incumplirse:

* un estudiante no puede tener dos cursos en el mismo horario;
* un docente no puede dictar dos clases simultáneamente;
* una misma aula no puede ser utilizada por dos actividades en el mismo bloque;
* la capacidad del aula debe ser suficiente;
* un aula inactiva o en mantenimiento no debe ser asignada;
* la disponibilidad docente debe respetarse;
* los bloques administrativos protegidos no deben ser ocupados;
* la carga académica no debe superar los 25 créditos.

### 4.2 Restricciones blandas

Las restricciones blandas permiten mejorar la calidad del resultado:

* disminuir tiempos muertos;
* distribuir mejor la carga durante la semana;
* aproximarse al objetivo de créditos;
* reducir desplazamientos innecesarios;
* evitar horarios excesivamente fragmentados;
* mejorar el uso de aulas;
* generar recomendaciones cuando la carga no alcanza el objetivo.

### 4.3 Complejidad del problema

El problema se considera complejo porque el número de combinaciones crece al aumentar los cursos, docentes, aulas y bloques disponibles. Cada combinación debe evaluarse frente a varias restricciones.

El sistema no se limita a mostrar un listado. Debe analizar las combinaciones, descartar las que incumplen reglas y elegir una opción válida que aproxime la carga académica a los 25 créditos.

## 5. Objetivo general

Desarrollar una aplicación web que permita **simular y generar horarios académicos válidos, trazables y defendibles**, maximizando la carga académica hasta 25 créditos sin violar cruces, disponibilidad docente, capacidad de aulas ni restricciones operativas.

## 6. Objetivos específicos

1. Permitir la selección y simulación de cursos desde la interfaz web.
2. Generar horarios mediante lógica de validación académica en el backend.
3. Controlar que la carga académica no supere los 25 créditos.
4. Detectar conflictos de estudiantes, docentes y aulas.
5. Validar disponibilidad docente y bloques protegidos.
6. Validar capacidad, ocupación, estado y mantenimiento de aulas.
7. Preparar la solución para PostgreSQL manteniendo continuidad mediante fallback local.
8. Proporcionar métricas, advertencias, recomendaciones y trazabilidad.
9. Mantener un modo de demostración claramente diferenciado.
10. Sustentar la calidad mediante pruebas automatizadas y evidencia documental.
11. Generar reportes de cobertura del backend, scheduler y frontend.
12. Ejecutar auditorías de dependencias.
13. Integrar análisis estático con SonarQube.
14. Mantener control de configuración mediante Git, ramas, commits y registros de cambios.
15. Consolidar la documentación necesaria para la fase de control y cierre.

## 7. Interesados

| Interesado                   | Interés                                                                                | Evidencia                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Estudiantes                  | Generar una carga académica válida, comprensible y compatible con su disponibilidad.   | [`../../smartsched-uc/client/src/App.js`](../../smartsched-uc/client/src/App.js) |
| Coordinación académica       | Revisar carga docente, uso de aulas, conflictos, ocupación, restricciones y auditoría. | [`../../smartsched-uc/client/src/App.js`](../../smartsched-uc/client/src/App.js) |
| Docente evaluador / curso    | Verificar trazabilidad, calidad, cumplimiento académico y coherencia técnica.          | [`./11_matriz_trazabilidad.md`](./11_matriz_trazabilidad.md)                     |
| Equipo del proyecto          | Consolidar una base mantenible, verificable y defendible.                              | [`./12_control_configuracion_cambios.md`](./12_control_configuracion_cambios.md) |
| Responsable de frontend      | Mantener la interfaz, navegación, mensajes, selección y visualización de resultados.   | `smartsched-uc/client/`                                                          |
| Responsable de backend       | Mantener endpoints, reglas académicas, motor de horarios y manejo de errores.          | `smartsched-uc/server/`                                                          |
| Responsable de base de datos | Mantener conexión, esquema, scripts, integridad y fallback.                            | `server/src/config/db.js`, `server/src/database/`                                |
| Responsable de calidad       | Ejecutar pruebas, cobertura, build, auditorías y SonarQube.                            | `evidencias/pruebas/`, `evidencias/calidad/`, `evidencias/sonarqube/`            |
| Responsable documental       | Mantener informes, registros, trazabilidad y evidencias.                               | `docs/cierre/`                                                                   |

## 8. Arquitectura

### 8.1 Arquitectura verificada en código

* **Frontend:** React (`smartsched-uc/client`)
* **Backend:** Node.js y Express (`smartsched-uc/server`)
* **Base de datos:** PostgreSQL mediante `pg`
* **Fallback:** dataset local estructurado
* **Motor de horarios:** `scheduler.service.js` con CSP, heurísticas y backtracking
* **Pruebas backend:** Jest y Supertest
* **Pruebas frontend:** Jest y React Testing Library
* **Calidad:** cobertura, auditorías y SonarQube
* **Versionamiento:** Git y GitHub

### 8.2 Componentes principales

#### Frontend

El frontend permite:

* consultar cursos;
* buscar por nombre o código;
* filtrar información;
* seleccionar cursos;
* visualizar créditos;
* generar horarios;
* revisar conflictos;
* interpretar alertas;
* visualizar recomendaciones;
* revisar el resumen de matrícula;
* utilizar el modo de demostración.

#### Backend

El backend proporciona:

* endpoints REST;
* consulta de cursos;
* generación de horarios;
* servicio de datos académicos;
* validación de reglas;
* paginación;
* caché;
* compresión;
* manejo de errores;
* endpoint de salud;
* soporte para PostgreSQL;
* fallback local.

#### PostgreSQL

PostgreSQL permite:

* persistencia estructurada;
* relaciones entre entidades;
* consultas académicas;
* índices para consultas frecuentes;
* separación entre configuración, scripts y datos.

#### Fallback local

El fallback local mantiene disponibles los principales flujos cuando PostgreSQL no se encuentra operativo. Este mecanismo se utiliza con fines de continuidad y demostración, pero no sustituye una base institucional productiva.

#### Motor CSP/backtracking

El motor evalúa combinaciones de cursos y horarios, descartando aquellas que incumplen restricciones. La cobertura alcanzada por el scheduler permite sustentar que las reglas principales fueron evaluadas mediante pruebas.

### 8.3 Evolución y consistencia documental

Durante el desarrollo se detectaron referencias históricas a FastAPI, MERN y MongoDB que no correspondían a la arquitectura vigente.

En la fase de cierre se actualizaron los documentos principales para reflejar correctamente la solución basada en:

* React;
* Node.js;
* Express;
* PostgreSQL;
* fallback local;
* CSP/backtracking.

También se corrigieron errores de codificación UTF-8, enlaces documentales y descripciones técnicas.

Los incidentes y defectos relacionados se encuentran en:

* [`04_registro_incidentes.md`](./04_registro_incidentes.md)
* [`06_registro_defectos.md`](./06_registro_defectos.md)

## 9. Tecnologías

| Componente            | Evidencia verificada                                           | Estado      |
| --------------------- | -------------------------------------------------------------- | ----------- |
| React                 | `smartsched-uc/client/package.json`                            | Verificado  |
| Node.js               | `smartsched-uc/server/package.json`                            | Verificado  |
| Express               | `smartsched-uc/server/package.json`                            | Verificado  |
| PostgreSQL (`pg`)     | `smartsched-uc/server/package.json`, `server/src/config/db.js` | Verificado  |
| Jest                  | `server/package.json`, `client/package.json`                   | Verificado  |
| Supertest             | `server/package.json`, `server/test/scheduler.test.js`         | Verificado  |
| React Testing Library | `client/package.json`, `client/src/App.test.js`                | Verificado  |
| SonarQube             | `sonar-project.properties`, `evidencias/sonarqube/`            | Verificado  |
| Husky                 | `.husky/`                                                      | Configurado |
| Commitlint            | `commitlint.config.cjs`                                        | Configurado |
| GitHub Actions        | `.github/workflows/`                                           | Configurado |
| PowerShell            | `scripts/evidencias/`                                          | Verificado  |
| Git y GitHub          | Historial, ramas y remoto                                      | Verificado  |
| Markdown              | `docs/`, `docs/cierre/`                                        | Verificado  |

## 10. Metodología adaptativa

El proyecto se desarrolló mediante un enfoque adaptativo e incremental. El backlog, los documentos de análisis, las pruebas, las modificaciones del scheduler, la integración con PostgreSQL, el rediseño de interfaz y las evidencias de cierre muestran ciclos sucesivos de construcción, validación y mejora.

La ejecución no siguió un esquema rígido en el que todas las actividades se definieran al inicio. Las decisiones se ajustaron conforme se identificaron necesidades técnicas, académicas y documentales.

Entre las principales adaptaciones se encuentran:

* consolidación del límite máximo de 25 créditos;
* incorporación de PostgreSQL;
* creación del fallback local;
* ampliación de reglas del scheduler;
* incorporación de métricas y recomendaciones;
* integración de pruebas automatizadas;
* generación de cobertura;
* configuración de Husky y Commitlint;
* integración de SonarQube;
* generación automatizada de evidencias;
* corrección de documentación histórica.

El repositorio conserva trazabilidad mediante commits, ramas, registros de cambios y evidencias.

### 10.1 Distribución retrospectiva del trabajo

Para evaluar el esfuerzo se realizó una reconstrucción académica basada en las actividades desarrolladas, los entregables, los cambios versionados y la documentación existente.

| Etapa                      | Actividades principales                                                                 | Duración estimada | Horas acumuladas del equipo |
| -------------------------- | --------------------------------------------------------------------------------------- | ----------------: | --------------------------: |
| Inicio y planificación     | Definición del problema, objetivos, alcance, actores, requisitos y acta de constitución |         2 semanas |                    30 horas |
| Diseño técnico             | Arquitectura, estructura del proyecto, modelo de datos y diseño inicial del motor       |         2 semanas |                    36 horas |
| Desarrollo funcional       | Frontend, backend, endpoints, selección de cursos y generación de horarios              |         4 semanas |                    84 horas |
| Integración y optimización | PostgreSQL, fallback, validaciones, caché, paginación y manejo de errores               |         2 semanas |                    48 horas |
| Pruebas y calidad          | Pruebas, cobertura, build, auditorías, Husky, Commitlint y SonarQube                    |         2 semanas |                    34 horas |
| Documentación y cierre     | Evidencias, trazabilidad, registros, manuales, correcciones e informe final             |         2 semanas |                    34 horas |
| **Total estimado**         |                                                                                         |    **14 semanas** |               **266 horas** |

La cantidad de horas representa el esfuerzo acumulado de los integrantes y no las horas de una sola persona.

### 10.2 Distribución aproximada por tipo de trabajo

| Tipo de trabajo            |   Horas | Participación |
| -------------------------- | ------: | ------------: |
| Análisis y planificación   |      30 |       11.28 % |
| Diseño técnico             |      36 |       13.53 % |
| Desarrollo funcional       |      84 |       31.58 % |
| Integración y optimización |      48 |       18.05 % |
| Pruebas y calidad          |      34 |       12.78 % |
| Documentación y cierre     |      34 |       12.78 % |
| **Total**                  | **266** |     **100 %** |

La mayor proporción corresponde al desarrollo funcional, seguida por la integración técnica. La documentación y la calidad representan una parte importante porque la rúbrica exige evidencia, trazabilidad y cierre formal.

## 11. Alcance planificado

Según `docs/03_project_charter.md` y `docs/05_requerimientos.md`, el alcance inicial incluía:

* generación automática de horarios;
* validación de créditos;
* interfaz web;
* validación académica;
* restricciones duras y blandas;
* documentación técnica;
* pruebas del MVP.

No forman parte del alcance acreditado:

* matrícula institucional real;
* integración productiva con ERP universitario;
* autenticación institucional;
* pagos;
* infraestructura de alta disponibilidad;
* aplicación móvil nativa;
* certificación WCAG;
* uso de datos personales reales;
* soporte productivo posterior;
* monitoreo institucional.

## 12. Alcance ejecutado

### Funcionalidades verificadas en código

| ID    | Requisito                                            | Verificación                                                     |
| ----- | ---------------------------------------------------- | ---------------------------------------------------------------- |
| RF-01 | Selección de cursos                                  | `client/src/App.js`                                              |
| RF-02 | Generación de horario                                | `server/src/services/scheduler.service.js`                       |
| RF-03 | Límite máximo de 25 créditos                         | `client/src/App.js`, `scheduler.service.js`, `scheduler.test.js` |
| RF-04 | Detección de cruces                                  | `scheduler.service.js`, `scheduler.test.js`                      |
| RF-05 | Validación docente                                   | `scheduler.service.js`                                           |
| RF-06 | Respeto de carga administrativa y bloques protegidos | `scheduler.service.js`                                           |
| RF-07 | Validación de aulas, aforo y ocupación               | `scheduler.service.js`, `client/src/App.js`                      |
| RF-08 | PostgreSQL con fallback local                        | `server/src/config/db.js`, `academic-data.service.js`            |
| RF-09 | Auditoría y notificaciones                           | `client/src/App.js`, `/api/audit/logs`                           |
| RF-10 | Modo demostración y coordinación                     | `client/src/App.js`                                              |
| RF-11 | Resumen de matrícula                                 | `client/src/App.js`                                              |
| RF-12 | Recomendaciones académicas                           | `scheduler.service.js`, `client/src/App.js`                      |

### 12.1 Capacidades técnicas incorporadas

* arquitectura cliente-servidor;
* API REST;
* integración PostgreSQL;
* fallback local;
* caché simple;
* paginación;
* compresión HTTP;
* límite de solicitudes JSON;
* índices SQL;
* pruebas automatizadas;
* cobertura;
* build;
* auditorías;
* SonarQube;
* control de versiones;
* scripts de evidencias;
* documentación de cierre.

## 13. Comparación plan versus ejecución

| Elemento                   | Planificado                                               | Ejecutado                                           | Estado                   | Evidencia                     |
| -------------------------- | --------------------------------------------------------- | --------------------------------------------------- | ------------------------ | ----------------------------- |
| Horarios automáticos       | Sí                                                        | Sí                                                  | Completado               | `RF-02`, `PRB-02`, `PRB-09`   |
| Validación de créditos     | Sí                                                        | Máximo de 25 créditos                               | Completado               | `RF-03`, `PRB-03`, `PRB-04`   |
| Prerrequisitos             | Sí, documentado                                           | No verificado de forma integral en el código actual | En validación            | `docs/05_requerimientos.md`   |
| Interfaz web               | Sí                                                        | React con flujo funcional                           | Completado               | `client/src/App.js`           |
| Backend                    | Sí                                                        | Node.js y Express                                   | Completado               | `server/src/app.js`           |
| Conflictos                 | Sí                                                        | Estudiante, docente y aula                          | Completado               | `PRB-01`                      |
| Disponibilidad docente     | Sí                                                        | Implementada                                        | Completado               | `PRB-05`                      |
| Aforo y aulas              | Parcialmente definido                                     | Capacidad, ocupación, mantenimiento y estado        | Superado                 | `PRB-06`, `PRB-07`            |
| PostgreSQL                 | No estaba claramente definido en los documentos iniciales | Integrado con fallback                              | Completado               | `server/src/config/db.js`     |
| Recomendaciones            | Básicas                                                   | Incorporadas en scheduler e interfaz                | Completado               | `PRB-08`                      |
| Auditoría y notificaciones | No desarrollado completamente en la planificación inicial | Implementado a nivel de MVP                         | Completado               | `EV-APP-08`                   |
| Modo demostración          | No formalizado inicialmente                               | Implementado y documentado                          | Completado               | `EV-APP-10`                   |
| Pruebas                    | Previstas                                                 | 12 pruebas aprobadas                                | Completado               | `EV-TEST-01`                  |
| Cobertura                  | Prevista como control de calidad                          | Reportada para backend, scheduler y frontend        | Completado               | `EV-TEST-02`, `EV-TEST-03`    |
| Build                      | Previsto                                                  | Compilado correctamente                             | Completado               | `EV-TEST-04`                  |
| SonarQube                  | Previsto                                                  | Ejecutado y exportado                               | Completado               | `EV-SONAR-01` a `EV-SONAR-09` |
| Auditorías                 | No detalladas inicialmente                                | Ejecutadas para raíz, backend y frontend            | Completado con hallazgos | `EV-SEC-01` a `EV-SEC-03`     |
| Evidencias                 | Documentación general                                     | Evidencias clasificadas e inventariadas             | Superado                 | `00_manifiesto_evidencias.md` |
| Capacitación               | Manual básico                                             | Manual funcional, operativo y técnico               | Completado               | `10_manual_capacitacion.md`   |

### 13.1 Evaluación del alcance

El alcance funcional principal fue cumplido. Además, el proyecto incorporó elementos no desarrollados completamente en la planificación inicial, como PostgreSQL, fallback, calidad automatizada, SonarQube, auditorías, sostenibilidad y evidencias organizadas.

El alcance se considera **cumplido y ampliado de forma controlada**, sin afirmar que el MVP tenga capacidades productivas institucionales.

## 14. Desempeño del cronograma

La documentación histórica menciona cinco sprints y una duración aproximada de diez semanas. Sin embargo, la reconstrucción retrospectiva del proyecto muestra una ejecución aproximada de catorce semanas considerando el desarrollo, integración, pruebas, calidad, evidencias y cierre.

La estimación se utiliza como indicador académico para sustentar el desempeño temporal. No representa un registro contractual ni reemplaza una hoja de horas firmada.

### 14.1 Comparación del cronograma

| Etapa                             |    Planificado |      Ejecutado |      Variación | Justificación                                                                     |
| --------------------------------- | -------------: | -------------: | -------------: | --------------------------------------------------------------------------------- |
| Inicio y planificación            |       1 semana |      2 semanas |      +1 semana | Se requirió precisar el problema, alcance, requisitos y documentos fundacionales. |
| Diseño técnico                    |      2 semanas |      2 semanas |  Sin variación | La arquitectura y estructura base se definieron dentro del periodo previsto.      |
| Desarrollo funcional              |      4 semanas |      4 semanas |  Sin variación | Se completó el núcleo funcional del MVP.                                          |
| Integración PostgreSQL y fallback |       1 semana |      2 semanas |      +1 semana | Se realizaron ajustes de conexión, esquema, consultas y continuidad.              |
| Pruebas y calidad                 |       1 semana |      2 semanas |      +1 semana | Se incorporaron cobertura, build, auditorías, Husky, Commitlint y SonarQube.      |
| Documentación y cierre            |       1 semana |      2 semanas |      +1 semana | Se elaboraron registros, manuales, trazabilidad y evidencias adicionales.         |
| **Total**                         | **10 semanas** | **14 semanas** | **+4 semanas** | **Desviación aproximada del 40 %**                                                |

### 14.2 Indicadores del cronograma

| Indicador                              |                    Resultado |
| -------------------------------------- | ---------------------------: |
| Duración planificada                   |                   10 semanas |
| Duración ejecutada estimada            |                   14 semanas |
| Variación                              |                    4 semanas |
| Desviación temporal aproximada         |                         40 % |
| Horas planificadas                     |                    180 horas |
| Horas ejecutadas estimadas             |                    266 horas |
| Variación de esfuerzo                  |                     86 horas |
| Funcionalidades principales concluidas |                        100 % |
| Pruebas aprobadas                      |                     12 de 12 |
| Documentos principales de cierre       | 15 documentos más evidencias |

### 14.3 Causas de la variación

La variación se relaciona con:

1. mayor precisión del alcance;
2. integración de PostgreSQL;
3. implementación del fallback;
4. ampliación de validaciones académicas;
5. incorporación de caché y paginación;
6. pruebas automatizadas;
7. análisis de cobertura;
8. auditorías de dependencias;
9. configuración de SonarQube;
10. conflictos de integración Git;
11. generación automatizada de evidencias;
12. corrección de documentación histórica;
13. elaboración de registros de control y cierre.

### 14.4 Evaluación del cronograma

El cronograma se considera **aceptable con desviación controlada**.

La ampliación no se produjo por abandono del proyecto, sino por actividades adicionales destinadas a mejorar la calidad, la integración y la trazabilidad.

La desviación permitió entregar:

* un sistema más completo;
* pruebas automatizadas;
* métricas de cobertura;
* análisis de seguridad;
* evidencias verificables;
* documentación alineada con la rúbrica.

Para proyectos futuros se recomienda utilizar una hoja de control semanal con:

* fecha planificada;
* fecha real;
* actividad;
* responsable;
* horas;
* entregable;
* desviación;
* acción correctiva.

## 15. Desempeño de costos

### 15.1 Criterio de valorización

SmartSched-UC fue desarrollado como un proyecto académico y no mediante la contratación de una empresa formal.

Por ello, el costo se presenta como una **valorización académica retrospectiva**, basada en:

* tres integrantes;
* 266 horas acumuladas;
* tarifas reducidas de trabajo estudiantil;
* uso de equipos personales;
* conectividad;
* energía;
* depreciación parcial;
* reprocesos;
* herramientas gratuitas;
* ejecución local.

La estimación no constituye:

* una factura;
* una cotización comercial;
* un costo contable certificado;
* una remuneración efectivamente pagada;
* una propuesta de una empresa constituida.

Su finalidad es mostrar el valor aproximado de los recursos y del esfuerzo técnico invertido.

### 15.2 Valorización del trabajo del equipo

| Actividad o responsabilidad                                        | Horas estimadas | Tarifa académica | Costo valorizado |
| ------------------------------------------------------------------ | --------------: | ---------------: | ---------------: |
| Backend, arquitectura, scheduler, API e integración                |       100 horas |         S/ 18.00 |      S/ 1,800.00 |
| Frontend, interfaz, experiencia de usuario e integración funcional |        85 horas |         S/ 16.00 |      S/ 1,360.00 |
| Pruebas, documentación, evidencias, calidad y gestión              |        81 horas |         S/ 14.00 |      S/ 1,134.00 |
| **Total de trabajo técnico**                                       |   **266 horas** |                  |  **S/ 4,294.00** |

Las tarifas son inferiores a las que cobraría un profesional contratado o una empresa de software. Se utilizan porque el trabajo se realizó dentro de un contexto académico.

### 15.3 Costos operativos estimados

| Recurso                               | Criterio                                                                          |           Costo |
| ------------------------------------- | --------------------------------------------------------------------------------- | --------------: |
| Conectividad a Internet               | Uso durante desarrollo, coordinación, descarga de dependencias y GitHub           |       S/ 180.00 |
| Energía eléctrica                     | Uso de computadoras durante aproximadamente 14 semanas                            |       S/ 120.00 |
| Uso y depreciación parcial de equipos | Utilización de equipos personales para desarrollo, pruebas y documentación        |       S/ 350.00 |
| Herramientas y licencias              | React, Node.js, Express, PostgreSQL, Git, Jest y SonarQube Community              |         S/ 0.00 |
| Infraestructura local                 | Uso de equipos propios, sin servidor contratado                                   |         S/ 0.00 |
| Reprocesos y correcciones             | Conflictos Git, documentación, evidencias, ajustes de configuración e integración |       S/ 430.00 |
| **Total de costos operativos**        |                                                                                   | **S/ 1,080.00** |

### 15.4 Costo total estimado

| Concepto                     |           Costo |
| ---------------------------- | --------------: |
| Trabajo técnico valorizado   |     S/ 4,294.00 |
| Costos operativos estimados  |     S/ 1,080.00 |
| **Costo total estimado**     | **S/ 5,374.00** |
| **Costo redondeado del MVP** | **S/ 5,400.00** |

El costo aproximado del MVP SmartSched-UC es de **S/ 5,400.00**.

### 15.5 Comparación entre presupuesto planificado y ejecutado

| Concepto           |     Planificado | Ejecutado estimado |        Variación |
| ------------------ | --------------: | -----------------: | ---------------: |
| Horas de trabajo   |       180 horas |          266 horas |        +86 horas |
| Trabajo valorizado |     S/ 2,900.00 |        S/ 4,294.00 |     +S/ 1,394.00 |
| Costos operativos  |       S/ 700.00 |        S/ 1,080.00 |       +S/ 380.00 |
| **Costo total**    | **S/ 3,600.00** |    **S/ 5,374.00** | **+S/ 1,774.00** |

### 15.6 Indicadores de costos

| Indicador                                     |   Resultado |
| --------------------------------------------- | ----------: |
| Presupuesto académico planificado             | S/ 3,600.00 |
| Costo académico ejecutado estimado            | S/ 5,374.00 |
| Variación                                     | S/ 1,774.00 |
| Incremento sobre el plan                      |     49.28 % |
| Costo semanal aproximado                      |   S/ 383.86 |
| Costo promedio por integrante                 | S/ 1,791.33 |
| Costo promedio por hora, incluyendo operación |    S/ 20.20 |
| Licencias comerciales adquiridas              |     S/ 0.00 |
| Infraestructura en nube contratada            |     S/ 0.00 |

### 15.7 Justificación de la variación

La variación se relaciona con:

1. ampliación del periodo de 10 a 14 semanas;
2. integración con PostgreSQL;
3. implementación del fallback;
4. ampliación de reglas del scheduler;
5. incorporación de pruebas y cobertura;
6. configuración de Husky y Commitlint;
7. análisis de SonarQube;
8. auditorías de seguridad;
9. resolución de conflictos Git;
10. automatización de evidencias;
11. corrección de codificación;
12. elaboración de documentación de cierre.

### 15.8 Evaluación económica

El costo estimado de S/ 5,400.00 se considera razonable para un MVP académico desarrollado con herramientas gratuitas y equipos personales.

Una implementación comercial tendría un costo mayor porque debería considerar:

* remuneraciones profesionales;
* gestión contractual;
* infraestructura;
* seguridad productiva;
* autenticación;
* autorización;
* monitoreo;
* respaldo;
* despliegue;
* soporte;
* mantenimiento;
* impuestos;
* margen empresarial;
* garantía.

Estos conceptos no se incorporan al costo académico porque el proyecto no fue contratado como producto empresarial.

## 16. Desempeño de calidad

| Indicador           | Resultado verificado                                                    | Evidencia                  |
| ------------------- | ----------------------------------------------------------------------- | -------------------------- |
| Suite backend       | 11/11 pruebas aprobadas                                                 | `EV-TEST-01`, `EV-TEST-04` |
| Suite frontend      | 1/1 prueba aprobada                                                     | `EV-TEST-01`, `EV-TEST-04` |
| Build frontend      | Compilado correctamente                                                 | `EV-TEST-04`               |
| Cobertura backend   | 80.42 % sentencias / 60.46 % ramas / 84.42 % funciones / 79.77 % líneas | `EV-TEST-02`               |
| Cobertura scheduler | 92.08 % sentencias / 73.71 % ramas / 98.16 % funciones / 91.30 % líneas | `EV-TEST-02`               |
| Cobertura frontend  | 44.05 % sentencias / 43.77 % ramas / 42.85 % funciones / 43.87 % líneas | `EV-TEST-03`               |

### 16.1 Indicadores consolidados verificados

| Indicador                      |               Resultado | Estado            | Evidencia                     |
| ------------------------------ | ----------------------: | ----------------- | ----------------------------- |
| Pruebas backend                |                   11/11 | Aprobado          | `EV-TEST-01`                  |
| Pruebas frontend               |                     1/1 | Aprobado          | `EV-TEST-01`                  |
| Pruebas totales                |                   12/12 | Aprobado          | `EV-TEST-01`                  |
| Cobertura backend por líneas   |                 79.77 % | Verificado        | `EV-TEST-02`                  |
| Cobertura scheduler por líneas |                 91.30 % | Alto              | `EV-TEST-02`                  |
| Cobertura frontend por líneas  |                 43.87 % | Requiere mejora   | `EV-TEST-03`                  |
| Build de producción            | Compilado correctamente | Aprobado          | `EV-TEST-04`                  |
| Vulnerabilidades raíz          |                       0 | Verificado        | `EV-SEC-01`                   |
| Vulnerabilidades backend       |                      22 | En tratamiento    | `EV-SEC-02`                   |
| Vulnerabilidades frontend      |                      51 | Prioridad crítica | `EV-SEC-03`                   |
| SonarQube                      |               Ejecutado | Verificado        | `EV-SONAR-01` a `EV-SONAR-09` |

### 16.2 Interpretación de calidad

El backend y el scheduler cuentan con una validación sólida para el alcance del MVP. La cobertura del frontend es menor debido a que solo existe una prueba principal de renderizado.

Un build correcto y pruebas aprobadas no significan que el sistema esté libre de riesgos. Por ello, la evaluación también considera:

* vulnerabilidades;
* deuda técnica;
* cobertura;
* accesibilidad;
* mantenibilidad;
* trazabilidad;
* riesgos residuales.

## 17. Pruebas

| PRB    | Descripción                                                             | Resultado | Evidencia                                |
| ------ | ----------------------------------------------------------------------- | --------- | ---------------------------------------- |
| PRB-01 | Detección de conflictos de docente, aula y estudiante                   | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-02 | Generación automática válida y repetible                                | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-03 | Límite máximo de 25 créditos y optimización hacia el objetivo           | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-04 | Selección exacta de 25 créditos cuando existe una combinación válida    | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-05 | Disponibilidad docente, capacidad de aula y horas asignadas             | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-06 | Detección de aula sobreocupada                                          | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-07 | Rechazo de aulas en mantenimiento o inactivas                           | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-08 | Recomendaciones cuando faltan créditos                                  | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-09 | `POST /api/schedules/generate` expone el motor mediante API             | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-10 | `GET /api/courses` devuelve paginación                                  | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-11 | `GET /api/health` reporta fallback cuando PostgreSQL no está disponible | Aprobada  | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-04` |
| PRB-12 | Renderizado del tablero compacto de matrícula                           | Aprobada  | `EV-TEST-01`, `EV-TEST-03`, `EV-TEST-04` |

## 18. SonarQube

El análisis estático fue ejecutado sobre el proyecto `smartsched-uc` y sus resultados fueron almacenados dentro de la carpeta de evidencias.

Las métricas exportadas constituyen la fuente verificable. El informe evita duplicar valores que puedan cambiar en una ejecución posterior.

| Elemento                   | Estado                   | Evidencia                                                                                 |
| -------------------------- | ------------------------ | ----------------------------------------------------------------------------------------- |
| Configuración del proyecto | Verificada               | `smartsched-uc/sonar-project.properties`                                                  |
| Estado del servidor        | Exportado                | [`EV-SONAR-01-system-status.json`](./evidencias/sonarqube/EV-SONAR-01-system-status.json) |
| Métricas del proyecto      | Exportadas en JSON y CSV | `EV-SONAR-02`, `EV-SONAR-03`                                                              |
| Resumen interpretado       | Completado               | [`EV-SONAR-04-resumen.md`](./evidencias/sonarqube/EV-SONAR-04-resumen.md)                 |
| Issues                     | Exportados               | `EV-SONAR-05`                                                                             |
| Security Hotspots          | Exportados               | `EV-SONAR-06`                                                                             |
| Actividad de análisis      | Exportada                | `EV-SONAR-07`                                                                             |
| Reporte visual             | Generado                 | `EV-SONAR-08`                                                                             |
| Ejecución del scanner      | Registrada               | `EV-SONAR-09`                                                                             |

La interpretación de SonarQube se limita al código y a las reglas incluidas en el análisis. Un resultado de cero no demuestra ausencia absoluta de defectos o vulnerabilidades.

## 19. OWASP y seguridad de dependencias

| Elemento                             | Resultado verificado                                                    | Estado                              |
| ------------------------------------ | ----------------------------------------------------------------------- | ----------------------------------- |
| Auditoría de dependencias en la raíz | 0 vulnerabilidades                                                      | Verificado mediante `EV-SEC-01`     |
| Auditoría backend                    | 22 vulnerabilidades: 1 baja, 20 moderadas y 1 alta                      | En tratamiento mediante `EV-SEC-02` |
| Auditoría frontend                   | 51 vulnerabilidades: 5 bajas, 30 moderadas, 15 altas y 1 crítica        | Prioridad alta mediante `EV-SEC-03` |
| Gestión de secretos                  | Tokens y contraseñas mediante variables de entorno                      | Control obligatorio                 |
| Actualización de dependencias        | Gradual, con pruebas y sin usar `npm audit fix --force` automáticamente | Planificada                         |

### 19.1 Métricas complementarias de SonarQube

| Indicador                  | Resultado de cierre               | Evidencia                                   |
| -------------------------- | --------------------------------- | ------------------------------------------- |
| Code smells                | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Bugs                       | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Vulnerabilidades SonarQube | Métrica exportada automáticamente | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Security Hotspots          | Detalle exportado                 | `EV-SONAR-06`                               |
| Deuda técnica              | Métrica exportada                 | `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04` |
| Quality Gate               | Estado registrado                 | `EV-SONAR-02`, `EV-SONAR-04`                |

El análisis de dependencias y SonarQube son controles complementarios. Ninguno permite afirmar por sí solo que el sistema sea totalmente seguro.

## 20. Accesibilidad y WCAG

| Evidencia                                                          | Resultado                                          |
| ------------------------------------------------------------------ | -------------------------------------------------- |
| Etiquetas `aria-label` en búsqueda, filtros, navegación y pestañas | Verificado en `client/src/App.js`                  |
| Interfaz compacta y mensajes de estado                             | Verificados mediante evidencias de aplicación      |
| Navegación por teclado                                             | Considerada en el diseño; requiere ampliar pruebas |
| Auditoría externa o certificación WCAG                             | No realizada                                       |

Estado global: **implementación parcial verificada y mejora continua requerida**.

El proyecto no declara conformidad total con WCAG porque no se ejecutó una evaluación integral mediante:

* Lighthouse;
* axe DevTools;
* WAVE;
* lectores de pantalla;
* pruebas de contraste;
* pruebas completas de teclado.

## 21. Green Software

| Medida                          | Estado        | Evidencia                                          |
| ------------------------------- | ------------- | -------------------------------------------------- |
| Compresión HTTP                 | Implementada  | `server/src/app.js`                                |
| Caché simple en GET             | Implementada  | `server/src/middlewares/simpleCache.middleware.js` |
| Paginación                      | Implementada  | `academic-data.service.js`                         |
| JSON limitado a 100kb           | Implementado  | `server/src/app.js`                                |
| Índices SQL                     | Implementados | `server/src/database/smartsched_uc.sql`            |
| Fallback local para continuidad | Implementado  | `server/src/config/db.js`                          |
| Build de producción             | Verificado    | `EV-TEST-04`                                       |
| Medición energética formal      | No ejecutada  | Limitación documentada                             |

Estas medidas pueden reducir procesamiento y transferencia, aunque no permiten afirmar una reducción exacta de energía o emisiones.

## 22. Incidentes

Los incidentes se detallan en [`04_registro_incidentes.md`](./04_registro_incidentes.md).

Durante el desarrollo y cierre se gestionaron:

* diferencias entre la documentación histórica y la arquitectura;
* enlaces desactualizados;
* errores de codificación UTF-8;
* dificultades con Git y Husky;
* conflictos de merge;
* incompatibilidad inicial entre Java y SonarQube;
* ajustes de PostgreSQL;
* activación del fallback;
* organización de evidencias;
* hallazgos de seguridad.

Las correcciones quedaron registradas mediante:

* evidencias;
* historial Git;
* documentos de cambios;
* registros de defectos;
* validaciones técnicas.

## 23. Riesgos

Los riesgos se encuentran en [`03_registro_riesgos.md`](./03_registro_riesgos.md).

Los principales riesgos residuales son:

* vulnerabilidades del backend;
* vulnerabilidades del frontend;
* cobertura frontend limitada;
* dependencia del fallback;
* diferencias entre PostgreSQL y el dataset local;
* exposición de secretos;
* incompatibilidad de hooks;
* errores de codificación;
* ausencia de auditoría WCAG;
* falta de monitoreo productivo;
* estimación retrospectiva de tiempo y costos.

La planificación financiera y temporal se incorporó como una estimación académica. Para futuros proyectos deberá sustentarse mediante:

* horas semanales;
* responsables;
* fechas;
* comprobantes;
* tarifas previamente aprobadas;
* gastos registrados.

## 24. Cambios

| CAM    | Descripción                                                       | Estado     | Commit                                                   |
| ------ | ----------------------------------------------------------------- | ---------- | -------------------------------------------------------- |
| CAM-01 | Primer funcionamiento del sistema                                 | Verificado | `22f812b`                                                |
| CAM-02 | Constitución documental del proyecto                              | Verificado | `ec192f3`                                                |
| CAM-03 | Evidencias de validación y TDD                                    | Verificado | `c101868`                                                |
| CAM-04 | Infraestructura de calidad, Husky y SonarQube                     | Verificado | `3804bdd`                                                |
| CAM-05 | Ajustes de PostgreSQL, fallback, scheduler y vistas demostrativas | Verificado | Trazabilidad en `EV-GEST-02`, `EV-GEST-05` y `EV-GIT-01` |
| CAM-06 | Consolidación de evidencias y cierre                              | Verificado | Historial documental                                     |

### 24.1 Totales de control

| Registro     |    Total consolidado | Documento                             |
| ------------ | -------------------: | ------------------------------------- |
| Riesgos      | Registro actualizado | `03_registro_riesgos.md`              |
| Incidentes   | Registro actualizado | `04_registro_incidentes.md`           |
| Impedimentos | Registro actualizado | `05_registro_impedimentos.md`         |
| Defectos     | Registro actualizado | `06_registro_defectos.md`             |
| Supuestos    | Registro actualizado | `07_registro_supuestos.md`            |
| Cambios      | Registro actualizado | `12_control_configuracion_cambios.md` |

Los totales deben interpretarse según las versiones consolidadas de cada registro, debido a que fueron ampliados durante la fase de cierre.

## 25. Resultados verificables

| Resultado                                      | Estado                               | Evidencia                                     |
| ---------------------------------------------- | ------------------------------------ | --------------------------------------------- |
| Generación automática de horarios              | Verificado                           | `PRB-02`, `PRB-09`, `EV-TEST-01`, `EV-APP-04` |
| Límite y optimización hasta 25 créditos        | Verificado                           | `PRB-03`, `PRB-04`, `EV-APP-05`               |
| Detección de conflictos                        | Verificado                           | `PRB-01`, `EV-APP-06`                         |
| Validación de aulas, capacidad y mantenimiento | Verificado                           | `PRB-05`, `PRB-06`, `PRB-07`, `EV-APP-07`     |
| PostgreSQL y fallback                          | Verificado según estado de ejecución | `PRB-11`, `EV-DB-01`, `EV-DB-05`, `EV-DB-06`  |
| Notificaciones y mensajes                      | Verificado                           | `EV-APP-08`                                   |
| Resumen de matrícula                           | Verificado                           | `EV-APP-09`                                   |
| Modo demostración                              | Verificado y diferenciado            | `EV-APP-10`                                   |
| Pruebas                                        | Verificado                           | `EV-TEST-01`                                  |
| Cobertura                                      | Verificada                           | `EV-TEST-02`, `EV-TEST-03`                    |
| Build                                          | Verificado                           | `EV-TEST-04`                                  |
| Auditorías                                     | Ejecutadas                           | `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`         |
| SonarQube                                      | Verificado                           | `EV-SONAR-01` a `EV-SONAR-09`                 |
| Cronograma                                     | Estimado y comparado                 | Sección 14                                    |
| Costos                                         | Valorizados y comparados             | Sección 15                                    |
| Evidencias                                     | Organizadas                          | `00_manifiesto_evidencias.md`                 |
| Documentación                                  | Consolidada                          | `docs/cierre/`                                |

## 26. Limitaciones

* El proyecto es un MVP académico.
* No constituye una integración productiva con sistemas institucionales.
* No dispone de autenticación institucional.
* No utiliza datos personales reales.
* La cobertura del frontend es menor que la del backend.
* Existen vulnerabilidades pendientes.
* La accesibilidad no fue auditada integralmente.
* El fallback no reemplaza una base productiva.
* No existe infraestructura de alta disponibilidad.
* No existe monitoreo productivo.
* No existe medición energética formal.
* El cronograma y los costos se reconstruyeron retrospectivamente.
* La valorización de S/ 5,400.00 es académica y no contable.
* No se incluyen impuestos, margen empresarial, soporte comercial ni garantía.
* No se cuenta con comprobantes de pago por el trabajo del equipo.
* La evaluación con usuarios reales queda fuera del alcance actual.

## 27. Riesgos residuales

1. Dependencias con vulnerabilidades pendientes.
2. Cobertura frontend insuficiente.
3. Diferencias entre PostgreSQL y fallback.
4. Regresiones por actualización de paquetes.
5. Falta de auditoría WCAG.
6. Falta de monitoreo productivo.
7. Falta de autenticación.
8. Dependencia de servicios locales.
9. Modularización pendiente de `App.js`.
10. Necesidad de mantener actualizada la documentación.
11. Estimaciones retrospectivas de tiempo y costo.
12. Falta de validación con usuarios institucionales.

## 28. Conclusiones estratégicas

1. SmartSched-UC cumple con el propósito académico de generar horarios bajo múltiples restricciones.
2. El scheduler constituye la principal fortaleza técnica.
3. La cobertura del scheduler supera el 91 % de líneas.
4. Las 12 pruebas automatizadas fueron aprobadas.
5. La arquitectura React, Node.js, Express y PostgreSQL facilita la separación de responsabilidades.
6. PostgreSQL permite persistencia estructurada.
7. El fallback mejora la continuidad de la demostración.
8. Las evidencias permiten sustentar los resultados.
9. Git y los registros de cambios fortalecen la trazabilidad.
10. SonarQube y las auditorías amplían la evaluación de calidad.
11. La seguridad requiere mejora continua.
12. La cobertura del frontend debe incrementarse.
13. La accesibilidad requiere una evaluación formal.
14. El proyecto se desarrolló en aproximadamente 14 semanas.
15. El esfuerzo acumulado se estima en 266 horas.
16. El costo académico estimado es de S/ 5,400.00.
17. La desviación temporal se relaciona con actividades adicionales de integración, calidad y cierre.
18. La desviación de costos se justifica por el mayor esfuerzo requerido.
19. Una versión empresarial tendría un costo superior.
20. El proyecto se encuentra preparado para cierre académico.

## 29. Recomendaciones

1. Mantener secretos fuera del repositorio.
2. Rotar cualquier credencial previamente expuesta.
3. Actualizar dependencias gradualmente.
4. Priorizar la vulnerabilidad crítica del frontend.
5. Atender la vulnerabilidad alta del backend.
6. Incrementar pruebas del frontend.
7. Modularizar `App.js`.
8. Ejecutar SonarQube en cada entrega.
9. Incorporar pruebas WCAG.
10. Utilizar Lighthouse y axe.
11. Registrar horas desde el inicio.
12. Registrar costos semanalmente.
13. Comparar cronograma planificado y ejecutado.
14. Establecer responsables por entregable.
15. Mantener sincronizados código y documentación.
16. Implementar autenticación para una versión futura.
17. Incorporar copias de seguridad.
18. Incorporar monitoreo.
19. Preparar un despliegue institucional.
20. Realizar pruebas con usuarios reales.
21. Registrar satisfacción y tiempos de uso.
22. Elaborar un presupuesto comercial separado si el sistema evoluciona.
23. No utilizar la valorización académica como cotización empresarial.

## 30. Referencias a evidencias

* Manifiesto general: [`./evidencias/00_manifiesto_evidencias.md`](./evidencias/00_manifiesto_evidencias.md)
* Validación de evidencias: [`./evidencias/99_validacion_evidencias.md`](./evidencias/99_validacion_evidencias.md)
* Aplicación: [`./evidencias/aplicacion/README.md`](./evidencias/aplicacion/README.md)
* Base de datos: [`./evidencias/base-datos/README.md`](./evidencias/base-datos/README.md)
* Gestión: [`./evidencias/gestion/README.md`](./evidencias/gestion/README.md)
* SonarQube: [`./evidencias/sonarqube/README.md`](./evidencias/sonarqube/README.md)
* Pruebas: `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03`, `EV-TEST-04`
* Seguridad: `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`
* Git: `EV-GIT-01`, `EV-GIT-02`, `EV-GIT-03`, `EV-GIT-04`

## 31. Requerimientos planificados y ejecutados

La documentación inicial formalizó un conjunto reducido de requerimientos, mientras que la implementación final incorporó capacidades adicionales.

La fuente de cierre es [`11_matriz_trazabilidad.md`](./11_matriz_trazabilidad.md), donde cada requisito se relaciona con:

* diseño;
* código;
* pruebas;
* evidencia;
* riesgos;
* cambios;
* estado.

| Grupo                                | Evaluación de cierre                                                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Requerimientos funcionales iniciales | Cubiertos por la implementación y las pruebas                                                                                        |
| Requerimientos funcionales ampliados | Selección, generación, 25 créditos, conflictos, docentes, aulas, PostgreSQL, fallback, notificaciones, auditoría y modo demostración |
| Requerimientos no funcionales        | Calidad, seguridad, accesibilidad, sostenibilidad, mantenibilidad y trazabilidad                                                     |
| Fuente de verificación               | Matriz, pruebas y manifiesto de evidencias                                                                                           |

El cumplimiento se interpreta por requisito y evidencia, no únicamente mediante un porcentaje agregado.

## 32. Evidencias automatizadas adicionales

* Flujo funcional y tablero compacto: [`EV-APP-01`](./evidencias/aplicacion/EV-APP-01-pantalla-principal.md), [`EV-APP-04`](./evidencias/aplicacion/EV-APP-04-horario-generado.md)
* Estado de base de datos: [`EV-DB-01`](./evidencias/base-datos/EV-DB-01-api-health.md), [`EV-DB-05`](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
* Gestión: [`EV-GEST-02`](./evidencias/gestion/EV-GEST-02-historial-commits.md), [`EV-GEST-08`](./evidencias/gestion/EV-GEST-08-control-cambios.md)
* SonarQube: [`EV-SONAR-01`](./evidencias/sonarqube/EV-SONAR-01-system-status.json), [`EV-SONAR-04`](./evidencias/sonarqube/EV-SONAR-04-resumen.md)

## 33. Evaluación global

| Área               | Resultado                                  |
| ------------------ | ------------------------------------------ |
| Alcance            | Cumplido                                   |
| Funcionalidad      | Cumplida                                   |
| Cronograma         | Cumplido con desviación controlada         |
| Costos             | Valorizados y justificados                 |
| Calidad            | Cumplida con oportunidades de mejora       |
| Pruebas            | Cumplidas                                  |
| Cobertura          | Sólida en scheduler, mejorable en frontend |
| Seguridad          | En tratamiento                             |
| Documentación      | Cumplida                                   |
| Trazabilidad       | Cumplida                                   |
| Control de cambios | Cumplido                                   |
| Sostenibilidad     | Cumplida a nivel de MVP                    |
| Accesibilidad      | Parcialmente validada                      |
| Cierre             | Técnicamente viable                        |

## 34. Declaración de cierre

Con la documentación, el código, las pruebas, las métricas, la valorización, los registros y las evidencias disponibles, SmartSched-UC se declara **cerrado para fines académicos dentro de la iteración evaluada**.

El producto permanece disponible para:

* mantenimiento correctivo;
* mantenimiento evolutivo;
* actualización de dependencias;
* corrección de vulnerabilidades;
* ampliación de pruebas;
* mejora de accesibilidad;
* optimización;
* integración institucional futura.

La aceptación académica definitiva corresponde al docente evaluador.

## 35. Aprobación interna

| Rol                    | Estado                            |
| ---------------------- | --------------------------------- |
| Equipo del proyecto    | Conforme                          |
| Responsable técnico    | Conforme                          |
| Responsable documental | Conforme                          |
| Responsable de calidad | Conforme con riesgos registrados  |
| Docente evaluador      | Sujeto a revisión académica final |
