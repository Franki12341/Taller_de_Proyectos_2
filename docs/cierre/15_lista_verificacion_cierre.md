# Lista de verificación de cierre de SmartSched-UC

## 1. Propósito

Verificar que los principales entregables funcionales, técnicos, documentales y de calidad de SmartSched-UC se encuentren disponibles, revisados y relacionados con evidencia suficiente para la fase de cierre académico.

## 2. Criterios de estado

| Estado                            | Significado                                                   |
| --------------------------------- | ------------------------------------------------------------- |
| Completado                        | El criterio fue cumplido y cuenta con evidencia verificable   |
| Completado con mejora recomendada | El criterio fue cumplido, pero conserva acciones de mejora    |
| En tratamiento                    | Existen hallazgos pendientes que no impiden el cierre del MVP |
| Parcialmente validado             | Existe evidencia parcial, pero falta una revisión integral    |
| Sujeto a evaluación académica     | Depende de la presentación o aprobación final del docente     |

## 3. Lista consolidada de verificación

| N.° | Criterio                                         | Estado                            | Evidencia                                                                                              | Responsable                                   | Observación                                                                                            |
| --: | ------------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
|   1 | Alcance funcional verificado                     | Completado                        | `01_informe_final_proyecto.md`, `11_matriz_trazabilidad.md`, `EV-APP-04`, `EV-TEST-01`                 | Equipo de desarrollo y documentación          | El núcleo del MVP fue verificado mediante código, aplicación y pruebas.                                |
|   2 | Código fuente disponible y trazable              | Completado                        | `EV-GEST-01`, `EV-GEST-02`, `EV-GEST-03`, `EV-GEST-06`                                                 | Responsable del repositorio                   | El código, historial, ramas y estado del repositorio se encuentran documentados.                       |
|   3 | Frontend funcional                               | Completado                        | `client/src/App.js`, `client/src/App.test.js`, `EV-APP-01`, `EV-APP-09`                                | Equipo de frontend                            | Permite consultar cursos, seleccionarlos, generar horarios y revisar el resumen.                       |
|   4 | Backend funcional                                | Completado                        | `server/src/app.js`, `academic.routes.js`, `scheduler.service.js`, `EV-TEST-01`                        | Equipo de backend                             | Los endpoints y reglas principales fueron verificados mediante pruebas.                                |
|   5 | Motor de horarios validado                       | Completado                        | `scheduler.service.js`, `scheduler.test.js`, `EV-TEST-02`                                              | Equipo de backend y calidad                   | El scheduler alcanzó 91.30 % de cobertura de líneas.                                                   |
|   6 | Límite máximo de 25 créditos verificado          | Completado                        | `PRB-03`, `PRB-04`, `EV-APP-05`, `EV-TEST-01`                                                          | Equipo de desarrollo                          | El sistema no supera los 25 créditos y busca una combinación válida.                                   |
|   7 | Conflictos académicos verificados                | Completado                        | `PRB-01`, `EV-APP-06`, `EV-TEST-01`                                                                    | Equipo de desarrollo y calidad                | Se validan conflictos de estudiante, docente y aula.                                                   |
|   8 | Capacidad y estado de aulas verificados          | Completado                        | `PRB-06`, `PRB-07`, `EV-APP-07`                                                                        | Equipo de backend y coordinación              | Se detectan aulas sobreocupadas, inactivas o en mantenimiento.                                         |
|   9 | PostgreSQL documentado                           | Completado                        | `server/src/database/README.md`, `smartsched_uc.sql`, `EV-DB-02`, `EV-DB-03`                           | Equipo de base de datos                       | La conexión, el esquema y los scripts se encuentran documentados.                                      |
|  10 | Fallback local documentado y verificado          | Completado                        | `server/src/config/db.js`, `PRB-11`, `EV-DB-01`                                                        | Equipo de backend                             | El sistema mantiene continuidad cuando PostgreSQL no está disponible.                                  |
|  11 | Integridad de datos revisada                     | Completado                        | `EV-DB-04`, `EV-DB-05`, `EV-DB-07`                                                                     | Equipo de base de datos                       | Se generaron conteos, validaciones y un reporte de base de datos.                                      |
|  12 | Pruebas automatizadas ejecutadas                 | Completado                        | `EV-TEST-01`, `EV-TEST-04`                                                                             | Equipo de calidad                             | Se aprobaron 12 de 12 pruebas.                                                                         |
|  13 | Cobertura del backend reportada                  | Completado                        | `EV-TEST-02`                                                                                           | Equipo de calidad                             | Cobertura de líneas del backend: 79.77 %.                                                              |
|  14 | Cobertura del frontend reportada                 | Completado con mejora recomendada | `EV-TEST-03`                                                                                           | Equipo de frontend y calidad                  | Cobertura de líneas del frontend: 43.87 %. Debe ampliarse en futuras iteraciones.                      |
|  15 | Build de producción generado                     | Completado                        | `EV-TEST-04`                                                                                           | Equipo de frontend                            | El frontend compiló correctamente para producción.                                                     |
|  16 | Auditoría de dependencias de la raíz             | Completado                        | `EV-SEC-01`                                                                                            | Equipo de calidad y seguridad                 | La auditoría de la raíz reportó 0 vulnerabilidades.                                                    |
|  17 | Auditoría de dependencias del backend            | En tratamiento                    | `EV-SEC-02`, `RSK-SEC-01`, `DEF-SEC-02`                                                                | Equipo de backend y seguridad                 | Se identificaron 22 vulnerabilidades que requieren actualización gradual.                              |
|  18 | Auditoría de dependencias del frontend           | En tratamiento prioritario        | `EV-SEC-03`, `RSK-SEC-02`, `DEF-SEC-03`                                                                | Equipo de frontend y seguridad                | Se identificaron 51 vulnerabilidades, incluida una crítica.                                            |
|  19 | Credenciales fuera del repositorio               | Completado                        | `.gitignore`, `.env.example`, `sonar-project.properties`, `EV-SONAR-01`                                | Responsable del repositorio y calidad         | Las credenciales deben proporcionarse mediante variables de entorno.                                   |
|  20 | Análisis SonarQube ejecutado                     | Completado                        | `EV-SONAR-01`, `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04`, `EV-SONAR-09`                              | Equipo de calidad                             | Se generaron métricas, incidencias, actividad y resumen del análisis.                                  |
|  21 | Accesibilidad básica revisada                    | Parcialmente validado             | `client/src/App.js`, `13_impacto_sostenibilidad.md`, `23_revision_calidad_sonarqube_owasp_wcag_sus.md` | Equipo de frontend y calidad                  | Existen elementos básicos, pero falta una auditoría WCAG integral.                                     |
|  22 | Sostenibilidad documentada                       | Completado                        | `13_impacto_sostenibilidad.md`                                                                         | Equipo técnico y documental                   | Se documentaron compresión, caché, paginación, índices, fallback y limitaciones ambientales.           |
|  23 | Documentación general actualizada                | Completado                        | `README.md`, `docs/00_TOC.md`, `docs/08_arquitectura.md`, `smartsched-uc/docs/SPEC.md`                 | Equipo de documentación y arquitectura        | La documentación principal fue alineada con React, Node.js, Express y PostgreSQL.                      |
|  24 | Codificación UTF-8 revisada                      | En control                        | `README.md`, `docs/cierre/`, `INC-04`, `DEF-DOC-03`                                                    | Equipo de documentación                       | Los documentos corregidos deben revisarse en GitHub antes del cierre definitivo.                       |
|  25 | Informe final elaborado                          | Completado                        | `01_informe_final_proyecto.md`                                                                         | Equipo de documentación                       | Incluye alcance, resultados, calidad, riesgos, conclusiones y evidencias.                              |
|  26 | Lecciones aprendidas registradas                 | Completado                        | `02_lecciones_aprendidas.md`                                                                           | Equipo del proyecto                           | Se relacionaron causas, impactos, acciones y conocimientos transferibles.                              |
|  27 | Riesgos registrados                              | Completado                        | `03_registro_riesgos.md`                                                                               | Equipo de gestión y calidad                   | Incluye probabilidad, impacto, exposición, prioridad y tratamiento.                                    |
|  28 | Incidentes registrados                           | Completado                        | `04_registro_incidentes.md`                                                                            | Equipo del proyecto                           | Se documentaron hechos ocurridos y acciones correctivas.                                               |
|  29 | Impedimentos registrados                         | Completado                        | `05_registro_impedimentos.md`                                                                          | Equipo del proyecto                           | Se documentaron obstáculos de desarrollo, integración y cierre.                                        |
|  30 | Defectos registrados                             | Completado                        | `06_registro_defectos.md`                                                                              | Equipo de desarrollo, calidad y documentación | Incluye defectos técnicos, documentales, de seguridad y configuración.                                 |
|  31 | Supuestos registrados                            | Completado                        | `07_registro_supuestos.md`                                                                             | Equipo técnico y de gestión                   | Los supuestos fueron clasificados según su nivel de validación.                                        |
|  32 | Revisión del acta de constitución realizada      | Completado                        | `08_revision_acta_constitucion.md`                                                                     | Equipo de gestión y documentación             | Se compararon los objetivos iniciales con el resultado final del MVP.                                  |
|  33 | Declaración de Trabajo elaborada                 | Completado                        | `09_declaracion_trabajo_sow.md`                                                                        | Equipo de gestión                             | Define alcance, exclusiones, entregables y criterios de aceptación.                                    |
|  34 | Manual de capacitación elaborado                 | Completado                        | `10_manual_capacitacion.md`                                                                            | Equipo técnico y documental                   | Contiene instrucciones para estudiantes, coordinación y personal técnico.                              |
|  35 | Matriz de trazabilidad completada                | Completado                        | `11_matriz_trazabilidad.md`                                                                            | Equipo de calidad y documentación             | Relaciona requisitos, archivos, pruebas, evidencias, riesgos y cambios.                                |
|  36 | Control de configuración y cambios documentado   | Completado                        | `12_control_configuracion_cambios.md`                                                                  | Responsable del repositorio y documentación   | Incluye elementos de configuración, ramas, commits, cambios y recuperación.                            |
|  37 | Evaluación de impacto y sostenibilidad elaborada | Completado                        | `13_impacto_sostenibilidad.md`                                                                         | Equipo técnico y documental                   | Se evaluaron aspectos técnicos, sociales, económicos, ambientales y de seguridad.                      |
|  38 | Evaluación de competencias elaborada             | Completado                        | `14_evaluacion_competencias.md`                                                                        | Equipo del proyecto                           | Se relacionaron competencias del curso con código, pruebas y documentación.                            |
|  39 | Documentación de cierre completa                 | Completado                        | carpeta `docs/cierre/`                                                                                 | Equipo de documentación                       | Incluye los documentos principales exigidos para el cierre.                                            |
|  40 | Evidencias organizadas por categoría             | Completado                        | `docs/cierre/evidencias/`                                                                              | Equipo de calidad y documentación             | Se clasificaron en aplicación, base de datos, calidad, gestión, GitHub, pruebas y SonarQube.           |
|  41 | Manifiesto de evidencias generado                | Completado                        | `evidencias/00_manifiesto_evidencias.md`, `evidencias/00_manifiesto_evidencias.csv`                    | Equipo de calidad                             | Permite identificar y revisar las evidencias disponibles.                                              |
|  42 | Validación de evidencias ejecutada               | Completado                        | `evidencias/99_validacion_evidencias.md`                                                               | Equipo de calidad                             | Se generó un reporte de validación del conjunto de evidencias.                                         |
|  43 | Evidencias de aplicación disponibles             | Completado                        | `EV-APP-01` a `EV-APP-10`                                                                              | Equipo de frontend y evidencias               | Incluyen flujo principal, cursos, horario, conflictos, resumen y demostración.                         |
|  44 | Evidencias de base de datos disponibles          | Completado                        | `EV-DB-01` a `EV-DB-07`                                                                                | Equipo de base de datos                       | Incluyen salud de API, conexión, esquema, conteos, integridad y reporte.                               |
|  45 | Evidencias de gestión disponibles                | Completado                        | `EV-GEST-01` a `EV-GEST-09`                                                                            | Responsable del repositorio                   | Incluyen historial, ramas, contribuciones, estado y control de cambios.                                |
|  46 | Evidencias de pruebas disponibles                | Completado                        | `EV-TEST-01` a `EV-TEST-04`                                                                            | Equipo de calidad                             | Incluyen resultados generales, cobertura y validación integral.                                        |
|  47 | Evidencias de seguridad disponibles              | Completado                        | `EV-SEC-01` a `EV-SEC-03`                                                                              | Equipo de seguridad y calidad                 | Los resultados se encuentran documentados, aunque existen hallazgos en tratamiento.                    |
|  48 | Evidencias de SonarQube disponibles              | Completado                        | `EV-SONAR-01` a `EV-SONAR-09`                                                                          | Equipo de calidad                             | Incluyen estado, métricas, incidencias, actividad, reporte y ejecución.                                |
|  49 | Git y GitHub verificados                         | Completado                        | `EV-GIT-01` a `EV-GIT-04`, `EV-GEST-03`, `EV-GEST-06`                                                  | Responsable del repositorio                   | Se identificaron historial, ramas, estado y remoto.                                                    |
|  50 | Ramas de trabajo integradas                      | Completado                        | historial Git, `EV-GEST-03`                                                                            | Responsable del repositorio                   | Las ramas de calidad y cierre fueron integradas en `main`.                                             |
|  51 | Conflictos de merge resueltos                    | Completado                        | `INC-05`, `DEF-GIT-02`, historial Git                                                                  | Responsable del repositorio                   | Los conflictos en documentos compartidos fueron resueltos antes del push final.                        |
|  52 | Hooks de Husky revisados                         | Completado con mejora recomendada | `.husky/`, `INC-06`, `DEF-GIT-01`                                                                      | Responsable de configuración y calidad        | Los hooks están configurados, pero se recomienda reparar definitivamente su compatibilidad en Windows. |
|  53 | Datos sintéticos identificados                   | Completado                        | `EV-APP-10`, `academic.seed.js`, manifiesto de evidencias                                              | Equipo de evidencias                          | Los datos de demostración no deben presentarse como información institucional real.                    |
|  54 | Respaldo previo a la sustentación                | Completado                        | GitHub y copia local del repositorio                                                                   | Responsable del repositorio                   | El proyecto debe conservarse en GitHub y en almacenamiento local antes de la exposición.               |
|  55 | Presentación académica preparada                 | Sujeto a evaluación académica     | Aplicación, documentos, evidencias y manual de capacitación                                            | Equipo del proyecto                           | La ejecución oral y la evaluación definitiva corresponden a la sustentación.                           |
|  56 | Aceptación final del docente                     | Sujeto a evaluación académica     | Revisión de entregables y sustentación                                                                 | Docente evaluador                             | La aceptación institucional depende de la revisión académica final.                                    |

## 4. Resumen del cierre

| Clasificación                      | Cantidad |
| ---------------------------------- | -------: |
| Completados                        |       47 |
| Completados con mejora recomendada |        2 |
| En control                         |        1 |
| En tratamiento                     |        1 |
| En tratamiento prioritario         |        1 |
| Parcialmente validados             |        1 |
| Sujetos a evaluación académica     |        2 |
| Total de criterios                 |       55 |

## 5. Condiciones que no impiden el cierre

Las siguientes condiciones permanecen como oportunidades de mejora, pero no impiden el cierre académico del MVP:

1. vulnerabilidades abiertas en dependencias del backend;
2. vulnerabilidades críticas y altas en dependencias del frontend;
3. cobertura limitada del frontend;
4. ausencia de una auditoría WCAG integral;
5. compatibilidad incompleta de los hooks de Husky en Windows;
6. necesidad de modularizar `client/src/App.js`;
7. revisión final de codificación UTF-8 en documentos históricos;
8. ausencia de costos y tiempos reales auditados;
9. ausencia de medición energética formal.

## 6. Criterios de aceptación del cierre

El cierre académico se considera técnicamente viable porque:

* el MVP funciona;
* el motor de horarios fue verificado;
* las reglas académicas principales están implementadas;
* PostgreSQL y el fallback están documentados;
* las pruebas fueron aprobadas;
* la cobertura fue reportada;
* el build fue generado;
* las auditorías fueron ejecutadas;
* SonarQube fue ejecutado;
* los riesgos y defectos están registrados;
* la documentación de cierre está disponible;
* las evidencias están organizadas;
* el repositorio conserva trazabilidad;
* las limitaciones fueron declaradas de forma transparente.

## 7. Decisión de cierre

**Estado general: cierre técnico y documental completado, sujeto a la revisión académica final del docente.**

SmartSched-UC cuenta con una versión funcional, verificable y documentada dentro del alcance de un MVP académico.

Los hallazgos de seguridad, accesibilidad, cobertura del frontend y configuración se mantienen como acciones de mejora para una siguiente iteración y no se presentan como capacidades completamente resueltas.

## 8. Responsables de validación

| Área                        | Responsable                           |
| --------------------------- | ------------------------------------- |
| Desarrollo funcional        | Equipo de desarrollo de SmartSched-UC |
| Frontend                    | Equipo de frontend                    |
| Backend y scheduler         | Equipo de backend                     |
| Base de datos               | Equipo de base de datos               |
| Calidad y pruebas           | Equipo de calidad                     |
| Documentación               | Equipo de documentación               |
| Repositorio y configuración | Responsable del repositorio           |
| Evaluación académica        | Docente evaluador                     |

## 9. Evidencias automatizadas recientes

* [Manifiesto general de evidencias](./evidencias/00_manifiesto_evidencias.md)
* [Validación técnica de evidencias](./evidencias/99_validacion_evidencias.md)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Historial de commits](./evidencias/gestion/EV-GEST-02-historial-commits.md)
* [Estado del repositorio](./evidencias/gestion/EV-GEST-06-estado-repositorio.txt)
* [Validación completa de pruebas](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Reporte de base de datos](./evidencias/base-datos/EV-DB-07-reporte-base-datos.html)
* [Modo de demostración](./evidencias/aplicacion/EV-APP-10-modo-demostracion.md)

## 10. Firmas de cierre

| Rol                    | Estado                              |
| ---------------------- | ----------------------------------- |
| Equipo del proyecto    | Conforme                            |
| Responsable técnico    | Conforme                            |
| Responsable documental | Conforme                            |
| Responsable de calidad | Conforme con riesgos registrados    |
| Docente evaluador      | Sujeto a revisión y firma académica |
