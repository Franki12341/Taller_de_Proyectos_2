# 🏗️ Arquitectura del Sistema

---

## 📖 Descripción

El sistema SmartSched-UC utiliza una arquitectura basada en el modelo SPA (Single Page Application) combinada con una API REST, permitiendo separar la interfaz de usuario de la lógica de negocio. Esto facilita la escalabilidad, el mantenimiento y la eficiencia del sistema.

---

## 🔗 Componentes Tecnológicos

- **Frontend:** React  
- **Backend:** FastAPI  
- **Base de Datos:** PostgreSQL  
- **Motor de Optimización:** CSP  

---
## 🔄 Arquitectura Cliente-Servidor

El sistema se divide en dos componentes principales:

- **Frontend (cliente):** encargado de la interacción con el usuario, desarrollado en HTML y JavaScript.
- **Backend (servidor):** encargado de la lógica del sistema, implementando el algoritmo CSP en Node.js con Express.

La comunicación entre ambos se realiza mediante una API REST, permitiendo desacoplar la lógica de negocio de la presentación.
---

## 🔄 Diagrama de Arquitectura

```mermaid
flowchart TD
Usuario --> React
React --> FastAPI
FastAPI --> CSP
CSP --> PostgreSQL
