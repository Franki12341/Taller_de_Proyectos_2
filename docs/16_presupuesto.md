# 💰 Presupuesto Integral y Análisis Financiero de Ingeniería - SmartSched-UC

## 1. Identificación y Cuantificación de Costos

### 1.1. Recursos Humanos (RRHH)
El proyecto se ejecuta en 5 Sprints (10 semanas). Se definen roles basados en estándares de la industria para el desarrollo de sistemas complejos, con una tarifa promedio de S/ 20.00/hr (Nivel Junior/Practicante Avanzado).

| Rol | Esfuerzo por Sprint | Costo por Sprint (S/) | Costo Total (10 sem) |
| :--- | :--- | :--- | :--- |
| **Scrum Master / Analista QA** | 40 hrs | S/ 800.00 | S/ 4,000.00 |
| **Backend Developer (Especialista CSP)** | 60 hrs | S/ 1,200.00 | S/ 6,000.00 |
| **Frontend Developer (React)** | 40 hrs | S/ 800.00 | S/ 4,000.00 |
| **Arquitecto Cloud / DevOps** | 20 hrs | S/ 400.00 | S/ 2,000.00 |
| **TOTAL RRHH** | **160 hrs** | **S/ 3,200.00** | **S/ 16,000.00** |

### 1.2. Infraestructura Tecnológica (Cloud Computing)
Estimado basado en el consumo de recursos para procesamiento NP-Hard:
- **Cómputo (AWS EC2 t3.medium):** S/ 120.00 (Mayor capacidad para el motor de backtracking).
- **Base de Datos (MongoDB Atlas M10):** S/ 80.00 (Indexación de restricciones académicas).
- **Servicios de Red y Tráfico:** S/ 30.00.
- **Total Infraestructura (Mensual):** S/ 230.00.

### 1.3. Costos Indirectos
- Energía, conectividad y licencias (Jira/GitHub): S/ 200.00 mensual.

---

## 2. Evolución Temporal del Costo

| Fase | Hito de Ingeniería | Costo Sprint (S/) | Costo Acumulado (S/) |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | Modelado CSP y Definición de Dominios | 3,630.00* | 3,630.00 |
| **Sprint 2** | Motor de Backtracking y API REST | 3,200.00 | 6,830.00 |
| **Sprint 3** | Desarrollo Frontend y Visualización | 3,630.00* | 10,460.00 |
| **Sprint 4** | QA, Trazabilidad SDD y Refactorización | 3,200.00 | 13,660.00 |
| **Sprint 5** | Optimización Green Software y Despliegue | 3,475.00* | 17,135.00** |

*\* Incluye prorrateo de costos mensuales de infraestructura e indirectos.*
*\*\* Inversión total del proyecto.*

---

## 3. Análisis Financiero Profundo (Drivers de Costo)

### 3.1. Relación entre Complejidad CSP y Costo
La naturaleza **NP-Hard** del problema de horarios es el principal impulsor de costos (*Cost Driver*). A diferencia de sistemas CRUD tradicionales, el motor SmartSched-UC consume ciclos de CPU de forma intensiva durante la fase de búsqueda en el árbol de decisiones. Un incremento en la flexibilidad curricular aumenta la profundidad del árbol, lo que requiere instancias de servidor con mayor capacidad de cómputo, elevando el costo operativo mensual.

### 3.2. Optimización y Sostenibilidad (Green Software)
Para mitigar el impacto económico y ambiental, se implementaron las siguientes estrategias:
1. **Eficiencia Algorítmica (Poda de Dominios):** Al reducir el espacio de búsqueda mediante la heurística MRV (Minimum Remaining Values), se disminuye el tiempo de ejecución de milisegundos a microsegundos, reduciendo el consumo energético por cada horario generado.
2. **Infraestructura Bajo Demanda:** El uso de servicios escalables permite que los costos se alineen solo con los periodos de matrícula de la Universidad Continental, evitando el desperdicio de recursos (Idle time) y fomentando la sostenibilidad digital.
3. **Análisis de Impacto:** Cada optimización en el código del motor CSP no solo mejora la experiencia del usuario, sino que actúa como una medida de ahorro financiero directo al reducir la facturación por procesamiento de datos en la nube.
