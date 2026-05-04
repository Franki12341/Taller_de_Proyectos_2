# 🎯 Visión del Proyecto

---

## 📖 Descripción General

El proyecto **SmartSched-UC** tiene como propósito desarrollar una plataforma web inteligente que permita optimizar la generación de horarios académicos en la Universidad Continental.

La solución se orienta a resolver problemas actuales como la rigidez horaria, los solapamientos y la falta de flexibilidad para estudiantes que trabajan, contribuyendo directamente a la **retención estudiantil**.

---

## 🎯 Objetivos Estratégicos

- ✔ Generar horarios académicos sin solapamientos  
- ✔ Cumplir estrictamente el rango de 20 a 25 créditos  
- ✔ Validar prerrequisitos académicos automáticamente  
- ✔ Reducir tiempos muertos en la planificación  
- ✔ Permitir flexibilidad para estudiantes que trabajan  

---

## 🧩 Modelo Conceptual del Sistema

```mermaid
graph TD
A[SmartSched-UC] --> B[Optimización]
A --> C[Flexibilidad]
A --> D[Validación Académica]

B --> B1[Sin solapamientos]
B --> B2[Horarios compactos]

C --> C1[Trabajo]
C --> C2[Tiempo libre]

D --> D1[Créditos 20-22]
D --> D2[Prerrequisitos]
