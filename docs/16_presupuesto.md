# 💰 Presupuesto y Análisis Económico - SmartSched-UC

## 1. Fuentes de Costos

### 1.1. Recursos Humanos (RRHH)
El proyecto se desarrolla en 5 Sprints de 2 semanas cada uno. Se asume un equipo de desarrollo asumiendo múltiples roles ágiles, calculando un costo base de S/ 15.00 por hora de trabajo (tarifa referencial Junior).
- **Scrum Master / Analista QA:** 40 hrs/Sprint = S/ 600
- **Desarrollador Backend (Especialista CSP):** 60 hrs/Sprint = S/ 900
- **Desarrollador Frontend:** 40 hrs/Sprint = S/ 600
- **Arquitecto / DevOps:** 30 hrs/Sprint = S/ 450
- *Subtotal RRHH por Sprint:* S/ 2,550

### 1.2. Infraestructura Tecnológica (Mensualizado a 2.5 meses)
- **Servidor Backend (Node.js/Express):** AWS EC2 (t3.micro) = S/ 40.00 / mes
- **Base de Datos:** MongoDB Atlas (M0/M10) = S/ 35.00 / mes
- **Hosting Frontend:** Vercel Pro (estimado) = S/ 75.00 / mes
- *Subtotal Infraestructura:* S/ 375.00 (Total proyecto)

### 1.3. Costos Indirectos
- Internet, energía eléctrica y licencias (Jira, GitHub Pro académico) = S/ 150.00 / mes
- *Subtotal Indirectos:* S/ 375.00 (Total proyecto)

---

## 2. Evolución de Costos

| Fase | Descripción | Costo Sprint (S/) | Costo Acumulado (S/) |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | Modelado CSP y Restricciones | 2,550.00 | 2,850.00* |
| **Sprint 2** | Backend y Motor CSP (Backtracking) | 2,550.00 | 5,700.00* |
| **Sprint 3** | Frontend y Visualización | 2,550.00 | 8,250.00 |
| **Sprint 4** | Testing y Calidad (SDD) | 2,550.00 | 10,800.00 |
| **Sprint 5** | Optimización y Despliegue | 2,550.00 | 13,500.00** |

*\* Incluye costos proporcionales de infraestructura e indirectos del primer mes.*
*\*\* Costo Total Estimado del Proyecto.*

---

## 3. Análisis Esperado

### 3.1. Relación entre Complejidad y Costo
El problema de generación de horarios académicos es de naturaleza NP-Hard. El mayor impacto en el costo no radica en el almacenamiento, sino en el **tiempo de procesamiento (CPU)** requerido por el motor de backtracking en la nube. Durante los Sprints 1 y 2, la inversión en horas hombre (RRHH) del Desarrollador Backend es crítica para diseñar heurísticas que eviten la explosión combinatoria. 

### 3.2. Identificación de Factores de Incremento
El principal riesgo de sobrecosto técnico es un bucle infinito o tiempos de respuesta prolongados en el servidor si las restricciones (CSP) son demasiado abiertas. Un aumento en los segundos de cómputo por cada solicitud de horario incrementaría exponencialmente la facturación de los servicios Cloud.

### 3.3. Evaluación de Sostenibilidad (Green Software)
El enfoque arquitectónico del proyecto está alineado con los principios de Green Software:
1. **Eficiencia Energética:** Al aplicar algoritmos de poda de dominios (como AC-3) antes de ejecutar el backtracking puro, reducimos drásticamente los ciclos de CPU necesarios para encontrar un horario válido.
2. **Reducción de Huella de Carbono:** Menor tiempo de procesamiento en los servidores de AWS se traduce directamente en un menor consumo energético en el centro de datos, haciendo que el proceso de matrícula sea ecológicamente sostenible y económicamente viable para la universidad.
