# Índice de evidencias de cierre SmartSched-UC

## Propósito

Inventariar las evidencias verificables del cierre, diferenciando claramente resultados reales y artefactos pendientes o simulados.

## Navegación rápida

- Manifiesto consolidado: [`00_manifiesto_evidencias.md`](./00_manifiesto_evidencias.md)
- Validación técnica: [`99_validacion_evidencias.md`](./99_validacion_evidencias.md)
- Aplicación: [`aplicacion/README.md`](./aplicacion/README.md)
- Base de datos: [`base-datos/README.md`](./base-datos/README.md)
- Gestión: [`gestion/README.md`](./gestion/README.md)
- SonarQube: [`sonarqube/README.md`](./sonarqube/README.md)

## Evidencias automatizadas generadas

| Categoría | Evidencias clave | Estado |
|---|---|---|
| Aplicación | `EV-APP-01` a `EV-APP-10` | Verificado |
| Base de datos | `EV-DB-01` a `EV-DB-05`, `EV-DB-07` | Verificado |
| Gestión | `EV-GEST-01` a `EV-GEST-09` | Verificado |
| SonarQube | `EV-SONAR-01`, `EV-SONAR-04`, `EV-SONAR-08`, `EV-SONAR-09` | Parcial; autenticación pendiente |
| Pruebas | `EV-TEST-01` a `EV-TEST-04` | Verificado |
| Seguridad | `EV-SEC-01` a `EV-SEC-03` | Verificado |
| Git histórico | `EV-GIT-01` a `EV-GIT-04` | Verificado |

## Evidencias destacadas

- Pantalla principal: [`aplicacion/EV-APP-01-pantalla-principal.md`](./aplicacion/EV-APP-01-pantalla-principal.md)
- Horario generado: [`aplicacion/EV-APP-04-horario-generado.md`](./aplicacion/EV-APP-04-horario-generado.md)
- Modo demostración: [`aplicacion/EV-APP-10-modo-demostracion.md`](./aplicacion/EV-APP-10-modo-demostracion.md)
- Estado de API y PostgreSQL: [`base-datos/EV-DB-01-api-health.md`](./base-datos/EV-DB-01-api-health.md)
- Integridad de datos: [`base-datos/EV-DB-05-integridad-datos.md`](./base-datos/EV-DB-05-integridad-datos.md)
- Resumen de gestión: [`gestion/EV-GEST-09-resumen-gestion.html`](./gestion/EV-GEST-09-resumen-gestion.html)
- Estado de SonarQube: [`sonarqube/EV-SONAR-01-system-status.json`](./sonarqube/EV-SONAR-01-system-status.json)

## Pendientes justificados

- Métricas autenticadas de SonarQube: requieren `SONAR_TOKEN` en entorno.
- Capturas del dashboard de SonarQube: requieren `SONAR_USER` y `SONAR_PASSWORD`, o captura manual.
- Cualquier simulación futura debe ubicarse en carpetas `simulacion/` y marcarse explícitamente como datos sintéticos.
