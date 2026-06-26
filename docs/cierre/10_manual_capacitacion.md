# Manual de capacitaciÃ³n SmartSched-UC

## PropÃ³sito

Guiar el uso funcional, operativo y tÃ©cnico del sistema SmartSched-UC para estudiantes, coordinaciÃ³n acadÃ©mica y mantenimiento tÃ©cnico.

## A. Manual de estudiante

### A.1 Acceso

1. Ingresar al frontend de SmartSched-UC.
2. Verificar en la cabecera el perÃ­odo acadÃ©mico y el contador de crÃ©ditos.
3. Confirmar el estado del sistema en la vista principal.

**Espacio para captura:** `[PENDIENTE: adjuntar captura EV-APP-EST-01 de la vista estudiante]`

### A.2 BÃºsqueda y selecciÃ³n de cursos

1. Ir a la vista de proyecciones.
2. Usar buscador por cÃ³digo o nombre.
3. Filtrar por tipo si corresponde.
4. Agregar cursos al resumen.

### A.3 CrÃ©ditos y generaciÃ³n de horario

1. Revisar el total de crÃ©ditos seleccionados.
2. Generar el horario desde el botÃ³n principal.
3. Si existe optimizaciÃ³n automÃ¡tica, revisar cursos sugeridos y recomendaciones.
4. Verificar que la carga no supere el mÃ¡ximo configurado por el sistema.

### A.4 Lectura de conflictos y ocupaciÃ³n

1. Revisar alertas de cruces.
2. Revisar advertencias sobre aulas llenas, riesgo o subutilizaciÃ³n.
3. Revisar recomendaciones antes de confirmar matrÃ­cula simulada.

### A.5 Resumen y matrÃ­cula simulada

1. Abrir la pestaÃ±a de resumen.
2. Confirmar cursos, crÃ©ditos y estado del horario.
3. Ejecutar matrÃ­cula simulada si no hay bloqueos crÃ­ticos.

### A.6 Notificaciones y reporte de problema

1. Revisar el centro de notificaciones del sistema.
2. Si ocurre un error, usar â€œReintentarâ€, â€œUsar datos localesâ€ o â€œReportar problemaâ€.

## B. Manual de coordinaciÃ³n

### B.1 Estado del sistema

1. Revisar si la base activa es PostgreSQL o fallback local.
2. Validar fecha de Ãºltima sincronizaciÃ³n.
3. Confirmar cantidades cargadas de cursos, docentes y aulas.

### B.2 PostgreSQL y fallback

1. Revisar `/api/health`.
2. Si la base falla, confirmar que el sistema continÃºe con respaldo local.
3. Usar la informaciÃ³n de notificaciones y auditorÃ­a para explicar la contingencia.

### B.3 Docentes, aulas, restricciones y auditorÃ­a

1. Abrir vista de coordinaciÃ³n o modo demostraciÃ³n.
2. Revisar carga docente, bloques protegidos y conflictos.
3. Revisar uso de aulas, ocupaciÃ³n y restricciones activas.
4. Revisar bitÃ¡cora y notificaciones para sustentar decisiones del motor.

**Espacio para captura:** `[PENDIENTE: adjuntar captura EV-APP-COORD-01 de la vista de coordinaciÃ³n]`

## C. Manual tÃ©cnico

### C.1 Requisitos

- Node.js y npm
- PostgreSQL
- Dependencias instaladas en raÃ­z, `client/` y `server/`

### C.2 Variables de entorno y base de datos

1. Revisar `server/.env.example`.
2. Configurar `DATABASE_URL`, `DB_SSL` y `USE_POSTGRES`.
3. Ejecutar scripts de base de datos si corresponde.

### C.3 Backend

1. Ir a `smartsched-uc/server`.
2. Ejecutar `npm install`.
3. Ejecutar `npm run db:test` y `npm start`.

### C.4 Frontend

1. Ir a `smartsched-uc/client`.
2. Ejecutar `npm install`.
3. Ejecutar `npm test -- --watchAll=false`.
4. Ejecutar `npm run build`.
5. Ejecutar `npm start`.

### C.5 Pruebas y cobertura

- RaÃ­z: `npm test`
- Cobertura backend: `npm run test:coverage:server`
- Cobertura frontend: `npm run test:coverage:client`

### C.6 Calidad, Sonar y recuperaciÃ³n

- Verificar `.husky/`, `commitlint.config.cjs` y `sonar-project.properties`.
- No reutilizar el token visible; debe rotarse antes de uso real.
- Ante falla de PostgreSQL, confirmar continuidad por fallback local.

## Documentos relacionados

- [`01_informe_final_proyecto.md`](./01_informe_final_proyecto.md)
- [`11_matriz_trazabilidad.md`](./11_matriz_trazabilidad.md)
- [`evidencias/README.md`](./evidencias/README.md)

## Evidencias de apoyo al manual

- Vista principal: [`evidencias/aplicacion/EV-APP-01-pantalla-principal.png`](./evidencias/aplicacion/EV-APP-01-pantalla-principal.png)
- Generación de horario: [`evidencias/aplicacion/EV-APP-04-horario-generado.png`](./evidencias/aplicacion/EV-APP-04-horario-generado.png)
- Resumen de matrícula: [`evidencias/aplicacion/EV-APP-09-resumen-matricula.png`](./evidencias/aplicacion/EV-APP-09-resumen-matricula.png)
- Estado de base de datos: [`evidencias/base-datos/EV-DB-07-reporte-base-datos.png`](./evidencias/base-datos/EV-DB-07-reporte-base-datos.png)

