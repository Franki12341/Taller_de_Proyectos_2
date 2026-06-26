# Registro de supuestos de SmartSched-UC

## Propósito

Documentar los supuestos operativos, técnicos y académicos que condicionan el funcionamiento, la evaluación y la validez del MVP SmartSched-UC.

Los supuestos representan condiciones consideradas verdaderas para diseñar y validar la solución. Cada supuesto debe revisarse mediante código, pruebas, documentos o evidencias del proyecto.

## Registro consolidado de supuestos

| ID     | Supuesto                                                                                                                                                   | Origen                                                                         | Impacto potencial                                                                                                                       | Método de validación                                                                                                       | Resultado                                                                                                                                                       | Decisión tomada                                                                                               | Estado                               | Evidencia                                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SUP-01 | El límite máximo utilizado para la simulación de matrícula es de 25 créditos.                                                                              | Código actual, reglas del motor y pruebas automatizadas.                       | Afecta la selección de cursos, la generación del horario, las recomendaciones y el resumen de matrícula.                                | Revisar `client/src/App.js`, `scheduler.service.js` y `scheduler.test.js`; ejecutar las pruebas relacionadas con créditos. | El límite máximo de 25 créditos se encuentra implementado y validado mediante pruebas automatizadas.                                                            | Utilizar 25 créditos como referencia oficial para la validación técnica y las demostraciones del proyecto.    | Validado                             | `smartsched-uc/client/src/App.js`, `smartsched-uc/server/src/services/scheduler.service.js`, `smartsched-uc/server/test/scheduler.test.js`, `EV-TEST-01`                 |
| SUP-02 | La disponibilidad docente y los bloques protegidos representan la carga mínima necesaria para impedir asignaciones no válidas.                             | Modelo del motor de generación de horarios.                                    | Si los datos son incompletos, el sistema podría proponer horarios que no reflejen completamente la disponibilidad real de los docentes. | Revisar las reglas de `scheduler.service.js`, los datos académicos y las pruebas de disponibilidad docente.                | La lógica está implementada y validada, pero su precisión depende de la calidad y actualización de los datos ingresados.                                        | Mantener la validación como regla oficial del MVP y declarar la dependencia de la calidad de los datos.       | Parcialmente validado                | `smartsched-uc/server/src/services/scheduler.service.js`, `smartsched-uc/server/src/data/academic.seed.js`, `smartsched-uc/server/test/scheduler.test.js`, `EV-TEST-02`  |
| SUP-03 | La ocupación de un aula se determina comparando el número estimado de estudiantes con la capacidad registrada del aula.                                    | Modelo académico y reglas del scheduler.                                       | Valores incorrectos de capacidad o estudiantes estimados pueden generar alertas de aforo inexactas.                                     | Revisar las funciones de capacidad y ocupación, ejecutar las pruebas de sobrecapacidad y revisar los datos de aulas.       | La regla se encuentra implementada y las pruebas detectan aulas sobreocupadas, inactivas o en mantenimiento.                                                    | Mantener esta regla como criterio explícito del MVP y validar periódicamente la calidad de los datos.         | Validado                             | `smartsched-uc/server/src/services/scheduler.service.js`, `smartsched-uc/server/test/scheduler.test.js`, `EV-APP-07`, `EV-TEST-01`                                       |
| SUP-04 | PostgreSQL es la fuente principal de datos cuando está disponible y el fallback local garantiza la continuidad del sistema cuando la conexión falla.       | Configuración del backend y diseño de resiliencia.                             | Afecta el origen de los datos utilizados en la aplicación, las pruebas y las demostraciones.                                            | Revisar `db.js`, `academic-data.service.js`, el endpoint `/api/health` y las evidencias de base de datos.                  | El backend detecta la disponibilidad de PostgreSQL y puede utilizar datos locales cuando la conexión no se encuentra activa.                                    | Mantener ambos modos como comportamiento documentado, indicando claramente cuál se utiliza en cada evidencia. | Validado                             | `smartsched-uc/server/src/config/db.js`, `smartsched-uc/server/src/services/academic-data.service.js`, `smartsched-uc/server/src/routes/academic.routes.js`, `EV-DB-01`  |
| SUP-05 | Los estudiantes que trabajan, realizan prácticas o tienen disponibilidad limitada requieren horarios compactos y con menor cantidad de tiempos muertos.    | Problema académico descrito en el proyecto y objetivo de valor de la solución. | Influye en las recomendaciones, la evaluación de calidad del horario y la utilidad percibida por el estudiante.                         | Revisar `SPEC.md`, la interfaz, las métricas del horario y las recomendaciones generadas.                                  | El sistema presenta información y recomendaciones relacionadas con horarios compactos, pero todavía no utiliza perfiles laborales reales de estudiantes.        | Presentar esta capacidad como una simulación académica y no como una integración institucional definitiva.    | Parcialmente validado                | `smartsched-uc/docs/SPEC.md`, `smartsched-uc/client/src/App.js`, `EV-APP-04`, `EV-APP-09`                                                                                |
| SUP-06 | El entorno académico local dispone de Node.js, npm y las dependencias necesarias para ejecutar el frontend, el backend y las pruebas.                      | Requisitos técnicos del proyecto.                                              | Si el entorno no cumple los requisitos, no será posible iniciar la aplicación ni regenerar las evidencias.                              | Revisar los archivos `package.json`, ejecutar las instalaciones y validar los scripts principales.                         | El proyecto cuenta con scripts de instalación, inicio, pruebas, cobertura y validación; su ejecución depende de una configuración local compatible.             | Mantener instrucciones de instalación y capacitación, además de verificar versiones antes de la sustentación. | Validado con dependencia del entorno | `package.json`, `smartsched-uc/package.json`, `smartsched-uc/client/package.json`, `smartsched-uc/server/package.json`, `10_manual_capacitacion.md`                      |
| SUP-07 | El servicio PostgreSQL utiliza un esquema compatible con las consultas y los mapeos definidos en el backend.                                               | Diseño de base de datos e integración del sistema.                             | Las diferencias en tablas o columnas pueden provocar errores de consulta y activar el fallback local.                                   | Ejecutar `test-db.js`, `inspect-schema.js`, revisar `smartsched_uc.sql` y consultar el endpoint de salud.                  | Se dispone de scripts para validar la conexión y el esquema, aunque la compatibilidad debe comprobarse después de cada modificación.                            | Ejecutar la inspección de esquema antes de las demostraciones y después de cualquier cambio estructural.      | Parcialmente validado                | `smartsched-uc/server/src/database/test-db.js`, `smartsched-uc/server/src/database/inspect-schema.js`, `smartsched-uc/server/src/database/smartsched_uc.sql`, `EV-DB-03` |
| SUP-08 | Los datos locales utilizados por el fallback son suficientes para demostrar los principales flujos del MVP.                                                | Dataset local y modo de demostración.                                          | Los resultados permiten validar la funcionalidad, pero no representan necesariamente datos institucionales reales.                      | Revisar `academic.seed.js`, ejecutar la aplicación en modo local y comprobar cursos, docentes, aulas y horarios.           | El conjunto local permite demostrar selección, generación, conflictos, créditos, capacidad de aulas y recomendaciones.                                          | Utilizarlo únicamente como dataset académico o de demostración y etiquetar claramente su origen.              | Validado para demostración           | `smartsched-uc/server/src/data/academic.seed.js`, `EV-APP-10`, `EV-DB-01`                                                                                                |
| SUP-09 | Las pruebas automatizadas cubren las reglas más críticas del motor de generación de horarios.                                                              | Estrategia de pruebas del proyecto.                                            | Si alguna regla crítica no cuenta con prueba, podrían introducirse regresiones no detectadas.                                           | Revisar `scheduler.test.js`, ejecutar las pruebas y analizar el reporte de cobertura.                                      | Las pruebas validan conflictos, créditos, disponibilidad docente, aulas, fallback y endpoints principales. El scheduler supera el 91 % de cobertura por líneas. | Mantener las pruebas actuales como línea base y ampliarlas cuando se incorporen nuevas restricciones.         | Validado                             | `smartsched-uc/server/test/scheduler.test.js`, `EV-TEST-01`, `EV-TEST-02`                                                                                                |
| SUP-10 | Una compilación correcta del frontend demuestra que la aplicación puede generar una versión de producción, pero no garantiza ausencia de vulnerabilidades. | Resultados de build y auditorías de seguridad.                                 | Confundir compilación con seguridad podría llevar a conclusiones técnicas incorrectas.                                                  | Ejecutar el build, las pruebas y `npm audit` de forma independiente.                                                       | El build compiló correctamente, mientras las auditorías identificaron vulnerabilidades en backend y frontend.                                                   | Evaluar por separado funcionalidad, compilación, pruebas, cobertura y seguridad.                              | Validado                             | `EV-TEST-04`, `EV-SEC-01`, `EV-SEC-02`, `EV-SEC-03`                                                                                                                      |
| SUP-11 | SonarQube se encuentra disponible en el entorno local y el análisis utiliza credenciales proporcionadas mediante variables de entorno.                     | Configuración de calidad y seguridad.                                          | Sin el servicio activo o sin credenciales válidas no se pueden actualizar las métricas ni generar nuevas evidencias.                    | Consultar el estado del servicio, ejecutar el scanner y revisar los archivos de métricas generados.                        | El servicio y el análisis fueron ejecutados, generándose evidencias de estado, métricas, incidencias y actividad.                                               | Mantener el token fuera del repositorio y configurar `SONAR_TOKEN` únicamente durante la ejecución.           | Validado                             | `smartsched-uc/sonar-project.properties`, `EV-SONAR-01`, `EV-SONAR-02`, `EV-SONAR-04`, `EV-SONAR-09`                                                                     |
| SUP-12 | Los archivos Markdown deben almacenarse y visualizarse utilizando codificación UTF-8.                                                                      | Requisitos de presentación y compatibilidad con GitHub.                        | Una codificación diferente produce caracteres dañados y reduce la calidad del entregable.                                               | Abrir los documentos en GitHub o Visual Studio Code y buscar secuencias como `Ã`, `ðŸ` o `â€`.                             | Se identificaron problemas históricos de codificación y se inició su corrección en los documentos de cierre.                                                    | Utilizar UTF-8 como codificación obligatoria y validar visualmente los documentos antes de cada commit.       | Validado                             | `README.md`, `docs/cierre/`, `INC-04`, `DEF-DOC-03`                                                                                                                      |

## Clasificación de los supuestos

| Estado                               | Cantidad |
| ------------------------------------ | -------: |
| Validados                            |        7 |
| Parcialmente validados               |        3 |
| Validado con dependencia del entorno |        1 |
| Validado para demostración           |        1 |
| Total                                |       12 |

## Supuestos críticos

Los supuestos con mayor influencia sobre el funcionamiento y la evaluación del MVP son:

1. **SUP-01:** límite máximo de 25 créditos.
2. **SUP-02:** disponibilidad docente y bloques protegidos.
3. **SUP-03:** capacidad y ocupación de aulas.
4. **SUP-04:** PostgreSQL como fuente principal y fallback local.
5. **SUP-07:** compatibilidad entre el esquema PostgreSQL y el backend.
6. **SUP-09:** cobertura de las reglas críticas mediante pruebas.
7. **SUP-11:** disponibilidad de SonarQube y manejo seguro de credenciales.

## Criterios de revisión

Un supuesto debe revisarse cuando ocurra alguno de los siguientes eventos:

* modificación del límite de créditos;
* incorporación de nuevas restricciones académicas;
* cambio del esquema PostgreSQL;
* modificación del dataset local;
* inclusión de perfiles laborales reales;
* actualización de dependencias;
* incorporación de nuevas pruebas;
* modificación del motor de generación;
* cambio del entorno de ejecución;
* nueva ejecución de SonarQube;
* generación de nuevas evidencias;
* cambios en la arquitectura o el alcance del proyecto.

## Tratamiento de supuestos no confirmados

Cuando un supuesto no pueda validarse completamente se deben aplicar las siguientes acciones:

* documentar la limitación;
* evitar presentarlo como una capacidad productiva totalmente verificada;
* indicar qué evidencia sería necesaria para confirmarlo;
* relacionarlo con el registro de riesgos;
* establecer una acción de validación para una futura iteración;
* mantener diferenciados los datos reales y los datos de demostración.

## Trazabilidad relacionada

* [Registro de riesgos](./03_registro_riesgos.md)
* [Registro de incidentes](./04_registro_incidentes.md)
* [Registro de impedimentos](./05_registro_impedimentos.md)
* [Registro de defectos](./06_registro_defectos.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)
* [Control de configuración y cambios](./12_control_configuracion_cambios.md)

## Evidencias relacionadas

* [Estado de PostgreSQL y fallback](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Conexión con PostgreSQL](./evidencias/base-datos/EV-DB-02-conexion-postgresql.txt)
* [Esquema de tablas](./evidencias/base-datos/EV-DB-03-esquema-tablas.txt)
* [Conteo de registros](./evidencias/base-datos/EV-DB-04-conteo-registros.csv)
* [Integridad de datos](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
* [Pruebas generales](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt)
* [Cobertura del backend](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt)
* [Validación integral](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Modo de demostración](./evidencias/aplicacion/EV-APP-10-modo-demostracion.md)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
