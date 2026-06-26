# Revisión del acta de constitución de SmartSched-UC

## Propósito

Evaluar el grado de cumplimiento de los objetivos, criterios de éxito, alcance, restricciones y entregables definidos en los documentos fundacionales de SmartSched-UC, comparándolos con el resultado verificable del repositorio y las evidencias generadas durante la fase de cierre.

## Documentos revisados

* [Acta de constitución inicial](../03_project_charter.md)
* [Documento de constitución del proyecto](../14_constitution.md)
* [Especificación técnica de SmartSched-UC](../../smartsched-uc/docs/SPEC.md)
* [Informe final del proyecto](./01_informe_final_proyecto.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)

## Revisión ejecutiva

La revisión confirma que SmartSched-UC cumple con el núcleo funcional definido para el proyecto académico: selección de cursos, generación automática de horarios, validación de restricciones, control del límite máximo de 25 créditos, verificación de disponibilidad docente, capacidad de aulas, detección de conflictos y presentación de resultados mediante una interfaz web.

También se verificó la existencia de una arquitectura basada en React, Node.js, Express y PostgreSQL, complementada por un mecanismo de fallback local que permite mantener la continuidad del sistema cuando la base de datos no se encuentra disponible.

Durante la revisión se identificaron diferencias entre algunos documentos históricos y la implementación vigente. Estas diferencias se relacionaban principalmente con referencias antiguas al stack tecnológico, rangos de créditos distintos y documentación que no había sido actualizada al mismo ritmo que el código.

Como parte del cierre, la documentación principal fue corregida y alineada con el estado actual del sistema. Asimismo, se generaron evidencias de aplicación, pruebas, cobertura, base de datos, control de versiones y SonarQube.

## Matriz de cumplimiento de objetivos

| Objetivo inicial                               | Indicador                                                     | Meta prevista                                                              | Resultado final                                                                                                      | Cumplimiento                          | Evidencia                                                                                         |
| ---------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Generar horarios académicos automáticamente    | Existencia de un motor y un endpoint de generación            | Producir un horario válido a partir de cursos y restricciones              | El motor CSP/backtracking genera horarios y expone su funcionamiento mediante API e interfaz web                     | Cumplido                              | `scheduler.service.js`, `PRB-02`, `PRB-09`, `EV-APP-04`, `EV-TEST-01`                             |
| Validar restricciones académicas               | Detección de cruces, conflictos y condiciones no válidas      | Evitar superposición de estudiantes, docentes y aulas                      | Las pruebas verifican conflictos de estudiantes, docentes, aulas, disponibilidad y bloques protegidos                | Cumplido                              | `scheduler.test.js`, `PRB-01`, `PRB-05`, `EV-APP-06`, `EV-TEST-02`                                |
| Mantener una carga académica adecuada          | Regla de créditos implementada en frontend y backend          | Respetar el límite académico definido por el sistema                       | El sistema utiliza un máximo de 25 créditos y busca aproximarse al objetivo sin superarlo                            | Cumplido con actualización controlada | `client/src/App.js`, `scheduler.service.js`, `PRB-03`, `PRB-04`, `SUP-01`                         |
| Validar la capacidad y disponibilidad de aulas | Reglas de aforo, actividad y mantenimiento                    | Evitar asignaciones en aulas no aptas o sobreocupadas                      | Se validan capacidad, ocupación, estado activo y mantenimiento de aulas                                              | Cumplido                              | `scheduler.service.js`, `PRB-06`, `PRB-07`, `EV-APP-07`                                           |
| Proporcionar una interfaz web funcional        | Disponibilidad de selección, generación, resumen y navegación | Permitir que el usuario interactúe con el sistema desde una aplicación web | La interfaz permite consultar cursos, seleccionar opciones, generar horarios y visualizar métricas y recomendaciones | Cumplido                              | `client/src/App.js`, `client/src/App.test.js`, `EV-APP-01`, `EV-APP-09`                           |
| Integrar una fuente de datos persistente       | Conexión con PostgreSQL y consulta de información académica   | Utilizar PostgreSQL como fuente principal                                  | PostgreSQL fue integrado mediante `pg`; cuando no está disponible se utiliza fallback local documentado              | Cumplido                              | `server/src/config/db.js`, `academic-data.service.js`, `EV-DB-01`, `EV-DB-02`                     |
| Mantener continuidad operativa                 | Disponibilidad del sistema ante fallos de base de datos       | Evitar el bloqueo total de la demostración                                 | El fallback local mantiene operativos los flujos principales del MVP                                                 | Cumplido                              | `server/src/config/db.js`, `PRB-11`, `EV-DB-01`, `SUP-04`                                         |
| Sustentar la calidad del producto              | Pruebas, cobertura, build y análisis estático                 | Contar con evidencias cuantitativas y verificables                         | Se aprobaron 12 pruebas, se generaron reportes de cobertura, el build compiló correctamente y se ejecutó SonarQube   | Cumplido                              | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03`, `EV-TEST-04`, `EV-SONAR-04`                             |
| Mantener trazabilidad de la ejecución          | Relación entre requisitos, pruebas, cambios y evidencias      | Facilitar la revisión y sustentación del proyecto                          | Se elaboraron registros de cierre, matriz de trazabilidad, manifiesto de evidencias y control de cambios             | Cumplido                              | `11_matriz_trazabilidad.md`, `12_control_configuracion_cambios.md`, `00_manifiesto_evidencias.md` |

## Evaluación de los criterios fundacionales

| Criterio fundacional     | Resultado                             | Justificación                                                                                                                                      |
| ------------------------ | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Propósito                | Cumplido                              | El producto responde al problema de planificación y simulación de horarios académicos con múltiples restricciones.                                 |
| Objetivo general         | Cumplido                              | El núcleo funcional se encuentra implementado, probado y respaldado mediante evidencias.                                                           |
| Objetivos específicos    | Cumplidos en su mayoría               | Se implementaron selección de cursos, generación, validaciones, interfaz, PostgreSQL, fallback, métricas y pruebas.                                |
| Criterios de éxito       | Cumplidos con observaciones           | Las funcionalidades críticas fueron verificadas; la cobertura del frontend y las vulnerabilidades de dependencias permanecen como áreas de mejora. |
| Alcance                  | Cumplido                              | El MVP ejecutado incluye las capacidades fundamentales definidas para la evaluación académica.                                                     |
| Interesados              | Cumplido                              | Se consideran estudiantes, coordinación académica, equipo de desarrollo y docente evaluador.                                                       |
| Riesgos                  | Cumplido                              | Se creó un registro priorizado de riesgos con probabilidad, impacto, exposición, tratamiento y evidencia.                                          |
| Restricciones            | Cumplido con actualización controlada | El límite de créditos fue consolidado en 25 y las restricciones técnicas se encuentran documentadas.                                               |
| Supuestos                | Cumplido                              | Los supuestos técnicos y operativos se encuentran registrados y clasificados según su nivel de validación.                                         |
| Entregables              | Cumplido                              | Existen código, documentación, pruebas, evidencias, manuales y registros de cierre.                                                                |
| Calidad                  | Cumplido con oportunidades de mejora  | El backend y el scheduler presentan cobertura sólida; el frontend requiere más pruebas y las dependencias necesitan actualización progresiva.      |
| Seguridad                | Parcialmente cumplido                 | Se ejecutaron auditorías y se documentaron los hallazgos, pero persisten vulnerabilidades en dependencias.                                         |
| Accesibilidad            | Parcialmente cumplido                 | Existen elementos básicos de accesibilidad, aunque no se dispone de una certificación formal completa de WCAG.                                     |
| Sostenibilidad           | Cumplido a nivel de MVP               | Se incorporaron paginación, compresión, caché simple, límites de carga e índices SQL.                                                              |
| Control de configuración | Cumplido                              | El proyecto utiliza Git, ramas, commits, documentación de cambios y evidencias de gestión.                                                         |

## Evaluación del alcance

### Alcance planificado

Los documentos iniciales definieron como capacidades principales:

* generación automática de horarios;
* validación de restricciones académicas;
* control de créditos;
* interfaz web;
* detección de conflictos;
* documentación del proyecto;
* validación mediante pruebas.

### Alcance ejecutado

El resultado final incorpora:

* selección y consulta de cursos;
* generación de horarios mediante CSP/backtracking;
* límite máximo de 25 créditos;
* detección de conflictos de estudiante, docente y aula;
* validación de disponibilidad docente;
* validación de capacidad, ocupación y estado de aulas;
* recomendaciones académicas;
* métricas de carga y uso de infraestructura;
* conexión con PostgreSQL;
* fallback local;
* endpoints de salud, cursos y generación;
* pruebas automatizadas;
* cobertura de código;
* build de producción;
* auditorías de dependencias;
* análisis SonarQube;
* registros de riesgos, incidentes, impedimentos, defectos y supuestos;
* matriz de trazabilidad;
* manual de capacitación;
* evidencias automatizadas de cierre.

## Cambios respecto del acta inicial

| Cambio               | Situación inicial                                      | Situación final                                                                             | Justificación                                                          | Estado                  |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------- |
| Límite de créditos   | Los documentos históricos manejaban rangos diferentes  | Se consolidó un máximo de 25 créditos                                                       | El código y las pruebas actuales utilizan ese valor como regla oficial | Aprobado para el cierre |
| Stack tecnológico    | Algunos documentos mencionaban MERN, MongoDB o FastAPI | React, Node.js, Express y PostgreSQL                                                        | Corresponde a la implementación real del repositorio                   | Corregido               |
| Fuente de datos      | No estaba claramente definida en todos los documentos  | PostgreSQL como fuente principal y fallback local                                           | Aumenta continuidad y permite demostración aun sin la base activa      | Incorporado             |
| Calidad automatizada | Evidencia limitada en documentos iniciales             | Jest, cobertura, build, npm audit, SonarQube y GitHub Actions                               | Permite una validación técnica más completa                            | Incorporado             |
| Evidencias           | No existía un repositorio central de evidencias        | Evidencias organizadas por aplicación, base de datos, calidad, gestión, pruebas y SonarQube | Mejora la trazabilidad y sustentación                                  | Incorporado             |
| Sostenibilidad       | No estaba suficientemente desarrollada                 | Caché, compresión, paginación, límites JSON e índices SQL                                   | Responde a criterios de Green Software y eficiencia                    | Incorporado             |

## Resultados cuantitativos relevantes

| Indicador                         |                    Resultado |
| --------------------------------- | ---------------------------: |
| Pruebas automatizadas totales     |           12 de 12 aprobadas |
| Pruebas del backend               |           11 de 11 aprobadas |
| Pruebas del frontend              |              1 de 1 aprobada |
| Cobertura de líneas del backend   |                      79.77 % |
| Cobertura de líneas del scheduler |                      91.30 % |
| Cobertura de líneas del frontend  |                      43.87 % |
| Build de producción               |      Compilado correctamente |
| Vulnerabilidades en la raíz       |                            0 |
| Vulnerabilidades en el backend    |                           22 |
| Vulnerabilidades en el frontend   |                           51 |
| Límite máximo de créditos         |                           25 |
| Registros principales de cierre   | 15 documentos más evidencias |

## Observaciones de cierre

Las siguientes condiciones no impiden el cierre académico, pero deben conservarse como oportunidades de mejora:

1. aumentar la cobertura automatizada del frontend;
2. actualizar progresivamente las dependencias vulnerables;
3. mantener los tokens y credenciales fuera del repositorio;
4. continuar modularizando `client/src/App.js`;
5. ejecutar una auditoría formal de accesibilidad WCAG;
6. mantener sincronizados el código y la documentación;
7. registrar horas y costos reales en futuras iteraciones;
8. verificar PostgreSQL y SonarQube antes de regenerar evidencias.

## Decisión de cierre

**Se aprueba el cierre académico y técnico de SmartSched-UC como MVP funcional.**

La aprobación se sustenta en:

* cumplimiento del objetivo general;
* funcionamiento verificable del motor de horarios;
* implementación de las restricciones principales;
* disponibilidad de una interfaz web funcional;
* integración con PostgreSQL y fallback local;
* aprobación de las pruebas automatizadas;
* existencia de métricas de cobertura;
* generación satisfactoria del build;
* ejecución de análisis de calidad;
* trazabilidad mediante documentos y evidencias;
* registro formal de riesgos y oportunidades de mejora.

Las vulnerabilidades de dependencias, la cobertura limitada del frontend y la ausencia de una auditoría WCAG completa se mantienen como riesgos residuales y acciones recomendadas para una siguiente iteración, pero no impiden la aceptación del MVP dentro del alcance académico definido.

## Firmas de revisión

| Rol                    | Responsable                   | Resultado                        |
| ---------------------- | ----------------------------- | -------------------------------- |
| Equipo del proyecto    | Equipo SmartSched-UC          | Conforme                         |
| Responsable técnico    | Equipo de desarrollo          | Conforme                         |
| Responsable documental | Equipo de documentación       | Conforme                         |
| Docente evaluador      | Sujeto a validación académica | Pendiente de firma institucional |

## Evidencias relacionadas

* [Horario generado](./evidencias/aplicacion/EV-APP-04-horario-generado.md)
* [Resumen de matrícula](./evidencias/aplicacion/EV-APP-09-resumen-matricula.md)
* [Estado de la base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Integridad de los datos](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
* [Pruebas generales](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt)
* [Cobertura del backend](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt)
* [Cobertura del frontend](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)
* [Validación completa](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)
* [Control de configuración y cambios](./12_control_configuracion_cambios.md)
* [Validación general de evidencias](./evidencias/99_validacion_evidencias.md)
