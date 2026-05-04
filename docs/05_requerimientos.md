# 📊 Requerimientos del Sistema

---

## 📖 Descripción

Los requerimientos del sistema definen las funcionalidades y características que debe cumplir la plataforma SmartSched-UC. Estos aseguran que el sistema responda a las necesidades académicas y técnicas, garantizando calidad, rendimiento y cumplimiento de normas institucionales.

---

## 🔹 Requerimientos Funcionales

| ID | Requerimiento | Descripción |
|----|--------------|------------|
| RF1 | Generar horarios | El sistema debe generar horarios sin solapamientos |
| RF2 | Validar créditos | El sistema debe asegurar entre 20 y 25 créditos |
| RF3 | Validar prerrequisitos | El sistema debe verificar cursos obligatorios |

---

## 🔹 Requerimientos No Funcionales

| ID | Requerimiento | Tipo |
|----|--------------|-----|
| RNF1 | Tiempo de respuesta menor a 5 segundos | Rendimiento |
| RNF2 | Seguridad basada en OWASP | Seguridad |
| RNF3 | Escalabilidad del sistema | Arquitectura |

---

## 🔄 Flujo del Sistema

```mermaid
flowchart TD
Entrada --> Procesamiento --> Validación --> Salida
