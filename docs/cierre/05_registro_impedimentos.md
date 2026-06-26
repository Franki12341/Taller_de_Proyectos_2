# Registro de impedimentos de SmartSched-UC

## Propósito

Documentar los obstáculos que bloquearon, retrasaron o dificultaron las actividades de desarrollo, validación, integración y cierre del proyecto SmartSched-UC.

Los impedimentos registrados corresponden a situaciones verificables que afectaron temporalmente el avance del proyecto y que requirieron acciones de mitigación o resolución.

## Registro consolidado de impedimentos

| ID     | Fecha      | Impedimento                                                                                                                         | Actividad afectada                                                                     | Impacto | Duración estimada                                                                  | Responsable de resolución                           | Acción de mitigación                                                                                                                                                                        | Resultado                                                                                                         | Estado                          | Evidencia                                                                                              |
| ------ | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
| IMP-01 | 2026-06-25 | La raíz del repositorio y la aplicación se encuentran en niveles diferentes: `Taller_de_Proyectos_2-git/` y `smartsched-uc/`.       | Inspección, trazabilidad, ejecución de comandos y cierre documental.                   | Medio   | Temporal durante la revisión y organización de evidencias.                         | Equipo de documentación y control de configuración. | Se verificaron manualmente las rutas, se documentó la estructura del repositorio y se diferenciaron claramente los comandos de la raíz y de la aplicación.                                  | Se consolidó la trazabilidad del proyecto y se redujo el riesgo de ejecutar comandos en una ubicación incorrecta. | Resuelto                        | `EV-GEST-03`, `EV-GEST-06`, estructura del repositorio                                                 |
| IMP-02 | 2026-06-25 | No se encontraron registros completos de horas reales de trabajo ni costos reales trazables.                                        | Informe final, declaración de trabajo, sostenibilidad, cronograma y cierre financiero. | Alto    | Se mantuvo durante la fase de cierre debido a la ausencia de registros históricos. | Equipo de gestión del proyecto.                     | Se eliminaron montos no verificables y se diferenciaron los costos referenciales de los costos reales. Se recomendó implementar hojas de tiempo y control de costos en futuras iteraciones. | El cierre fue documentado de forma transparente, sin presentar estimaciones como datos reales.                    | Mitigado                        | `docs/16_presupuesto.md`, `01_informe_final_proyecto.md`, `09_declaracion_trabajo_sow.md`              |
| IMP-03 | 2026-06-25 | Inicialmente no se contaba con un reporte exportado de SonarQube ni con evidencias centralizadas del análisis.                      | Evaluación de calidad, métricas de código y documentación de cierre.                   | Medio   | Temporal, hasta la ejecución del análisis y generación de evidencias.              | Equipo de calidad y configuración.                  | Se inició SonarQube localmente, se ejecutó el scanner y se generaron archivos de métricas, incidencias, actividad y resumen.                                                                | Se obtuvieron evidencias verificables del servicio y del análisis SonarQube.                                      | Resuelto                        | `EV-SONAR-01`, `EV-SONAR-02`, `EV-SONAR-03`, `EV-SONAR-04`, `EV-SONAR-09`                              |
| IMP-04 | 2026-06-25 | No se contaba con una auditoría formal completa de accesibilidad basada en WCAG.                                                    | Evaluación de accesibilidad y cumplimiento de criterios de calidad.                    | Medio   | Se mantuvo durante el cierre académico.                                            | Equipo de frontend y calidad.                       | Se verificaron elementos básicos de accesibilidad en el código, como atributos `aria-label`, y se documentó la necesidad de ejecutar una auditoría formal con herramientas especializadas.  | Se evitó afirmar un cumplimiento total de WCAG sin evidencia suficiente y se dejó establecido un plan de mejora.  | Mitigado                        | `client/src/App.js`, `13_impacto_sostenibilidad.md`, `23_revision_calidad_sonarqube_owasp_wcag_sus.md` |
| IMP-05 | 2026-06-25 | Parte de la documentación histórica presentaba caracteres dañados y referencias tecnológicas desactualizadas.                       | Cierre, capacitación, lectura en GitHub y sustentación académica.                      | Medio   | Temporal durante el proceso de saneamiento documental.                             | Equipo de documentación.                            | Se corrigieron los archivos afectados, se normalizó la codificación UTF-8 y se actualizaron las referencias al stack vigente.                                                               | Se mejoró la legibilidad y se alineó la documentación con React, Node.js, Express y PostgreSQL.                   | Resuelto                        | `README.md`, `docs/00_TOC.md`, `docs/08_arquitectura.md`, `INC-02`, `INC-04`, `DEF-05`                 |
| IMP-06 | 2026-06-26 | La fusión de la rama `docs/control-cierre` con `main` produjo conflictos en archivos modificados por ambas ramas.                   | Integración de la documentación de cierre y publicación en GitHub.                     | Alto    | Temporal, hasta resolver manualmente los conflictos.                               | Responsable del repositorio.                        | Se identificaron los archivos no fusionados con `git status`, se resolvieron los conflictos, se marcaron como solucionados y se creó el commit de integración.                              | La documentación de cierre pudo incorporarse a la rama principal.                                                 | Resuelto                        | `EV-GEST-01`, `EV-GEST-03`, `EV-GEST-07`, historial Git                                                |
| IMP-07 | 2026-06-26 | Los hooks de Husky impidieron temporalmente la creación del commit mediante el error `cannot spawn .husky/pre-commit`.              | Creación de commits e integración de cambios.                                          | Medio   | Temporal durante la integración de la rama de cierre.                              | Responsable de configuración Git y calidad.         | Se verificó la existencia de los hooks y se utilizó temporalmente `--no-verify` para completar el commit mientras se documentaba la mejora de configuración.                                | El commit pudo realizarse y el bloqueo no impidió la publicación de los cambios.                                  | Resuelto con mejora pendiente   | `.husky/pre-commit`, `.husky/commit-msg`, `.husky/pre-push`, historial Git                             |
| IMP-08 | 2026-06-25 | PostgreSQL no siempre estuvo disponible durante la ejecución de pruebas y generación de evidencias.                                 | Validación de base de datos, pruebas de integración y generación de evidencias.        | Medio   | Intermitente durante la configuración del entorno local.                           | Equipo de backend y base de datos.                  | Se utilizó el fallback local, se incorporaron scripts de prueba e inspección de esquema y se registró el modo de datos activo mediante el endpoint de salud.                                | La aplicación mantuvo continuidad funcional y las evidencias diferenciaron el uso de PostgreSQL del modo local.   | Controlado                      | `EV-DB-01`, `EV-DB-02`, `EV-DB-03`, `server/src/config/db.js`                                          |
| IMP-09 | 2026-06-25 | La generación de evidencias dependía de que la aplicación, el backend, PostgreSQL y SonarQube estuvieran activos.                   | Captura de pantallas, métricas, estado de base de datos y reportes de calidad.         | Medio   | Temporal durante cada ejecución del proceso de evidencias.                         | Equipo de integración y evidencias.                 | Se desarrollaron scripts separados por componente y un script principal para verificar servicios, ejecutar procesos y generar un manifiesto central.                                        | Se automatizó la generación y validación de evidencias, reduciendo errores manuales.                              | Resuelto                        | `scripts/evidencias/`, `00_manifiesto_evidencias.md`, `99_validacion_evidencias.md`                    |
| IMP-10 | 2026-06-25 | Las auditorías de dependencias reportaron vulnerabilidades que no podían corregirse automáticamente sin riesgo de incompatibilidad. | Seguridad, mantenimiento de dependencias y validación final.                           | Alto    | Continúa como tratamiento progresivo.                                              | Equipos de frontend, backend y calidad.             | Se evitó ejecutar `npm audit fix --force`, se separaron los resultados por componente y se estableció una actualización gradual con pruebas posteriores.                                    | El problema fue documentado y trasladado al registro de riesgos para seguimiento.                                 | Mitigado y transferido a riesgo | `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`, `03_registro_riesgos.md`                                        |

## Resumen de impedimentos

| Estado                        | Cantidad |
| ----------------------------- | -------: |
| Resueltos                     |        6 |
| Mitigados                     |        2 |
| Resuelto con mejora pendiente |        1 |
| Controlado                    |        1 |
| Total                         |       10 |

## Principales efectos sobre el proyecto

Los impedimentos identificados produjeron principalmente los siguientes efectos:

* mayor tiempo de revisión documental;
* necesidad de verificar rutas y comandos manualmente;
* retrasos en la integración de ramas;
* dificultades temporales para realizar commits;
* necesidad de ejecutar servicios locales antes de generar evidencias;
* limitaciones para calcular costos y duración real;
* necesidad de diferenciar entre datos de PostgreSQL y datos de demostración;
* imposibilidad de corregir automáticamente todas las vulnerabilidades sin afectar la estabilidad.

## Acciones preventivas

Para reducir la aparición de nuevos impedimentos se establecieron las siguientes acciones:

1. mantener una estructura de repositorio documentada;
2. ejecutar los comandos desde la ruta correcta;
3. registrar horas, avances y costos desde el inicio;
4. comprobar el estado de PostgreSQL y SonarQube antes de generar evidencias;
5. mantener los documentos en codificación UTF-8;
6. actualizar la documentación cuando cambie la arquitectura;
7. ejecutar `git pull` antes de fusionar ramas;
8. comprobar los hooks de Husky en Windows;
9. revisar dependencias de forma periódica;
10. evitar actualizaciones forzadas que puedan romper el proyecto;
11. mantener un manifiesto central de evidencias;
12. documentar claramente cuándo se utilizan datos sintéticos o fallback local.

## Diferenciación respecto de otros registros

* Los **impedimentos** representan obstáculos que bloquearon o retrasaron actividades.
* Los **incidentes** representan eventos que ocurrieron y afectaron al proyecto.
* Los **riesgos** representan eventos futuros o condiciones que todavía podrían causar impacto.
* Los **defectos** representan fallos concretos en código, configuración o documentación.

## Enlaces relacionados

* [Registro de riesgos](./03_registro_riesgos.md)
* [Registro de incidentes](./04_registro_incidentes.md)
* [Registro de defectos](./06_registro_defectos.md)
* [Registro de supuestos](./07_registro_supuestos.md)
* [Control de configuración y cambios](./12_control_configuracion_cambios.md)

## Evidencias relacionadas

* [Ramas del repositorio](./evidencias/gestion/EV-GEST-03-ramas.txt)
* [Estado del repositorio](./evidencias/gestion/EV-GEST-06-estado-repositorio.txt)
* [Historial de commits](./evidencias/gestion/EV-GEST-02-historial-commits.md)
* [Control de cambios](./evidencias/gestion/EV-GEST-08-control-cambios.md)
* [Estado de la base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Conexión con PostgreSQL](./evidencias/base-datos/EV-DB-02-conexion-postgresql.txt)
* [Estado de SonarQube](./evidencias/sonarqube/EV-SONAR-01-system-status.json)
* [Ejecución del scanner](./evidencias/sonarqube/EV-SONAR-09-ejecucion-scanner.txt)
* [Auditoría del backend](./evidencias/calidad/EV-SEC-02-audit-backend.txt)
* [Auditoría del frontend](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)
* [Manifiesto de evidencias](./evidencias/00_manifiesto_evidencias.md)
* [Validación de evidencias](./evidencias/99_validacion_evidencias.md)
