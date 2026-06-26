# Registro de riesgos de SmartSched-UC

## Criterios de evaluación

Para valorar los riesgos del proyecto se emplea la siguiente escala:

* **Probabilidad:** de `1` a `5`.
* **Impacto:** de `1` a `5`.
* **Exposición:** `Probabilidad × Impacto`.

La prioridad se determina de acuerdo con el nivel de exposición:

| Exposición | Prioridad |
| ---------: | --------- |
|      1 a 4 | Baja      |
|      5 a 9 | Media     |
|    10 a 16 | Alta      |
|    17 a 25 | Crítica   |

## Registro consolidado de riesgos

| ID         | Categoría     | Riesgo                                                                    | Causa                                                                                                           | Consecuencia                                                                                                           | Prob. | Impacto | Exposición | Prioridad | Estrategia           | Respuesta aplicada                                                                                                                                                                                                                                                          | Responsable                                        | Disparador                                                                                                | Estado final   | Riesgo residual | Evidencia                                                                                                                |
| ---------- | ------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----: | ------: | ---------: | --------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------ |
| RSK-SEC-01 | Seguridad     | Dependencias vulnerables en el backend.                                   | La auditoría `npm audit` del backend reporta 22 vulnerabilidades: 1 baja, 20 moderadas y 1 alta.                | Posible exposición técnica, fallos en dependencias y necesidad de actualizaciones controladas.                         |     3 |       4 |         12 | Alta      | Mitigar              | Se registraron los hallazgos, se priorizó la vulnerabilidad alta y se estableció que las dependencias deben actualizarse de forma gradual, ejecutando pruebas antes y después de cada cambio. Se descartó el uso de `npm audit fix --force` para evitar incompatibilidades. | Equipo de backend y calidad                        | Nuevos resultados de `npm audit` o actualización de dependencias                                          | En tratamiento | Media           | [EV-SEC-02](./evidencias/calidad/EV-SEC-02-audit-backend.txt)                                                            |
| RSK-SEC-02 | Seguridad     | Dependencias vulnerables en el frontend.                                  | La auditoría `npm audit` del frontend reporta 51 vulnerabilidades: 5 bajas, 30 moderadas, 15 altas y 1 crítica. | Posibles riesgos en dependencias de desarrollo, compilación y ejecución del frontend.                                  |     4 |       5 |         20 | Crítica   | Mitigar              | Se clasificaron las vulnerabilidades según su severidad y se estableció un plan de actualización gradual de dependencias directas y transitivas, validando las pruebas y el build después de cada modificación.                                                             | Equipo de frontend y calidad                       | Nuevos resultados de `npm audit`, actualización de React o cambios en dependencias                        | En tratamiento | Alta            | [EV-SEC-03](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)                                                           |
| RSK-SEC-03 | Seguridad     | Exposición de credenciales de SonarQube en archivos del proyecto.         | Durante la configuración inicial se consideró almacenar el token directamente en `sonar-project.properties`.    | Posible uso no autorizado del servidor de análisis o acceso indebido al proyecto SonarQube.                            |     5 |       4 |         20 | Crítica   | Evitar               | Se estableció que el token no debe almacenarse en el repositorio y que debe proporcionarse mediante la variable de entorno `SONAR_TOKEN`. También se incorporó la revisión de secretos antes de cada commit.                                                                | Responsable del repositorio y seguridad            | Aparición de cadenas como `sqp_`, `SONAR_TOKEN` o credenciales en archivos versionados                    | En control     | Baja            | `smartsched-uc/sonar-project.properties`, `.gitignore`, `EV-SONAR-01`, `EV-SONAR-04`                                     |
| RSK-QLT-01 | Calidad       | Cobertura insuficiente de pruebas automatizadas en el frontend.           | La cobertura de líneas del frontend es de 43.87 % y existe una cantidad limitada de pruebas de interfaz.        | Mayor probabilidad de regresiones visuales, errores de interacción o fallos en estados de la aplicación.               |     4 |       3 |         12 | Alta      | Mitigar              | Se mantiene la prueba existente de `App.test.js` y se recomienda ampliar la cobertura mediante pruebas de filtros, pestañas, selección de cursos, generación de horarios, mensajes de error y estados de carga.                                                             | Equipo de frontend y pruebas                       | Modificaciones en `client/src/App.js`, incorporación de nuevas vistas o cambios de experiencia de usuario | En tratamiento | Media           | [EV-TEST-03](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)                                                     |
| RSK-DB-01  | Base de datos | Desalineación entre el esquema PostgreSQL y las consultas del backend.    | Evolución progresiva de tablas, columnas y estructuras de datos.                                                | Activación innecesaria del fallback, errores de lectura o resultados incompletos.                                      |     3 |       4 |         12 | Alta      | Mitigar              | Se incorporó `inspect-schema.js`, se centralizó el mapeo de datos y se documentó la estructura esperada de PostgreSQL para facilitar la verificación antes de ejecutar el sistema.                                                                                          | Equipo de backend y base de datos                  | Cambios en columnas, tablas, relaciones o consultas SQL                                                   | En control     | Media           | `server/src/database/inspect-schema.js`, `server/src/database/smartsched_uc.sql`, `academic-data.service.js`, `EV-DB-03` |
| RSK-GES-01 | Gestión       | Inconsistencia entre la documentación principal y el código implementado. | Algunos documentos históricos no fueron actualizados al mismo ritmo que la aplicación.                          | Contradicciones durante la evaluación, dificultad para comprender la arquitectura y menor trazabilidad académica.      |     5 |       3 |         15 | Alta      | Mitigar              | Se actualizaron el README, el índice documental, la arquitectura y los documentos de cierre para reflejar el stack vigente: React, Node.js, Express y PostgreSQL.                                                                                                           | Equipo de documentación y control de configuración | Revisión final del repositorio o cambios tecnológicos                                                     | En control     | Baja            | `README.md`, `docs/00_TOC.md`, `docs/08_arquitectura.md`, `smartsched-uc/docs/SPEC.md`                                   |
| RSK-GES-02 | Gestión       | Falta de datos completamente trazables de cronograma y costos reales.     | No se registraron de forma continua hojas de tiempo, costos efectivos ni actas detalladas por sprint.           | Dificultad para calcular desviaciones exactas de tiempo y presupuesto.                                                 |     4 |       3 |         12 | Alta      | Aceptar y documentar | Se declaró de manera transparente que las cifras históricas son referenciales y que no deben presentarse como costos reales sin evidencia verificable. Para futuras fases se recomienda utilizar un registro semanal de horas, costos y avances.                            | Equipo de gestión del proyecto                     | Preparación del informe final, revisión presupuestal o auditoría académica                                | Aceptado       | Media           | `01_informe_final_proyecto.md`, `docs/16_presupuesto.md`, `12_control_configuracion_cambios.md`                          |
| RSK-UX-01  | Accesibilidad | Ausencia de una auditoría formal completa basada en WCAG.                 | No se ejecutó una herramienta especializada con un reporte completo de accesibilidad.                           | Las afirmaciones de accesibilidad no pueden considerarse totalmente verificadas.                                       |     3 |       3 |          9 | Media     | Mitigar              | Se verificaron atributos básicos como `aria-label` y se documentó la necesidad de incorporar pruebas con Lighthouse, axe DevTools o herramientas equivalentes en futuras iteraciones.                                                                                       | Equipo de frontend y calidad                       | Cambios de interfaz, incorporación de nuevos componentes o evaluación de accesibilidad                    | En tratamiento | Media           | `client/src/App.js`, `13_impacto_sostenibilidad.md`, `23_revision_calidad_sonarqube_owasp_wcag_sus.md`                   |
| RSK-TEC-01 | Técnico       | Concentración excesiva de lógica en `client/src/App.js`.                  | El MVP evolucionó de forma incremental dentro de un componente principal de gran tamaño.                        | Menor mantenibilidad, mayor dificultad para realizar pruebas y mayor riesgo de errores al incorporar nuevas funciones. |     3 |       3 |          9 | Media     | Mitigar              | Se registró como deuda técnica y se propone dividir la interfaz en componentes reutilizables, hooks personalizados, servicios y módulos de presentación.                                                                                                                    | Equipo de frontend                                 | Nuevas funcionalidades, aumento del tamaño del componente o dificultad para mantener pruebas              | En tratamiento | Media           | `client/src/App.js`, `12_control_configuracion_cambios.md`                                                               |
| RSK-OPS-01 | Operación     | Dependencia de servicios locales para generar determinadas evidencias.    | La aplicación, PostgreSQL y SonarQube se ejecutan como servicios independientes.                                | La generación automática de evidencias puede quedar incompleta si uno de los servicios no está disponible.             |     3 |       3 |          9 | Media     | Mitigar              | Los scripts de evidencias verifican el estado de los servicios, registran fallos y diferencian las evidencias reales de aquellas obtenidas en modo demostración.                                                                                                            | Equipo de integración y evidencias                 | Ejecución de `generar-todas.ps1` con servicios detenidos                                                  | En control     | Baja            | `scripts/evidencias/`, `EV-DB-01`, `EV-SONAR-01`, `99_validacion_evidencias.md`                                          |
| RSK-GIT-01 | Configuración | Conflictos al fusionar ramas de documentación y código.                   | Modificaciones concurrentes en archivos compartidos como `README.md`, `docs/00_TOC.md` y documentos académicos. | El merge puede quedar detenido e impedir que los cambios lleguen a la rama `main`.                                     |     3 |       3 |          9 | Media     | Mitigar              | Se revisaron los archivos en conflicto, se resolvieron las diferencias, se realizó el commit de fusión y se estableció la práctica de actualizar la rama antes de integrar nuevos cambios.                                                                                  | Responsable del repositorio                        | Ejecución de `git merge` con cambios concurrentes                                                         | Cerrado        | Baja            | `EV-GEST-01`, `EV-GEST-03`, `EV-GEST-07`, historial Git                                                                  |
| RSK-DOC-01 | Documentación | Corrupción de caracteres por codificación incorrecta.                     | Algunos archivos Markdown fueron guardados con una codificación diferente de UTF-8.                             | Aparición de textos como `AplicaciÃ³n`, `GeneraciÃ³n` o símbolos ilegibles en GitHub.                                  |     4 |       3 |         12 | Alta      | Corregir y prevenir  | Se corrigieron los documentos afectados y se estableció que todos los archivos Markdown deben guardarse con codificación UTF-8.                                                                                                                                             | Equipo de documentación                            | Aparición de caracteres `Ã`, `ðŸ`, `â€` o símbolos incorrectos                                            | En control     | Baja            | `README.md`, `docs/cierre/`, historial de correcciones documentales                                                      |

## Resumen de exposición

| Nivel de prioridad | Cantidad de riesgos | Tratamiento general                         |
| ------------------ | ------------------: | ------------------------------------------- |
| Crítica            |                   2 | Atención inmediata y mitigación prioritaria |
| Alta               |                   5 | Seguimiento continuo y acciones correctivas |
| Media              |                   5 | Control periódico y mejoras planificadas    |
| Baja               |                   0 | Seguimiento básico                          |

## Riesgos prioritarios

Los riesgos que requieren mayor atención son:

1. **RSK-SEC-02:** vulnerabilidades identificadas en las dependencias del frontend.
2. **RSK-SEC-03:** posible exposición de credenciales de SonarQube.
3. **RSK-SEC-01:** vulnerabilidades abiertas en las dependencias del backend.
4. **RSK-QLT-01:** cobertura limitada de pruebas automatizadas en el frontend.
5. **RSK-GES-01:** inconsistencias entre documentación e implementación.
6. **RSK-DOC-01:** problemas de codificación de caracteres en archivos Markdown.

## Criterios de seguimiento

El registro de riesgos debe actualizarse cuando ocurra alguno de los siguientes eventos:

* incorporación de nuevas dependencias;
* resultados nuevos de `npm audit`;
* modificación del esquema PostgreSQL;
* incorporación de nuevas vistas;
* ejecución de un análisis SonarQube;
* cambios en la arquitectura;
* generación de nuevas evidencias;
* fusión de ramas;
* aparición de defectos documentales;
* modificación del alcance del proyecto.

## Trazabilidad relacionada

* Riesgos e incidentes: [04_registro_incidentes.md](./04_registro_incidentes.md)
* Riesgos y defectos: [06_registro_defectos.md](./06_registro_defectos.md)
* Riesgos y supuestos: [07_registro_supuestos.md](./07_registro_supuestos.md)
* Riesgos y control de cambios: [12_control_configuracion_cambios.md](./12_control_configuracion_cambios.md)
* Riesgos y sostenibilidad: [13_impacto_sostenibilidad.md](./13_impacto_sostenibilidad.md)

## Evidencias relacionadas

* [Auditoría de dependencias del backend](./evidencias/calidad/EV-SEC-02-audit-backend.txt)
* [Auditoría de dependencias del frontend](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)
* [Cobertura del frontend](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)
* [Estado del servicio SonarQube](./evidencias/sonarqube/EV-SONAR-01-system-status.json)
* [Resumen del análisis SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Estado de la base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Integridad de los datos](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
* [Control de cambios](./evidencias/gestion/EV-GEST-08-control-cambios.md)
* [Validación general de evidencias](./evidencias/99_validacion_evidencias.md)
