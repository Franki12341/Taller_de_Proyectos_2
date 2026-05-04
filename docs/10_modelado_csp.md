# 🧠 Modelado Formal del Problema (CSP)

---

## 📖 Descripción General

El problema de generación de horarios académicos se modela como un **Problema de Satisfacción de Restricciones (CSP)**, debido a su naturaleza combinatoria y complejidad computacional (NP-Hard).

El objetivo es asignar cursos a franjas horarias de tal manera que se cumplan todas las restricciones académicas y operativas, optimizando la organización del tiempo del estudiante.

---

## 🔢 Definición Formal

Un CSP se define como una tupla:

CSP = (X, D, C)

Donde:

- **X (Variables):** conjunto de variables de decisión  
- **D (Dominios):** valores posibles de cada variable  
- **C (Restricciones):** conjunto de condiciones que deben cumplirse  

---

## 🔹 Variables (X)

Cada variable representa un curso que el estudiante desea matricular.

Ejemplo:

X = {Curso₁, Curso₂, Curso₃, ..., Cursoₙ}

---

## 🔹 Dominios (D)

Cada variable puede tomar valores correspondientes a horarios disponibles.

Ejemplo:

D(Cursoᵢ) = { (día, hora_inicio, hora_fin, aula) }

---

## 🔒 Restricciones (C)

### 1. 🚫 No solapamiento

Para cualquier par de cursos:

No debe existir intersección de horarios.

Formalmente:

Si Cursoᵢ ≠ Cursoⱼ entonces:

(finᵢ ≤ inicioⱼ) ∨ (finⱼ ≤ inicioᵢ)

---

### 2. 🎓 Créditos válidos

La suma total de créditos debe cumplir:

20 ≤ Σ créditos ≤ 22

---

### 3. 📘 Prerrequisitos

Un curso solo puede asignarse si se han aprobado sus prerrequisitos.

---

### 4. 🏫 Disponibilidad de aulas

Un aula no puede ser asignada a más de un curso en el mismo horario.

---

## 🎯 Función Objetivo (Optimización)

Además de cumplir restricciones, se busca optimizar:

- Minimizar tiempos muertos (horas huecas)
- Maximizar bloques libres (mañana o tarde)

---

## 🔄 Representación del Modelo

```mermaid
flowchart TD
Cursos --> Variables
Variables --> Dominios
Dominios --> Restricciones
Restricciones --> Solución
