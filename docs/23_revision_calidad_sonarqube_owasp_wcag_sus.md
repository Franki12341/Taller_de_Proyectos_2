# Revisión integral de calidad de SmartSched-UC mediante SonarQube, OWASP , WCAG, SUS y pruebas automatizadas

## 1. Propósito del documento

Este documento presenta el proceso de revisión integral de calidad aplicado al sistema web **SmartSched-UC**, una aplicación orientada a la generación y simulación de horarios académicos universitarios.

La evaluación busca comprobar que el sistema no solo cumple sus funciones principales, sino que también presenta condiciones adecuadas de seguridad, accesibilidad, usabilidad, mantenibilidad, verificabilidad técnica y calidad arquitectónica.

Para realizar la evaluación se consideran los siguientes enfoques:

* análisis estático del código mediante SonarQube;
* auditoría de seguridad alineada con OWASP Top 10 2025;
* evaluación de accesibilidad mediante WCAG;
* evaluación de usabilidad mediante System Usability Scale, SUS;
* pruebas unitarias;
* pruebas de integración;
* pruebas funcionales;
* pruebas End-to-End;
* análisis de cobertura;
* evidencias comparativas antes y después;
* trazabilidad de correcciones mediante GitHub.

---

## 2. Contexto del sistema evaluado

SmartSched-UC es una aplicación web académica que permite seleccionar asignaturas, revisar horarios disponibles, generar una propuesta de horario, validar restricciones y realizar una simulación de matrícula.

La arquitectura principal está compuesta por:

| Capa          | Tecnología                          | Responsabilidad                                                             |
| ------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| Frontend      | React                               | Interfaz de matrícula, selección de cursos, horario, resumen y coordinación |
| Backend       | Node.js y Express                   | API REST, reglas académicas, validaciones y generación de horarios          |
| Base de datos | PostgreSQL                          | Persistencia de cursos, estudiantes, docentes, aulas, horarios y auditoría  |
| Motor lógico  | CSP y Backtracking                  | Generación y optimización de horarios                                       |
| Pruebas       | Jest y herramientas complementarias | Validación automatizada                                                     |
| Repositorio   | GitHub                              | Control de versiones, trazabilidad y documentación                          |

El sistema considera restricciones como:

* cruces de horarios;
* disponibilidad docente;
* carga académica;
* carga administrativa;
* capacidad y estado de aulas;
* tipo de aula;
* máximo de 25 créditos;
* bloques protegidos;
* compatibilidad con prácticas preprofesionales;
* uso eficiente de infraestructura.

---

## 3. Objetivo de la revisión de calidad

El objetivo es identificar problemas técnicos, vulnerabilidades, barreras de accesibilidad, dificultades de uso y deficiencias de pruebas que puedan afectar el funcionamiento o sostenibilidad de SmartSched-UC.

La evaluación permitirá:

1. identificar bugs, vulnerabilidades y code smells;
2. reducir deuda técnica;
3. mitigar riesgos de seguridad;
4. mejorar la experiencia de usuarios con distintas capacidades;
5. validar cuantitativamente la usabilidad;
6. incrementar cobertura de pruebas;
7. demostrar mejoras mediante resultados comparativos;
8. mantener trazabilidad de hallazgos y correcciones.

---

# PARTE I: EVALUACIÓN CON SONARQUBE

## 4. Configuración de SonarQube

SonarQube se utiliza para analizar automáticamente la calidad del código del frontend y backend.

El análisis debe considerar:

* bugs;
* vulnerabilities;
* security hotspots;
* code smells;
* duplicación;
* maintainability rating;
* reliability rating;
* security rating;
* technical debt;
* cobertura de pruebas.

### 4.1 Componentes analizados

| Componente       | Ruta                                 |
| ---------------- | ------------------------------------ |
| Frontend React   | `smartsched-uc/client/src`           |
| Backend Express  | `smartsched-uc/server/src`           |
| Pruebas frontend | `smartsched-uc/client/src/*.test.js` |
| Pruebas backend  | `smartsched-uc/server/test`          |

### 4.2 Configuración del análisis

Se creó el archivo:

```text
sonar-project.properties
```

con la configuración necesaria para analizar frontend, backend y reportes de cobertura.

### 4.3 Procedimiento ejecutado

1. iniciar SonarQube;
2. crear el proyecto SmartSched-UC;
3. configurar el token de análisis;
4. generar cobertura del frontend;
5. generar cobertura del backend;
6. ejecutar SonarScanner;
7. revisar el Quality Gate;
8. corregir hallazgos;
9. ejecutar nuevamente el análisis;
10. comparar métricas antes y después.

---

## 5. Resultados iniciales de SonarQube

> Esta tabla debe completarse con los datos reales del primer análisis.

| Métrica                |   Resultado inicial | Interpretación                               |
| ---------------------- | ------------------: | -------------------------------------------- |
| Bugs                   |       `[COMPLETAR]` | Errores que pueden afectar el funcionamiento |
| Vulnerabilities        |       `[COMPLETAR]` | Riesgos de seguridad identificados           |
| Security Hotspots      |       `[COMPLETAR]` | Fragmentos que requieren revisión manual     |
| Code Smells            |       `[COMPLETAR]` | Problemas de mantenibilidad                  |
| Duplicación            |      `[COMPLETAR]%` | Código repetido                              |
| Coverage               |      `[COMPLETAR]%` | Porcentaje cubierto por pruebas              |
| Reliability Rating     |       `[COMPLETAR]` | Nivel de confiabilidad                       |
| Security Rating        |       `[COMPLETAR]` | Nivel de seguridad                           |
| Maintainability Rating |       `[COMPLETAR]` | Nivel de mantenibilidad                      |
| Technical Debt         |       `[COMPLETAR]` | Tiempo estimado para corregir problemas      |
| Quality Gate           | `[PASSED / FAILED]` | Resultado global                             |

---

## 6. Hallazgos críticos de SonarQube

| Código   | Archivo o componente | Hallazgo      | Severidad                  | Causa         | Corrección    |
| -------- | -------------------- | ------------- | -------------------------- | ------------- | ------------- |
| SONAR-01 | `[COMPLETAR]`        | `[COMPLETAR]` | `[BLOCKER/CRITICAL/MAJOR]` | `[COMPLETAR]` | `[COMPLETAR]` |
| SONAR-02 | `[COMPLETAR]`        | `[COMPLETAR]` | `[COMPLETAR]`              | `[COMPLETAR]` | `[COMPLETAR]` |
| SONAR-03 | `[COMPLETAR]`        | `[COMPLETAR]` | `[COMPLETAR]`              | `[COMPLETAR]` | `[COMPLETAR]` |

Los problemas detectados:

* variables sin uso;
* manejo inseguro de errores;
* credenciales expuestas;
* promesas sin control de error;
* baja cobertura;

---

## 7. Correcciones implementadas a partir de SonarQube

| Mejora                   | Acción implementada                            | Resultado esperado                   |
| ------------------------ | ---------------------------------------------- | ------------------------------------ |
| Reducción de duplicación | Extracción de funciones reutilizables          | Menor porcentaje de código duplicado |
| Funciones complejas      | División en servicios y utilidades             | Mejor mantenibilidad                 |
| Errores sin controlar    | Manejo centralizado de errores                 | Mayor confiabilidad                  |
| Código muerto            | Eliminación de variables y funciones no usadas | Menor deuda técnica                  |
| Baja cobertura           | Incorporación de pruebas                       | Mayor cobertura                      |
| Validaciones repetidas   | Creación de funciones comunes                  | Código más claro                     |
| Datos sensibles          | Uso de variables de entorno                    | Menor exposición                     |

---

## 8. Comparación SonarQube antes y después

| Métrica         |          Antes |        Después |     Variación |
| --------------- | -------------: | -------------: | ------------: |
| Bugs            |  `[COMPLETAR]` |  `[COMPLETAR]` | `[COMPLETAR]` |
| Vulnerabilities |  `[COMPLETAR]` |  `[COMPLETAR]` | `[COMPLETAR]` |
| Code Smells     |  `[COMPLETAR]` |  `[COMPLETAR]` | `[COMPLETAR]` |
| Duplicación     | `[COMPLETAR]%` | `[COMPLETAR]%` | `[COMPLETAR]` |
| Coverage        | `[COMPLETAR]%` | `[COMPLETAR]%` | `[COMPLETAR]` |
| Technical Debt  |  `[COMPLETAR]` |  `[COMPLETAR]` | `[COMPLETAR]` |
| Quality Gate    |  `[COMPLETAR]` |  `[COMPLETAR]` | `[COMPLETAR]` |

### Interpretación

Después de implementar las correcciones, se espera reducir bugs, vulnerabilidades, code smells, duplicación y deuda técnica. Asimismo, se busca incrementar la cobertura y obtener un Quality Gate aprobado.

---

# PARTE II: AUDITORÍA DE SEGURIDAD OWASP TOP 10 2025

## 9. Alcance de seguridad

La auditoría evalúa:

* autenticación;
* autorización;
* sesiones;
* validación de entradas;
* consultas PostgreSQL;
* exposición de información;
* cabeceras de seguridad;
* manejo de errores;
* limitación de solicitudes;
* configuración del servidor;
* auditoría de acciones.

---

## 10. Matriz de vulnerabilidades

| Código   | Riesgo evaluado                     | Evidencia             | Probabilidad | Impacto | Nivel | Mitigación                    |
| -------- | ----------------------------------- | --------------------- | ------------ | ------- | ----- | ----------------------------- |
| OWASP-01 | Control de acceso insuficiente      | `[COMPLETAR]`         | Media        | Alta    | Alto  | Validar roles y permisos      |
| OWASP-02 | Configuración insegura              | `[COMPLETAR]`         | Media        | Media   | Medio | Helmet y variables de entorno |
| OWASP-03 | Inyección SQL                       | `[COMPLETAR]`         | Media        | Alta    | Alto  | Consultas parametrizadas      |
| OWASP-04 | Validación insuficiente de entradas | `[COMPLETAR]`         | Alta         | Media   | Alto  | Validación y sanitización     |
| OWASP-05 | Exposición de información técnica   | `[COMPLETAR]`         | Media        | Media   | Medio | Ocultar errores internos      |
| OWASP-06 | Ausencia de rate limiting           | `[COMPLETAR]`         | Media        | Media   | Medio | Limitar solicitudes           |
| OWASP-07 | Dependencias vulnerables            | Resultado `npm audit` | Media        | Media   | Medio | Actualizar dependencias       |
| OWASP-08 | Registro insuficiente de eventos    | `[COMPLETAR]`         | Media        | Media   | Medio | Tabla `audit_logs`            |
| OWASP-09 | CORS demasiado permisivo            | `[COMPLETAR]`         | Media        | Media   | Medio | Configurar origen permitido   |
| OWASP-10 | Manejo incorrecto de fallos         | `[COMPLETAR]`         | Media        | Media   | Medio | Error handler centralizado    |

---

## 11. Mitigaciones de seguridad implementadas

### 11.1 Consultas parametrizadas

Las consultas PostgreSQL deben usar parámetros y evitar concatenar valores recibidos del usuario.

Ejemplo seguro:

```javascript
const result = await pool.query(
  "SELECT id, code, name FROM courses WHERE code = $1",
  [courseCode]
);
```

Esta técnica reduce el riesgo de inyección SQL.

### 11.2 Cabeceras de seguridad

Se utiliza `helmet` para incorporar cabeceras HTTP de seguridad.

```javascript
const helmet = require("helmet");

app.use(helmet());
```

### 11.3 Limitación de solicitudes

Se utiliza rate limiting para reducir abuso de endpoints.

```javascript
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Demasiadas solicitudes. Intente nuevamente en unos minutos."
  }
});

app.use("/api", apiLimiter);
```

### 11.4 Configuración CORS

```javascript
const cors = require("cors");

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: false
}));
```

### 11.5 Límite de cuerpo JSON

```javascript
app.use(express.json({
  limit: "100kb"
}));
```

### 11.6 Manejo centralizado de errores

```javascript
app.use((error, req, res, next) => {
  console.error("Error interno:", error);

  res.status(error.status || 500).json({
    error: "No se pudo completar la operación.",
    message: "Revise los datos o intente nuevamente.",
    requestId: req.requestId || null
  });
});
```

El frontend no debe mostrar trazas internas, consultas SQL, contraseñas ni detalles del servidor.

### 11.7 Auditoría

Se propone registrar acciones importantes:

```sql
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    entity VARCHAR(100),
    entity_id VARCHAR(50),
    description TEXT,
    user_role VARCHAR(50),
    source VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 12. Pruebas de seguridad que deben demostrarse

| Prueba                | Acción                               | Resultado esperado                |
| --------------------- | ------------------------------------ | --------------------------------- |
| Entrada SQL maliciosa | Enviar `' OR 1=1 --`                 | No debe alterar la consulta       |
| Body excesivo         | Enviar JSON mayor al límite          | Respuesta HTTP 413                |
| Solicitudes repetidas | Superar el límite configurado        | Respuesta HTTP 429                |
| Endpoint inexistente  | Solicitar una ruta no válida         | Error controlado, sin stack trace |
| Curso inexistente     | Enviar código inválido               | Respuesta clara y segura          |
| Error PostgreSQL      | Desconectar temporalmente la base    | Fallback o mensaje controlado     |
| CORS                  | Solicitud desde origen no autorizado | Bloqueo según configuración       |
| Dependencias          | Ejecutar `npm audit`                 | Reporte verificable               |

---

## 13. Riesgo residual

Después de implementar mitigaciones,  permanecen riesgos residuales:

| Riesgo residual         | Motivo                                   | Tratamiento futuro                       |
| ----------------------- | ---------------------------------------- | ---------------------------------------- |
| Autenticación limitada  | MVP sin identidad institucional completa | Implementar autenticación y roles        |
| Auditoría parcial       | Algunos eventos permanecen locales       | Persistir todos los eventos              |
| Fallback local          | Puede no representar datos actuales      | Mostrar claramente el origen de datos    |
| Dependencias externas   | Pueden aparecer nuevas vulnerabilidades  | Ejecutar auditorías periódicas           |
| Simulación de matrícula | No es una matrícula institucional real   | Integración futura con sistema académico |

---

# PARTE III: EVALUACIÓN DE ACCESIBILIDAD WCAG

## 14. Alcance WCAG

La evaluación considera:

* contraste;
* navegación por teclado;
* estructura semántica;
* etiquetas;
* lectores de pantalla;
* formularios;
* mensajes de estado;
* foco visible;
* tablas;
* botones;
* accesibilidad funcional.

---

## 15. Checklist WCAG

| Código  | Criterio evaluado        | Estado inicial | Corrección                         | Estado final  |
| ------- | ------------------------ | -------------- | ---------------------------------- | ------------- |
| WCAG-01 | Contraste suficiente     | `[COMPLETAR]`  | Ajuste de colores                  | `[COMPLETAR]` |
| WCAG-02 | Navegación por teclado   | `[COMPLETAR]`  | Orden de foco                      | `[COMPLETAR]` |
| WCAG-03 | Foco visible             | `[COMPLETAR]`  | Estilos `:focus-visible`           | `[COMPLETAR]` |
| WCAG-04 | Etiquetas de formularios | `[COMPLETAR]`  | Uso de `label`                     | `[COMPLETAR]` |
| WCAG-05 | HTML semántico           | `[COMPLETAR]`  | `header`, `nav`, `main`, `section` | `[COMPLETAR]` |
| WCAG-06 | Lectores de pantalla     | `[COMPLETAR]`  | ARIA y textos descriptivos         | `[COMPLETAR]` |
| WCAG-07 | Mensajes dinámicos       | `[COMPLETAR]`  | `aria-live`                        | `[COMPLETAR]` |
| WCAG-08 | Tablas accesibles        | `[COMPLETAR]`  | `caption`, `thead`, `scope`        | `[COMPLETAR]` |
| WCAG-09 | Botones descriptivos     | `[COMPLETAR]`  | Textos claros                      | `[COMPLETAR]` |
| WCAG-10 | Zoom y responsive        | `[COMPLETAR]`  | CSS adaptable                      | `[COMPLETAR]` |

---

## 16. Mejoras WCAG implementables

### 16.1 Enlace para saltar al contenido

```jsx
<a className="skip-link" href="#main-content">
  Saltar al contenido principal
</a>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
  z-index: 9999;
  padding: 0.75rem 1rem;
  background: #ffffff;
  color: #111111;
}
```

### 16.2 Estructura semántica

```jsx
<header>
  <h1>SmartSched-UC</h1>
</header>

<nav aria-label="Navegación de matrícula">
  {/* pestañas */}
</nav>

<main id="main-content">
  {/* contenido */}
</main>
```

### 16.3 Mensajes dinámicos accesibles

```jsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {systemMessage}
</div>
```

Para errores críticos:

```jsx
<div role="alert">
  {errorMessage}
</div>
```

### 16.4 Formulario accesible

```jsx
<label htmlFor="course-search">
  Buscar asignatura
</label>

<input
  id="course-search"
  name="courseSearch"
  type="search"
  value={searchTerm}
  onChange={handleSearch}
  aria-describedby="course-search-help"
/>

<p id="course-search-help">
  Busca por código o nombre de asignatura.
</p>
```

### 16.5 Botones claros

Evitar:

```jsx
<button>Ver</button>
```

Preferir:

```jsx
<button aria-label={`Ver horarios de ${course.name}`}>
  Ver horarios
</button>
```

### 16.6 Tablas accesibles

```jsx
<table>
  <caption>Asignaturas disponibles para matrícula</caption>
  <thead>
    <tr>
      <th scope="col">Código</th>
      <th scope="col">Asignatura</th>
      <th scope="col">Créditos</th>
      <th scope="col">Acción</th>
    </tr>
  </thead>
  <tbody>
    {/* filas */}
  </tbody>
</table>
```

### 16.7 Foco visible

```css
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 3px solid #1d4ed8;
  outline-offset: 2px;
}
```

---

## 17. Evidencias WCAG

Se deben registrar:

* captura del análisis automático;
* captura del contraste;
* evidencia de navegación solo con teclado;
* captura del DOM semántico;
* formulario con etiquetas;
* mensajes accesibles;
* tabla con encabezados;
* comparación antes/después.

Herramientas sugeridas:

* Lighthouse Accessibility;
* axe DevTools;
* WAVE;
* inspección manual con teclado;
* lector de pantalla disponible en el sistema.

---

# PARTE IV: EVALUACIÓN DE USABILIDAD SUS

## 18. Participantes

| Dato                                  | Información                |
| ------------------------------------- | -------------------------- |
| Cantidad de participantes             | `[COMPLETAR]`              |
| Perfil                                | Estudiantes universitarios |
| Experiencia con sistemas de matrícula | `[COMPLETAR]`              |
| Modalidad                             | Prueba controlada          |
| Fecha de aplicación                   | `[COMPLETAR]`              |

Se recomienda contar con al menos cinco participantes para obtener observaciones iniciales útiles. Debe indicarse el número real utilizado.

---

## 19. Tareas asignadas a los participantes

Cada participante debe realizar:

1. localizar una asignatura;
2. consultar horarios;
3. agregar una sección;
4. revisar créditos;
5. generar horario sugerido;
6. identificar un conflicto;
7. revisar el resumen;
8. completar la matrícula simulada;
9. interpretar una notificación;
10. reportar un problema simulado.

---

## 20. Cuestionario SUS

Cada afirmación se responde del 1 al 5:

* 1: totalmente en desacuerdo;
* 2: en desacuerdo;
* 3: neutral;
* 4: de acuerdo;
* 5: totalmente de acuerdo.

| N.º | Afirmación                                                        |
| --: | ----------------------------------------------------------------- |
|   1 | Me gustaría utilizar este sistema frecuentemente                  |
|   2 | Encontré el sistema innecesariamente complejo                     |
|   3 | Consideré que el sistema era fácil de usar                        |
|   4 | Creo que necesitaría ayuda técnica para usar el sistema           |
|   5 | Las funciones del sistema estaban bien integradas                 |
|   6 | Encontré demasiadas inconsistencias en el sistema                 |
|   7 | Considero que la mayoría aprendería a usar el sistema rápidamente |
|   8 | Encontré el sistema complicado de usar                            |
|   9 | Me sentí seguro utilizando el sistema                             |
|  10 | Necesité aprender demasiadas cosas antes de utilizarlo            |

---

## 21. Cálculo SUS

Para preguntas impares:

```text
aporte = respuesta - 1
```

Para preguntas pares:

```text
aporte = 5 - respuesta
```

Puntaje final:

```text
SUS = suma de aportes × 2.5
```

El resultado se encuentra entre 0 y 100.

---

## 22. Resultados SUS

| Participante |   Puntaje SUS |
| ------------ | ------------: |
| P01          | `[COMPLETAR]` |
| P02          | `[COMPLETAR]` |
| P03          | `[COMPLETAR]` |
| P04          | `[COMPLETAR]` |
| P05          | `[COMPLETAR]` |
| Promedio     | `[COMPLETAR]` |

### Interpretación

| Rango aproximado | Interpretación        |
| ---------------- | --------------------- |
| Menor de 50      | Usabilidad deficiente |
| 50 a 67          | Usabilidad marginal   |
| 68 o superior    | Usabilidad aceptable  |
| 80 o superior    | Usabilidad muy buena  |

El resultado real obtenido fue:

```text
Puntaje SUS promedio: [COMPLETAR]
Interpretación: [COMPLETAR]
```

---

## 23. Mejoras derivadas del SUS

| Hallazgo de participantes                 | Mejora propuesta                    | Estado        |
| ----------------------------------------- | ----------------------------------- | ------------- |
| Demasiado desplazamiento vertical         | Interfaz compacta con pestañas      | Implementado  |
| Dificultad para identificar el horario    | Grilla semanal visible              | Implementado  |
| Mensajes técnicos poco claros             | Mensajes simples y accionables      | Implementado  |
| Acción de matrícula poco visible          | Botón fijo o destacado              | Implementado  |
| Falta de explicación de errores           | Notificaciones y detalle expandible | Implementado  |
| Confusión entre estudiante y coordinación | Separación de vistas                | Implementado  |
| `[COMPLETAR]`                             | `[COMPLETAR]`                       | `[COMPLETAR]` |

---

# PARTE V: PRUEBAS AUTOMATIZADAS

## 24. Estrategia de pruebas

La estrategia considera:

* pruebas unitarias;
* pruebas de integración;
* pruebas funcionales;
* pruebas E2E;
* cobertura.

---

## 25. Pruebas unitarias

| Código | Función evaluada         | Resultado esperado            |
| ------ | ------------------------ | ----------------------------- |
| UT-01  | Validación de cruces     | Detecta solapamientos         |
| UT-02  | Límite de 25 créditos    | No supera el máximo           |
| UT-03  | Optimización de créditos | Se acerca a 25                |
| UT-04  | Capacidad de aula        | Rechaza sobreocupación        |
| UT-05  | Aula en mantenimiento    | No asigna el aula             |
| UT-06  | Conflicto docente        | Rechaza asignación simultánea |
| UT-07  | Bloque administrativo    | Respeta horario protegido     |
| UT-08  | Recomendaciones          | Genera recomendaciones        |

---

## 26. Pruebas de integración

| Código | Componentes           | Validación                    |
| ------ | --------------------- | ----------------------------- |
| INT-01 | Express + PostgreSQL  | Cursos obtenidos desde base   |
| INT-02 | Express + PostgreSQL  | Docentes obtenidos desde base |
| INT-03 | Express + scheduler   | Generación de horario         |
| INT-04 | Scheduler + auditoría | Registro de evento            |
| INT-05 | Health + PostgreSQL   | Origen de datos correcto      |
| INT-06 | Fallback + mock data  | Continuidad ante fallo        |

---

## 27. Pruebas funcionales

| Código | Escenario               | Resultado                  |
| ------ | ----------------------- | -------------------------- |
| FUN-01 | Buscar asignatura       | Se filtra correctamente    |
| FUN-02 | Ver horarios            | Se muestran opciones       |
| FUN-03 | Agregar asignatura      | Aparece en resumen         |
| FUN-04 | Eliminar asignatura     | Se actualizan créditos     |
| FUN-05 | Generar horario         | Se muestra propuesta       |
| FUN-06 | Simular conflicto       | Se muestra notificación    |
| FUN-07 | Matrícula válida        | Se confirma simulación     |
| FUN-08 | Matrícula con conflicto | Se bloquea con explicación |

---

## 28. Pruebas End-to-End

Flujo E2E principal:

1. abrir SmartSched-UC;
2. entrar a Proyecciones;
3. buscar asignatura;
4. seleccionar curso;
5. ver horarios;
6. agregar sección;
7. generar horario óptimo;
8. revisar máximo de 25 créditos;
9. validar conflictos;
10. abrir resumen;
11. confirmar matrícula simulada;
12. verificar auditoría.

Resultado esperado:

```text
El estudiante completa el flujo sin errores críticos y recibe mensajes claros.
```

---

## 29. Cobertura

| Componente      | Cobertura inicial | Cobertura final |
| --------------- | ----------------: | --------------: |
| Backend         |    `[COMPLETAR]%` |  `[COMPLETAR]%` |
| Frontend        |    `[COMPLETAR]%` |  `[COMPLETAR]%` |
| Motor scheduler |    `[COMPLETAR]%` |  `[COMPLETAR]%` |
| Total           |    `[COMPLETAR]%` |  `[COMPLETAR]%` |

La cobertura debe interpretarse junto con la calidad de los casos probados. Un porcentaje elevado no garantiza por sí solo que todos los escenarios importantes estén correctamente evaluados.

---

# PARTE VI: TRAZABILIDAD Y EVIDENCIAS

## 30. Matriz de trazabilidad

| Hallazgo                 | Herramienta | Corrección              | Prueba        | Evidencia               |
| ------------------------ | ----------- | ----------------------- | ------------- | ----------------------- |
| Código duplicado         | SonarQube   | Refactorización         | Unitarias     | Dashboard antes/después |
| Entrada no validada      | OWASP       | Sanitización            | Integración   | Respuesta controlada    |
| Falta de foco visible    | WCAG        | CSS accesible           | Manual        | Captura                 |
| Flujo poco claro         | SUS         | Interfaz compacta       | SUS posterior | Resultado promedio      |
| Aula sobreocupada        | Pruebas     | Validación de capacidad | Unitaria      | Test aprobado           |
| PostgreSQL no disponible | Resiliencia | Fallback                | Integración   | Notificación            |
| Falta de trazabilidad    | Auditoría   | `audit_logs`            | Integración   | Registro guardado       |

---

## 31. Evidencias obligatorias

Se deben guardar en:

```text
docs/evidencias/calidad/
```

Estructura sugerida:

```text
docs/evidencias/calidad/
├── sonar/
│   ├── 01-dashboard-antes.png
│   ├── 02-dashboard-despues.png
│   ├── 03-quality-gate.png
│   └── 04-cobertura.png
├── owasp/
│   ├── 01-matriz-riesgos.png
│   ├── 02-inyeccion-mitigada.png
│   ├── 03-rate-limit.png
│   └── 04-npm-audit.png
├── wcag/
│   ├── 01-lighthouse.png
│   ├── 02-axe.png
│   ├── 03-navegacion-teclado.png
│   └── 04-contraste.png
├── sus/
│   ├── formulario.pdf
│   ├── resultados.csv
│   └── calculo-sus.png
└── testing/
    ├── unitarias.png
    ├── integracion.png
    ├── e2e.png
    └── cobertura.png
```

---

## 32. Repositorio GitHub

El repositorio debe demostrar:

* código completo;
* instrucciones de instalación;
* variables de entorno de ejemplo;
* ramas organizadas;
* commits descriptivos;
* pruebas reproducibles;
* documentación;
* evidencias;
* ausencia de credenciales reales.

Commits sugeridos:

```bash
git commit -m "chore: configure SonarQube analysis"
git commit -m "test: add backend and frontend coverage"
git commit -m "security: mitigate OWASP findings"
git commit -m "accessibility: improve WCAG compliance"
git commit -m "ux: apply improvements based on SUS"
git commit -m "docs: add integral quality assurance report"
```

---

## 33. Checklist de cumplimiento

| Criterio                          | Estado        |
| --------------------------------- | ------------- |
| SonarQube configurado             | `[COMPLETAR]` |
| Dashboard antes                   | `[COMPLETAR]` |
| Dashboard después                 | `[COMPLETAR]` |
| Métricas interpretadas            | `[COMPLETAR]` |
| Vulnerabilidades OWASP analizadas | `[COMPLETAR]` |
| Mitigaciones implementadas        | `[COMPLETAR]` |
| Riesgo residual documentado       | `[COMPLETAR]` |
| Evaluación WCAG automática        | `[COMPLETAR]` |
| Evaluación WCAG manual            | `[COMPLETAR]` |
| Correcciones de accesibilidad     | `[COMPLETAR]` |
| SUS aplicado                      | `[COMPLETAR]` |
| Puntaje SUS calculado             | `[COMPLETAR]` |
| Pruebas unitarias                 | `[COMPLETAR]` |
| Pruebas de integración            | `[COMPLETAR]` |
| Pruebas funcionales               | `[COMPLETAR]` |
| Pruebas E2E                       | `[COMPLETAR]` |
| Cobertura documentada             | `[COMPLETAR]` |
| Evidencias organizadas            | `[COMPLETAR]` |
| Repositorio actualizado           | `[COMPLETAR]` |

---

## 34. Conclusión

La revisión integral de SmartSched-UC permite evaluar el sistema desde una perspectiva más amplia que la funcionalidad básica. SonarQube permite identificar problemas de mantenibilidad, confiabilidad y seguridad; OWASP permite analizar riesgos técnicos; WCAG permite eliminar barreras de accesibilidad; SUS permite evaluar la percepción real de los usuarios; y las pruebas automatizadas permiten verificar que las funcionalidades críticas se mantienen estables.

El resultado final deberá sustentarse con datos reales, capturas verificables y una comparación antes/después. Las mejoras deben estar relacionadas directamente con los hallazgos identificados y registradas mediante commits descriptivos en GitHub.

Con este proceso, SmartSched-UC podrá demostrar un mayor nivel de madurez técnica, seguridad, accesibilidad, usabilidad y verificabilidad.
