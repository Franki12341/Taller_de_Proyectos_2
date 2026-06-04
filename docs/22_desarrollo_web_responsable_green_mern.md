# 🌱 Desarrollo web responsable y reducción del impacto ambiental en SmartSched-UC

## 1. Propósito del documento

Este documento tiene como propósito analizar el impacto ambiental del proyecto **SmartSched-UC**, desarrollado bajo una arquitectura web basada en el stack MERN, e identificar oportunidades de mejora orientadas a la sostenibilidad del software, eficiencia energética, reducción del consumo de recursos y mejora del rendimiento general del sistema.

La actividad permite demostrar que un proyecto de software no solo debe ser funcional, mantenible y técnicamente correcto, sino también responsable con el uso de recursos digitales. En este sentido, SmartSched-UC busca optimizar la generación de horarios académicos, pero también reducir operaciones innecesarias en el backend, mejorar la respuesta de las APIs, limitar transferencias excesivas de datos, optimizar el uso del navegador y documentar evidencias del antes y después de las mejoras aplicadas.

---

## 2. Contexto del proyecto MERN

SmartSched-UC es un sistema web orientado a la generación óptima de horarios académicos universitarios mediante un enfoque basado en **Constraint Satisfaction Problem (CSP)** y optimización combinatoria. El sistema considera cursos, docentes, aulas, bloques horarios, créditos, disponibilidad docente, carga académica, carga administrativa e infraestructura.

El proyecto utiliza una arquitectura web tipo cliente-servidor:

| Capa          | Tecnología         | Responsabilidad                                                          |
| ------------- | ------------------ | ------------------------------------------------------------------------ |
| Frontend      | React              | Interfaz gráfica para visualizar cursos, horarios, métricas y conflictos |
| Backend       | Node.js + Express  | API REST para procesar solicitudes académicas                            |
| Base de datos | MongoDB / Mongoose | Persistencia de docentes, cursos, aulas y horarios                       |
| Motor lógico  | CSP + Backtracking | Generación y validación de horarios académicos                           |
| Repositorio   | GitHub             | Control de versiones, trazabilidad y documentación                       |

Desde una perspectiva de sostenibilidad, cada capa puede influir en el consumo de recursos. Por ejemplo, el frontend puede generar más carga en el navegador si renderiza datos innecesarios; el backend puede consumir más CPU si recalcula resultados repetidos; la base de datos puede consumir más recursos si las consultas no están optimizadas; y la red puede consumir más ancho de banda si las respuestas JSON son demasiado grandes.

---

## 3. Sensibilización: impacto ambiental del software

Aunque el software parece intangible, su funcionamiento depende de infraestructura física: servidores, centros de datos, equipos de red, computadoras personales, dispositivos móviles, almacenamiento y energía eléctrica. Cada solicitud HTTP, consulta a la base de datos, carga de imagen, ejecución de algoritmo o transferencia de datos consume recursos computacionales.

En aplicaciones web, el impacto ambiental puede aparecer en tres momentos principales:

| Momento              | Impacto ambiental asociado                                                                                   | Ejemplo en SmartSched-UC                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Desarrollo           | Consumo energético de equipos, instalación de dependencias, pruebas repetitivas y almacenamiento de archivos | Ejecución local del frontend, backend, pruebas y dependencias del proyecto |
| Despliegue           | Uso de servidores, bases de datos, almacenamiento cloud y procesamiento continuo                             | API Express desplegada y conectada a MongoDB                               |
| Uso de la aplicación | Consumo de red, CPU, memoria, batería y tiempo de carga en el navegador del usuario                          | Estudiantes o coordinadores consultando cursos y generando horarios        |

Por esta razón, aplicar prácticas de desarrollo web responsable permite reducir el consumo innecesario de recursos y mejorar la experiencia del usuario.

---

## 4. Impactos ambientales identificados en el proyecto

A continuación, se identifican impactos ambientales asociados al desarrollo, despliegue y uso de SmartSched-UC.

| N.º | Impacto identificado               | Relación con el proyecto MERN                                         | Justificación técnica                                                                           |
| --: | ---------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
|   1 | Consumo energético del servidor    | El backend Express procesa solicitudes y ejecuta el motor CSP         | Si el servidor recalcula horarios repetidos o procesa datos innecesarios, aumenta el uso de CPU |
|   2 | Transferencia excesiva de datos    | Las APIs pueden devolver listas completas de cursos, docentes o aulas | Respuestas JSON grandes incrementan tráfico de red y consumo de batería                         |
|   3 | Consultas no optimizadas a MongoDB | El sistema consulta docentes, cursos y aulas                          | Si se consultan todos los campos o registros sin filtros, aumenta el consumo de base de datos   |
|   4 | Renderizado innecesario en React   | El frontend puede cargar y mostrar todos los datos desde el inicio    | Mayor procesamiento en navegador y mayor tiempo de carga                                        |
|   5 | Dependencias innecesarias          | Paquetes no utilizados aumentan tamaño y complejidad                  | Más almacenamiento, instalación más lenta y mayor superficie de mantenimiento                   |
|   6 | Falta de caché                     | Solicitudes repetidas se procesan como si fueran nuevas               | Aumenta el trabajo del backend y la transferencia de datos                                      |
|   7 | Imágenes o recursos pesados        | Logos, íconos o recursos estáticos pueden no estar optimizados        | Aumenta el tiempo de carga y consumo de red                                                     |
|   8 | Ausencia de paginación             | Listados académicos pueden crecer con el tiempo                       | En escenarios reales, devolver todos los registros afectaría rendimiento y escalabilidad        |
|   9 | Solicitudes HTTP repetidas         | El frontend puede llamar varias veces a endpoints similares           | Más tráfico, mayor latencia y mayor carga del servidor                                          |
|  10 | Algoritmos costosos sin control    | La generación de horarios puede ser compleja por naturaleza CSP       | Si no se controla la cantidad de combinaciones evaluadas, aumenta el consumo computacional      |

Estos impactos demuestran que el software puede generar consumo de recursos incluso cuando no se trata de una aplicación físicamente visible. Por ello, el equipo considera necesario aplicar mejoras de eficiencia en las APIs, frontend, base de datos y documentación.

---

## 5. Componentes susceptibles de optimización

Se revisaron los principales componentes del proyecto para identificar oportunidades de mejora.

| Componente                            | Situación identificada                              | Oportunidad de mejora                                     | Prioridad |
| ------------------------------------- | --------------------------------------------------- | --------------------------------------------------------- | --------- |
| API Express                           | Las respuestas pueden enviarse sin compresión       | Aplicar compresión HTTP                                   | Alta      |
| Endpoints de cursos, docentes y aulas | Pueden devolver listas completas                    | Incorporar paginación opcional                            | Alta      |
| Consultas MongoDB                     | Se pueden traer campos innecesarios                 | Usar `.select()` y `.lean()` para respuestas más ligeras  | Alta      |
| Endpoint de generación de horarios    | Puede recalcular respuestas repetidas               | Aplicar caché temporal en consultas GET y optimizar flujo | Media     |
| Frontend React                        | Carga datos académicos al iniciar                   | Reducir solicitudes repetidas y manejar estados de carga  | Media     |
| Recursos estáticos                    | Logos e imágenes pueden ser pesados                 | Comprimir imágenes o reemplazar por recursos más ligeros  | Media     |
| Dependencias                          | Puede existir instalación de paquetes no necesarios | Revisar dependencias y eliminar las que no se usan        | Media     |
| Documentación                         | No existía documento específico de sostenibilidad   | Crear documentación Green MERN con evidencias             | Alta      |

Estas oportunidades fueron priorizadas considerando dos criterios: impacto en rendimiento y facilidad de integración dentro del MVP actual.

---

## 6. Justificación de oportunidades de mejora

Las oportunidades de mejora detectadas se justifican porque SmartSched-UC puede crecer en cantidad de cursos, docentes, aulas, estudiantes y horarios generados. Si el sistema no incorpora prácticas de eficiencia desde el MVP, en etapas posteriores podría presentar respuestas lentas, mayor consumo de servidor y mayor transferencia de datos.

### 6.1 Optimización de consultas MongoDB

La optimización de consultas permite reducir la cantidad de información enviada desde la base de datos hacia el backend. En lugar de recuperar documentos completos, se pueden seleccionar solo los campos necesarios mediante `.select()` y convertir los resultados a objetos simples con `.lean()`.

Beneficio esperado:

* menor uso de memoria;
* respuestas más rápidas;
* menor carga del servidor;
* menor tamaño del JSON enviado al cliente.

### 6.2 Paginación de datos

La paginación permite dividir grandes listados en partes pequeñas. En SmartSched-UC puede aplicarse a cursos, docentes, aulas y horarios generados.

Beneficio esperado:

* menor transferencia de datos;
* menor tiempo de carga;
* mejor escalabilidad;
* menor procesamiento en frontend.

### 6.3 Compresión HTTP

La compresión reduce el tamaño de las respuestas enviadas por el servidor. En APIs que responden JSON, puede ayudar a disminuir el tráfico de red.

Beneficio esperado:

* menor consumo de ancho de banda;
* respuestas más ligeras;
* mejor rendimiento en conexiones lentas.

### 6.4 Caché de recursos

El caché permite reutilizar respuestas durante un periodo corto de tiempo cuando la información no cambia constantemente. En SmartSched-UC, datos como cursos, docentes o aulas no cambian en cada segundo, por lo que pueden almacenarse temporalmente.

Beneficio esperado:

* reducción de solicitudes repetidas;
* menor procesamiento del backend;
* menor carga de base de datos;
* mejor tiempo de respuesta.

### 6.5 Reducción de solicitudes HTTP

Si el frontend realiza muchas solicitudes al iniciar, el navegador consume más recursos. Se puede mejorar agrupando solicitudes, evitando llamadas repetidas o cargando información solo cuando el usuario la necesita.

Beneficio esperado:

* menor tráfico de red;
* menor consumo de batería;
* mejor experiencia de usuario.

### 6.6 Lazy loading y carga progresiva

El lazy loading permite cargar partes de la interfaz solo cuando son necesarias. En el caso de SmartSched-UC, puede aplicarse progresivamente a paneles de métricas, vista de horario, reportes o componentes de visualización avanzada.

Beneficio esperado:

* carga inicial más rápida;
* menor renderizado innecesario;
* mejor experiencia en equipos de menor capacidad.

---

## 7. Mejoras implementadas o propuestas en el MVP

Las siguientes mejoras fueron integradas o propuestas para el MVP de SmartSched-UC como parte del enfoque de desarrollo web responsable.

| N.º | Mejora                                      | Capa          | Técnica aplicada                          | Estado                     |
| --: | ------------------------------------------- | ------------- | ----------------------------------------- | -------------------------- |
|   1 | Compresión HTTP en Express                  | Backend       | Uso de middleware `compression`           | Implementable en MVP       |
|   2 | Paginación opcional en endpoints académicos | Backend       | Parámetros `page`, `limit` y `paginated`  | Implementable en MVP       |
|   3 | Optimización de consultas MongoDB           | Backend / BD  | Uso de `.select()` y `.lean()`            | Implementable en MVP       |
|   4 | Caché temporal para datos académicos        | Backend       | Middleware de caché en endpoints GET      | Implementable en MVP       |
|   5 | Límite de tamaño en JSON                    | Backend       | `express.json({ limit: "100kb" })`        | Implementable en MVP       |
|   6 | Reducción de solicitudes repetidas          | Frontend      | Uso de `Promise.all` y control de carga   | Implementado parcialmente  |
|   7 | Documentación Green MERN                    | Documentación | Registro de impacto, mejoras y evidencias | Implementado               |
|   8 | Medición antes/después                      | Validación    | Lighthouse, DevTools o tiempos de API     | Pendiente de captura final |

---

## 8. Técnicas específicas de optimización aplicadas

### 8.1 Paginación

La paginación permite que los endpoints no devuelvan todos los datos cuando el volumen crece. Por ejemplo:

```text
GET /api/courses?paginated=true&page=1&limit=5
GET /api/teachers?paginated=true&page=1&limit=5
GET /api/classrooms?paginated=true&page=1&limit=5
```

Con esto, el sistema puede responder solo una parte de los datos y acompañarla con información de página, total de registros y límite utilizado.

### 8.2 Caché temporal

El caché temporal evita recalcular o recuperar información repetida cuando los datos no cambian constantemente. En SmartSched-UC, los listados académicos pueden permanecer iguales durante una sesión de trabajo, por lo que el caché ayuda a reducir procesamiento.

### 8.3 Compresión HTTP

La compresión permite reducir el tamaño de las respuestas JSON enviadas por Express. Esto ayuda a disminuir el tráfico de red y mejora el tiempo de descarga.

### 8.4 Optimización de consultas

Las consultas optimizadas permiten seleccionar campos específicos de MongoDB. Por ejemplo, para listar cursos no siempre es necesario traer todos los metadatos internos del documento. Con `.select()` se reducen campos y con `.lean()` se disminuye la carga de Mongoose.

### 8.5 Reducción de solicitudes HTTP

En el frontend se utiliza `Promise.all` para cargar cursos, docentes y aulas en paralelo. Esto reduce el tiempo total de espera frente a una carga secuencial.

---

## 9. Validación de resultados antes y después

Para validar las mejoras se propone realizar una comparación antes y después utilizando herramientas como:

* Chrome DevTools, pestaña Network;
* Lighthouse;
* medición manual de tiempo de respuesta;
* tamaño de respuesta JSON;
* encabezado `X-Cache`;
* capturas de pantalla del navegador;
* logs del servidor.

### 9.1 Tabla de comparación

> Nota: los valores exactos deben completarse con capturas reales tomadas desde el navegador o terminal del equipo.

| Métrica                            |             Antes de la mejora |              Después de la mejora | Evidencia sugerida       |
| ---------------------------------- | -----------------------------: | --------------------------------: | ------------------------ |
| Tiempo de respuesta `/api/courses` | Completar con medición inicial |  Completar con medición posterior | Captura DevTools Network |
| Tamaño de respuesta `/api/courses` |       Completar con KB inicial |        Completar con KB posterior | Captura DevTools Network |
| Respuesta con caché                |                  No disponible |         Encabezado `X-Cache: HIT` | Captura de Headers       |
| Cantidad de registros enviados     |            Todos los registros | Registros paginados según `limit` | Respuesta JSON           |
| Tiempo de carga inicial            |       Completar con Lighthouse |          Completar con Lighthouse | Captura Lighthouse       |
| Performance Lighthouse             |      Completar puntaje inicial |       Completar puntaje posterior | Captura Lighthouse       |
| Solicitudes HTTP iniciales         |     Completar cantidad inicial |      Completar cantidad posterior | Captura Network          |
| Tamaño total transferido           |      Completar MB o KB inicial |       Completar MB o KB posterior | Captura Network          |

### 9.2 Interpretación esperada

Después de aplicar las mejoras, se espera que el sistema reduzca el tamaño de las respuestas, disminuya la repetición de consultas, mejore los tiempos de carga y use de forma más eficiente los recursos del servidor y del navegador.

---

## 10. Evidencias requeridas

Para cumplir con la consigna, se deben adjuntar o registrar las siguientes evidencias:

| Evidencia                           | Descripción                                            | Estado                    |
| ----------------------------------- | ------------------------------------------------------ | ------------------------- |
| Captura del repositorio actualizado | GitHub mostrando commits recientes                     | Pendiente de captura      |
| Captura de Lighthouse antes         | Medición inicial del frontend                          | Pendiente de captura      |
| Captura de Lighthouse después       | Medición posterior a mejoras                           | Pendiente de captura      |
| Captura de Network antes            | Tamaño y tiempo de solicitudes iniciales               | Pendiente de captura      |
| Captura de Network después          | Tamaño y tiempo posterior a mejoras                    | Pendiente de captura      |
| Captura de endpoint paginado        | Respuesta `/api/courses?paginated=true&page=1&limit=5` | Pendiente de captura      |
| Captura de caché                    | Header `X-Cache: HIT` en respuesta repetida            | Pendiente de captura      |
| Encuesta estudiantil                | Confirmación de participación                          | Pendiente de confirmación |

---

## 11. Beneficios de sostenibilidad obtenidos

Las mejoras propuestas contribuyen a la sostenibilidad del software porque reducen el consumo innecesario de recursos digitales.

| Mejora                   | Beneficio técnico                    | Beneficio ambiental                            |
| ------------------------ | ------------------------------------ | ---------------------------------------------- |
| Compresión HTTP          | Reduce tamaño de respuestas          | Menor transferencia de datos y consumo de red  |
| Paginación               | Evita enviar registros innecesarios  | Menor consumo de ancho de banda y memoria      |
| Caché                    | Evita procesar solicitudes repetidas | Menor uso de CPU y base de datos               |
| Consultas optimizadas    | Reduce campos innecesarios           | Menor uso de memoria y almacenamiento temporal |
| Reducción de solicitudes | Disminuye tráfico cliente-servidor   | Menor consumo de batería y red                 |
| Lazy loading             | Carga solo lo necesario              | Menor procesamiento inicial del navegador      |
| Limpieza de dependencias | Reduce peso del proyecto             | Menor almacenamiento e instalación más rápida  |
| Documentación técnica    | Mejora mantenibilidad                | Evita retrabajo y ejecuciones innecesarias     |

Estas mejoras permiten que SmartSched-UC sea un sistema más eficiente, escalable y responsable con el uso de recursos.

---

## 12. Relación con Green Software

El enfoque de Green Software busca que el desarrollo de aplicaciones considere eficiencia energética, reducción del consumo computacional y uso responsable de infraestructura. En SmartSched-UC, este enfoque se refleja en:

* reducción del tamaño de respuestas;
* menor cantidad de datos transferidos;
* disminución de consultas repetidas;
* optimización de procesamiento backend;
* mejor uso de recursos del navegador;
* documentación de evidencias;
* trazabilidad de decisiones técnicas.

El objetivo no es afirmar que el sistema elimina totalmente el impacto ambiental, sino demostrar que se tomaron decisiones técnicas para reducir consumo y mejorar eficiencia dentro del alcance del MVP.

---

## 13. Integración con GitHub

Las mejoras deben integrarse al repositorio GitHub mediante commits descriptivos. Esto permite evidenciar trazabilidad entre análisis, implementación y validación.

Commits sugeridos:

```bash
git add docs/22_desarrollo_web_responsable_green_mern.md
git commit -m "docs: add green MERN sustainability analysis"

git add smartsched-uc/server
git commit -m "feat: optimize Express API with cache compression and pagination"

git add docs/00_TOC.md README.md
git commit -m "docs: update TOC and README for green MERN deliverable"

git push origin main
```

---

## 14. Recursos revisados

Como parte de la actividad se consideran los recursos propuestos en la consigna:

| Recurso                                           | Uso dentro del análisis                                |
| ------------------------------------------------- | ------------------------------------------------------ |
| Video: Viaje Full-Stack Sostenible                | Sensibilización sobre sostenibilidad en desarrollo web |
| Audio: El costo físico del mundo digital          | Comprensión del impacto material del mundo digital     |
| Infografía: Sostenibilidad y eficiencia web móvil | Identificación de buenas prácticas de optimización     |
| Diapositivas: Green MERN Engineering              | Relación entre MERN, eficiencia y sostenibilidad       |
| Aplicación Web MegaBlog                           | Referencia para comparar optimizaciones web            |
| Encuesta estudiantil                              | Actividad complementaria de participación              |

---

## 15. Conclusiones

La revisión realizada demuestra que SmartSched-UC puede mejorar no solo desde el punto de vista funcional, sino también desde la eficiencia y sostenibilidad del software. El proyecto, al estar basado en MERN, involucra frontend, backend, base de datos y red; por lo tanto, cada capa puede optimizarse para reducir consumo de recursos.

Las principales oportunidades identificadas fueron la compresión HTTP, paginación, caché, optimización de consultas MongoDB, reducción de solicitudes HTTP, mejora del frontend y documentación de evidencias. Estas acciones permiten reducir el tamaño de las respuestas, evitar procesamiento repetitivo y mejorar la experiencia de usuario.

Finalmente, el desarrollo web responsable permite que SmartSched-UC se presente como un proyecto más completo, profesional y alineado con buenas prácticas actuales de ingeniería de software. El sistema no solo busca generar horarios académicos válidos, sino hacerlo de manera eficiente, medible y responsable con los recursos digitales utilizados.
