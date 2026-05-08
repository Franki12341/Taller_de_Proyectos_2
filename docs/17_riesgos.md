# ⚠️ Gestión de Riesgos y Oportunidades - SmartSched-UC

## 1. Registro de Riesgos

| ID | Descripción del Riesgo | Probabilidad | Impacto | Estrategia de Mitigación |
| :--- | :--- | :--- | :--- | :--- |
| **R01** | **Explosión Combinatoria (CSP):** El algoritmo tarda demasiado en evaluar todas las combinaciones en escenarios con currículos altamente flexibles. | Media | Alto | Implementar algoritmos de pre-filtrado y poda de dominios (ej. AC-3) antes de ejecutar el Backtracking profundo. Establecer un *timeout* máximo de respuesta. |
| **R02** | **Insatisfactibilidad del Modelo:** Que no exista ninguna combinación matemática posible que cumpla las restricciones duras (ej. falta de aforo en todas las aulas). | Alta | Alto | Retornar un código de error específico indicando la restricción exacta que falló, permitiendo al usuario flexibilizar sus entradas o reportar a coordinación. |
| **R03** | **Sobrecarga de Servidor:** Caída de la API REST por múltiples peticiones concurrentes de generación de horarios durante periodo de matrícula. | Baja | Alto | Optimizar el código asíncrono en Node.js e implementar almacenamiento en caché (Redis) para respuestas frecuentes. |
| **R04** | **Inconsistencia de Datos (Dependencia):** Cambios de último minuto por parte de coordinación académica en la malla de prerrequisitos. | Media | Medio | Evitar valores en duro (hardcoding). Todas las restricciones de cursos y aforos se leerán dinámicamente de la base de datos al iniciar el motor CSP. |

---

## 2. Registro de Oportunidades

| ID | Impacto Positivo Esperado | Estrategia de Aprovechamiento |
| :--- | :--- | :--- |
| **O01** | **Reducción masiva de latencia para estudiantes con currículos estándar:** Muchos alumnos de un mismo ciclo solicitan exactamente los mismos cursos. | Implementar un sistema de Caché. Si el *payload* de entrada (los cursos solicitados) ya fue procesado y validado, retornar el horario guardado sin volver a ejecutar el motor CSP. |
| **O02** | **Escalabilidad a otras sedes:** La lógica del algoritmo no está atada a una sede física en particular. | Diseñar la arquitectura del software de manera modular para que, en un futuro, se puedan agregar parámetros de sede (ej. Huancayo, Lima, Cusco) como una variable más en el CSP. |

---

## 3. Análisis de Riesgos

### 3.1. Relación con las Restricciones del Problema (CSP)
El riesgo técnico más crítico (R01) está directamente relacionado con la naturaleza NP-Hard de los Problemas de Satisfacción de Restricciones. A medida que crecen las variables (Cursos) y los dominios (Horarios disponibles), el espacio de búsqueda crece exponencialmente. Mitigar esto requiere no solo buen hardware, sino una ingeniería algorítmica superior (Backtracking optimizado) que descarte ramas inválidas lo más rápido posible.

### 3.2. Limitaciones Técnicas
Las limitaciones de cómputo (CPU y Memoria) del servidor (R03) nos obligan a ser extremadamente eficientes. Generar un horario requiere procesamiento intensivo; por lo tanto, el sistema debe ser capaz de rechazar peticiones inviables desde la capa de la API antes de que lleguen al motor CSP, protegiendo así los recursos del sistema.

### 3.3. Dependencias Externas
El sistema depende completamente de la integridad de los datos de entrada (R04). Si la información de las aulas disponibles, horas o prerrequisitos institucionales es errónea, el motor CSP arrojará "falsos negativos" (rechazando horarios válidos) o "falsos positivos" (aprobando cruces). La mitigación central es mantener la API estrictamente validada bajo el paradigma *Spec-Driven Development*.
