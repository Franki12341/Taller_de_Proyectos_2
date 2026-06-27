# Manual de capacitación de SmartSched-UC

## 1. Propósito

Orientar a estudiantes, responsables de coordinación académica y personal técnico en el uso, operación, instalación, validación y mantenimiento básico del sistema SmartSched-UC.

Este manual describe los principales flujos funcionales del MVP, los procedimientos técnicos necesarios para ejecutarlo y las acciones recomendadas frente a errores de conexión, validación o configuración.

## 2. Alcance del manual

El manual comprende:

* uso de la aplicación por parte del estudiante;
* revisión de información académica;
* selección de cursos;
* simulación de matrícula;
* generación de horarios;
* interpretación de conflictos y recomendaciones;
* consulta del estado de PostgreSQL y del fallback local;
* instalación del frontend y backend;
* ejecución de pruebas y cobertura;
* generación del build;
* análisis de calidad con SonarQube;
* generación de evidencias;
* solución de problemas frecuentes.

## 3. Perfiles de usuario

| Perfil                 | Responsabilidad principal                                                   |
| ---------------------- | --------------------------------------------------------------------------- |
| Estudiante             | Seleccionar cursos, generar un horario y revisar la simulación de matrícula |
| Coordinación académica | Revisar cursos, docentes, aulas, restricciones, métricas y conflictos       |
| Responsable técnico    | Instalar, ejecutar, probar y mantener la aplicación                         |
| Responsable de calidad | Ejecutar pruebas, cobertura, auditorías y análisis SonarQube                |
| Responsable documental | Mantener actualizados los documentos y evidencias del proyecto              |

---

# A. Manual del estudiante

## A.1 Acceso a la aplicación

1. Abrir el navegador web.
2. Ingresar a la dirección local del frontend:

```text
http://localhost:3000
```

3. Esperar a que se cargue la pantalla principal.
4. Verificar el periodo académico mostrado en la interfaz.
5. Revisar el contador o resumen de créditos.
6. Confirmar que los cursos y demás datos académicos se visualicen correctamente.

### Evidencia de referencia

* [Pantalla principal de SmartSched-UC](./evidencias/aplicacion/EV-APP-01-pantalla-principal.png)

## A.2 Reconocimiento de la pantalla principal

En la pantalla principal el estudiante puede encontrar:

* buscador de cursos;
* filtros académicos;
* listado de cursos disponibles;
* cursos seleccionados;
* contador de créditos;
* opción para generar el horario;
* resumen de matrícula;
* advertencias y recomendaciones;
* información sobre el estado del sistema.

Antes de comenzar, se recomienda comprobar que el listado de cursos se encuentre disponible.

## A.3 Búsqueda de cursos

1. Ubicar el campo de búsqueda.
2. Escribir el código o nombre del curso.
3. Esperar a que la aplicación filtre los resultados.
4. Revisar la información mostrada para cada curso.
5. Utilizar los filtros adicionales cuando estén disponibles.

La búsqueda permite reducir el listado y localizar rápidamente los cursos necesarios para la simulación.

### Evidencia de referencia

* [Listado de cursos](./evidencias/aplicacion/EV-APP-02-listado-cursos.png)

## A.4 Selección de cursos

1. Revisar el listado de cursos disponibles.
2. Seleccionar los cursos que se desean incluir.
3. Comprobar que cada curso aparezca en el resumen de selección.
4. Verificar el total acumulado de créditos.
5. Retirar cualquier curso seleccionado por error.
6. Continuar hasta completar la carga académica deseada.

El sistema utiliza un límite máximo de **25 créditos**. La selección no debe superar ese valor.

### Evidencia de referencia

* [Selección de cursos](./evidencias/aplicacion/EV-APP-03-seleccion-cursos.png)
* [Créditos seleccionados](./evidencias/aplicacion/EV-APP-05-creditos-seleccionados.png)

## A.5 Generación del horario

1. Confirmar que se hayan seleccionado los cursos deseados.
2. Revisar el total de créditos.
3. Presionar la opción destinada a generar el horario.
4. Esperar a que el backend procese las restricciones.
5. Revisar el horario propuesto.
6. Comprobar que los cursos aparezcan distribuidos en días y bloques horarios.
7. Leer las advertencias o recomendaciones generadas.

El motor del sistema evalúa las combinaciones posibles mediante reglas de satisfacción de restricciones y backtracking.

### Evidencia de referencia

* [Horario generado](./evidencias/aplicacion/EV-APP-04-horario-generado.png)

## A.6 Validaciones efectuadas por el sistema

Durante la generación del horario, SmartSched-UC puede evaluar:

* límite máximo de créditos;
* cruces entre cursos;
* conflictos de estudiante;
* conflictos de docente;
* conflictos de aula;
* disponibilidad docente;
* bloques protegidos o administrativos;
* capacidad del aula;
* cantidad estimada de estudiantes;
* aulas inactivas;
* aulas en mantenimiento;
* horas asignadas;
* posibilidad de mejorar la carga académica.

El sistema busca generar un horario válido y cercano a la carga académica objetivo sin superar los 25 créditos.

## A.7 Interpretación de conflictos

Cuando el sistema detecta un conflicto, el estudiante debe:

1. leer el mensaje o advertencia mostrada;
2. identificar el curso o recurso involucrado;
3. revisar si existe un cruce de horario;
4. comprobar si la capacidad del aula es suficiente;
5. retirar o reemplazar uno de los cursos cuando sea necesario;
6. generar nuevamente el horario.

Los conflictos no deben ignorarse, debido a que indican que la combinación seleccionada no cumple alguna de las restricciones del sistema.

### Evidencia de referencia

* [Conflicto de horario](./evidencias/aplicacion/EV-APP-06-conflicto-horario.png)
* [Validación de capacidad del aula](./evidencias/aplicacion/EV-APP-07-capacidad-aula.png)

## A.8 Interpretación de la ocupación de aulas

El sistema puede mostrar información relacionada con:

* capacidad total del aula;
* cantidad estimada de estudiantes;
* porcentaje de ocupación;
* riesgo de sobrecapacidad;
* subutilización del aula;
* estado de mantenimiento;
* disponibilidad del recurso.

Cuando una asignación supera la capacidad registrada, el sistema debe generar una advertencia o rechazar la combinación.

## A.9 Revisión de recomendaciones

Después de generar el horario, se deben revisar las recomendaciones del sistema.

Estas pueden estar relacionadas con:

* créditos faltantes para alcanzar la carga objetivo;
* cursos que pueden incorporarse;
* conflictos detectados;
* mejora de la distribución semanal;
* ocupación de aulas;
* carga docente;
* uso de infraestructura.

Las recomendaciones apoyan la toma de decisiones, pero no reemplazan la validación académica institucional.

## A.10 Resumen de matrícula simulada

1. Abrir la sección de resumen.
2. Revisar los cursos seleccionados.
3. Comprobar el total de créditos.
4. Revisar el estado del horario.
5. Confirmar que no existan conflictos críticos.
6. Verificar las recomendaciones.
7. Ejecutar la matrícula simulada cuando la opción esté disponible.

La matrícula realizada en SmartSched-UC es una **simulación académica** y no representa una matrícula oficial en la Universidad Continental.

### Evidencia de referencia

* [Resumen de matrícula](./evidencias/aplicacion/EV-APP-09-resumen-matricula.png)

## A.11 Notificaciones

El sistema puede mostrar notificaciones sobre:

* horario generado correctamente;
* errores de conexión;
* uso del fallback local;
* conflictos detectados;
* límite de créditos;
* recomendaciones;
* acciones completadas.

El usuario debe leer la notificación antes de continuar con la siguiente acción.

### Evidencia de referencia

* [Notificaciones del sistema](./evidencias/aplicacion/EV-APP-08-notificacion.png)

## A.12 Uso del modo de demostración

El modo de demostración permite mostrar las principales capacidades de SmartSched-UC utilizando datos académicos preparados para el MVP.

Debe emplearse cuando:

* se realiza una sustentación;
* PostgreSQL no se encuentra disponible;
* se desea demostrar un flujo completo;
* se requiere validar rápidamente la interfaz.

Los datos empleados en este modo no deben presentarse como información institucional real.

### Evidencia de referencia

* [Modo de demostración](./evidencias/aplicacion/EV-APP-10-modo-demostracion.png)

---

# B. Manual de coordinación académica

## B.1 Revisión del estado del sistema

La coordinación debe comprobar:

1. disponibilidad del backend;
2. modo de datos activo;
3. conexión con PostgreSQL;
4. activación del fallback local;
5. cantidad de cursos;
6. cantidad de docentes;
7. cantidad de aulas;
8. fecha o estado de la última carga de datos.

El estado técnico puede consultarse mediante:

```text
http://localhost:3001/api/health
```

### Evidencias de referencia

* [Estado de la API](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Reporte visual de base de datos](./evidencias/base-datos/EV-DB-07-reporte-base-datos.png)

## B.2 Interpretación del modo de datos

El sistema puede operar en dos modos:

### PostgreSQL

Se utiliza cuando la base de datos está disponible y la conexión es válida.

### Fallback local

Se utiliza cuando PostgreSQL no está disponible o cuando ocurre un problema de conexión o compatibilidad del esquema.

La coordinación debe identificar el modo activo antes de interpretar los resultados.

## B.3 Revisión de cursos

Para validar los cursos disponibles:

1. abrir la vista principal;
2. revisar el listado de cursos;
3. comprobar códigos, nombres y créditos;
4. identificar cursos faltantes o duplicados;
5. revisar la información utilizada en las simulaciones.

Cuando se utilice PostgreSQL, los datos deben coincidir con el esquema y los registros disponibles en la base.

## B.4 Revisión de docentes

La coordinación debe verificar:

* disponibilidad registrada;
* bloques protegidos;
* horas asignadas;
* posibles cruces;
* carga académica;
* relación entre curso y docente.

Un docente no debe ser asignado a dos actividades que se desarrollen en el mismo bloque horario.

## B.5 Revisión de aulas

La revisión de aulas debe considerar:

* código o nombre del aula;
* capacidad;
* tipo;
* estado activo;
* mantenimiento;
* ocupación estimada;
* compatibilidad con el curso;
* disponibilidad horaria.

Las aulas inactivas o en mantenimiento no deben ser utilizadas por el motor.

## B.6 Revisión de restricciones

Las restricciones se clasifican en:

### Restricciones duras

Son condiciones que no deben incumplirse:

* cruces de estudiantes;
* cruces de docentes;
* cruces de aulas;
* capacidad insuficiente;
* docente no disponible;
* aula en mantenimiento;
* límite máximo de créditos.

### Restricciones de optimización

Buscan mejorar la calidad del horario:

* reducir tiempos muertos;
* aproximarse a la carga académica objetivo;
* distribuir adecuadamente los cursos;
* mejorar el uso de infraestructura;
* evitar una ocupación deficiente.

## B.7 Revisión de métricas

La coordinación puede utilizar las métricas para analizar:

* créditos seleccionados;
* cursos asignados;
* conflictos;
* carga docente;
* ocupación de aulas;
* uso de infraestructura;
* advertencias;
* recomendaciones.

Las métricas deben interpretarse como apoyo para la simulación y no como datos institucionales definitivos.

## B.8 Auditoría y trazabilidad

Cuando la aplicación registre eventos, la coordinación debe revisar:

* acción ejecutada;
* resultado obtenido;
* fecha o momento de ejecución;
* modo de datos;
* advertencias;
* fallos de conexión;
* generación de horarios;
* uso del modo de demostración.

La auditoría facilita la explicación de las decisiones tomadas por el sistema.

## B.9 Procedimiento ante una contingencia

Cuando PostgreSQL no esté disponible:

1. consultar `/api/health`;
2. confirmar que el backend continúe activo;
3. verificar la activación del fallback local;
4. informar que se utilizarán datos de demostración;
5. continuar con la simulación;
6. registrar la contingencia;
7. revisar posteriormente la conexión con PostgreSQL.

---

# C. Manual técnico

## C.1 Requisitos previos

Antes de instalar SmartSched-UC se requiere:

* Windows 10 u 11;
* PowerShell;
* Git;
* Node.js;
* npm;
* PostgreSQL;
* navegador web actualizado;
* SonarQube y Java 21 para análisis de calidad;
* acceso al repositorio del proyecto.

## C.2 Estructura principal

```text
Taller_de_Proyectos_2-git/
├── docs/
├── e2e/
├── scripts/
├── smartsched-uc/
│   ├── client/
│   ├── server/
│   ├── docs/
│   └── sonar-project.properties
├── package.json
└── README.md
```

La raíz del repositorio contiene la automatización general y la documentación. La aplicación se encuentra dentro de `smartsched-uc/`.

## C.3 Acceso al repositorio

Abrir PowerShell y ejecutar:

```powershell
cd D:\Proyectos\Taller_de_Proyectos_2-git
```

Comprobar la ubicación:

```powershell
git rev-parse --show-toplevel
```

Resultado esperado:

```text
D:/Proyectos/Taller_de_Proyectos_2-git
```

## C.4 Instalación de dependencias

Desde la raíz:

```powershell
npm install
```

Instalar las dependencias generales de la aplicación:

```powershell
npm --prefix smartsched-uc install
```

Instalar el backend:

```powershell
npm --prefix smartsched-uc/server install
```

Instalar el frontend:

```powershell
npm --prefix smartsched-uc/client install
```

## C.5 Configuración de variables de entorno

1. Ingresar a:

```text
smartsched-uc/server/
```

2. Utilizar como referencia:

```text
.env.example
```

3. Crear un archivo local `.env`.
4. Configurar las variables necesarias sin subir el archivo a Git.

Ejemplo general:

```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/smartsched_uc
DB_SSL=false
USE_POSTGRES=true
PORT=3001
```

Las credenciales deben adaptarse al entorno local.

No se deben almacenar contraseñas reales en:

* GitHub;
* Markdown;
* capturas;
* `sonar-project.properties`;
* scripts versionados.

## C.6 Preparación de PostgreSQL

Ingresar al backend:

```powershell
cd D:\Proyectos\Taller_de_Proyectos_2-git\smartsched-uc\server
```

Probar la conexión:

```powershell
npm run db:test
```

Inicializar la base de datos cuando el script esté disponible:

```powershell
node src/database/init-db.js
```

Inspeccionar el esquema:

```powershell
node src/database/inspect-schema.js
```

También se puede revisar el archivo:

```text
src/database/smartsched_uc.sql
```

### Evidencias de referencia

* [Conexión con PostgreSQL](./evidencias/base-datos/EV-DB-02-conexion-postgresql.txt)
* [Esquema de tablas](./evidencias/base-datos/EV-DB-03-esquema-tablas.txt)
* [Conteo de registros](./evidencias/base-datos/EV-DB-04-conteo-registros.csv)
* [Integridad de datos](./evidencias/base-datos/EV-DB-05-integridad-datos.md)

## C.7 Ejecución del backend

Desde:

```text
smartsched-uc/server
```

Ejecutar:

```powershell
npm start
```

El backend debe quedar disponible en:

```text
http://localhost:3001
```

Comprobar el endpoint de salud:

```text
http://localhost:3001/api/health
```

## C.8 Ejecución del frontend

Abrir una segunda ventana de PowerShell:

```powershell
cd D:\Proyectos\Taller_de_Proyectos_2-git\smartsched-uc\client
npm start
```

El frontend debe abrirse en:

```text
http://localhost:3000
```

## C.9 Verificación funcional

Después de iniciar ambos servicios:

1. abrir el frontend;
2. comprobar que se muestren cursos;
3. seleccionar cursos;
4. revisar los créditos;
5. generar un horario;
6. verificar conflictos;
7. revisar el resumen;
8. consultar `/api/health`;
9. identificar si se utiliza PostgreSQL o fallback.

## C.10 Ejecución de pruebas generales

Desde la raíz del repositorio:

```powershell
cd D:\Proyectos\Taller_de_Proyectos_2-git
npm test
```

Resultados registrados en el cierre:

* 11 pruebas del backend aprobadas;
* 1 prueba del frontend aprobada;
* 12 pruebas totales;
* 0 fallos.

## C.11 Pruebas del backend

```powershell
npm --prefix smartsched-uc/server test
```

Las pruebas verifican:

* conflictos;
* generación repetible;
* límite de créditos;
* combinación exacta de 25 créditos;
* disponibilidad docente;
* capacidad de aulas;
* aulas en mantenimiento;
* recomendaciones;
* endpoint de generación;
* paginación;
* endpoint de salud y fallback.

## C.12 Pruebas del frontend

```powershell
npm --prefix smartsched-uc/client test -- --watchAll=false
```

La prueba existente valida el renderizado del tablero compacto de matrícula.

## C.13 Cobertura del backend

Desde la raíz:

```powershell
npm run test:coverage:server
```

Resultados registrados:

| Métrica    | Resultado |
| ---------- | --------: |
| Sentencias |   80.42 % |
| Ramas      |   60.46 % |
| Funciones  |   84.42 % |
| Líneas     |   79.77 % |

El scheduler obtuvo:

| Métrica    | Resultado |
| ---------- | --------: |
| Sentencias |   92.08 % |
| Ramas      |   73.71 % |
| Funciones  |   98.16 % |
| Líneas     |   91.30 % |

## C.14 Cobertura del frontend

```powershell
npm run test:coverage:client
```

Resultados registrados:

| Métrica    | Resultado |
| ---------- | --------: |
| Sentencias |   44.05 % |
| Ramas      |   43.77 % |
| Funciones  |   42.85 % |
| Líneas     |   43.87 % |

La cobertura del frontend debe ampliarse en futuras iteraciones.

## C.15 Generación del build

```powershell
npm --prefix smartsched-uc/client run build
```

El resultado esperado es:

```text
Compiled successfully
```

El build genera la carpeta de producción del frontend.

## C.16 Auditoría de dependencias

### Raíz

```powershell
npm audit
```

### Backend

```powershell
npm --prefix smartsched-uc/server audit
```

### Frontend

```powershell
npm --prefix smartsched-uc/client audit
```

Los resultados deben revisarse por separado.

No se recomienda ejecutar:

```powershell
npm audit fix --force
```

sin comprobar previamente el impacto sobre la compatibilidad del proyecto.

## C.17 Ejecución de SonarQube

### Iniciar SonarQube

Ejecutar el archivo:

```text
C:\Users\franc\Downloads\sonarqube-26.6.0.123539\sonarqube-26.6.0.123539\bin\windows-x86-64\StartSonar.bat
```

Esperar hasta que el servicio esté disponible en:

```text
http://localhost:9000
```

### Configurar el token temporalmente

En PowerShell:

```powershell
$env:SONAR_TOKEN="TOKEN_GENERADO_EN_SONARQUBE"
```

El token no debe escribirse dentro de `sonar-project.properties`.

### Ejecutar el análisis

Ubicarse en la ruta de la aplicación o utilizar el comando configurado en el proyecto.

Después de finalizar, revisar:

* estado de Quality Gate;
* bugs;
* vulnerabilidades;
* hotspots;
* code smells;
* cobertura;
* duplicación;
* deuda técnica;
* calificaciones de fiabilidad y seguridad.

### Evidencias de referencia

* [Estado de SonarQube](./evidencias/sonarqube/EV-SONAR-01-system-status.json)
* [Métricas](./evidencias/sonarqube/EV-SONAR-02-metricas.json)
* [Resumen](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Ejecución del scanner](./evidencias/sonarqube/EV-SONAR-09-ejecucion-scanner.txt)

## C.18 Generación automatizada de evidencias

Desde la raíz:

```powershell
cd D:\Proyectos\Taller_de_Proyectos_2-git
```

Configurar SonarQube cuando corresponda:

```powershell
$env:SONAR_TOKEN="TOKEN_GENERADO_EN_SONARQUBE"
```

Ejecutar:

```powershell
.\scripts\evidencias\generar-todas.ps1
```

Cuando sea necesario utilizar información de demostración:

```powershell
.\scripts\evidencias\generar-todas.ps1 -UseSyntheticData
```

Toda evidencia sintética debe permanecer claramente identificada como:

```text
MODO DEMOSTRACIÓN — DATOS SINTÉTICOS
```

## C.19 Verificación de evidencias

Ejecutar:

```powershell
.\scripts\evidencias\verificar-evidencias.ps1
```

Revisar:

```text
docs/cierre/evidencias/00_manifiesto_evidencias.md
docs/cierre/evidencias/99_validacion_evidencias.md
```

## C.20 Control de versiones

Antes de crear un commit:

```powershell
git status
git diff
```

Agregar los cambios:

```powershell
git add -A
```

Crear el commit:

```powershell
git commit -m "docs(cierre): update training manual"
```

Subir a GitHub:

```powershell
git push origin main
```

Cuando exista un error de Husky, primero debe revisarse la configuración de los hooks. El uso de `--no-verify` debe ser temporal y estar justificado.

## C.21 Verificación de secretos

Antes de publicar cambios:

```powershell
git grep -n -i -E "sqp_|SONAR_PASSWORD|SONAR_TOKEN"
```

El comando no debe mostrar tokens o contraseñas reales.

## C.22 Codificación de documentos

Todos los archivos Markdown deben guardarse con codificación:

```text
UTF-8
```

Antes del commit se recomienda buscar caracteres dañados como:

```text
Ã
ðŸ
â€
```

---

# D. Solución de problemas frecuentes

## D.1 El frontend no abre

Comprobar:

1. que las dependencias estén instaladas;
2. que el comando se ejecute dentro de `client`;
3. que el puerto 3000 esté disponible;
4. que no exista otro proceso utilizando el mismo puerto.

Ejecutar:

```powershell
npm install
npm start
```

## D.2 El backend no responde

Comprobar:

1. que el comando se ejecute dentro de `server`;
2. que las dependencias estén instaladas;
3. que el puerto 3001 esté disponible;
4. que `.env` esté configurado correctamente.

Ejecutar:

```powershell
npm install
npm start
```

## D.3 PostgreSQL no conecta

Revisar:

* `DATABASE_URL`;
* usuario;
* contraseña;
* puerto;
* nombre de la base;
* estado del servicio PostgreSQL;
* compatibilidad del esquema.

Ejecutar:

```powershell
npm run db:test
node src/database/inspect-schema.js
```

Si PostgreSQL no está disponible, la aplicación puede utilizar el fallback local.

## D.4 La aplicación muestra datos locales

Consultar:

```text
http://localhost:3001/api/health
```

Si el modo activo es local, revisar la conexión de PostgreSQL y el esquema de la base.

## D.5 No se genera el horario

Comprobar:

* cursos seleccionados;
* créditos;
* conflictos;
* disponibilidad docente;
* capacidad de aulas;
* estado del backend;
* mensajes de error.

Retirar cursos conflictivos y ejecutar nuevamente la generación.

## D.6 Se supera el límite de créditos

Reducir la selección hasta alcanzar un máximo de 25 créditos.

## D.7 El build falla

Ejecutar:

```powershell
npm install
npm test -- --watchAll=false
npm run build
```

Revisar los errores de compilación antes de modificar dependencias.

## D.8 SonarQube no responde

Comprobar:

1. que Java 21 esté instalado;
2. que SonarQube se haya iniciado;
3. que el puerto 9000 esté libre;
4. que el servicio haya terminado de cargar.

Abrir:

```text
http://localhost:9000
```

## D.9 El scanner no autentica

Configurar nuevamente:

```powershell
$env:SONAR_TOKEN="TOKEN_VÁLIDO"
```

No colocar el token en archivos versionados.

## D.10 Git no permite crear el commit

Ejecutar:

```powershell
git status
git config --get core.hooksPath
dir .husky
```

Revisar la existencia, codificación y formato de los hooks.

## D.11 Existen conflictos de merge

Ejecutar:

```powershell
git status
git diff --name-only --diff-filter=U
```

Resolver los archivos indicados, agregarlos y completar el commit de fusión.

## D.12 Aparecen caracteres dañados

Abrir el documento con Visual Studio Code y seleccionar:

```text
Guardar con codificación → UTF-8
```

Después, corregir los caracteres dañados y guardar nuevamente.

---


# F. Evidencias de apoyo al manual

## Aplicación

* [Pantalla principal](./evidencias/aplicacion/EV-APP-01-pantalla-principal.png)
* [Listado de cursos](./evidencias/aplicacion/EV-APP-02-listado-cursos.png)
* [Selección de cursos](./evidencias/aplicacion/EV-APP-03-seleccion-cursos.png)
* [Horario generado](./evidencias/aplicacion/EV-APP-04-horario-generado.png)
* [Créditos seleccionados](./evidencias/aplicacion/EV-APP-05-creditos-seleccionados.png)
* [Conflicto de horario](./evidencias/aplicacion/EV-APP-06-conflicto-horario.png)
* [Capacidad del aula](./evidencias/aplicacion/EV-APP-07-capacidad-aula.png)
* [Notificación](./evidencias/aplicacion/EV-APP-08-notificacion.png)
* [Resumen de matrícula](./evidencias/aplicacion/EV-APP-09-resumen-matricula.png)
* [Modo de demostración](./evidencias/aplicacion/EV-APP-10-modo-demostracion.png)

## Base de datos

* [Estado de la API](./evidencias/base-datos/EV-DB-01-api-health.md)
* [Conexión con PostgreSQL](./evidencias/base-datos/EV-DB-02-conexion-postgresql.txt)
* [Esquema de tablas](./evidencias/base-datos/EV-DB-03-esquema-tablas.txt)
* [Conteo de registros](./evidencias/base-datos/EV-DB-04-conteo-registros.csv)
* [Integridad de datos](./evidencias/base-datos/EV-DB-05-integridad-datos.md)
* [Reporte de base de datos](./evidencias/base-datos/EV-DB-07-reporte-base-datos.png)

## Pruebas y calidad

* [Pruebas generales](./evidencias/pruebas/EV-TEST-01-pruebas-generales.txt)
* [Cobertura del backend](./evidencias/pruebas/EV-TEST-02-cobertura-backend.txt)
* [Cobertura del frontend](./evidencias/pruebas/EV-TEST-03-cobertura-frontend.txt)
* [Validación completa](./evidencias/pruebas/EV-TEST-04-validacion-completa.txt)
* [Auditoría de la raíz](./evidencias/calidad/EV-SEC-01-audit-raiz.txt)
* [Auditoría del backend](./evidencias/calidad/EV-SEC-02-audit-backend.txt)
* [Auditoría del frontend](./evidencias/calidad/EV-SEC-03-audit-frontend.txt)

## SonarQube

* [Estado de SonarQube](./evidencias/sonarqube/EV-SONAR-01-system-status.json)
* [Métricas de SonarQube](./evidencias/sonarqube/EV-SONAR-02-metricas.json)
* [Resumen de SonarQube](./evidencias/sonarqube/EV-SONAR-04-resumen.md)
* [Ejecución del scanner](./evidencias/sonarqube/EV-SONAR-09-ejecucion-scanner.txt)

---

# G. Documentos relacionados

* [Informe final del proyecto](./01_informe_final_proyecto.md)
* [Lecciones aprendidas](./02_lecciones_aprendidas.md)
* [Registro de riesgos](./03_registro_riesgos.md)
* [Registro de incidentes](./04_registro_incidentes.md)
* [Registro de impedimentos](./05_registro_impedimentos.md)
* [Registro de defectos](./06_registro_defectos.md)
* [Registro de supuestos](./07_registro_supuestos.md)
* [Revisión del acta de constitución](./08_revision_acta_constitucion.md)
* [Declaración de Trabajo](./09_declaracion_trabajo_sow.md)
* [Matriz de trazabilidad](./11_matriz_trazabilidad.md)
* [Control de configuración y cambios](./12_control_configuracion_cambios.md)
* [README de evidencias](./evidencias/README.md)
* [Manifiesto de evidencias](./evidencias/00_manifiesto_evidencias.md)
* [Validación de evidencias](./evidencias/99_validacion_evidencias.md)

## Resultado de la capacitación

Al finalizar la capacitación, el usuario debe ser capaz de:

* ingresar al sistema;
* seleccionar cursos;
* interpretar el límite de créditos;
* generar un horario;
* reconocer conflictos;
* revisar recomendaciones;
* diferenciar PostgreSQL y fallback;
* ejecutar frontend y backend;
* ejecutar pruebas y cobertura;
* generar el build;
* revisar auditorías;
* ejecutar SonarQube;
* generar evidencias;
* identificar y resolver problemas básicos del entorno.
