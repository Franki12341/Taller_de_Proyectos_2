# Registro de incidentes de SmartSched-UC

## Criterio de registro

En este documento se registran únicamente eventos ocurridos y verificables mediante archivos, commits, resultados de herramientas o el estado observable del repositorio.

Un incidente representa un hecho que afectó el desarrollo, la calidad, la seguridad, la documentación o la integración del proyecto. Los eventos que todavía no han ocurrido se gestionan en el registro de riesgos.

## Registro consolidado de incidentes

| ID     | Fecha      | Descripción                                                                                                                                                                                                   | Módulo                         | Prioridad | Impacto                                                                                                       | Responsable                                            | Causa raíz                                                                                                        | Acción inmediata                                                                                                           | Acción correctiva                                                                                                                                                                        | Fecha de resolución                             | Estado                       | Evidencia                                                                                                                                                 | Commit                                                       |
| ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| INC-01 | 2026-06-25 | El índice principal del repositorio contenía referencias a `20_analisis_validacion_problema.md` y `21_evidencias_validacion_tdd_mvp.md` que no coincidían con los nombres o rutas disponibles en ese momento. | Documentación principal        | Alta      | Interrupción de la trazabilidad documental y enlaces sin acceso al contenido esperado.                        | Equipo de documentación y control de configuración     | Reestructuración documental incompleta y cambios de nombres sin actualización inmediata del índice.               | Se revisó el historial Git y se verificaron las rutas reales de los documentos.                                            | Se restauraron los archivos con extensión `.md`, se corrigieron sus enlaces y se actualizó `docs/00_TOC.md`.                                                                             | 2026-06-25                                      | Cerrado                      | `docs/00_TOC.md`, `docs/20_analisis_validacion_problema.md`, `docs/21_evidencias_validacion_tdd_mvp.md`, `EV-GEST-02`                                     | `41b23e0`, `c101868`, `3804bdd`                              |
| INC-02 | 2026-06-25 | Durante la revisión de cierre se detectaron referencias desactualizadas a MERN, MongoDB y FastAPI, mientras la aplicación vigente utiliza React, Node.js, Express y PostgreSQL.                               | Documentación y arquitectura   | Alta      | Contradicción entre la documentación académica y la solución implementada.                                    | Equipo de documentación y arquitectura                 | El stack tecnológico evolucionó sin que todos los documentos históricos fueran actualizados de manera simultánea. | Se comparó el contenido de los documentos principales con la estructura y dependencias reales de `smartsched-uc/`.         | Se actualizaron el README, el índice, la arquitectura y la especificación para reflejar correctamente el stack tecnológico vigente.                                                      | 2026-06-26                                      | Cerrado                      | `README.md`, `docs/00_TOC.md`, `docs/08_arquitectura.md`, `smartsched-uc/docs/SPEC.md`, `smartsched-uc/server/package.json`                               | Historial de correcciones documentales de cierre             |
| INC-03 | 2026-06-18 | Durante la configuración inicial de SonarQube se detectó el uso de un token visible en la configuración local del proyecto.                                                                                   | Calidad y seguridad            | Crítica   | Posible exposición de credenciales y acceso no autorizado al proyecto de análisis.                            | Responsable del repositorio y configuración de calidad | Gestión inadecuada de secretos durante la integración inicial de SonarQube.                                       | Se evitó continuar difundiendo el token y se revisaron los archivos versionados.                                           | Se eliminó el uso de credenciales en texto plano y se estableció el uso de la variable de entorno `SONAR_TOKEN`. También se incorporó la revisión de secretos antes de realizar commits. | 2026-06-25                                      | Cerrado                      | `smartsched-uc/sonar-project.properties`, `.gitignore`, `EV-SONAR-01`, `EV-SONAR-04`                                                                      | `3804bdd` y corrección posterior de configuración            |
| INC-04 | 2026-06-25 | Algunos documentos Markdown presentaban caracteres dañados, como `AplicaciÃ³n`, `GeneraciÃ³n` y otros símbolos incorrectos.                                                                                   | Documentación                  | Media     | Reducción de la legibilidad y presentación deficiente de los entregables en GitHub.                           | Equipo de documentación                                | Archivos guardados con una codificación diferente de UTF-8 o conversiones incorrectas entre codificaciones.       | Se identificaron los documentos afectados y se revisó el contenido visible en GitHub.                                      | Se corrigieron los caracteres dañados y se estableció UTF-8 como codificación obligatoria para los archivos Markdown.                                                                    | 2026-06-26                                      | Cerrado                      | `README.md`, `docs/00_TOC.md`, `docs/cierre/01_informe_final_proyecto.md`, `docs/cierre/02_lecciones_aprendidas.md`, `docs/cierre/03_registro_riesgos.md` | Historial de correcciones documentales de cierre             |
| INC-05 | 2026-06-26 | La fusión de la rama `docs/control-cierre` con `main` produjo conflictos en `README.md`, `docs/00_TOC.md`, `docs/20_analisis_validacion_problema.md` y `docs/21_evidencias_validacion_tdd_mvp.md`.            | Git y control de configuración | Alta      | El merge quedó detenido y la documentación de cierre no apareció inicialmente en la rama principal de GitHub. | Responsable del repositorio                            | Ambas ramas contenían modificaciones diferentes sobre los mismos archivos.                                        | Se ejecutó `git status` y se identificaron los archivos con rutas no fusionadas.                                           | Se resolvieron los conflictos, se marcaron los archivos como resueltos, se realizó el commit de integración y posteriormente se subieron los cambios a `main`.                           | 2026-06-26                                      | Cerrado                      | Historial Git, `EV-GEST-01`, `EV-GEST-03`, `EV-GEST-07`                                                                                                   | Commit de fusión de `docs/control-cierre` con `main`         |
| INC-06 | 2026-06-26 | Los hooks de Husky impidieron temporalmente la creación del commit mediante el mensaje `cannot spawn .husky/pre-commit`.                                                                                      | Git, Husky y automatización    | Media     | Interrupción temporal del proceso de commit y retraso en la integración de la documentación.                  | Responsable del repositorio y configuración de calidad | Incompatibilidad de ejecución o configuración del hook `pre-commit` en el entorno Windows.                        | Se verificó la existencia de los archivos en `.husky/` y se confirmó que el problema correspondía a la ejecución del hook. | Para completar la integración se utilizó temporalmente `--no-verify`. El ajuste permanente de los hooks quedó documentado como mejora de configuración.                                  | 2026-06-26                                      | Cerrado con acción de mejora | `.husky/pre-commit`, `.husky/commit-msg`, `.husky/pre-push`, historial de terminal                                                                        | Historial Git del commit de cierre                           |
| INC-07 | 2026-06-25 | La aplicación activó el modo de datos locales cuando PostgreSQL no estuvo disponible durante determinadas pruebas.                                                                                            | Backend y base de datos        | Media     | La aplicación continuó funcionando, pero los datos utilizados no provenían de la base PostgreSQL.             | Equipo de backend y base de datos                      | Servicio PostgreSQL detenido, configuración incompleta o diferencia temporal entre el esquema y las consultas.    | Se consultó el endpoint de salud y se verificó el modo de datos activo.                                                    | Se documentó el fallback, se incorporaron scripts de conexión e inspección del esquema y se diferenciaron las evidencias reales de las obtenidas en modo demostración.                   | 2026-06-25                                      | Cerrado y controlado         | `server/src/config/db.js`, `server/src/database/test-db.js`, `server/src/database/inspect-schema.js`, `EV-DB-01`, `EV-DB-05`                              | Cambios de integración PostgreSQL y generación de evidencias |
| INC-08 | 2026-06-25 | Las auditorías de dependencias identificaron 22 vulnerabilidades en el backend y 51 en el frontend.                                                                                                           | Seguridad de dependencias      | Crítica   | Presencia de dependencias con vulnerabilidades bajas, moderadas, altas y una crítica en el frontend.          | Equipos de backend, frontend y calidad                 | Uso de dependencias directas y transitivas desactualizadas o asociadas con herramientas antiguas del ecosistema.  | Se generaron y almacenaron los resultados separados de `npm audit` para la raíz, el backend y el frontend.                 | Se estableció un tratamiento gradual, priorizando las vulnerabilidades de mayor severidad y evitando `npm audit fix --force` para no introducir cambios incompatibles.                   | No aplica: permanece en tratamiento como riesgo | Convertido en riesgo activo  | `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`, `03_registro_riesgos.md`                                                                                           | Evidencias de auditoría del cierre                           |

## Resumen de incidentes

| Estado                       | Cantidad |
| ---------------------------- | -------: |
| Cerrados                     |        6 |
| Cerrado con acción de mejora |        1 |
| Convertido en riesgo activo  |        1 |
| Total                        |        8 |

## Análisis de causas recurrentes

Las principales causas identificadas fueron:

1. actualización tardía de la documentación frente a la evolución del código;
2. gestión inicial inadecuada de la codificación UTF-8;
3. modificaciones concurrentes en diferentes ramas de Git;
4. configuración de herramientas de calidad sin validar completamente su compatibilidad con Windows;
5. falta de centralización inicial de secretos y variables de entorno;
6. dependencia de servicios locales para ejecutar todas las capacidades del proyecto;
7. uso de dependencias con vulnerabilidades conocidas.

## Acciones preventivas establecidas

Para evitar que los incidentes vuelvan a ocurrir se establecieron las siguientes acciones:

* guardar todos los documentos Markdown utilizando UTF-8;
* actualizar el README, el índice y la arquitectura cuando se modifique el stack;
* ejecutar `git pull` antes de iniciar una integración;
* revisar `git status` antes de realizar commits y fusiones;
* utilizar ramas para cambios documentales o funcionales;
* utilizar variables de entorno para credenciales y tokens;
* comprobar que los hooks de Husky funcionen en Windows antes de hacerlos obligatorios;
* ejecutar pruebas, build y auditorías después de actualizar dependencias;
* comprobar el estado de PostgreSQL y SonarQube antes de generar evidencias;
* diferenciar claramente datos reales y datos utilizados en modo demostración.

## Diferenciación respecto del registro de riesgos

* Los incidentes documentados representan **hechos que ocurrieron durante el proyecto**.
* Los riesgos representan eventos futuros o condiciones que todavía podrían afectar al proyecto.
* Cuando un incidente no puede eliminarse totalmente, su condición residual se traslada al [registro de riesgos](./03_registro_riesgos.md).
* Las vulnerabilidades de dependencias se registraron inicialmente como incidente al ser detectadas y continúan gestionándose como riesgos activos.

## Trazabilidad relacionada

* [Registro de riesgos](./03_registro_riesgos.md)
* [Registro de impedimentos](./05_registro_impedimentos.md)
* [Registro de defectos](./06_registro_defectos.md)
* [Control de configuración y cambios](./12_control_configuracion_cambios.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)

## Evidencias relacionadas

* [Historial de commits](./evidencias/gestion/EV-GEST-02-historial-commits.md)
* [Control de cambios](./evidencias/gestion/EV-GEST-08-control-cambios.md)
* [Estado del repositorio](./evidencias/gestion/EV-GEST-06-estado-repositorio.txt)
* [Auditoría de dependencias de la raíz](./evidencias/calidad/EV-SEC-01-audit-raiz.txt)
* [Auditoría de dependencias del backend](./evidencias/calidad/EV-SEC-02-audit-backend.txt)
* [Auditoría de dependencias del frontend](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)
* [Estado de la base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Validación general de evidencias](./evidencias/99_validacion_evidencias.md)
