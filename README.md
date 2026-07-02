# SmartSched-UC: Sistema de Generación Óptima de Horarios Académicos

**Universidad Continental - Taller de Proyectos 2**  
**Periodo académico:** 202610  
**Proyecto:** SmartSched-UC  
**Escuela Académico Profesional:** Ingeniería de Sistemas e Informática  

---

## 1. Descripción del sistema

SmartSched-UC es una aplicación web orientada a apoyar la planificación, generación, validación y simulación de horarios académicos universitarios.

El sistema permite seleccionar cursos, validar restricciones académicas y generar propuestas de horario considerando cruces entre asignaturas, disponibilidad docente, capacidad y tipo de aulas, ambientes en mantenimiento, bloques administrativos y el límite máximo de 25 créditos por estudiante.

El proyecto aborda un problema complejo de ingeniería de software, debido a que la generación de horarios involucra múltiples restricciones, combinaciones posibles y decisiones que afectan tanto a los estudiantes como a la coordinación académica.

La solución utiliza un motor de generación basado en un problema de satisfacción de restricciones, optimización combinatoria y búsqueda mediante backtracking. Este motor busca producir horarios válidos, compactos y cercanos a la carga académica seleccionada, sin superar el límite establecido de créditos.

Además, SmartSched-UC incorpora criterios de calidad, trazabilidad, seguridad, accesibilidad y sostenibilidad mediante pruebas automatizadas, documentación técnica, control de versiones, evidencias de cierre y análisis con herramientas como SonarQube.

---

## 2. Equipo del proyecto

El equipo responsable del análisis, diseño, desarrollo, pruebas, documentación y presentación de SmartSched-UC está conformado por los siguientes estudiantes:

| N.° | Integrante | Carrera |
|---:|---|---|
| 1 | **Franco Christiam Vilcahuaman Lazo** | Ingeniería de Sistemas e Informática |
| 2 | **Helen Sayumi Castro Arteaga** | Ingeniería de Sistemas e Informática |

### Fotografía grupal

<p align="center">
  <img
    src="assets/equipo-smartsched-uc.png"
    alt="Integrantes del equipo SmartSched-UC"
    width="650"
  />
</p>

<p align="center">
  <em>Equipo responsable del desarrollo del proyecto SmartSched-UC.</em>
</p>

> La fotografía presenta a la totalidad de integrantes que conforman el equipo del proyecto.

---

## 3. Arquitectura del sistema

El proyecto utiliza una arquitectura cliente-servidor desacoplada:

- **Frontend:** React.
- **Backend:** Node.js con Express.
- **Base de datos:** PostgreSQL.
- **Modo de respaldo:** fallback local con datos académicos simulados.
- **Pruebas:** Jest y React Testing Library.
- **Calidad:** SonarQube, npm audit y evidencias de cobertura.
- **Control de versiones:** Git y GitHub.

---

## 4. Estructura del repositorio

```text
Taller_de_Proyectos_2-git/
├── docs/
│   ├── assets/
│   │   └── equipo-smartsched-uc.png
│   ├── 00_TOC.md
│   ├── 20_analisis_validacion_problema.md
│   ├── 21_evidencias_validacion_tdd_mvp.md
│   ├── 22_desarrollo_web_responsable_green_mern.md
│   ├── 23_revision_calidad_sonarqube_owasp_wcag_sus.md
│   └── cierre/
│       ├── 00_indice_cierre.md
│       ├── 01_informe_final_proyecto.md
│       ├── 02_lecciones_aprendidas.md
│       ├── 03_registro_riesgos.md
│       ├── 04_registro_incidentes.md
│       ├── 05_registro_impedimentos.md
│       ├── 06_registro_defectos.md
│       ├── 07_registro_supuestos.md
│       ├── 08_revision_acta_constitucion.md
│       ├── 09_declaracion_trabajo_sow.md
│       ├── 10_manual_capacitacion.md
│       ├── 11_matriz_trazabilidad.md
│       ├── 12_control_configuracion_cambios.md
│       ├── 13_impacto_sostenibilidad.md
│       ├── 14_evaluacion_competencias.md
│       ├── 15_lista_verificacion_cierre.md
│       └── evidencias/
├── smartsched-uc/
│   ├── client/
│   ├── server/
│   ├── docs/
│   └── sonar-project.properties
├── scripts/
│   └── evidencias/
├── e2e/
│   └── evidencias/
├── README.md
└── package.json
