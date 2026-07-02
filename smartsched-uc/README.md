# SmartSched-UC

**Sistema web para la generación, validación y simulación de horarios académicos universitarios**

SmartSched-UC es un proyecto académico desarrollado para la asignatura **Taller de Proyectos 2** de la Escuela Académico Profesional de Ingeniería de Sistemas e Informática de la Universidad Continental.

La aplicación busca apoyar la planificación académica mediante la generación de horarios universitarios, considerando restricciones relacionadas con estudiantes, cursos, docentes, aulas, capacidad, disponibilidad horaria, carga académica y conflictos de programación.

---

## Equipo del proyecto

El análisis, diseño, desarrollo, validación, documentación y presentación de SmartSched-UC fueron realizados por:

| N.° | Integrante | Carrera |
|---:|---|---|
| 1 | **Franco Christiam Vilcahuaman Lazo** | Ingeniería de Sistemas e Informática |
| 2 | **Helen Sayumi Castro Arteaga** | Ingeniería de Sistemas e Informática |

### Fotografía grupal

<p align="center">
  <img
    src="../assets/equipo-smartsched-uc.png"
    alt="Integrantes del equipo de desarrollo de SmartSched-UC"
    width="650"
  />
</p>

<p align="center">
  <em>Equipo responsable del desarrollo de SmartSched-UC.</em>
</p>

> La fotografía incluye a la totalidad de integrantes que conforman el equipo del proyecto.

---

## Descripción del sistema

SmartSched-UC permite gestionar y simular el proceso de planificación académica desde dos perfiles principales:

- **Coordinación académica**
- **Estudiante**

El sistema utiliza un motor de generación basado en restricciones tipo **CSP** y búsqueda mediante **backtracking**, encargado de analizar distintas combinaciones de docentes, aulas, bloques y secciones hasta encontrar propuestas válidas.

Entre las restricciones consideradas se encuentran:

- cruces de horarios;
- disponibilidad de docentes;
- compatibilidad entre docentes y cursos;
- capacidad y tipo de aula;
- aulas en mantenimiento;
- bloques administrativos o protegidos;
- carga máxima docente;
- coincidencia entre cursos solicitados;
- límite máximo de 25 créditos;
- duplicidad de cursos;
- disponibilidad de cupos;
- conflictos personales del estudiante.

---

## Objetivo

Desarrollar una aplicación web que permita generar, validar y consultar horarios académicos universitarios mediante reglas verificables, reduciendo errores manuales y facilitando la toma de decisiones de estudiantes y coordinación académica.

---

## Funcionalidades principales

### Autenticación y roles

- Inicio de sesión mediante correo y contraseña.
- Contraseñas protegidas mediante hash.
- Sesiones controladas mediante JWT.
- Rutas protegidas según el rol.
- Separación de funciones entre coordinador y estudiante.
- Persistencia y cierre seguro de sesión.

### Coordinación académica

- Dashboard con métricas académicas.
- Consulta de estudiantes simulados.
- Búsqueda, filtros y paginación.
- Visualización de solicitudes académicas.
- Análisis de demanda por curso.
- Cálculo de secciones requeridas.
- Generación institucional de horarios.
- Asignación de docentes, aulas y bloques.
- Identificación de conflictos.
- Visualización de secciones no asignadas.
- Historial de generaciones.
- Publicación de una versión del horario.
- Consulta de carga docente y uso de aulas.
- Resumen de matrículas simuladas.

### Estudiante

- Consulta del perfil académico.
- Visualización de cursos solicitados.
- Consulta de secciones publicadas.
- Selección de una sección por curso.
- Validación de cruces personales.
- Control del límite máximo de 25 créditos.
- Visualización del horario provisional.
- Guardado de matrícula en borrador.
- Recuperación del borrador al volver a ingresar.
- Confirmación de matrícula simulada.
- Consulta del horario confirmado.
- Cancelación controlada de la matrícula simulada.

### Generación de horarios

- Motor basado en CSP y backtracking.
- Validación de restricciones duras y blandas.
- Prevención de cruces de docentes.
- Prevención de cruces de aulas.
- Validación de capacidad.
- Validación del tipo de ambiente.
- Equilibrio de carga docente.
- Optimización de ocupación de aulas.
- Priorización de cursos con estudiantes coincidentes.
- Registro del tiempo de ejecución.
- Resultados completos o parciales.
- Advertencias y recomendaciones.

---

## Datos académicos de demostración

Para validar el funcionamiento del prototipo se utiliza un dataset sintético compuesto por:

| Elemento | Cantidad |
|---|---:|
| Estudiantes | 300 |
| Solicitudes académicas | 1500 |
| Cursos | 20 |
| Docentes | 16 |
| Aulas | 14 |
| Bloques horarios | 22 |

Todos los registros utilizados para la demostración son ficticios y fueron generados exclusivamente para validar el prototipo.

> SmartSched-UC no utiliza información personal real de estudiantes de la Universidad Continental.

---

## Credenciales de demostración

### Coordinación académica

```text
Correo: coordinacion@smartsched.uc
Contraseña: SmartSched2026*
