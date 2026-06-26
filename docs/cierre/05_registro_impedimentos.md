# Registro de impedimentos SmartSched-UC

## PropÃ³sito

Documentar obstÃ¡culos que bloquearon o retrasaron actividades de desarrollo, validaciÃ³n o cierre.

## Registro

| ID | Fecha | Impedimento | Actividad afectada | Impacto | DuraciÃ³n | Responsable de resoluciÃ³n | AcciÃ³n de mitigaciÃ³n | Resultado | Estado | Evidencia |
|---|---|---|---|---|---|---|---|---|---|---|
| IMP-01 | 2026-06-25 | La raÃ­z del repositorio y la aplicaciÃ³n estÃ¡n en niveles distintos (`Taller_de_Proyectos_2-git/` y `smartsched-uc/`). | InspecciÃ³n, trazabilidad y cierre documental | Medio | [PENDIENTE: registrar duraciÃ³n real del anÃ¡lisis de rutas] | [PENDIENTE: confirmar responsable del cierre documental] | VerificaciÃ³n manual de rutas y artefactos desde ambos niveles. | Se pudo consolidar la trazabilidad, pero con mayor esfuerzo de navegaciÃ³n. | Resuelto | `EV-GIT-03`, estructura del repositorio |
| IMP-02 | 2026-06-25 | No se encontraron horas reales ni costos reales trazables. | Informe final, SOW, sostenibilidad y cierre | Alto | [PENDIENTE: registrar duraciÃ³n real del bloqueo de costos] | [PENDIENTE: confirmar responsable de costos o cronograma] | Sustituir montos no verificables por plantillas y pendientes especÃ­ficos. | El cierre queda documentado sin inventar costos. | Mitigado | `docs/16_presupuesto.md`, `01_informe_final_proyecto.md` |
| IMP-03 | 2026-06-25 | No se encontrÃ³ reporte exportado de SonarQube ni auditorÃ­a formal WCAG. | Calidad y validaciÃ³n de cumplimiento | Medio | [PENDIENTE: registrar duraciÃ³n real del bloqueo de evidencia] | [PENDIENTE: confirmar responsable de calidad y accesibilidad] | Declarar el vacÃ­o de evidencia y no afirmarlo como implementado. | Se evita sobredeclaraciÃ³n de calidad no verificada. | Mitigado | `smartsched-uc/sonar-project.properties`, `13_impacto_sostenibilidad.md` |
| IMP-04 | 2026-06-25 | DocumentaciÃ³n histÃ³rica con mojibake y referencias obsoletas. | Cierre, capacitaciÃ³n y defensa acadÃ©mica | Medio | [PENDIENTE: registrar duraciÃ³n real del saneamiento documental] | [PENDIENTE: confirmar responsable de mantenimiento documental] | Registrar incidente y defecto, y redirigir al cierre actualizado. | Se preserva la historia y se mejora la claridad de la entrega. | Mitigado | `INC-02`, `INC-04`, `DEF-05` |

## Enlaces relacionados

- Riesgos: [`03_registro_riesgos.md`](./03_registro_riesgos.md)
- Incidentes: [`04_registro_incidentes.md`](./04_registro_incidentes.md)
- Defectos: [`06_registro_defectos.md`](./06_registro_defectos.md)

## Evidencias relacionadas

- Estado del repositorio y ramas: [`evidencias/gestion/EV-GEST-03-ramas.txt`](./evidencias/gestion/EV-GEST-03-ramas.txt), [`evidencias/gestion/EV-GEST-06-estado-repositorio.txt`](./evidencias/gestion/EV-GEST-06-estado-repositorio.txt)
- SonarQube pendiente de credenciales: [`evidencias/sonarqube/EV-SONAR-09-ejecucion-scanner.txt`](./evidencias/sonarqube/EV-SONAR-09-ejecucion-scanner.txt)

