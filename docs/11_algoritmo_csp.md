# ⚙️ Algoritmo de Resolución CSP

---

## 📖 Descripción General

El problema de generación de horarios en SmartSched-UC se resuelve mediante un algoritmo basado en **Backtracking**, una técnica clásica para resolver Problemas de Satisfacción de Restricciones (CSP).

El objetivo del algoritmo es encontrar una combinación de cursos y horarios que cumpla todas las restricciones definidas (no solapamiento, créditos válidos, etc.).

---

## 🧠 Enfoque del Algoritmo

El algoritmo sigue estos pasos:

1. Seleccionar un curso (variable)
2. Asignar un horario posible (dominio)
3. Verificar restricciones:
   - No solapamiento
   - Créditos válidos
4. Si cumple → continuar
5. Si falla → retroceder (Backtracking)

---

## 🔄 Pseudocódigo

```text
funcion generarHorario(cursos, solucion):
    si solucion es completa:
        retornar solucion

    seleccionar siguiente curso

    para cada horario posible del curso:
        si cumple restricciones:
            agregar a solucion

            resultado = generarHorario(cursos, solucion)

            si resultado es valido:
                retornar resultado

            eliminar de solucion

    retornar fallo


