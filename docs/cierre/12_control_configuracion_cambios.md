# Control de configuración y cambios de SmartSched-UC

## 1. Objetivo

Registrar los elementos de configuración del proyecto SmartSched-UC y los cambios verificables que afectaron su evolución funcional, técnica, documental y de calidad.

Este documento permite mantener trazabilidad entre los archivos modificados, las decisiones tomadas, los riesgos asociados, las evidencias generadas y el historial de control de versiones.

## 2. Alcance del control de configuración

El control de configuración comprende:

* código fuente del frontend;
* código fuente del backend;
* motor de generación de horarios;
* configuración de PostgreSQL;
* datos locales de respaldo;
* pruebas automatizadas;
* scripts de calidad;
* configuración de SonarQube;
* hooks de Husky;
* GitHub Actions;
* documentación técnica;
* documentación de control y cierre;
* evidencias del proyecto;
* archivos de configuración y dependencias.

## 3. Elementos de configuración

| ID    | Elemento                       | Ubicación                                                    | Descripción                                                                               | Control aplicado                           |
| ----- | ------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------ |
| EC-01 | Repositorio principal          | `Taller_de_Proyectos_2-git/`                                 | Contiene la aplicación, documentación, automatizaciones y evidencias                      | Git y GitHub                               |
| EC-02 | Aplicación SmartSched-UC       | `smartsched-uc/`                                             | Proyecto principal del MVP académico                                                      | Git, pruebas y revisión técnica            |
| EC-03 | Frontend                       | `smartsched-uc/client/`                                      | Interfaz desarrollada con React                                                           | Git, Jest, React Testing Library y build   |
| EC-04 | Backend                        | `smartsched-uc/server/`                                      | API desarrollada con Node.js y Express                                                    | Git, Jest, Supertest y cobertura           |
| EC-05 | Motor de horarios              | `smartsched-uc/server/src/services/scheduler.service.js`     | Implementa la generación mediante restricciones y backtracking                            | Pruebas y cobertura                        |
| EC-06 | Servicio de datos académicos   | `smartsched-uc/server/src/services/academic-data.service.js` | Gestiona PostgreSQL, paginación y datos académicos                                        | Pruebas e inspección técnica               |
| EC-07 | Configuración de base de datos | `smartsched-uc/server/src/config/db.js`                      | Controla la conexión PostgreSQL y el fallback local                                       | Variables de entorno y endpoint de salud   |
| EC-08 | Esquema PostgreSQL             | `smartsched-uc/server/src/database/smartsched_uc.sql`        | Define tablas, relaciones e índices                                                       | Scripts de inicialización e inspección     |
| EC-09 | Datos de demostración          | `smartsched-uc/server/src/data/academic.seed.js`             | Proporciona información local para continuidad y demostración                             | Control de versiones y etiquetado de datos |
| EC-10 | Pruebas del backend            | `smartsched-uc/server/test/scheduler.test.js`                | Valida reglas académicas, API y fallback                                                  | Jest y cobertura                           |
| EC-11 | Pruebas del frontend           | `smartsched-uc/client/src/App.test.js`                       | Valida el renderizado principal de la interfaz                                            | React Testing Library                      |
| EC-12 | Configuración SonarQube        | `smartsched-uc/sonar-project.properties`                     | Define fuentes, pruebas, cobertura y exclusiones                                          | SonarQube y variables de entorno           |
| EC-13 | Automatización general         | `package.json`                                               | Centraliza comandos de pruebas, cobertura y calidad                                       | npm y GitHub Actions                       |
| EC-14 | Hooks Git                      | `.husky/`                                                    | Ejecuta validaciones antes de commits y envíos                                            | Husky                                      |
| EC-15 | Convención de commits          | `commitlint.config.cjs`                                      | Controla el formato de mensajes de commit                                                 | Commitlint                                 |
| EC-16 | Integración continua           | `.github/workflows/quality.yml`                              | Automatiza pruebas y controles de calidad                                                 | GitHub Actions                             |
| EC-17 | Documentación general          | `docs/`                                                      | Contiene documentos de planificación, validación y arquitectura                           | Markdown y Git                             |
| EC-18 | Documentación de cierre        | `docs/cierre/`                                               | Contiene informes, registros y controles finales                                          | Markdown, revisión y Git                   |
| EC-19 | Evidencias                     | `docs/cierre/evidencias/`                                    | Contiene evidencias de aplicación, base de datos, pruebas, seguridad, gestión y SonarQube | Manifiesto y validación                    |
| EC-20 | Scripts de evidencias          | `scripts/evidencias/`                                        | Automatizan la generación y comprobación de evidencias                                    | PowerShell y Node.js                       |

## 4. Estrategia de ramas

Durante el desarrollo se utilizaron ramas para separar cambios funcionales, de calidad y documentación.

| Rama                   | Propósito                                                          | Estado              |
| ---------------------- | ------------------------------------------------------------------ | ------------------- |
| `main`                 | Rama principal con la versión integrada del proyecto               | Activa              |
| `ci/quality-standards` | Integración de controles de calidad, Husky, Commitlint y SonarQube | Integrada           |
| `docs/control-cierre`  | Elaboración de documentos y evidencias de control y cierre         | Integrada en `main` |

La rama principal oficial del proyecto es:

```text
main
```

## 5. Repositorio remoto

| Elemento          | Valor                                                      |
| ----------------- | ---------------------------------------------------------- |
| Nombre del remoto | `origin`                                                   |
| Repositorio       | `https://github.com/Franki12341/Taller_de_Proyectos_2.git` |
| Rama principal    | `main`                                                     |
| Plataforma        | GitHub                                                     |

## 6. Convenciones de commits

Los mensajes de commit deben seguir una estructura comprensible y consistente.

Ejemplos:

```text
feat(scheduler): add academic conflict validation
fix(database): correct PostgreSQL schema mapping
test(api): add schedule generation tests
docs(cierre): update project closure records
chore(quality): configure SonarQube analysis
```

Tipos principales utilizados:

| Tipo       | Uso                                                     |
| ---------- | ------------------------------------------------------- |
| `feat`     | Nueva funcionalidad                                     |
| `fix`      | Corrección de defecto                                   |
| `docs`     | Cambios documentales                                    |
| `test`     | Incorporación o modificación de pruebas                 |
| `refactor` | Reorganización del código sin cambiar su comportamiento |
| `chore`    | Configuración, dependencias o tareas auxiliares         |
| `ci`       | Automatización e integración continua                   |

## 7. Controles automatizados

| Control        | Configuración                   | Finalidad                                                  | Estado                                                         |
| -------------- | ------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------- |
| Pre-commit     | `.husky/pre-commit`             | Ejecutar pruebas antes de confirmar cambios                | Configurado, con mejora de compatibilidad pendiente en Windows |
| Commit-msg     | `.husky/commit-msg`             | Validar el mensaje mediante Commitlint                     | Configurado                                                    |
| Pre-push       | `.husky/pre-push`               | Ejecutar controles completos antes de subir cambios        | Configurado                                                    |
| GitHub Actions | `.github/workflows/quality.yml` | Ejecutar pruebas y verificaciones en el repositorio remoto | Configurado                                                    |
| SonarQube      | `sonar-project.properties`      | Analizar calidad, cobertura, incidencias y deuda técnica   | Ejecutado                                                      |
| npm audit      | Raíz, frontend y backend        | Identificar vulnerabilidades de dependencias               | Ejecutado                                                      |
| Jest           | Frontend y backend              | Validar comportamiento funcional                           | Ejecutado                                                      |
| Cobertura      | Jest Coverage                   | Medir sentencias, ramas, funciones y líneas                | Ejecutado                                                      |

## 8. Gestión de entornos

### 8.1 Variables de entorno

Las variables sensibles deben almacenarse fuera del repositorio.

El archivo:

```text
smartsched-uc/server/.env.example
```

sirve como guía para configurar el entorno local.

Variables principales:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/smartsched_uc
DB_SSL=false
USE_POSTGRES=true
PORT=3001
```

El archivo `.env` real no debe subirse al repositorio.

### 8.2 SonarQube

El token se proporciona únicamente durante la ejecución:

```powershell
$env:SONAR_TOKEN="TOKEN_GENERADO_EN_SONARQUBE"
```

No se deben almacenar tokens ni contraseñas en:

* `sonar-project.properties`;
* archivos Markdown;
* scripts versionados;
* capturas de pantalla;
* commits;
* archivos de evidencia.

### 8.3 PostgreSQL y fallback local

El sistema utiliza:

* PostgreSQL como fuente principal;
* datos locales como mecanismo de continuidad.

El endpoint:

```text
/api/health
```

permite identificar el modo de datos activo.

## 9. Proceso de control de cambios

Todo cambio significativo debe seguir el siguiente procedimiento:

1. identificar la necesidad;
2. describir el cambio;
3. determinar los archivos afectados;
4. analizar el impacto funcional, técnico y documental;
5. relacionar el cambio con requisitos, riesgos o defectos;
6. implementar el cambio en una rama o entorno controlado;
7. ejecutar pruebas;
8. revisar cobertura, build o auditorías cuando corresponda;
9. actualizar la documentación;
10. registrar la evidencia;
11. crear un commit descriptivo;
12. integrar el cambio en `main`;
13. comprobar el estado final del repositorio.

## 10. Registro consolidado de cambios

| ID     | Fecha         | Solicitud o cambio                                                                        | Origen                   | Motivo                                                                    | Impacto | Archivos principales afectados                                                                                       | Riesgo relacionado     | Aprobación                                 | Responsable                            | Referencia Git                             | Estado                  |
| ------ | ------------- | ----------------------------------------------------------------------------------------- | ------------------------ | ------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------ | -------------------------------------- | ------------------------------------------ | ----------------------- |
| CAM-01 | 2026-05-04    | Implementación inicial del sistema                                                        | Desarrollo inicial       | Construir el MVP base de generación de horarios                           | Alto    | `smartsched-uc/`                                                                                                     | RSK-TEC-01             | Aprobación técnica del equipo              | Equipo de desarrollo                   | `22f812b`                                  | Verificado              |
| CAM-02 | 2026-05-08    | Incorporación del acta y constitución documental                                          | Gestión del proyecto     | Formalizar objetivos, alcance y entregables                               | Medio   | `docs/14_constitution.md`, documentos de planificación                                                               | RSK-GES-01             | Aprobación documental del equipo           | Equipo de documentación                | `ec192f3`                                  | Verificado              |
| CAM-03 | 2026-05-29    | Incorporación de evidencias de validación, TDD y MVP                                      | Calidad y documentación  | Sustentar técnicamente el funcionamiento del producto                     | Medio   | `docs/21_evidencias_validacion_tdd_mvp.md`                                                                           | RSK-QLT-01             | Aprobación técnica y documental            | Equipo de calidad                      | `c101868`                                  | Verificado              |
| CAM-04 | 2026-06-18    | Integración de Husky, Commitlint, GitHub Actions y SonarQube                              | Calidad y configuración  | Fortalecer las validaciones y el control de cambios                       | Alto    | `.husky/`, `.github/workflows/quality.yml`, `package.json`, `commitlint.config.cjs`, `sonar-project.properties`      | RSK-SEC-03, RSK-GIT-01 | Aprobación técnica del equipo              | Franco Lazo y equipo de calidad        | `3804bdd`                                  | Verificado              |
| CAM-05 | Junio de 2026 | Integración de PostgreSQL, fallback local, mejoras del scheduler y vistas de demostración | Desarrollo evolutivo     | Alinear el MVP con las necesidades de validación y sustentación           | Alto    | `client/src/App.js`, `server/src/config/db.js`, `server/src/services/`, `server/src/database/`, `server/test/`       | RSK-DB-01, RSK-OPS-01  | Aprobación técnica del equipo              | Equipo de desarrollo                   | Historial de integración funcional         | Verificado              |
| CAM-06 | 2026-06-25    | Generación y organización automatizada de evidencias                                      | Control y cierre         | Proporcionar pruebas verificables de aplicación, datos, calidad y gestión | Alto    | `scripts/evidencias/`, `e2e/evidencias/`, `docs/cierre/evidencias/`                                                  | RSK-OPS-01             | Aprobación técnica y documental            | Equipo de calidad y documentación      | Historial de generación de evidencias      | Verificado              |
| CAM-07 | 2026-06-25    | Consolidación de documentos de control y cierre                                           | Requerimiento académico  | Cumplir los entregables exigidos para la fase de cierre                   | Alto    | `docs/cierre/`                                                                                                       | RSK-GES-01, RSK-DOC-01 | Aprobación interna del equipo              | Equipo de documentación                | Historial de la rama `docs/control-cierre` | Verificado              |
| CAM-08 | 2026-06-26    | Integración de la rama `docs/control-cierre` en `main`                                    | Gestión de configuración | Publicar los documentos y evidencias en la rama principal                 | Alto    | `README.md`, `docs/00_TOC.md`, `docs/cierre/` y archivos funcionales asociados                                       | RSK-GIT-01             | Aprobación del responsable del repositorio | Responsable del repositorio            | Commit de fusión en `main`                 | Completado              |
| CAM-09 | 2026-06-26    | Resolución de conflictos entre `main` y `docs/control-cierre`                             | Integración Git          | Resolver cambios concurrentes en documentos compartidos                   | Medio   | `README.md`, `docs/00_TOC.md`, `docs/20_analisis_validacion_problema.md`, `docs/21_evidencias_validacion_tdd_mvp.md` | RSK-GIT-01             | Aprobación del responsable del repositorio | Responsable del repositorio            | Historial del merge                        | Completado              |
| CAM-10 | 2026-06-26    | Corrección de caracteres dañados y normalización UTF-8                                    | Calidad documental       | Mejorar la legibilidad y presentación en GitHub                           | Alto    | `README.md`, `docs/cierre/*.md` y documentos afectados                                                               | RSK-DOC-01             | Aprobación documental del equipo           | Equipo de documentación                | Historial de saneamiento documental        | En ejecución controlada |
| CAM-11 | 2026-06-26    | Corrección de referencias tecnológicas obsoletas                                          | Revisión documental      | Alinear los documentos con React, Node.js, Express y PostgreSQL           | Alto    | `README.md`, `docs/08_arquitectura.md`, `smartsched-uc/docs/SPEC.md`, `server/package.json`                          | RSK-GES-01             | Aprobación técnica y documental            | Equipo de arquitectura y documentación | Historial de correcciones                  | Completado              |
| CAM-12 | 2026-06-26    | Gestión segura del token de SonarQube                                                     | Seguridad                | Evitar almacenar secretos en el repositorio                               | Crítico | `sonar-project.properties`, variables de entorno y documentación técnica                                             | RSK-SEC-03             | Aprobación del responsable de calidad      | Responsable del repositorio y calidad  | Corrección posterior a `3804bdd`           | Completado              |

## 11. Trazabilidad de cambios

| Cambio | Requisito o área relacionada   | Evidencia principal                         |
| ------ | ------------------------------ | ------------------------------------------- |
| CAM-01 | RF-01 a RF-05                  | Historial inicial y aplicación              |
| CAM-02 | Gestión y constitución         | `docs/14_constitution.md`                   |
| CAM-03 | RNF-03, RNF-04 y RNF-05        | `EV-TEST-01`, `EV-TEST-02`, `EV-TEST-03`    |
| CAM-04 | RNF-07 a RNF-11 y RNF-15       | `.husky/`, GitHub Actions y SonarQube       |
| CAM-05 | RF-02 a RF-12, RNF-01 y RNF-02 | Pruebas, aplicación y base de datos         |
| CAM-06 | RNF-16                         | Manifiesto y validación de evidencias       |
| CAM-07 | Entregables de cierre          | `docs/cierre/`                              |
| CAM-08 | Control de configuración       | Historial de ramas y merge                  |
| CAM-09 | Gestión de conflictos          | `EV-GEST-03`, `EV-GEST-06`                  |
| CAM-10 | RNF-14                         | Documentos corregidos en UTF-8              |
| CAM-11 | Arquitectura y documentación   | README, arquitectura y SPEC                 |
| CAM-12 | RNF-10                         | Evidencias SonarQube y configuración segura |

## 12. Gestión de incidencias y defectos relacionados

Los cambios se relacionan con los siguientes registros:

* [Registro de riesgos](./03_registro_riesgos.md)
* [Registro de incidentes](./04_registro_incidentes.md)
* [Registro de impedimentos](./05_registro_impedimentos.md)
* [Registro de defectos](./06_registro_defectos.md)
* [Registro de supuestos](./07_registro_supuestos.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)

Los principales problemas atendidos mediante control de cambios fueron:

* referencias tecnológicas desactualizadas;
* caracteres dañados por codificación;
* exposición potencial de credenciales;
* conflictos al integrar ramas;
* fallos de ejecución de hooks de Husky;
* diferencias entre PostgreSQL y las consultas;
* ausencia inicial de evidencias centralizadas;
* cobertura limitada del frontend;
* vulnerabilidades en dependencias.

## 13. Respaldo y recuperación

### 13.1 Repositorio Git

Git preserva:

* historial de cambios;
* autores;
* fechas;
* ramas;
* fusiones;
* recuperación de versiones anteriores;
* comparación entre archivos;
* identificación de defectos introducidos.

### 13.2 GitHub

GitHub funciona como repositorio remoto para:

* respaldo del código;
* revisión de commits;
* almacenamiento de ramas;
* integración de cambios;
* ejecución de GitHub Actions;
* consulta de documentación.

### 13.3 Base de datos

Los elementos de recuperación de datos incluyen:

* script SQL del esquema;
* script de inicialización;
* prueba de conexión;
* inspección del esquema;
* fallback local;
* datos académicos estructurados.

### 13.4 Evidencias

Las evidencias deben mantenerse:

* dentro del repositorio;
* organizadas mediante un manifiesto;
* respaldadas antes de la sustentación;
* libres de credenciales;
* claramente identificadas cuando utilicen datos sintéticos.

## 14. Procedimiento ante conflictos de merge

Cuando Git detecte conflictos:

1. ejecutar:

```powershell
git status
```

2. identificar archivos no fusionados:

```powershell
git diff --name-only --diff-filter=U
```

3. revisar cada archivo;
4. conservar o combinar correctamente los cambios;
5. eliminar los marcadores:

```text
<<<<<<<
=======
>>>>>>>
```

6. agregar los archivos resueltos:

```powershell
git add <archivo>
```

7. completar el commit:

```powershell
git commit -m "merge: resolve integration conflicts"
```

8. subir los cambios:

```powershell
git push origin main
```

## 15. Verificación antes de un commit

Antes de confirmar cambios se debe ejecutar:

```powershell
git status
git diff
```

Cuando corresponda:

```powershell
npm test
npm run test:coverage:server
npm run test:coverage:client
npm --prefix smartsched-uc/client run build
```

Para buscar posibles secretos:

```powershell
git grep -n -i -E "sqp_|SONAR_PASSWORD|SONAR_TOKEN"
```

Para identificar caracteres dañados:

```powershell
git grep -n -E "Ã|ðŸ|â€"
```

## 16. Criterios de aprobación de cambios

Un cambio puede aprobarse cuando:

* responde a una necesidad identificada;
* no modifica innecesariamente el alcance;
* cuenta con pruebas;
* no introduce errores conocidos;
* mantiene o mejora la trazabilidad;
* actualiza los documentos relacionados;
* no expone credenciales;
* dispone de evidencia;
* fue revisado por el responsable correspondiente;
* quedó registrado en Git.

## 17. Estado final del control de configuración

El proyecto cuenta con:

* repositorio Git;
* rama principal integrada;
* historial de commits;
* ramas de trabajo;
* control de calidad automatizado;
* pruebas y cobertura;
* auditorías de dependencias;
* análisis SonarQube;
* variables de entorno;
* configuración PostgreSQL;
* fallback local;
* documentos de cierre;
* manifiesto de evidencias;
* registros de riesgos, incidentes, defectos y cambios.

Las acciones que permanecen como mejora son:

* reparar completamente los hooks de Husky en Windows;
* reducir las vulnerabilidades de dependencias;
* aumentar la cobertura del frontend;
* continuar revisando la codificación UTF-8 de documentos históricos;
* modularizar progresivamente `client/src/App.js`.

## 18. Evidencias automatizadas de gestión

* [Historial de commits](./evidencias/gestion/EV-GEST-01-historial-commits.txt)
* [Resumen del historial](./evidencias/gestion/EV-GEST-02-historial-commits.md)
* [Ramas del repositorio](./evidencias/gestion/EV-GEST-03-ramas.txt)
* [Contribuciones](./evidencias/gestion/EV-GEST-04-contribuciones.txt)
* [Cambios por archivo](./evidencias/gestion/EV-GEST-05-cambios-por-archivo.txt)
* [Estado del repositorio](./evidencias/gestion/EV-GEST-06-estado-repositorio.txt)
* [Versionamiento](./evidencias/gestion/EV-GEST-07-versionamiento.md)
* [Control de cambios](./evidencias/gestion/EV-GEST-08-control-cambios.md)
* [Resumen visual de gestión](./evidencias/gestion/EV-GEST-09-resumen-gestion.png)
* [Manifiesto de evidencias](./evidencias/00_manifiesto_evidencias.md)
* [Validación general de evidencias](./evidencias/99_validacion_evidencias.md)
