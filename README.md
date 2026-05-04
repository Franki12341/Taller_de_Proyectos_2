# 🎯 Propósito del Proyecto

El proyecto **SmartSched-UC** tiene como objetivo desarrollar una plataforma web inteligente capaz de optimizar la generación de horarios académicos en la Universidad Continental. La solución busca resolver un problema complejo de planificación académica, caracterizado por la presencia de múltiples restricciones y variables interdependientes.

A través del uso de técnicas de **Problemas de Satisfacción de Restricciones (CSP)** y optimización combinatoria, el sistema permitirá generar horarios libres de solapamientos, cumpliendo estrictamente con los prerrequisitos académicos y el límite de créditos establecidos (20 a 22 créditos por estudiante).

Asimismo, el proyecto incorpora un enfoque innovador orientado a la **retención estudiantil y la flexibilidad laboral**, permitiendo la generación de horarios compactos que reduzcan tiempos muertos y faciliten la inserción de los estudiantes en actividades preprofesionales.

---

# 🧠 Enfoque del Proyecto

El desarrollo de SmartSched-UC se fundamenta en la resolución de un problema de naturaleza **NP-Hard**, lo que implica la necesidad de aplicar algoritmos eficientes capaces de encontrar soluciones óptimas en tiempos razonables.

El sistema no solo busca cumplir restricciones obligatorias, sino también optimizar criterios adicionales como:
- Minimización de horarios fragmentados  
- Maximización de bloques libres (mañana o tarde)  
- Mejora en la distribución académica del estudiante  

Este enfoque convierte al sistema en una herramienta de apoyo a la toma de decisiones académicas basada en inteligencia computacional.

---

# 🔄 Metodología de Desarrollo

El proyecto se desarrolla bajo la metodología ágil **Scrum**, permitiendo una gestión iterativa e incremental del desarrollo del software.

Se organizan ciclos de trabajo denominados **Sprints**, en los cuales se planifican, desarrollan y validan funcionalidades específicas del sistema. Esta metodología permite:

- Adaptación continua a cambios en los requerimientos  
- Entrega progresiva de valor  
- Mejora continua del producto  
- Trabajo colaborativo entre los integrantes del equipo  

Los eventos principales aplicados en el proyecto incluyen:
- **Sprint Planning:** planificación de tareas y objetivos  
- **Daily Scrum:** seguimiento diario del avance  
- **Sprint Review:** validación de entregables  
- **Sprint Retrospective:** mejora continua del proceso  

---

# 🚀 Objetivo General

Desarrollar una plataforma web inteligente basada en técnicas de CSP que permita generar horarios académicos óptimos, garantizando el cumplimiento de restricciones académicas y contribuyendo a la mejora de la retención estudiantil y la flexibilidad laboral.

---

# 📌 Objetivos Específicos

- Modelar el problema de generación de horarios como un CSP  
- Implementar un algoritmo eficiente para la resolución del problema  
- Desarrollar una arquitectura web escalable (SPA + API REST)  
- Garantizar la validación de prerrequisitos y créditos académicos  
- Optimizar la distribución de horarios según preferencias del estudiante  


# SmartSched-UC - Smart Academic Scheduler

SmartSched-UC es un prototipo MERN para generar horarios academicos automaticos. El sistema modela docentes, cursos, aulas y horarios; valida restricciones academicas criticas; y expone una interfaz React conectada a una API Express/Node.js.

## Estructura del repositorio

```text
Smarts_Uc/
  smartsched-uc/
    client/   # React
    server/   # Node.js + Express + MongoDB/Mongoose
    docs/     # Especificacion SDD
```

## Stack MERN

- MongoDB: persistencia de Teacher, Course, Classroom y Schedule mediante Mongoose.
- Express: API REST para consultar entidades, validar y generar horarios.
- React: interfaz para cargar datos academicos y visualizar el horario generado.
- Node.js: runtime del servidor y motor de generacion.

El backend puede ejecutarse sin MongoDB usando el dataset semilla en memoria para demostracion local. Con `MONGODB_URI`, usa MongoDB y puede guardar resultados validos.

## Modelo del problema

- Teacher: codigo, nombre, especialidades y disponibilidad.
- Course: codigo, docente, horas requeridas, matricula y tipo de aula.
- Classroom: codigo, capacidad y tipo.
- Schedule: sesiones generadas con curso, docente, aula, dia, inicio, fin y metricas.

Relaciones principales: `Course.teacherCode -> Teacher.code`; `Schedule.items.courseCode -> Course.code`; `Schedule.items.classroomCode -> Classroom.code`.

## Restricciones implementadas

- Un docente no puede tener dos clases al mismo tiempo.
- Un aula no puede estar ocupada simultaneamente.
- No existen solapamientos validos para docente o aula.
- Cada curso cumple exactamente sus horas asignadas.
- Cada sesion respeta disponibilidad docente.
- Cada aula cumple capacidad y tipo requerido.

## Algoritmo

El motor esta en `server/src/services/scheduler.service.js`. Genera dominios de dias y bloques de 2 horas, ordena cursos por dificultad de asignacion y evalua candidatos con una heuristica determinista:

- eficiencia de capacidad de aula,
- reduccion de espacios muertos,
- distribucion balanceada por dia,
- descarte automatico de conflictos.

Luego ejecuta una validacion formal antes de entregar el resultado.

## Endpoints principales

- `GET /api/teachers`
- `GET /api/courses`
- `GET /api/classrooms`
- `POST /api/schedules/generate`
- `POST /api/schedules/validate`

## Ejecucion local

```bash
cd smartsched-uc/server
npm install
npm run seed   # opcional, requiere MONGODB_URI
npm start
```

```bash
cd smartsched-uc/client
npm install
npm start
```

Variables opcionales:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/smartsched_uc
REACT_APP_API_URL=http://localhost:5000/api
```

## Pruebas y evidencias

Backend con Jest:

```bash
cd smartsched-uc/server
npm.cmd test
```

Resultado verificado: 4 suites/casos del scheduler pasaron, incluyendo conflictos, restricciones y endpoint de generacion.

Frontend:

```bash
cd smartsched-uc/client
npm.cmd test -- --watchAll=false --runInBand
```

Resultado verificado: prueba React principal pasada. Build de produccion confirmado con `npm.cmd run build`.

## Spec Driven Development y TDD

La especificacion formal esta en `smartsched-uc/docs/SPEC.md`. El desarrollo se organizo con reglas, endpoints y flujo antes de consolidar el motor. Las pruebas Jest cubren el ciclo RED, GREEN y REFACTOR para validaciones academicas.

## Google Antigravity

Se documenta como soporte de IA asistida para analizar el modelado CSP, proponer validaciones y mejorar la heuristica. No es una dependencia del sistema.
