# 📌 Restricciones del Sistema

---

## 📖 Descripción

Las restricciones representan condiciones obligatorias que el sistema debe cumplir para generar horarios académicos válidos y coherentes con las normas institucionales de la Universidad Continental. Estas limitan el espacio de búsqueda del algoritmo CSP y garantizan la consistencia de la solución.

---

## 🔒 Restricciones Académicas

- Los estudiantes deben matricularse entre **20 y 25 créditos**
- Se deben cumplir todos los **prerrequisitos** establecidos en la malla curricular

---

## ⛔ Restricciones Técnicas

- No deben existir **solapamientos de horarios**
- Las aulas deben estar **disponibles y con capacidad suficiente**

---

## 🔄 Validación de Restricciones

```mermaid
flowchart LR
Asignacion --> Validacion --> Resultado
