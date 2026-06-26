# Declaración de Trabajo (SOW) de SmartSched-UC

## 1. Propósito

Formalizar el trabajo desarrollado en el proyecto académico SmartSched-UC, delimitando su alcance, entregables, exclusiones, responsabilidades, restricciones y criterios de aceptación para la fase de control y cierre.

La presente Declaración de Trabajo constituye una referencia para verificar que el producto implementado corresponde con los objetivos del proyecto y que sus resultados cuentan con documentación y evidencias suficientes para la sustentación académica.

## 2. Descripción general del trabajo

SmartSched-UC es una aplicación web orientada a la simulación y generación de horarios académicos universitarios.

La solución utiliza:

* React para el frontend;
* Node.js y Express para el backend;
* PostgreSQL como fuente principal de datos;
* un mecanismo de fallback local para mantener la continuidad del sistema;
* un motor de generación basado en CSP y backtracking;
* pruebas automatizadas;
* análisis de cobertura;
* auditorías de dependencias;
* análisis de calidad con SonarQube;
* documentación técnica y registros de cierre.

El sistema permite seleccionar cursos, generar propuestas de horarios, controlar un máximo de 25 créditos y validar restricciones relacionadas con estudiantes, docentes, aulas, capacidad, ocupación, mantenimiento y bloques protegidos.

## 3. Objetivo general

Desarrollar y validar un MVP web capaz de generar horarios académicos compatibles con las principales restricciones universitarias, proporcionando resultados comprensibles, trazables y respaldados mediante pruebas y evidencias técnicas.

## 4. Objetivos específicos

1. Permitir la consulta y selección de cursos desde una interfaz web.
2. Generar horarios mediante un motor basado en restricciones.
3. Evitar cruces entre estudiantes, docentes y aulas.
4. Controlar que la carga académica no supere los 25 créditos.
5. Verificar disponibilidad docente y bloques protegidos.
6. Validar capacidad, ocupación y estado de las aulas.
7. Integrar PostgreSQL como fuente principal de datos.
8. Mantener continuidad mediante fallback local.
9. Proporcionar métricas, recomendaciones, advertencias y resúmenes.
10. Validar el producto mediante pruebas, cobertura, build, auditorías y SonarQube.
11. Documentar los resultados y mantener trazabilidad entre requisitos, pruebas, riesgos y evidencias.

## 5. Alcance del trabajo

### 5.1 Alcance funcional

El trabajo incluye:

* consulta de cursos;
* selección de cursos;
* simulación de matrícula;
* generación automática de horarios;
* validación del límite máximo de 25 créditos;
* detección de conflictos de estudiantes;
* detección de conflictos docentes;
* detección de conflictos de aulas;
* validación de disponibilidad docente;
* respeto de bloques administrativos o protegidos;
* validación de capacidad y ocupación de aulas;
* exclusión de aulas inactivas o en mantenimiento;
* visualización del horario generado;
* presentación de métricas, advertencias y recomendaciones;
* resumen de matrícula;
* notificaciones;
* auditoría básica;
* modo de demostración;
* endpoints de consulta, generación y salud del sistema.

### 5.2 Alcance técnico

El trabajo incluye:

* frontend desarrollado con React;
* backend desarrollado con Node.js y Express;
* conexión con PostgreSQL mediante `pg`;
* fallback local mediante datos académicos estructurados;
* motor CSP/backtracking;
* scripts de inicialización, conexión e inspección de base de datos;
* pruebas automatizadas con Jest, Supertest y React Testing Library;
* cobertura de código;
* build de producción;
* auditorías mediante `npm audit`;
* análisis estático con SonarQube;
* control de versiones mediante Git y GitHub;
* automatización de calidad y generación de evidencias;
* documentación en formato Markdown.

### 5.3 Alcance documental

El trabajo incluye:

* informe final;
* lecciones aprendidas;
* registro de riesgos;
* registro de incidentes;
* registro de impedimentos;
* registro de defectos;
* registro de supuestos;
* revisión del acta de constitución;
* Declaración de Trabajo;
* manual de capacitación;
* matriz de trazabilidad;
* control de configuración y cambios;
* evaluación de impacto y sostenibilidad;
* evaluación de competencias;
* lista de verificación de cierre;
* manifiesto y validación de evidencias.

## 6. Exclusiones

El proyecto no incluye:

* matrícula institucional real;
* integración productiva con el ERP de la Universidad Continental;
* acceso a información académica institucional en tiempo real;
* autenticación productiva multiusuario;
* gestión institucional de identidad;
* pagos o transacciones financieras;
* despliegue productivo de alta disponibilidad;
* aplicación móvil nativa;
* certificación formal de accesibilidad WCAG;
* integración definitiva con sistemas de recursos humanos;
* costos reales certificados;
* cronograma institucional auditado;
* soporte operativo posterior a la evaluación académica;
* uso de datos personales reales de estudiantes o docentes.

## 7. Entregables y criterios de aceptación

| ID     | Entregable                       | Criterio de aceptación                                                                          | Resultado                                                          | Estado                                      | Evidencia                                                                          |
| ------ | -------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------- | ---------------------------------------------------------------------------------- |
| ENT-01 | Frontend de simulación académica | Permite consultar cursos, seleccionarlos, generar horarios y visualizar el resumen de matrícula | Funcionalidad verificada mediante aplicación y prueba automatizada | Aceptado                                    | `client/src/App.js`, `client/src/App.test.js`, `EV-APP-01`, `EV-APP-09`            |
| ENT-02 | Backend de horarios              | Expone endpoints académicos y ejecuta el motor de validación y generación                       | Endpoints y reglas verificadas mediante 11 pruebas del backend     | Aceptado                                    | `academic.routes.js`, `scheduler.service.js`, `EV-TEST-01`, `EV-TEST-02`           |
| ENT-03 | Motor CSP/backtracking           | Genera una asignación válida respetando conflictos, créditos, docentes y aulas                  | Scheduler con 91.30 % de cobertura de líneas                       | Aceptado                                    | `scheduler.service.js`, `scheduler.test.js`, `EV-TEST-02`                          |
| ENT-04 | Integración con PostgreSQL       | El backend puede conectarse y consultar datos mediante PostgreSQL                               | Integración, scripts y estado de conexión documentados             | Aceptado                                    | `db.js`, `academic-data.service.js`, `EV-DB-01`, `EV-DB-02`, `EV-DB-03`            |
| ENT-05 | Fallback local                   | La aplicación continúa funcionando cuando PostgreSQL no está disponible                         | Comportamiento validado mediante endpoint de salud y pruebas       | Aceptado                                    | `db.js`, `academic.seed.js`, `PRB-11`, `EV-DB-01`                                  |
| ENT-06 | Validación de créditos           | El sistema no supera los 25 créditos y busca una combinación cercana al objetivo                | Validado mediante pruebas automatizadas                            | Aceptado                                    | `PRB-03`, `PRB-04`, `EV-TEST-01`                                                   |
| ENT-07 | Validación de conflictos         | Detecta superposición de estudiantes, docentes y aulas                                          | Validado mediante pruebas y evidencia visual                       | Aceptado                                    | `PRB-01`, `EV-APP-06`, `EV-TEST-01`                                                |
| ENT-08 | Validación de aulas              | Verifica aforo, ocupación, estado activo y mantenimiento                                        | Validado mediante pruebas y evidencia visual                       | Aceptado                                    | `PRB-06`, `PRB-07`, `EV-APP-07`                                                    |
| ENT-09 | Pruebas automatizadas            | Las suites del frontend y backend se ejecutan sin fallos                                        | 12 de 12 pruebas aprobadas                                         | Aceptado                                    | `EV-TEST-01`, `EV-TEST-04`                                                         |
| ENT-10 | Cobertura de código              | Se generan reportes cuantitativos para backend, scheduler y frontend                            | Reportes generados y archivados                                    | Aceptado con mejora recomendada en frontend | `EV-TEST-02`, `EV-TEST-03`                                                         |
| ENT-11 | Build de producción              | El frontend genera una compilación correcta para producción                                     | Build completado satisfactoriamente                                | Aceptado                                    | `EV-TEST-04`                                                                       |
| ENT-12 | Auditoría de dependencias        | Se ejecutan auditorías separadas para raíz, backend y frontend                                  | Resultados almacenados y riesgos documentados                      | Aceptado con riesgos residuales             | `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`                                              |
| ENT-13 | Análisis SonarQube               | Se ejecuta análisis estático y se archivan métricas, incidencias y estado                       | Evidencias generadas mediante API y reporte local                  | Aceptado                                    | `EV-SONAR-01`, `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04`, `EV-SONAR-09`          |
| ENT-14 | Documentación de cierre          | Los registros de control y cierre se encuentran organizados en Markdown                         | Documentos consolidados en `docs/cierre/`                          | Aceptado                                    | `docs/cierre/00_indice_cierre.md`, `docs/cierre/01_informe_final_proyecto.md`      |
| ENT-15 | Evidencias del proyecto          | Las evidencias se encuentran organizadas, identificadas y relacionadas                          | Manifiesto y validación de evidencias disponibles                  | Aceptado                                    | `evidencias/00_manifiesto_evidencias.md`, `evidencias/99_validacion_evidencias.md` |
| ENT-16 | Control de configuración         | Existe trazabilidad mediante ramas, commits, cambios y registros                                | Historial y documentos de gestión disponibles                      | Aceptado                                    | `EV-GEST-01`, `EV-GEST-02`, `EV-GEST-03`, `12_control_configuracion_cambios.md`    |

## 8. Criterios generales de aceptación

El proyecto se considera aceptado cuando:

1. la aplicación inicia correctamente;
2. el usuario puede consultar y seleccionar cursos;
3. el sistema genera un horario;
4. no se supera el límite máximo de 25 créditos;
5. se detectan conflictos de docentes, estudiantes y aulas;
6. se verifica la capacidad y el estado de las aulas;
7. el backend responde mediante sus endpoints principales;
8. PostgreSQL o el fallback local permiten obtener datos;
9. las pruebas automatizadas finalizan sin fallos;
10. el build de producción se completa correctamente;
11. las evidencias se encuentran disponibles;
12. la documentación coincide con el stack tecnológico vigente;
13. los riesgos y defectos pendientes se encuentran registrados;
14. no se almacenan credenciales en texto plano;
15. la solución puede ser demostrada y sustentada académicamente.

## 9. Resultados cuantitativos de aceptación

| Indicador                         |                           Resultado |
| --------------------------------- | ----------------------------------: |
| Pruebas del backend               |                  11 de 11 aprobadas |
| Pruebas del frontend              |                     1 de 1 aprobada |
| Total de pruebas                  |                  12 de 12 aprobadas |
| Cobertura de líneas del backend   |                             79.77 % |
| Cobertura de líneas del scheduler |                             91.30 % |
| Cobertura de líneas del frontend  |                             43.87 % |
| Build de producción               |             Compilado correctamente |
| Vulnerabilidades de la raíz       |                                   0 |
| Vulnerabilidades del backend      |                                  22 |
| Vulnerabilidades del frontend     |                                  51 |
| Límite máximo de créditos         |                                  25 |
| Estado general del MVP            | Funcional y aceptado académicamente |

## 10. Responsabilidades

| Rol                          | Responsabilidad                                              |
| ---------------------------- | ------------------------------------------------------------ |
| Equipo del proyecto          | Implementar, probar, documentar y presentar el MVP           |
| Responsable de frontend      | Mantener la interfaz, usabilidad y pruebas del cliente       |
| Responsable de backend       | Mantener endpoints, reglas del scheduler y servicios         |
| Responsable de base de datos | Mantener el esquema, conexión y scripts PostgreSQL           |
| Responsable de calidad       | Ejecutar pruebas, cobertura, auditorías y SonarQube          |
| Responsable documental       | Consolidar los documentos y evidencias de cierre             |
| Responsable del repositorio  | Gestionar ramas, commits, fusiones y configuración Git       |
| Docente evaluador            | Revisar el cumplimiento académico y emitir la decisión final |

En el contexto del proyecto académico, una misma persona puede asumir más de una responsabilidad.

## 11. Restricciones

* No utilizar datos personales reales sin autorización.
* No presentar datos sintéticos como información institucional real.
* No inventar métricas, costos, fechas, responsables ni evidencias.
* No almacenar tokens, contraseñas o secretos en Git.
* No ejecutar actualizaciones forzadas de dependencias sin verificar su impacto.
* Mantener coherencia entre código, documentación y evidencias.
* Utilizar UTF-8 en los archivos Markdown.
* Ejecutar comandos desde la ruta correcta del repositorio.
* Verificar PostgreSQL y SonarQube antes de regenerar evidencias.
* Mantener el proyecto dentro del alcance académico de un MVP.

## 12. Supuestos de ejecución

* Node.js y npm están instalados.
* Las dependencias pueden instalarse desde los archivos `package.json`.
* PostgreSQL puede encontrarse disponible en el entorno local.
* Cuando PostgreSQL no está disponible se activa el fallback local.
* SonarQube se ejecuta localmente para actualizar las métricas.
* El límite de simulación es de 25 créditos.
* Los datos académicos de demostración son suficientes para validar el MVP.
* Los scripts de pruebas y evidencias se ejecutan en PowerShell.
* Las credenciales se proporcionan mediante variables de entorno.

## 13. Riesgos asociados

Los principales riesgos de la Declaración de Trabajo son:

* vulnerabilidades de dependencias del frontend;
* vulnerabilidades de dependencias del backend;
* cobertura limitada del frontend;
* desalineación entre el esquema PostgreSQL y las consultas;
* interrupción de servicios locales;
* errores de codificación en documentos;
* exposición de credenciales;
* conflictos durante la integración de ramas;
* falta de registros reales de tiempo y costos.

El tratamiento completo se encuentra en [03_registro_riesgos.md](./03_registro_riesgos.md).

## 14. Control de cambios

Cualquier cambio que afecte el alcance debe:

1. describirse claramente;
2. indicar la causa y el impacto;
3. relacionarse con un requisito o defecto;
4. actualizar la documentación afectada;
5. validarse mediante pruebas;
6. asociarse con un commit;
7. actualizar la matriz de trazabilidad;
8. registrarse en [12_control_configuracion_cambios.md](./12_control_configuracion_cambios.md).

## 15. Validación final

La validación final comprende:

* revisión funcional de la aplicación;
* comprobación de frontend y backend;
* revisión de PostgreSQL y fallback;
* ejecución de pruebas;
* revisión de cobertura;
* comprobación del build;
* revisión de auditorías;
* análisis SonarQube;
* validación del manifiesto de evidencias;
* revisión documental;
* aceptación académica del docente.

## 16. Resultado final de la SOW

El trabajo comprometido para el MVP SmartSched-UC fue ejecutado y cuenta con una base funcional, técnica y documental verificable.

El producto cumple con los objetivos principales de generación y validación de horarios académicos. También cuenta con pruebas automatizadas, métricas de cobertura, análisis de calidad, auditorías, documentación de cierre y evidencias organizadas.

Se mantienen como oportunidades de mejora:

* actualización progresiva de dependencias;
* incremento de la cobertura del frontend;
* modularización de `App.js`;
* auditoría formal de accesibilidad;
* registro detallado de horas y costos;
* evolución hacia una integración institucional real.

Estas oportunidades no impiden el cierre académico del MVP, debido a que se encuentran registradas y cuentan con estrategias de tratamiento.

## 17. Aprobación

| Rol                    | Estado                              |
| ---------------------- | ----------------------------------- |
| Equipo del proyecto    | Conforme                            |
| Responsable técnico    | Conforme                            |
| Responsable documental | Conforme                            |
| Docente evaluador      | Sujeto a revisión y firma académica |

## Evidencias relacionadas

* [Pantalla principal](./evidencias/aplicacion/EV-APP-01-pantalla-principal.md)
* [Horario generado](./evidencias/aplicacion/EV-APP-04-horario-generado.md)
* [Resumen de matrícula](./evidencias/aplicacion/EV-APP-09-resumen-matricula.md)
* [Estado de la API y base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Integridad de datos](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
* [Pruebas generales](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt)
* [Cobertura del backend](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt)
* [Cobertura del frontend](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)
* [Validación completa](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Control de cambios](./12_control_configuracion_cambios.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)
* [Validación de evidencias](./evidencias/99_validacion_evidencias.md)
