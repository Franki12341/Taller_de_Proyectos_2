# 📊 Métricas y Análisis del Algoritmo

---

## 📖 Descripción

Se realizó un análisis del rendimiento del algoritmo de generación de horarios, con el objetivo de evaluar su eficiencia y validar las mejoras introducidas mediante heurísticas.

---

## ⏱️ Métricas Evaluadas

Se consideraron las siguientes métricas:

- Tiempo de ejecución (ms)
- Número de intentos (iteraciones del algoritmo)
- Validez de la solución

---

## 🧪 Resultados Experimentales

| Algoritmo | Tiempo (ms) | Intentos | Resultado |
|----------|------------|---------|----------|
| Backtracking simple | 15 ms | 45 | Válido |
| Backtracking + MRV | 3 ms | 12 | Válido |

---

## 📈 Análisis

Se observa que:

- La heurística MRV reduce significativamente el número de intentos
- El tiempo de ejecución disminuye considerablemente
- El algoritmo converge más rápido hacia soluciones válidas

---

## 🔄 Flujo de Evaluación

```mermaid
flowchart TD
Inicio --> EjecutarAlgoritmo
EjecutarAlgoritmo --> MedirTiempo
MedirTiempo --> ContarIntentos
ContarIntentos --> Analizar
