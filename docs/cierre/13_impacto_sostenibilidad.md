# Impacto y sostenibilidad de SmartSched-UC

## 1. Propósito

Evaluar el impacto técnico, social, académico, económico y ambiental del proyecto SmartSched-UC, relacionándolo con criterios de sostenibilidad y Green Software.

La evaluación se basa únicamente en funcionalidades, configuraciones, documentos y evidencias verificables del repositorio. No se atribuyen al proyecto capacidades productivas, mediciones ambientales o beneficios institucionales que no hayan sido demostrados.

## 2. Alcance de la evaluación

La evaluación comprende:

* eficiencia del backend;
* optimización de transferencia de datos;
* uso de caché;
* paginación;
* diseño de base de datos;
* continuidad operativa;
* mantenibilidad;
* seguridad de dependencias;
* accesibilidad;
* impacto académico;
* beneficio social;
* impacto económico;
* escalabilidad;
* gestión responsable de datos;
* oportunidades de reducción del consumo computacional.

## 3. Criterios de evaluación

| Estado                | Significado                                                       |
| --------------------- | ----------------------------------------------------------------- |
| Implementado          | Existe código o configuración verificable                         |
| Verificado            | Existe código y evidencia técnica de funcionamiento               |
| Parcialmente validado | Existe implementación parcial, pero falta una evaluación integral |
| En tratamiento        | Existe un hallazgo pendiente de corrección                        |
| Propuesto             | Se plantea como mejora futura y no como capacidad actual          |
| No aplica             | El criterio no forma parte del alcance del MVP                    |

## 4. Matriz consolidada de impacto y sostenibilidad

| Dimensión                | Medida o hallazgo                                       | Impacto esperado                                                                                       | Estado                                        | Evidencia                                                              |
| ------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ---------------------------------------------------------------------- |
| Green Software           | Compresión HTTP en el backend                           | Reduce el tamaño de las respuestas y la cantidad de datos transferidos entre servidor y cliente        | Implementado                                  | `smartsched-uc/server/src/app.js`                                      |
| Green Software           | Caché simple para solicitudes GET                       | Evita reprocesar determinadas consultas repetidas y reduce operaciones innecesarias                    | Implementado                                  | `smartsched-uc/server/src/middlewares/simpleCache.middleware.js`       |
| Green Software           | Paginación de listados académicos                       | Reduce el volumen de registros entregados por cada solicitud                                           | Verificado                                    | `academic-data.service.js`, `PRB-10`, `EV-TEST-01`                     |
| Green Software           | Límite de `100kb` para cuerpos JSON                     | Evita cargas excesivas y reduce el riesgo de uso innecesario de memoria y red                          | Implementado                                  | `smartsched-uc/server/src/app.js`                                      |
| Green Software           | Índices SQL                                             | Mejora el rendimiento de consultas frecuentes y reduce el trabajo de búsqueda de la base de datos      | Implementado                                  | `smartsched-uc/server/src/database/smartsched_uc.sql`                  |
| Green Software           | Separación entre frontend y backend                     | Permite optimizar y escalar cada componente de forma independiente                                     | Verificado                                    | Estructura `client/` y `server/`                                       |
| Green Software           | Build de producción del frontend                        | Genera artefactos optimizados para despliegue y reduce el tamaño de los recursos entregados            | Verificado                                    | `EV-TEST-04`                                                           |
| Sostenibilidad operativa | Fallback local ante la indisponibilidad de PostgreSQL   | Evita la interrupción completa del sistema durante pruebas y demostraciones                            | Verificado                                    | `server/src/config/db.js`, `PRB-11`, `EV-DB-01`                        |
| Sostenibilidad operativa | Endpoint de salud                                       | Permite detectar el modo de datos y facilitar el diagnóstico técnico                                   | Verificado                                    | `/api/health`, `EV-DB-01`                                              |
| Sostenibilidad operativa | Scripts de inicialización e inspección de PostgreSQL    | Reducen errores manuales y facilitan la recuperación del entorno                                       | Implementado                                  | `init-db.js`, `test-db.js`, `inspect-schema.js`                        |
| Mantenibilidad           | Arquitectura cliente-servidor                           | Facilita la separación de responsabilidades y el mantenimiento del proyecto                            | Verificado                                    | `client/`, `server/`, `08_revision_acta_constitucion.md`               |
| Mantenibilidad           | Pruebas automatizadas del backend                       | Disminuyen el riesgo de regresiones en las reglas críticas                                             | Verificado                                    | `EV-TEST-01`, `EV-TEST-02`                                             |
| Mantenibilidad           | Cobertura elevada del scheduler                         | Protege el componente principal del sistema frente a modificaciones futuras                            | Verificado                                    | 91.30 % de líneas en `EV-TEST-02`                                      |
| Mantenibilidad           | Concentración de lógica en `App.js`                     | Incrementa el costo de mantenimiento y futuras modificaciones                                          | En tratamiento                                | `client/src/App.js`, `DEF-UX-01`, `RSK-TEC-01`                         |
| Seguridad                | Auditoría de dependencias de la raíz                    | Permite identificar riesgos en las dependencias generales                                              | Verificado                                    | `EV-SEC-01`                                                            |
| Seguridad                | Auditoría de dependencias del backend                   | Identificó 22 vulnerabilidades que requieren actualización gradual                                     | En tratamiento                                | `EV-SEC-02`, `RSK-SEC-01`                                              |
| Seguridad                | Auditoría de dependencias del frontend                  | Identificó 51 vulnerabilidades, incluida una crítica                                                   | En tratamiento prioritario                    | `EV-SEC-03`, `RSK-SEC-02`                                              |
| Seguridad                | Variables de entorno para credenciales                  | Evita almacenar secretos directamente en el repositorio                                                | Implementado                                  | `.env.example`, `.gitignore`, configuración de `SONAR_TOKEN`           |
| Accesibilidad            | Uso de etiquetas y atributos básicos de accesibilidad   | Mejora la identificación de controles y navegación asistida                                            | Parcialmente validado                         | `client/src/App.js`                                                    |
| Accesibilidad            | Auditoría formal basada en WCAG                         | Permitirá medir contraste, navegación por teclado, semántica y compatibilidad con lectores de pantalla | Propuesto                                     | `23_revision_calidad_sonarqube_owasp_wcag_sus.md`                      |
| Impacto social           | Apoyo a estudiantes con disponibilidad limitada         | Puede facilitar la búsqueda de horarios compatibles con trabajo o prácticas                            | Parcialmente validado                         | `smartsched-uc/docs/SPEC.md`, `client/src/App.js`                      |
| Impacto social           | Reducción de conflictos académicos                      | Ayuda a identificar cruces y restricciones antes de la matrícula                                       | Verificado en el MVP                          | `EV-APP-06`, `PRB-01`                                                  |
| Impacto social           | Mejor comprensión de la carga académica                 | Presenta créditos, recomendaciones y resumen de matrícula                                              | Verificado                                    | `EV-APP-05`, `EV-APP-09`                                               |
| Impacto académico        | Aplicación de CSP y backtracking                        | Permite resolver un problema complejo de planificación con múltiples restricciones                     | Verificado                                    | `scheduler.service.js`, `EV-TEST-02`                                   |
| Impacto académico        | Aplicación de pruebas, cobertura y calidad              | Integra conocimientos de ingeniería de software en un producto verificable                             | Verificado                                    | `EV-TEST-*`, `EV-SONAR-*`                                              |
| Impacto académico        | Trazabilidad documental                                 | Facilita la evaluación, defensa y transferencia de conocimiento                                        | Verificado                                    | `11_matriz_trazabilidad.md`, `00_manifiesto_evidencias.md`             |
| Impacto económico        | Uso de herramientas de código abierto o gratuitas       | Reduce el costo de licencias para el desarrollo académico                                              | Verificado a nivel de herramientas utilizadas | React, Node.js, Express, PostgreSQL, Git, GitHub y SonarQube Community |
| Impacto económico        | Automatización de generación y validación de evidencias | Reduce tiempo manual de preparación del cierre                                                         | Implementado                                  | `scripts/evidencias/`                                                  |
| Impacto económico        | Estimación de costos reales del proyecto                | No existen registros suficientes para calcular un costo real auditado                                  | No validado como costo real                   | `01_informe_final_proyecto.md`, `docs/16_presupuesto.md`               |
| Impacto ambiental        | Medición directa de consumo energético                  | No se realizó una medición formal de energía, carbono o infraestructura                                | No disponible en el alcance actual            | Registro de limitaciones del proyecto                                  |
| Impacto ambiental        | Reducción potencial de procesamiento innecesario        | La caché, paginación, compresión e índices pueden disminuir operaciones y transferencia                | Parcialmente validado                         | Código del backend y esquema SQL                                       |
| Escalabilidad            | Uso de PostgreSQL                                       | Permite persistencia, relaciones, consultas e índices para futuros volúmenes mayores                   | Implementado                                  | `db.js`, `smartsched_uc.sql`                                           |
| Escalabilidad            | Servicios desacoplados                                  | Facilita migrar o desplegar frontend y backend por separado                                            | Verificado                                    | Arquitectura del repositorio                                           |
| Escalabilidad            | Caché distribuida                                       | No existe Redis ni otro mecanismo distribuido en el MVP                                                | Propuesto                                     | Mejora futura                                                          |
| Escalabilidad            | Despliegue productivo de alta disponibilidad            | No forma parte del alcance académico actual                                                            | No aplica                                     | `09_declaracion_trabajo_sow.md`                                        |
| Gobernanza de datos      | Uso de datos académicos sintéticos o de demostración    | Evita exponer información personal real durante el desarrollo y la sustentación                        | Implementado                                  | `academic.seed.js`, `EV-APP-10`                                        |
| Gobernanza de datos      | Identificación del modo de datos                        | Permite diferenciar PostgreSQL de los datos locales                                                    | Verificado                                    | `EV-DB-01`                                                             |
| Gobernanza de datos      | Protección de datos personales institucionales          | No se utilizaron datos personales reales en el MVP                                                     | Cumplido dentro del alcance                   | Dataset local y documentación de cierre                                |

## 5. Principios de Green Software aplicados

### 5.1 Eficiencia energética indirecta

El proyecto no mide directamente el consumo energético. Sin embargo, incorpora medidas que pueden reducir el trabajo computacional:

* caché de respuestas GET;
* paginación;
* compresión HTTP;
* limitación del tamaño de solicitudes JSON;
* índices en PostgreSQL;
* procesamiento centralizado de reglas;
* build optimizado del frontend.

Estas medidas favorecen un uso más eficiente de CPU, memoria, red y base de datos, aunque no permiten calcular una reducción exacta de energía o emisiones.

### 5.2 Eficiencia de red

La compresión HTTP reduce el tamaño de los datos enviados.

La paginación evita entregar listados completos cuando el usuario solo necesita una parte de la información.

El límite de carga JSON previene solicitudes excesivamente grandes.

### 5.3 Eficiencia de datos

Los índices SQL permiten localizar registros con menor cantidad de operaciones.

La estructura relacional de PostgreSQL favorece la consistencia y evita duplicaciones innecesarias cuando el modelo se mantiene normalizado.

### 5.4 Continuidad y resiliencia

El fallback local permite demostrar el sistema cuando PostgreSQL no está disponible.

Este mecanismo reduce interrupciones durante pruebas, capacitación y sustentación, pero debe mantenerse claramente diferenciado de una operación institucional productiva.

## 6. Impacto social

SmartSched-UC busca contribuir a una mejor planificación académica mediante:

* identificación anticipada de cruces;
* validación de créditos;
* revisión de capacidad de aulas;
* recomendaciones de carga académica;
* generación de horarios;
* presentación de información resumida;
* apoyo a estudiantes que trabajan o realizan prácticas.

El beneficio social se encuentra validado a nivel de MVP y simulación. Para medir su impacto real sería necesario realizar pruebas con usuarios, recopilar indicadores de satisfacción y comparar tiempos de planificación antes y después de la implementación.

## 7. Impacto académico

El proyecto permite integrar conocimientos de:

* algoritmos;
* ingeniería de software;
* desarrollo web;
* bases de datos;
* pruebas automatizadas;
* seguridad;
* control de versiones;
* sostenibilidad;
* documentación;
* gestión de riesgos;
* calidad de software.

El motor CSP/backtracking constituye el principal aporte técnico, debido a que resuelve combinaciones sujetas a restricciones académicas.

## 8. Impacto económico

El uso de tecnologías gratuitas y de código abierto reduce el costo de implementación académica.

Las principales herramientas utilizadas son:

* React;
* Node.js;
* Express;
* PostgreSQL;
* Jest;
* Git;
* GitHub;
* SonarQube Community;
* PowerShell.

No se dispone de registros completos de horas, tarifas, infraestructura o costos indirectos. Por ello, el proyecto no presenta una cifra como costo real certificado.

## 9. Impacto ambiental

No se realizó una medición directa de:

* consumo eléctrico;
* emisiones de carbono;
* consumo de CPU por transacción;
* uso de memoria;
* consumo de red acumulado;
* impacto del alojamiento.

En consecuencia, el proyecto no afirma una reducción ambiental cuantificada.

Las medidas implementadas se presentan como prácticas técnicas que pueden favorecer la eficiencia, no como evidencia de reducción exacta de emisiones.

## 10. Seguridad y sostenibilidad

La sostenibilidad técnica también depende de mantener el sistema seguro y actualizable.

Los principales hallazgos son:

* 0 vulnerabilidades en las dependencias de la raíz;
* 22 vulnerabilidades en el backend;
* 51 vulnerabilidades en el frontend;
* necesidad de actualizar paquetes gradualmente;
* necesidad de evitar credenciales en archivos versionados;
* necesidad de revisar las dependencias asociadas con `react-scripts`.

No se recomienda utilizar `npm audit fix --force` sin comprobar previamente las consecuencias funcionales.

## 11. Accesibilidad

La aplicación incorpora elementos básicos de accesibilidad, incluyendo atributos de identificación en controles.

Sin embargo, no se realizó una auditoría integral con herramientas como:

* Lighthouse;
* axe DevTools;
* WAVE;
* lectores de pantalla;
* validadores de contraste.

El estado de accesibilidad se clasifica como parcialmente validado.

## 12. Indicadores de sostenibilidad técnica

| Indicador                         |               Resultado |
| --------------------------------- | ----------------------: |
| Pruebas automatizadas aprobadas   |                12 de 12 |
| Cobertura de líneas del backend   |                 79.77 % |
| Cobertura de líneas del scheduler |                 91.30 % |
| Cobertura de líneas del frontend  |                 43.87 % |
| Build de producción               | Compilado correctamente |
| Vulnerabilidades en la raíz       |                       0 |
| Vulnerabilidades en el backend    |                      22 |
| Vulnerabilidades en el frontend   |                      51 |
| Compresión HTTP                   |            Implementada |
| Caché simple                      |            Implementada |
| Paginación                        |            Implementada |
| Índices SQL                       |           Implementados |
| Fallback local                    |            Implementado |
| Auditoría WCAG completa           |            No ejecutada |
| Medición energética formal        |            No ejecutada |

## 13. Riesgos de sostenibilidad

Los principales riesgos son:

1. dependencias vulnerables u obsoletas;
2. cobertura limitada del frontend;
3. concentración de lógica en `App.js`;
4. ausencia de una medición energética formal;
5. falta de una auditoría WCAG integral;
6. dependencia de servicios locales;
7. diferencias potenciales entre PostgreSQL y el fallback;
8. ausencia de métricas reales de costos;
9. crecimiento del volumen de datos sin caché distribuida;
10. falta de monitoreo productivo.

Estos riesgos se encuentran relacionados con [03_registro_riesgos.md](./03_registro_riesgos.md).

## 14. Recomendaciones de mejora

### Corto plazo

* reducir las vulnerabilidades críticas y altas;
* incrementar las pruebas del frontend;
* dividir `App.js` en componentes;
* ejecutar una auditoría WCAG;
* mantener los secretos fuera del repositorio;
* comprobar PostgreSQL antes de cada demostración.

### Mediano plazo

* incorporar mediciones de rendimiento;
* registrar tiempos de respuesta;
* medir uso de memoria;
* comparar respuestas con y sin caché;
* incorporar lazy loading en módulos adecuados;
* automatizar Lighthouse y axe;
* revisar consultas SQL con `EXPLAIN ANALYZE`.

### Largo plazo

* incorporar caché distribuida cuando el volumen lo justifique;
* desplegar en infraestructura medible;
* registrar consumo energético;
* calcular intensidad de carbono del entorno de alojamiento;
* aplicar monitoreo;
* integrar datos institucionales mediante controles de privacidad;
* realizar estudios con usuarios reales;
* medir reducción de tiempos de planificación.

## 15. Limitaciones de la evaluación

La evaluación presenta las siguientes limitaciones:

* no existe medición energética directa;
* no existe cálculo de emisiones;
* no existe infraestructura productiva;
* no existe Redis ni caché distribuida;
* no existe evidencia de lazy loading explícito;
* no existe auditoría WCAG integral;
* no existen costos reales auditados;
* no existen métricas de uso con estudiantes reales;
* el fallback utiliza información académica de demostración;
* las auditorías de seguridad todavía presentan hallazgos abiertos.

## 16. Conclusión

SmartSched-UC incorpora prácticas verificables de sostenibilidad técnica, especialmente mediante compresión HTTP, caché simple, paginación, límites de carga, índices SQL, arquitectura desacoplada, pruebas automatizadas y fallback local.

El proyecto también genera un impacto académico relevante al aplicar algoritmos de restricciones, desarrollo web, bases de datos, calidad y gestión de software dentro de un problema universitario realista.

El impacto social y ambiental todavía no puede cuantificarse de forma completa. Su validación requiere pruebas con usuarios, mediciones de infraestructura, auditorías de accesibilidad y métricas energéticas.

Por ello, SmartSched-UC se considera un MVP con una base sostenible y escalable, pero con oportunidades de mejora antes de una implementación institucional productiva.

## 17. Evidencias relacionadas

* [Validación completa, build y tamaño de artefactos](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Cobertura del backend](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt)
* [Cobertura del frontend](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)
* [Auditoría del backend](./evidencias/calidad/EV-SEC-02-audit-backend.txt)
* [Auditoría del frontend](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)
* [Estado de la base de datos](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Reporte de base de datos](./evidencias/base-datos/EV-DB-07-reporte-base-datos.html)
* [Horario generado](./evidencias/aplicacion/EV-APP-04-horario-generado.md)
* [Resumen de matrícula](./evidencias/aplicacion/EV-APP-09-resumen-matricula.md)
* [Modo de demostración](./evidencias/aplicacion/EV-APP-10-modo-demostracion.md)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)
* [Control de configuración y cambios](./12_control_configuracion_cambios.md)
