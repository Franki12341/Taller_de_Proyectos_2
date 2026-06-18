# 🌱 Desarrollo web responsable y reducción del impacto ambiental en SmartSched-UC

## 1. Propósito del documento

Este documento tiene como propósito analizar el impacto ambiental del proyecto **SmartSched-UC**, identificar oportunidades de mejora técnica y documentar acciones orientadas a la sostenibilidad del software, eficiencia energética, reducción del consumo de recursos digitales y mejora del rendimiento general del sistema.

SmartSched-UC es una aplicación web académica orientada a la generación óptima de horarios universitarios. El sistema está desarrollado con **React** en el frontend, **Node.js + Express** en el backend y **PostgreSQL** como base de datos relacional. Aunque la consigna académica toma como referencia proyectos MERN, el equipo decidió utilizar PostgreSQL porque el problema de horarios académicos tiene una naturaleza altamente relacional: cursos, docentes, aulas, estudiantes, bloques horarios, disponibilidad, carga académica, carga administrativa, restricciones y horarios generados se relacionan entre sí.

La actividad permite demostrar que un proyecto de software no solo debe ser funcional, mantenible y técnicamente correcto, sino también responsable con el uso de recursos digitales. En este sentido, SmartSched-UC busca generar horarios académicos válidos, pero también reducir operaciones innecesarias en el backend, optimizar consultas a PostgreSQL, mejorar la respuesta de las APIs, limitar transferencias excesivas de datos, optimizar el uso del navegador y documentar evidencias del antes y después de las mejoras aplicadas.

---

## 2. Contexto del proyecto

SmartSched-UC es un sistema web orientado a la generación óptima de horarios académicos universitarios mediante un enfoque basado en **Constraint Satisfaction Problem (CSP)** y optimización combinatoria. El sistema considera cursos, docentes, aulas, bloques horarios, créditos, disponibilidad docente, carga académica, carga administrativa, infraestructura, estudiantes y restricciones del proceso académico.

El proyecto utiliza una arquitectura web tipo cliente-servidor:

| Capa          | Tecnología         | Responsabilidad                                                                                                       |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Frontend      | React              | Interfaz gráfica para visualizar asignaturas, horarios, resumen de matrícula, conflictos y métricas                   |
| Backend       | Node.js + Express  | API REST para procesar solicitudes académicas y ejecutar la lógica del sistema                                        |
| Base de datos | PostgreSQL         | Persistencia relacional de cursos, docentes, aulas, estudiantes, bloques horarios, restricciones y horarios generados |
| Motor lógico  | CSP + Backtracking | Generación, evaluación y validación de horarios académicos                                                            |
| Repositorio   | GitHub             | Control de versiones, trazabilidad y documentación técnica                                                            |

Desde una perspectiva de sostenibilidad, cada capa puede influir en el consumo de recursos. El frontend puede generar más carga en el navegador si renderiza datos innecesarios; el backend puede consumir más CPU si recalcula resultados repetidos; PostgreSQL puede consumir más recursos si las consultas no están optimizadas; y la red puede consumir más ancho de banda si las respuestas JSON son demasiado grandes.

Por ello, el análisis de desarrollo web responsable se enfoca en mejorar el rendimiento del sistema, reducir consultas innecesarias, aplicar paginación, utilizar índices, evitar sobrecarga de la interfaz y documentar evidencias verificables.

---

## 3. Justificación del uso de PostgreSQL

El equipo decidió utilizar **PostgreSQL** porque el problema de generación de horarios académicos se basa en entidades fuertemente relacionadas. A diferencia de un sistema donde los datos pueden tratarse como documentos independientes, SmartSched-UC necesita mantener consistencia entre cursos, docentes, aulas, estudiantes, horarios, restricciones, carga docente y solicitudes académicas.

PostgreSQL resulta adecuado porque permite:

| Criterio                       | Justificación técnica                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Integridad referencial         | Permite relacionar cursos, docentes, aulas, estudiantes y horarios mediante claves primarias y foráneas |
| Modelo relacional              | El problema académico está compuesto por entidades conectadas entre sí                                  |
| Restricciones de base de datos | Permite usar `NOT NULL`, `UNIQUE`, `CHECK` y relaciones obligatorias                                    |
| Índices                        | Mejora el rendimiento en consultas por código, docente, aula, día, horario o estudiante                 |
| Consultas SQL                  | Facilita reportes, filtros, uniones y validaciones                                                      |
| Transacciones                  | Permite guardar horarios generados sin dejar registros incompletos                                      |
| Escalabilidad académica        | Permite crecer en estudiantes, docentes, aulas, cursos y periodos académicos                            |
| Análisis de rendimiento        | Permite usar herramientas como `EXPLAIN ANALYZE` para validar eficiencia                                |

Esta decisión también contribuye al desarrollo web responsable, porque una base relacional bien modelada reduce inconsistencias, reprocesos, consultas innecesarias y transferencia excesiva de datos.

---

## 4. Sensibilización: impacto ambiental del software

Aunque el software parece intangible, su funcionamiento depende de infraestructura física: servidores, centros de datos, equipos de red, computadoras personales, dispositivos móviles, almacenamiento y energía eléctrica. Cada solicitud HTTP, consulta SQL, carga de interfaz, ejecución de algoritmo o transferencia de datos consume recursos computacionales.

En aplicaciones web, el impacto ambiental puede aparecer en tres momentos principales:

| Momento              | Impacto ambiental asociado                                                                                   | Ejemplo en SmartSched-UC                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Desarrollo           | Consumo energético de equipos, instalación de dependencias, pruebas repetitivas y almacenamiento de archivos | Ejecución local del frontend, backend, PostgreSQL, pruebas y dependencias                |
| Despliegue           | Uso de servidores, bases de datos, almacenamiento y procesamiento continuo                                   | API Express conectada a PostgreSQL y disponible para usuarios                            |
| Uso de la aplicación | Consumo de red, CPU, memoria, batería y tiempo de carga en el navegador del usuario                          | Estudiantes o coordinadores consultando cursos, generando horarios y revisando matrícula |

Por esta razón, aplicar prácticas de desarrollo web responsable permite reducir el consumo innecesario de recursos y mejorar la experiencia del usuario.

---

## 5. Impactos ambientales identificados en el proyecto

A continuación, se identifican impactos ambientales asociados al desarrollo, despliegue y uso de SmartSched-UC.

| N.º | Impacto identificado                | Relación con SmartSched-UC                                                          | Justificación técnica                                                                           |
| --: | ----------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
|   1 | Consumo energético del servidor     | El backend Express procesa solicitudes y ejecuta el motor CSP                       | Si el servidor recalcula horarios repetidos o procesa datos innecesarios, aumenta el uso de CPU |
|   2 | Transferencia excesiva de datos     | Las APIs pueden devolver listas completas de cursos, docentes, aulas o estudiantes  | Respuestas JSON grandes incrementan tráfico de red y consumo de batería                         |
|   3 | Consultas SQL no optimizadas        | El sistema consulta cursos, docentes, aulas, horarios y estudiantes en PostgreSQL   | Si se usa `SELECT *` o consultas sin filtros, se incrementa el consumo de base de datos         |
|   4 | Renderizado innecesario en React    | El frontend puede cargar y mostrar todos los datos desde el inicio                  | Mayor procesamiento en navegador y mayor tiempo de carga                                        |
|   5 | Dependencias innecesarias           | Paquetes no utilizados aumentan tamaño y complejidad                                | Más almacenamiento, instalación más lenta y mayor mantenimiento                                 |
|   6 | Falta de caché                      | Solicitudes repetidas se procesan como si fueran nuevas                             | Aumenta el trabajo del backend y de PostgreSQL                                                  |
|   7 | Imágenes o recursos pesados         | Logos, íconos o recursos estáticos pueden no estar optimizados                      | Aumentan tiempo de carga y consumo de red                                                       |
|   8 | Ausencia de paginación              | Listados académicos pueden crecer con 60 o más alumnos, más cursos y más docentes   | Devolver todos los registros afecta rendimiento y escalabilidad                                 |
|   9 | Solicitudes HTTP repetidas          | El frontend puede llamar varias veces a endpoints similares                         | Más tráfico, mayor latencia y mayor carga del servidor                                          |
|  10 | Algoritmos costosos sin control     | La generación de horarios por CSP puede evaluar muchas combinaciones                | Si no se controla la cantidad de combinaciones evaluadas, aumenta el consumo computacional      |
|  11 | Reprocesos por datos inconsistentes | Un horario mal generado obliga a corregir, recalcular y volver a validar            | El reproceso consume tiempo humano, energía y recursos digitales                                |
|  12 | Interfaces poco intuitivas          | Si el usuario tarda demasiado en matricularse, aumenta el tiempo de uso del sistema | Una interfaz compacta reduce tiempo de interacción y consumo del dispositivo                    |

Estos impactos demuestran que el software puede generar consumo de recursos incluso cuando no se trata de una aplicación físicamente visible. Por ello, el equipo considera necesario aplicar mejoras de eficiencia en APIs, frontend, base de datos y documentación.

---

## 6. Componentes susceptibles de optimización

Se revisaron los principales componentes del proyecto para identificar oportunidades de mejora.

| Componente                                         | Situación identificada                                   | Oportunidad de mejora                                             | Prioridad |
| -------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------- | --------- |
| API Express                                        | Las respuestas pueden enviarse sin compresión            | Aplicar compresión HTTP                                           | Alta      |
| Endpoints de cursos, docentes, aulas y estudiantes | Pueden devolver listas completas                         | Incorporar paginación con `page` y `limit`                        | Alta      |
| Consultas PostgreSQL                               | Se pueden traer campos innecesarios                      | Usar consultas selectivas en lugar de `SELECT *`                  | Alta      |
| PostgreSQL                                         | Algunas búsquedas pueden hacerse sin índices             | Crear índices en códigos, fechas, bloques horarios y relaciones   | Alta      |
| Endpoint de generación de horarios                 | Puede recalcular respuestas repetidas                    | Aplicar caché temporal o reutilización controlada de resultados   | Media     |
| Frontend React                                     | Puede cargar datos académicos innecesarios al iniciar    | Reducir solicitudes repetidas y manejar carga progresiva          | Media     |
| Interfaz de matrícula                              | Una pantalla muy extensa puede generar más tiempo de uso | Compactar la experiencia con pestañas, tablas y paneles laterales | Alta      |
| Recursos estáticos                                 | Logos e imágenes pueden ser pesados                      | Comprimir imágenes o usar recursos ligeros                        | Media     |
| Dependencias                                       | Puede existir instalación de paquetes no necesarios      | Revisar dependencias y eliminar las que no se usan                | Media     |
| Documentación                                      | Se requiere evidencia de sostenibilidad                  | Crear documentación Green Software con métricas y capturas        | Alta      |

Estas oportunidades fueron priorizadas considerando dos criterios: impacto en rendimiento y facilidad de integración dentro del MVP actual.

---

## 7. Justificación de oportunidades de mejora

Las oportunidades de mejora detectadas se justifican porque SmartSched-UC puede crecer en cantidad de cursos, docentes, aulas, estudiantes y horarios generados. En la validación del proyecto se plantea trabajar con al menos 60 alumnos, más docentes y más cursos, por lo que la aplicación debe evitar consultas pesadas y transferencias innecesarias.

### 7.1 Optimización de consultas PostgreSQL

La optimización de consultas permite reducir la cantidad de información enviada desde la base de datos hacia el backend. En lugar de recuperar registros completos con `SELECT *`, se deben seleccionar solo los campos requeridos.

Consulta no optimizada:

```sql
SELECT * FROM courses;
```

Consulta optimizada:

```sql
SELECT id, code, name, credits, course_type, required_hours, estimated_students
FROM courses
ORDER BY code;
```

Beneficio esperado:

* menor uso de memoria;
* respuestas más rápidas;
* menor carga de PostgreSQL;
* menor tamaño del JSON enviado al cliente.

### 7.2 Paginación de datos

La paginación permite dividir grandes listados en partes pequeñas. En SmartSched-UC puede aplicarse a cursos, docentes, aulas, estudiantes y solicitudes académicas.

Ejemplo:

```text
GET /api/courses?page=1&limit=10
GET /api/teachers?page=1&limit=10
GET /api/students?page=1&limit=10
GET /api/classrooms?page=1&limit=10
```

Beneficio esperado:

* menor transferencia de datos;
* menor tiempo de carga;
* mejor escalabilidad;
* menor procesamiento en frontend;
* mejor experiencia en equipos con menos recursos.

### 7.3 Índices en PostgreSQL

Los índices permiten que PostgreSQL encuentre registros con mayor rapidez. En SmartSched-UC son importantes en campos consultados frecuentemente.

Índices recomendados:

```sql
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(code);
CREATE INDEX IF NOT EXISTS idx_teachers_code ON teachers(code);
CREATE INDEX IF NOT EXISTS idx_classrooms_code ON classrooms(code);
CREATE INDEX IF NOT EXISTS idx_students_code ON students(code);
CREATE INDEX IF NOT EXISTS idx_time_blocks_day_time ON time_blocks(day, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_schedule_items_schedule_id ON schedule_items(schedule_id);
```

Beneficio esperado:

* búsquedas más rápidas;
* menor uso de CPU en PostgreSQL;
* mejor rendimiento con mayor volumen de datos;
* menor tiempo de respuesta en endpoints.

### 7.4 Compresión HTTP

La compresión reduce el tamaño de las respuestas enviadas por el servidor. En APIs que responden JSON, puede ayudar a disminuir el tráfico de red.

Beneficio esperado:

* menor consumo de ancho de banda;
* respuestas más ligeras;
* mejor rendimiento en conexiones lentas;
* menor consumo de batería en dispositivos móviles.

### 7.5 Caché de recursos

El caché permite reutilizar respuestas durante un periodo corto de tiempo cuando la información no cambia constantemente. En SmartSched-UC, datos como cursos, docentes, aulas o restricciones no cambian en cada segundo, por lo que pueden almacenarse temporalmente.

Beneficio esperado:

* reducción de solicitudes repetidas;
* menor procesamiento del backend;
* menor carga de PostgreSQL;
* mejor tiempo de respuesta.

### 7.6 Reducción de solicitudes HTTP

Si el frontend realiza muchas solicitudes al iniciar, el navegador consume más recursos. Se puede mejorar agrupando solicitudes, evitando llamadas repetidas o cargando información solo cuando el usuario la necesita.

Ejemplo:

```javascript
const [courses, teachers, classrooms, constraints] = await Promise.all([
  fetch("/api/courses?limit=10"),
  fetch("/api/teachers?limit=10"),
  fetch("/api/classrooms?limit=10"),
  fetch("/api/constraints")
]);
```

Beneficio esperado:

* menor tráfico de red;
* menor consumo de batería;
* mejor experiencia de usuario;
* menor tiempo de espera.

### 7.7 Interfaz compacta e intuitiva

Una interfaz extensa obliga al usuario a desplazarse demasiado y aumenta el tiempo necesario para completar la matrícula. Por ello, se plantea una interfaz compacta tipo sistema universitario, con pestañas y paneles.

Beneficio esperado:

* menor tiempo de uso;
* menor frustración del estudiante;
* mejor comprensión del flujo;
* menos errores de selección;
* menor reproceso de matrícula.

---

## 8. Mejoras implementadas o propuestas en el MVP

Las siguientes mejoras fueron integradas o propuestas para el MVP de SmartSched-UC como parte del enfoque de desarrollo web responsable.

| N.º | Mejora                                 | Capa                    | Técnica aplicada                                            | Estado                        |
| --: | -------------------------------------- | ----------------------- | ----------------------------------------------------------- | ----------------------------- |
|   1 | Uso de PostgreSQL como base relacional | Base de datos           | Modelo relacional, claves foráneas e índices                | En integración                |
|   2 | Optimización de consultas SQL          | Backend / BD            | Selección de campos específicos y uso de alias              | En integración                |
|   3 | Paginación en endpoints académicos     | Backend                 | Parámetros `page` y `limit`                                 | Implementable / en validación |
|   4 | Índices en PostgreSQL                  | Base de datos           | Índices en cursos, docentes, aulas, estudiantes y horarios  | Implementable / en validación |
|   5 | Compresión HTTP en Express             | Backend                 | Middleware `compression`                                    | Implementable                 |
|   6 | Caché temporal para datos académicos   | Backend                 | Middleware de caché en endpoints GET                        | Implementable                 |
|   7 | Límite de tamaño en JSON               | Backend                 | `express.json({ limit: "100kb" })`                          | Implementable                 |
|   8 | Reducción de solicitudes repetidas     | Frontend                | Uso de `Promise.all` y control de carga                     | Implementado parcialmente     |
|   9 | Interfaz compacta tipo matrícula       | Frontend                | Pestañas, tabla de asignaturas, panel de horarios y resumen | En mejora                     |
|  10 | Documentación Green Software           | Documentación           | Registro de impacto, mejoras y evidencias                   | Implementado                  |
|  11 | Validación con 60 alumnos              | Base de datos / pruebas | Dataset ampliado en PostgreSQL                              | En validación                 |
|  12 | Evidencias antes/después               | Validación              | Lighthouse, DevTools, endpoints y capturas                  | Pendiente de captura final    |

---

## 9. Técnicas específicas de optimización aplicadas o planificadas

### 9.1 Paginación

La paginación permite que los endpoints no devuelvan todos los datos cuando el volumen crece.

```text
GET /api/courses?page=1&limit=10
GET /api/teachers?page=1&limit=10
GET /api/classrooms?page=1&limit=10
GET /api/students?page=1&limit=10
```

Con esto, el sistema puede responder solo una parte de los datos y acompañarla con información de página, total de registros y límite utilizado.

### 9.2 Caché temporal

El caché temporal evita recalcular o recuperar información repetida cuando los datos no cambian constantemente. En SmartSched-UC, los listados académicos pueden permanecer iguales durante una sesión de matrícula, por lo que el caché ayuda a reducir procesamiento.

Ejemplo de evidencia esperada:

```text
Primera solicitud: X-Cache: MISS
Segunda solicitud: X-Cache: HIT
```

### 9.3 Compresión HTTP

La compresión permite reducir el tamaño de las respuestas JSON enviadas por Express. Esto ayuda a disminuir el tráfico de red y mejora el tiempo de descarga.

Ejemplo:

```javascript
const compression = require("compression");
app.use(compression());
```

### 9.4 Optimización de consultas SQL

Las consultas optimizadas permiten seleccionar campos específicos de PostgreSQL. Por ejemplo, para listar cursos no siempre es necesario traer todos los datos internos del registro.

```sql
SELECT id, code, name, credits, course_type
FROM courses
ORDER BY code
LIMIT 10 OFFSET 0;
```

### 9.5 Reducción de solicitudes HTTP

En el frontend se puede utilizar `Promise.all` para cargar cursos, docentes, aulas y restricciones en paralelo. Esto reduce el tiempo total de espera frente a una carga secuencial.

### 9.6 Interfaz con menor desplazamiento

Una interfaz compacta evita que el estudiante recorra una pantalla larga para matricularse. La propuesta de mejora organiza la aplicación en:

* pestaña de proyecciones;
* buscador por NRC o código;
* vista de horario;
* resumen de matrícula;
* vista técnica de coordinación.

Esto reduce el tiempo de uso del sistema y mejora la experiencia del estudiante.

---

## 10. Validación de resultados antes y después

Para validar las mejoras se propone realizar una comparación antes y después utilizando herramientas como:

* Chrome DevTools, pestaña Network;
* Lighthouse;
* medición manual de tiempo de respuesta;
* tamaño de respuesta JSON;
* encabezado `X-Cache`;
* capturas de pantalla del navegador;
* logs del servidor;
* `EXPLAIN ANALYZE` en PostgreSQL;
* endpoint `/api/health`;
* endpoint `/api/debug/schema`.

### 10.1 Tabla de comparación

> Nota: los valores exactos deben completarse con capturas reales tomadas desde el navegador, terminal o pgAdmin.

| Métrica                                  |              Antes de la mejora |                          Después de la mejora | Evidencia sugerida              |
| ---------------------------------------- | ------------------------------: | --------------------------------------------: | ------------------------------- |
| Tiempo de respuesta `/api/courses`       |  Completar con medición inicial |              Completar con medición posterior | Captura DevTools Network        |
| Tamaño de respuesta `/api/courses`       |        Completar con KB inicial |                    Completar con KB posterior | Captura DevTools Network        |
| Cantidad de registros enviados           |             Todos los registros |             Registros paginados según `limit` | Respuesta JSON                  |
| Consulta SQL                             | Consulta completa o sin filtros |               Consulta con campos específicos | Captura de código               |
| Uso de índices                           |                   Sin evidencia |                 Índices creados y verificados | Script SQL o pgAdmin            |
| Respuesta con caché                      |                   No disponible |                     Encabezado `X-Cache: HIT` | Captura de Headers              |
| Tiempo de carga inicial                  |        Completar con Lighthouse |                      Completar con Lighthouse | Captura Lighthouse              |
| Performance Lighthouse                   |       Completar puntaje inicial |                   Completar puntaje posterior | Captura Lighthouse              |
| Solicitudes HTTP iniciales               |      Completar cantidad inicial |                  Completar cantidad posterior | Captura Network                 |
| Tamaño total transferido                 |       Completar MB o KB inicial |                   Completar MB o KB posterior | Captura Network                 |
| Tiempo para completar matrícula simulada |      Mayor por interfaz extensa |                   Menor con interfaz compacta | Observación de flujo            |
| Uso de fallback a mock data              |          Activo por errores SQL | Desactivado al alinear backend con PostgreSQL | `/api/health` y consola backend |

### 10.2 Interpretación esperada

Después de aplicar las mejoras, se espera que el sistema reduzca el tamaño de las respuestas, disminuya la repetición de consultas, mejore los tiempos de carga y use de forma más eficiente los recursos del servidor, PostgreSQL y navegador.

---

## 11. Validación con PostgreSQL

Para validar la conexión real con PostgreSQL, se utiliza el endpoint:

```text
http://localhost:5000/api/health
```

Respuesta esperada cuando PostgreSQL funciona correctamente:

```json
{
  "status": "ok",
  "database": "postgresql",
  "postgresEnabled": true,
  "usingFallback": false
}
```

Si el sistema responde usando mock data, significa que la aplicación no se cayó, pero todavía falta corregir una consulta o alineación de columnas.

Respuesta de fallback:

```json
{
  "status": "ok",
  "database": "mock-data",
  "postgresEnabled": true,
  "usingFallback": true
}
```

Para verificar el esquema se puede ejecutar:

```sql
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
```

---

## 12. Validación con datos ampliados

Para que la prueba sea más realista, se incorporó o planificó una base de datos con mayor volumen académico.

| Entidad               | Cantidad esperada |
| --------------------- | ----------------: |
| Estudiantes           |                60 |
| Cursos                |                20 |
| Docentes              |                16 |
| Aulas                 |                14 |
| Bloques horarios      |                22 |
| Restricciones         |                12 |
| Solicitudes de cursos |        Más de 200 |

Consulta de verificación:

```sql
SELECT 'students' AS tabla, COUNT(*) AS total FROM students
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'teachers', COUNT(*) FROM teachers
UNION ALL
SELECT 'classrooms', COUNT(*) FROM classrooms
UNION ALL
SELECT 'time_blocks', COUNT(*) FROM time_blocks
UNION ALL
SELECT 'student_course_requests', COUNT(*) FROM student_course_requests
UNION ALL
SELECT 'constraints', COUNT(*) FROM constraints;
```

Esta validación permite demostrar que el sistema no fue probado únicamente con datos mínimos, sino con un conjunto más representativo para una matrícula universitaria.

---

## 13. Evidencias requeridas

Para cumplir con la consigna, se deben adjuntar o registrar las siguientes evidencias:

| Evidencia                           | Descripción                                       | Estado                    |
| ----------------------------------- | ------------------------------------------------- | ------------------------- |
| Captura del repositorio actualizado | GitHub mostrando commits recientes                | Pendiente de captura      |
| Captura de Lighthouse antes         | Medición inicial del frontend                     | Pendiente de captura      |
| Captura de Lighthouse después       | Medición posterior a mejoras                      | Pendiente de captura      |
| Captura de Network antes            | Tamaño y tiempo de solicitudes iniciales          | Pendiente de captura      |
| Captura de Network después          | Tamaño y tiempo posterior a mejoras               | Pendiente de captura      |
| Captura de endpoint paginado        | Respuesta `/api/courses?page=1&limit=10`          | Pendiente de captura      |
| Captura de PostgreSQL conectado     | Endpoint `/api/health` con `database: postgresql` | Pendiente de captura      |
| Captura de pgAdmin                  | Tablas con 60 alumnos y datos académicos          | Pendiente de captura      |
| Captura de consulta de conteo       | Conteo de cursos, docentes, aulas y estudiantes   | Pendiente de captura      |
| Captura de interfaz compacta        | Vista de matrícula mejorada                       | Pendiente de captura      |
| Encuesta estudiantil                | Confirmación de participación                     | Pendiente de confirmación |

---

## 14. Beneficios de sostenibilidad obtenidos

Las mejoras propuestas contribuyen a la sostenibilidad del software porque reducen el consumo innecesario de recursos digitales.

| Mejora                          | Beneficio técnico                            | Beneficio ambiental                           |
| ------------------------------- | -------------------------------------------- | --------------------------------------------- |
| PostgreSQL relacional           | Datos consistentes y consultas estructuradas | Menor reproceso por inconsistencias           |
| Consultas SQL selectivas        | Reduce campos innecesarios                   | Menor uso de memoria y red                    |
| Índices en PostgreSQL           | Mejora tiempos de búsqueda                   | Menor consumo de CPU en base de datos         |
| Paginación                      | Evita enviar registros innecesarios          | Menor consumo de ancho de banda y memoria     |
| Caché                           | Evita procesar solicitudes repetidas         | Menor uso de CPU y base de datos              |
| Compresión HTTP                 | Reduce tamaño de respuestas                  | Menor transferencia de datos                  |
| Reducción de solicitudes        | Disminuye tráfico cliente-servidor           | Menor consumo de batería y red                |
| Lazy loading o carga progresiva | Carga solo lo necesario                      | Menor procesamiento inicial del navegador     |
| Interfaz compacta               | Reduce tiempo de matrícula                   | Menor tiempo de uso del dispositivo           |
| Limpieza de dependencias        | Reduce peso del proyecto                     | Menor almacenamiento e instalación más rápida |
| Documentación técnica           | Mejora mantenibilidad                        | Evita retrabajo y ejecuciones innecesarias    |

Estas mejoras permiten que SmartSched-UC sea un sistema más eficiente, escalable y responsable con el uso de recursos.

---

## 15. Relación con Green Software

El enfoque de Green Software busca que el desarrollo de aplicaciones considere eficiencia energética, reducción del consumo computacional y uso responsable de infraestructura. En SmartSched-UC, este enfoque se refleja en:

* reducción del tamaño de respuestas;
* menor cantidad de datos transferidos;
* disminución de consultas repetidas;
* optimización de procesamiento backend;
* consultas SQL más precisas;
* uso de índices en PostgreSQL;
* mejor uso de recursos del navegador;
* reducción de tiempo de interacción del usuario;
* documentación de evidencias;
* trazabilidad de decisiones técnicas.

El objetivo no es afirmar que el sistema elimina totalmente el impacto ambiental, sino demostrar que se tomaron decisiones técnicas para reducir consumo y mejorar eficiencia dentro del alcance del MVP.

---

## 16. Integración con GitHub

Las mejoras deben integrarse al repositorio GitHub mediante commits descriptivos. Esto permite evidenciar trazabilidad entre análisis, implementación y validación.

Commits sugeridos:

```bash
git add docs/22_desarrollo_web_responsable_green_mern.md
git commit -m "docs: update green software analysis with PostgreSQL"

git add smartsched-uc/server
git commit -m "feat: optimize Express API with PostgreSQL pagination and indexes"

git add smartsched-uc/client
git commit -m "feat: improve compact enrollment interface"

git add docs/00_TOC.md README.md
git commit -m "docs: update TOC and README for sustainability evidence"

git push origin main
```

---

## 17. Recursos revisados

Como parte de la actividad se consideran los recursos propuestos en la consigna:

| Recurso                                           | Uso dentro del análisis                                    |
| ------------------------------------------------- | ---------------------------------------------------------- |
| Video: Viaje Full-Stack Sostenible                | Sensibilización sobre sostenibilidad en desarrollo web     |
| Audio: El costo físico del mundo digital          | Comprensión del impacto material del mundo digital         |
| Infografía: Sostenibilidad y eficiencia web móvil | Identificación de buenas prácticas de optimización         |
| Diapositivas: Green MERN Engineering              | Relación entre desarrollo web, eficiencia y sostenibilidad |
| Aplicación Web MegaBlog                           | Referencia para comparar optimizaciones web                |
| Encuesta estudiantil                              | Actividad complementaria de participación                  |

---

## 18. Checklist de cumplimiento de la consigna

| Criterio de la consigna                    | Evidencia propuesta                                            | Estado                  |
| ------------------------------------------ | -------------------------------------------------------------- | ----------------------- |
| Análisis de impacto ambiental del software | Sección 5 con más de 5 impactos identificados                  | Cumplido                |
| Identificación de oportunidades de mejora  | Sección 6 con componentes optimizables                         | Cumplido                |
| Implementación de mejoras                  | PostgreSQL, paginación, índices, compresión, interfaz compacta | En validación           |
| Técnicas específicas de optimización       | Paginación, caché, compresión, SQL selectivo, índices          | Cumplido                |
| Validación antes/después                   | Tabla comparativa y evidencias requeridas                      | Pendiente de capturas   |
| Contribución a sostenibilidad              | Sección 14 y 15                                                | Cumplido                |
| Gestión de GitHub                          | Commits sugeridos y trazabilidad                               | Pendiente de push final |
| Calidad documental                         | Documento organizado por secciones y tablas                    | Cumplido                |
| Recursos y encuesta                        | Sección 17                                                     | Pendiente de encuesta   |

---

## 19. Conclusiones

La revisión realizada demuestra que SmartSched-UC puede mejorar no solo desde el punto de vista funcional, sino también desde la eficiencia y sostenibilidad del software. El proyecto utiliza React, Node.js, Express y PostgreSQL, por lo que involucra frontend, backend, base de datos y red. Cada una de estas capas puede optimizarse para reducir consumo de recursos.

El uso de PostgreSQL se justifica porque el problema académico es altamente relacional. Cursos, docentes, aulas, estudiantes, horarios, restricciones y solicitudes de matrícula se relacionan entre sí, por lo que una base relacional permite mantener integridad, aplicar restricciones, crear índices y ejecutar consultas más precisas.

Las principales oportunidades identificadas fueron la optimización de consultas SQL, paginación, índices, compresión HTTP, caché, reducción de solicitudes HTTP, mejora de la interfaz y documentación de evidencias. Estas acciones permiten reducir el tamaño de las respuestas, evitar procesamiento repetitivo, mejorar la experiencia del usuario y disminuir el consumo innecesario de recursos digitales.

Finalmente, el desarrollo web responsable permite que SmartSched-UC se presente como un proyecto más completo, profesional y alineado con buenas prácticas actuales de ingeniería de software. El sistema no solo busca generar horarios académicos válidos, sino hacerlo de manera eficiente, medible, sostenible y coherente con la realidad académica institucional.
