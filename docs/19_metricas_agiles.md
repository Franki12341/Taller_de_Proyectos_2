# 📊 Análisis de Métricas Ágiles y Evolución (Jira) - SmartSched-UC

## 1. Interpretación de la Evolución del Proyecto (Burnup y Burndown)

* **Gráfico Burndown:** Durante los Sprints 1 y 2, la línea de trabajo pendiente muestra una tendencia de "caída tardía" (Late Drop). Esto es característico en proyectos de modelado matemático complejo. Gran parte del tiempo inicial se invirtió en investigación pura y poda de dominios del CSP antes de poder trasladar las Historias de Usuario al estado "Listo".
* **Gráfico Burnup:** La línea de alcance total del proyecto se mantiene estable sin aumentos repentinos de alcance no planificado (*Scope Creep*). Esto demuestra que el enfoque Spec-Driven Development (SDD) aplicado antes del desarrollo de código evitó la ambigüedad en los requerimientos.

## 2. Identificación de Cuellos de Botella (Control Chart)

Al analizar el Gráfico de Control (Cycle Time), identificamos un claro cuello de botella técnico durante el desarrollo del **Motor CSP y Algoritmo de Backtracking**.
Las subtareas relacionadas con la validación de la restricción dura de cruces horarios (HC01) y disponibilidad de aulas (HC04) permanecieron más tiempo del promedio en la columna "En Curso". 
* **Justificación:** La traducción de la lógica declarativa a un motor iterativo en Node.js requirió pruebas exhaustivas para evitar la explosión combinatoria. El cuello de botella fue de naturaleza cognitiva (diseño del algoritmo MRV), no operativa.

## 3. Evaluación de la Estabilidad del Equipo (Velocity Chart)

El gráfico de Velocidad demuestra un ritmo de proyecto estable tras la planificación inicial. 
* En el Sprint 1 (Modelado CSP), el equipo comprometió y entregó **13 Puntos de Historia**, reflejando la alta incertidumbre inicial de definir dominios y variables.
* En el Sprint 2 (Implementación de Backend y API), la velocidad se mantuvo constante, cerrando Historias por valor de **13 Puntos** (HU-02 de 8 pts y HU-03 de 5 pts). 
* **Conclusión:** La variabilidad de velocidad es baja, lo que indica una alta precisión en las sesiones de *Sprint Planning* y un equipo maduro que dimensiona correctamente la complejidad del CSP.

## 4. Coherencia entre Planificación y Complejidad del Problema

La planificación ágil en Jira es matemáticamente coherente con la arquitectura del sistema. 
Al ser un problema NP-Hard, se aplicó la estrategia de **"Front-Loading" de riesgos**. Esto significa que las Épicas de mayor peso (Sprints 1 y 2, que contienen el núcleo matemático y la API) se ejecutaron al inicio. 
A medida que el proyecto avanza hacia las capas de visualización en React (Sprint 3), el nivel de incertidumbre y los Story Points disminuyen. Esto evidencia una planificación que ataca primero el mayor riesgo tecnológico.
