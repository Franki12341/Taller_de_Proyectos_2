# ðŸ“… SmartSched-UC: Sistema de GeneraciÃ³n Ã“ptima de Horarios AcadÃ©micos

**Universidad Continental - Proyecto de Fin de Asignatura (PFA)**
**Periodo AcadÃ©mico:** 202610
**Desarrollado por:** Helen Sayumi Castro Arteaga

---

## ðŸ“– 1. DescripciÃ³n del Sistema

El proyecto **SmartSched-UC** tiene como objetivo desarrollar una plataforma web inteligente capaz de optimizar la generaciÃ³n de horarios acadÃ©micos. La soluciÃ³n busca resolver un problema complejo de planificaciÃ³n acadÃ©mica de naturaleza **NP-Hard**, caracterizado por la presencia de mÃºltiples restricciones y variables interdependientes.

A travÃ©s del uso de tÃ©cnicas de **Problemas de SatisfacciÃ³n de Restricciones (CSP)** y optimizaciÃ³n combinatoria, el sistema permite generar horarios libres de solapamientos, cumpliendo estrictamente con los prerrequisitos acadÃ©micos y el lÃ­mite de crÃ©ditos establecidos (20 a 22 crÃ©ditos por estudiante).

Asimismo, el proyecto incorpora un enfoque innovador orientado a la **retenciÃ³n estudiantil y la flexibilidad laboral**, permitiendo la generaciÃ³n de horarios compactos que minimicen tiempos muertos y faciliten la inserciÃ³n de los estudiantes en actividades preprofesionales.

---

## ðŸ—ï¸ 2. Arquitectura del Sistema

El proyecto sigue una arquitectura Cliente-Servidor desacoplada con **React** en frontend, **Node.js + Express** en backend y **PostgreSQL** como base de datos objetivo, manteniendo ademÃ¡s fallback local para continuidad acadÃ©mica.

### Estructura del Repositorio
```text
Smarts_Uc/
  smartsched-uc/
    client/   # Frontend (React)
    server/   # Backend (Node.js + Express + PostgreSQL / fallback local)
    docs/     # EspecificaciÃ³n formal SDD y artefactos
```

## DocumentaciÃ³n vigente de cierre

- Ãndice de cierre: [`docs/cierre/00_indice_cierre.md`](./docs/cierre/00_indice_cierre.md)
- Informe final: [`docs/cierre/01_informe_final_proyecto.md`](./docs/cierre/01_informe_final_proyecto.md)
- Trazabilidad: [`docs/cierre/11_matriz_trazabilidad.md`](./docs/cierre/11_matriz_trazabilidad.md)
- Evidencias: [`docs/cierre/evidencias/README.md`](./docs/cierre/evidencias/README.md)

> Nota: este README conserva contenido histÃ³rico. Para la sustentaciÃ³n tÃ©cnica actual, usar como referencia principal la carpeta `docs/cierre/` y la aplicaciÃ³n vigente en `smartsched-uc/`.

- Manifiesto de evidencias: [docs/cierre/evidencias/00_manifiesto_evidencias.md](./docs/cierre/evidencias/00_manifiesto_evidencias.md)
- Validación de evidencias: [docs/cierre/evidencias/99_validacion_evidencias.md](./docs/cierre/evidencias/99_validacion_evidencias.md)

