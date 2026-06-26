# Evaluación de competencias de SmartSched-UC

## 1. Propósito

Vincular el desarrollo de SmartSched-UC con las competencias del curso Taller de Proyectos 2 y con marcos de calidad relevantes para la ingeniería de software.

La evaluación se sustenta en evidencia verificable del repositorio, incluyendo código, pruebas, documentación, registros de gestión, análisis de calidad y evidencias funcionales.

## 2. Criterios de evaluación

| Estado                       | Significado                                                             |
| ---------------------------- | ----------------------------------------------------------------------- |
| Evidenciado                  | Existe evidencia suficiente en código, pruebas, documentos o resultados |
| Parcialmente evidenciado     | Existe evidencia, pero no cubre completamente la competencia            |
| En desarrollo                | La competencia fue trabajada, pero requiere mayor validación            |
| Requiere evidencia adicional | No existe evidencia suficiente para una afirmación completa             |

## 3. Matriz consolidada de competencias

| N.° | Competencia                  | Criterio evaluado                                                           | Actividad realizada                                                                         | Decisión técnica o de gestión                                                                  | Evidencia                                                                                                         | Resultado                                      | Aprendizaje obtenido                                                                                               |
| --: | ---------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
|   1 | Aprendizaje experiencial     | Resolver un problema complejo y realista mediante una solución tecnológica  | Desarrollo de un MVP para simulación y generación de horarios universitarios                | Uso de un motor CSP/backtracking con restricciones académicas                                  | `smartsched-uc/docs/SPEC.md`, `scheduler.service.js`, `EV-TEST-02`                                                | Evidenciado                                    | Aplicar algoritmos a una necesidad académica permite comprender mejor su valor y limitaciones.                     |
|   2 | Trabajo colaborativo         | Coordinar código, documentación y entregables compartidos                   | Uso de Git, GitHub, ramas, commits, documentación y evidencias                              | Separación de cambios funcionales, de calidad y de cierre mediante ramas                       | `.git/`, `.github/`, `.husky/`, `EV-GEST-02`, `EV-GEST-03`                                                        | Evidenciado                                    | La colaboración mejora cuando existen reglas de versionamiento, revisión y trazabilidad.                           |
|   3 | Gestión del proyecto         | Organizar objetivos, alcance, riesgos, cambios y cierre                     | Elaboración de registros de riesgos, incidentes, impedimentos, defectos y cambios           | Uso de documentos de control y cierre relacionados mediante trazabilidad                       | `docs/cierre/`, `11_matriz_trazabilidad.md`, `12_control_configuracion_cambios.md`                                | Evidenciado                                    | La gestión documental permite sustentar decisiones y controlar la evolución del producto.                          |
|   4 | Ciudadanía glocal            | Resolver una necesidad local utilizando prácticas y estándares globales     | Desarrollo de una solución orientada al contexto universitario peruano                      | Relación del proyecto con ISO/IEC 25010, OWASP, WCAG y Green Software                          | `01_informe_final_proyecto.md`, `13_impacto_sostenibilidad.md`, `23_revision_calidad_sonarqube_owasp_wcag_sus.md` | Evidenciado                                    | Una problemática local puede abordarse con estándares internacionales sin perder pertinencia.                      |
|   5 | Diversidad e inclusión       | Considerar distintas condiciones y necesidades de los estudiantes           | Diseño de horarios compactos y recomendaciones para estudiantes con disponibilidad limitada | Incorporación de criterios relacionados con trabajo, prácticas y reducción de tiempos muertos  | `SPEC.md`, `client/src/App.js`, `EV-APP-09`                                                                       | Parcialmente evidenciado                       | La solución considera diferentes perfiles, aunque falta validación directa con usuarios reales.                    |
|   6 | Ética profesional            | Actuar con transparencia, responsabilidad y protección de información       | Registro de limitaciones, riesgos, vulnerabilidades y uso de datos sintéticos               | No presentar datos de demostración como institucionales ni ocultar hallazgos de seguridad      | `docs/cierre/`, `03_registro_riesgos.md`, `06_registro_defectos.md`                                               | Evidenciado                                    | La transparencia sobre limitaciones y resultados es una parte esencial de la calidad profesional.                  |
|   7 | Gestión responsable de datos | Proteger información y evitar exposición de datos personales o credenciales | Uso de datos locales de demostración y variables de entorno                                 | Mantener credenciales fuera del repositorio y diferenciar PostgreSQL del fallback              | `.env.example`, `.gitignore`, `academic.seed.js`, `EV-DB-01`                                                      | Evidenciado                                    | La gestión responsable requiere diferenciar datos reales, simulados y credenciales técnicas.                       |
|   8 | Contexto local y global      | Relacionar una necesidad universitaria con tecnologías actuales             | Aplicación web para planificación académica                                                 | Arquitectura basada en React, Node.js, Express y PostgreSQL                                    | `README.md`, `docs/08_arquitectura.md`, `smartsched-uc/README.md`                                                 | Evidenciado                                    | Las tecnologías globales pueden adaptarse a procesos académicos locales.                                           |
|   9 | Comunicación escrita         | Elaborar documentación técnica clara, estructurada y trazable               | Creación de informes, manuales, matrices y registros de cierre                              | Organización mediante Markdown, índices y enlaces entre documentos                             | `docs/00_TOC.md`, `docs/cierre/`, `00_manifiesto_evidencias.md`                                                   | Evidenciado                                    | La documentación requiere revisión continua y debe evolucionar junto con el código.                                |
|  10 | Comunicación oral            | Explicar decisiones técnicas y funcionales durante una sustentación         | Preparación de modo demostración, evidencias y manual de capacitación                       | Separación de información para estudiantes, coordinación y responsables técnicos               | `10_manual_capacitacion.md`, `EV-APP-10`, evidencias visuales                                                     | Parcialmente evidenciado                       | La evidencia técnica facilita la exposición, pero la competencia se completa durante la presentación oral.         |
|  11 | Escucha y retroalimentación  | Incorporar observaciones y mejorar el producto de forma iterativa           | Ajustes del frontend, backend, documentación y evidencias                                   | Corrección de interfaz, arquitectura, trazabilidad y control de calidad                        | Historial Git, `EV-GEST-01`, `EV-GEST-05`, `12_control_configuracion_cambios.md`                                  | Evidenciado mediante evolución del repositorio | La retroalimentación debe convertirse en cambios verificables y documentados.                                      |
|  12 | Pensamiento crítico          | Evaluar resultados, limitaciones y riesgos antes de tomar decisiones        | Análisis de cobertura, vulnerabilidades, fallos y restricciones                             | Diferenciar pruebas aprobadas, build correcto, cobertura y seguridad                           | `EV-TEST-*`, `EV-SEC-*`, `03_registro_riesgos.md`                                                                 | Evidenciado                                    | Un sistema que compila o supera pruebas no necesariamente está libre de riesgos.                                   |
|  13 | Resolución de problemas      | Identificar causas y aplicar soluciones verificables                        | Corrección de conflictos Git, fallback, esquema PostgreSQL, codificación y configuración    | Uso de registros de incidentes, defectos e impedimentos                                        | `04_registro_incidentes.md`, `05_registro_impedimentos.md`, `06_registro_defectos.md`                             | Evidenciado                                    | Registrar causa, corrección y validación mejora la resolución sistemática de problemas.                            |
|  14 | Diseño de soluciones         | Diseñar una solución coherente con requisitos funcionales y restricciones   | Arquitectura cliente-servidor y motor de generación de horarios                             | Separación entre frontend, API, servicios, datos y base de datos                               | `academic.controller.js`, `academic.routes.js`, `academic-data.service.js`, `scheduler.service.js`                | Evidenciado                                    | La separación de responsabilidades mejora mantenibilidad y capacidad de evolución.                                 |
|  15 | Desarrollo de soluciones     | Implementar e integrar los componentes del sistema                          | Desarrollo del frontend, backend, PostgreSQL y fallback                                     | Uso de React, Express, `pg`, endpoints REST y datos locales                                    | Código de `client/` y `server/`, `EV-APP-*`, `EV-DB-*`                                                            | Evidenciado                                    | La integración end-to-end permite validar el valor real del diseño.                                                |
|  16 | Verificación y validación    | Comprobar que la solución cumple las reglas definidas                       | Ejecución de pruebas automatizadas, cobertura y build                                       | Uso de Jest, Supertest, React Testing Library y reportes de cobertura                          | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03`, `EV-TEST-04`                                                            | Evidenciado                                    | Las pruebas deben priorizar las reglas críticas y ampliarse progresivamente hacia la interfaz.                     |
|  17 | Calidad de software          | Evaluar adecuación funcional, mantenibilidad, fiabilidad y seguridad        | Análisis de SonarQube, cobertura, auditorías y registros de defectos                        | Integración de controles complementarios de calidad                                            | `EV-SONAR-*`, `EV-SEC-*`, `06_registro_defectos.md`                                                               | Evidenciado con oportunidades de mejora        | La calidad debe evaluarse mediante varias métricas y no mediante un único resultado.                               |
|  18 | Seguridad de software        | Identificar y tratar riesgos de dependencias y credenciales                 | Ejecución de `npm audit` y revisión de configuración sensible                               | Actualización gradual y uso de variables de entorno                                            | `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`, `RSK-SEC-01`, `RSK-SEC-02`, `RSK-SEC-03`                                   | Evidenciado con riesgos abiertos               | La seguridad debe incorporarse desde la configuración y mantenerse durante todo el ciclo de vida.                  |
|  19 | Accesibilidad                | Considerar criterios de interacción para distintos usuarios                 | Incorporación de etiquetas básicas y navegación estructurada                                | Revisión del frontend y propuesta de auditoría WCAG                                            | `client/src/App.js`, `13_impacto_sostenibilidad.md`                                                               | Parcialmente evidenciado                       | Los atributos básicos ayudan, pero una evaluación WCAG integral requiere herramientas y pruebas especializadas.    |
|  20 | Sostenibilidad               | Aplicar medidas para utilizar recursos de forma responsable                 | Implementación de compresión, caché, paginación, límites JSON e índices SQL                 | Optimización ligera adecuada para el alcance de un MVP                                         | `server/src/app.js`, `simpleCache.middleware.js`, `smartsched_uc.sql`, `13_impacto_sostenibilidad.md`             | Evidenciado                                    | Las optimizaciones pequeñas y verificables pueden mejorar eficiencia sin aumentar innecesariamente la complejidad. |
|  21 | Impacto social               | Analizar el valor de la solución para estudiantes y coordinación            | Simulación de matrícula, detección de conflictos y recomendaciones                          | Enfoque en horarios válidos, compactos y comprensibles                                         | `client/src/App.js`, `scheduler.service.js`, `EV-APP-04`, `EV-APP-09`                                             | Evidenciado a nivel de MVP                     | El impacto aumenta cuando el sistema explica sus resultados y ayuda a tomar decisiones.                            |
|  22 | Innovación                   | Aplicar técnicas algorítmicas a un proceso académico                        | Uso de CSP/backtracking para generar horarios                                               | Evaluación de combinaciones bajo múltiples restricciones                                       | `scheduler.service.js`, `scheduler.test.js`, `EV-TEST-02`                                                         | Evidenciado                                    | La innovación no depende solo de tecnologías nuevas, sino de aplicar métodos adecuados a problemas complejos.      |
|  23 | Aprendizaje autónomo         | Investigar, integrar y corregir tecnologías no dominadas inicialmente       | Configuración de PostgreSQL, SonarQube, Husky, GitHub Actions y cobertura                   | Incorporación progresiva de herramientas y documentación                                       | Historial Git, scripts, archivos de configuración y evidencias                                                    | Evidenciado                                    | Resolver problemas de integración fortalece la autonomía técnica y la capacidad de investigación.                  |
|  24 | Mejora continua              | Identificar debilidades y establecer acciones posteriores                   | Registro de riesgos residuales, defectos y recomendaciones                                  | Mantener vulnerabilidades, cobertura frontend, WCAG y modularización como mejoras planificadas | `03_registro_riesgos.md`, `06_registro_defectos.md`, `13_impacto_sostenibilidad.md`                               | Evidenciado                                    | Un cierre responsable no oculta las limitaciones, sino que establece un camino de mejora.                          |

## 4. Relación con ISO/IEC 25010

| Característica           | Aplicación en SmartSched-UC                                              | Resultado                                 |
| ------------------------ | ------------------------------------------------------------------------ | ----------------------------------------- |
| Adecuación funcional     | Generación de horarios, validaciones, créditos, aulas y recomendaciones  | Evidenciada                               |
| Eficiencia del desempeño | Caché, paginación, compresión, límites JSON e índices SQL                | Evidenciada a nivel de MVP                |
| Compatibilidad           | Arquitectura cliente-servidor y uso de API REST                          | Evidenciada                               |
| Usabilidad               | Interfaz compacta, búsqueda, resumen, notificaciones y modo demostración | Parcialmente evidenciada                  |
| Fiabilidad               | Fallback local, endpoint de salud y pruebas automatizadas                | Evidenciada                               |
| Seguridad                | Auditorías de dependencias y gestión de variables de entorno             | Evidenciada con hallazgos abiertos        |
| Mantenibilidad           | Separación backend por capas, pruebas y control de configuración         | Evidenciada con deuda técnica en `App.js` |
| Portabilidad             | Uso de tecnologías web y scripts reproducibles                           | Parcialmente evidenciada                  |

## 5. Relación con OWASP

El proyecto incorpora controles relacionados con seguridad mediante:

* auditorías de dependencias;
* limitación del tamaño de solicitudes JSON;
* manejo de errores;
* exclusión de credenciales del repositorio;
* variables de entorno;
* registro de vulnerabilidades;
* tratamiento gradual de dependencias.

### Estado

| Elemento                           | Resultado                                  |
| ---------------------------------- | ------------------------------------------ |
| Auditoría de la raíz               | 0 vulnerabilidades                         |
| Auditoría del backend              | 22 vulnerabilidades                        |
| Auditoría del frontend             | 51 vulnerabilidades                        |
| Gestión de secretos                | Implementada mediante variables de entorno |
| Revisión completa del OWASP Top 10 | Parcialmente validada                      |

La ejecución de `npm audit` no representa por sí sola una evaluación completa del OWASP Top 10. Por ello, el cumplimiento se considera parcial y sujeto a futuras pruebas específicas.

## 6. Relación con W3C y WCAG

Se identificaron prácticas básicas de accesibilidad en la interfaz, como atributos de identificación en determinados controles.

Sin embargo, no se ejecutó una auditoría integral con:

* Lighthouse;
* axe DevTools;
* WAVE;
* lectores de pantalla;
* pruebas de contraste;
* navegación completa mediante teclado.

Por esta razón, la competencia de accesibilidad se considera parcialmente evidenciada.

## 7. Relación con Green Software

El proyecto incorpora prácticas verificables de eficiencia:

* compresión HTTP;
* caché simple;
* paginación;
* límites de solicitudes;
* índices SQL;
* build de producción;
* fallback local;
* automatización de pruebas y evidencias.

No se realizó una medición formal de energía o emisiones, por lo que no se afirma una reducción ambiental cuantificada.

## 8. Resultados cuantitativos relacionados con las competencias

| Indicador                         |                                Resultado |
| --------------------------------- | ---------------------------------------: |
| Pruebas del backend               |                       11 de 11 aprobadas |
| Pruebas del frontend              |                          1 de 1 aprobada |
| Total de pruebas                  |                       12 de 12 aprobadas |
| Cobertura de líneas del backend   |                                  79.77 % |
| Cobertura de líneas del scheduler |                                  91.30 % |
| Cobertura de líneas del frontend  |                                  43.87 % |
| Build de producción               |                  Compilado correctamente |
| Vulnerabilidades de la raíz       |                                        0 |
| Vulnerabilidades del backend      |                                       22 |
| Vulnerabilidades del frontend     |                                       51 |
| Registros de control y cierre     | 15 documentos principales más evidencias |

## 9. Fortalezas demostradas

Las principales fortalezas del proyecto son:

1. implementación funcional del motor de horarios;
2. validación de restricciones académicas;
3. cobertura elevada del scheduler;
4. integración entre frontend y backend;
5. conexión con PostgreSQL y fallback;
6. documentación estructurada;
7. trazabilidad entre requisitos, pruebas y evidencias;
8. uso de Git y ramas;
9. incorporación de controles de calidad;
10. transparencia frente a riesgos y limitaciones.

## 10. Competencias que requieren mayor fortalecimiento

Las áreas que necesitan continuar desarrollándose son:

* pruebas del frontend;
* accesibilidad formal;
* tratamiento de vulnerabilidades;
* modularización de la interfaz;
* medición de impacto con usuarios reales;
* registro de costos y tiempos reales;
* evaluación de rendimiento;
* validación productiva de PostgreSQL;
* medición de impacto energético;
* reparación definitiva de los hooks de Husky.

## 11. Autoevaluación global

| Nivel                  | Evaluación                               |
| ---------------------- | ---------------------------------------- |
| Competencias técnicas  | Alto                                     |
| Gestión y trazabilidad | Alto                                     |
| Comunicación escrita   | Alto                                     |
| Calidad y pruebas      | Alto en backend, medio en frontend       |
| Seguridad              | Medio, con tratamiento pendiente         |
| Accesibilidad          | Medio-bajo por falta de auditoría formal |
| Sostenibilidad         | Medio-alto a nivel técnico               |
| Impacto social         | Medio, validado solo como MVP            |
| Comunicación oral      | Sujeta a la sustentación final           |
| Mejora continua        | Alto                                     |

## 12. Conclusión

SmartSched-UC demuestra el desarrollo integrado de competencias técnicas, de gestión, comunicación, ética, sostenibilidad y calidad de software.

El proyecto permitió aplicar algoritmos, desarrollo web, bases de datos, pruebas, seguridad, control de versiones y documentación a un problema académico complejo.

La principal evidencia de logro se encuentra en el funcionamiento del motor de horarios, las pruebas automatizadas, la integración técnica y la trazabilidad documental.

Las áreas pendientes no invalidan el aprendizaje alcanzado. Por el contrario, permiten demostrar pensamiento crítico y capacidad de mejora continua, debido a que fueron identificadas, documentadas y relacionadas con acciones futuras.

## 13. Evidencias relacionadas

* [Pruebas generales](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt)
* [Cobertura del backend](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt)
* [Cobertura del frontend](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)
* [Validación completa](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Control de cambios](./evidencias/gestion/EV-GEST-08-control-cambios.md)
* [Historial de commits](./evidencias/gestion/EV-GEST-02-historial-commits.md)
* [Modo de demostración](./evidencias/aplicacion/EV-APP-10-modo-demostracion.png)
* [Resumen de matrícula](./evidencias/aplicacion/EV-APP-09-resumen-matricula.md)
* [Estado de la base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)
* [Impacto y sostenibilidad](./13_impacto_sostenibilidad.md)
* [Validación general de evidencias](./evidencias/99_validacion_evidencias.md)
