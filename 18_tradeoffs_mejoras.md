# ⚖️ Trade-offs Técnicos y Propuestas de Mejora - SmartSched-UC

## 1. Identificación de Trade-offs Técnicos (Decisiones de Diseño)

Durante el desarrollo del motor CSP para la generación de horarios, el equipo de ingeniería enfrentó las siguientes decisiones críticas (Trade-offs):

- **Backtracking vs. Fuerza Bruta:** 
  - *Decisión:* Se optó por Backtracking con poda de dominios temprana.
  - *Trade-off:* Sacrificamos la simplicidad del código (la fuerza bruta es más fácil de programar) a cambio de ganar una enorme eficiencia computacional, evitando la "explosión combinatoria" en los servidores y reduciendo los costos de AWS (Green Software).
- **MERN Stack vs. Frameworks Monolíticos:**
  - *Decisión:* Separar el frontend (React) del backend (Node.js/Express).
  - *Trade-off:* Aumentó la complejidad inicial del despliegue y la gestión del repositorio, pero ganamos una arquitectura escalable donde el motor CSP puede ejecutarse en un servidor con mayores recursos de CPU sin afectar la carga de la interfaz de usuario.
- **Strict Spec-Driven Development (SDD):**
  - *Decisión:* Requerir validación estricta de variables antes de ejecutar el algoritmo.
  - *Trade-off:* La API rechaza más solicitudes (menor tolerancia a errores del usuario), pero garantizamos que el motor CSP nunca procese "basura computacional" (Garbage In, Garbage Out), asegurando el determinismo del resultado.

## 2. Propuestas de Mejora a Futuro

Para escalar el sistema a nivel de toda la Universidad Continental (múltiples sedes simultáneas), se proponen las siguientes mejoras:

1. **Implementación de Algoritmos Genéticos:** Para escenarios donde las restricciones blandas (preferencias de turnos de miles de alumnos) superen la capacidad del CSP actual, un algoritmo genético permitiría encontrar soluciones "suficientemente buenas" en menor tiempo.
2. **Caché Distribuido (Redis):** Almacenar en memoria los horarios base de los primeros ciclos (que suelen ser mallas curriculares rígidas) para no recalcularlos con el motor CSP, reduciendo el tiempo de respuesta de la API a milisegundos.
3. **Integración Continua (CI/CD):** Configurar GitHub Actions para que las pruebas de Jest se ejecuten automáticamente con cada Pull Request, garantizando que nuevas heurísticas no rompan las validaciones de cruces de horarios.
