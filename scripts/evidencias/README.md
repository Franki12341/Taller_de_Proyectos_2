# Scripts de evidencias

Automatizan la generación de evidencias de cierre para `SmartSched-UC`.

## Scripts

- `generar-todas.ps1`: orquestador general.
- `generar-aplicacion.ps1`: levanta backend/frontend y genera capturas con Playwright.
- `generar-base-datos.ps1`: consulta `/api/health`, diagnóstico de PostgreSQL y fallback.
- `generar-gestion.ps1`: obtiene historial Git, ramas, contribuciones y estado del repositorio.
- `generar-sonarqube.ps1`: verifica SonarQube y genera evidencias reales o pendientes justificadas.
- `generar-manifiesto.js`: consolida el manifiesto de evidencias.
- `verificar-evidencias.ps1`: valida JSON, archivos vacíos y observaciones básicas.
- `capture-local.js`: captura reportes HTML locales en PNG.
