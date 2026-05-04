# ⚡ Optimización del Algoritmo CSP

---

## 📖 Descripción

El algoritmo de generación de horarios ha sido optimizado mediante la incorporación de heurísticas, con el objetivo de reducir el espacio de búsqueda y mejorar el tiempo de respuesta.

---

## 🧠 Heurística MRV

Se implementa la heurística **Minimum Remaining Values (MRV)**, que consiste en seleccionar primero la variable con menor cantidad de opciones disponibles.

Esto permite:

- Reducir combinaciones innecesarias
- Detectar fallos más rápido
- Mejorar la eficiencia del algoritmo

---

## 🔄 Funcionamiento

En cada iteración:

1. Se selecciona el curso con menos opciones
2. Se intenta asignar un horario
3. Se validan restricciones
4. Se continúa o se retrocede

---

## 🔍 Comparación

| Método | Rendimiento |
|------|-----------|
| Backtracking simple | Bajo |
| Backtracking + MRV | Alto |

---

## 📌 Conclusión

La incorporación de MRV mejora significativamente la eficiencia del algoritmo CSP, permitiendo generar soluciones válidas en menor tiempo, lo cual es fundamental en problemas NP-Hard como la generación de horarios académicos.
