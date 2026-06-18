# 📅 SmartSched-UC: Sistema de Generación Óptima de Horarios Académicos

**Universidad Continental - Proyecto de Fin de Asignatura (PFA)**
**Periodo Académico:** 202610
**Desarrollado por:** Helen Sayumi Castro Arteaga

---

## 📖 1. Descripción del Sistema

El proyecto **SmartSched-UC** tiene como objetivo desarrollar una plataforma web inteligente capaz de optimizar la generación de horarios académicos. La solución busca resolver un problema complejo de planificación académica de naturaleza **NP-Hard**, caracterizado por la presencia de múltiples restricciones y variables interdependientes.

A través del uso de técnicas de **Problemas de Satisfacción de Restricciones (CSP)** y optimización combinatoria, el sistema permite generar horarios libres de solapamientos, cumpliendo estrictamente con los prerrequisitos académicos y el límite de créditos establecidos (20 a 22 créditos por estudiante).

Asimismo, el proyecto incorpora un enfoque innovador orientado a la **retención estudiantil y la flexibilidad laboral**, permitiendo la generación de horarios compactos que minimicen tiempos muertos y faciliten la inserción de los estudiantes en actividades preprofesionales.

---

## 🏗️ 2. Arquitectura del Sistema y Stack MERN

El proyecto sigue una arquitectura Cliente-Servidor desacoplada utilizando el stack MERN.

### Estructura del Repositorio
```text
Smarts_Uc/
  smartsched-uc/
    client/   # Frontend (React)
    server/   # Backend (Node.js + Express + MongoDB/Mongoose)
    docs/     # Especificación formal SDD y artefactos


---

## 🌱 Desarrollo web responsable y Green MERN

Como parte de la actualización del proyecto, SmartSched-UC incorpora un análisis de desarrollo web responsable orientado a reducir el impacto ambiental del software y mejorar la eficiencia del sistema.

Las mejoras consideradas incluyen:

- análisis del impacto ambiental del desarrollo, despliegue y uso de aplicaciones web;
- identificación de oportunidades de optimización en frontend, backend, base de datos y APIs;
- uso de compresión HTTP en Express;
- paginación opcional en endpoints académicos;
- optimización de consultas MongoDB mediante selección de campos y uso de `.lean()`;
- caché temporal para reducir solicitudes repetidas;
- reducción del tamaño de respuestas JSON;
- documentación de evidencias antes/después mediante Lighthouse, DevTools o herramientas equivalentes.

Documento relacionado:

```text
docs/22_desarrollo_web_responsable_green_mern.md
