# Gestión de Tareas - Proyecto

Este proyecto es una aplicación web para gestionar tareas, con funcionalidades como crear, editar, eliminar, cambiar el estado de las tareas, y filtrarlas por estado o fecha. La solución incluye tanto un **frontend** desarrollado en React como un **backend** que expone una API REST para manejar las operaciones CRUD sobre las tareas.

## Descripción general de la solución

La aplicación se divide en dos partes principales:
1. **Frontend (React)**: 
   - Utiliza React para el manejo de componentes de interfaz de usuario.
   - Implementa funciones como el formulario para crear nuevas tareas, la lista de tareas con opciones de edición y eliminación, y un calendario para visualizar las tareas.
   - Además, se han implementado filtros por estado y fecha de vencimiento de las tareas.

2. **Backend (Node.js / Express)**:
   - Proporciona una API RESTful para gestionar las tareas.
   - Ofrece endpoints para las operaciones CRUD: Crear, Leer, Actualizar y Eliminar tareas.
   - Utiliza **SQLite** como base de datos para almacenar las tareas de manera persistente.

## Instrucciones para levantar el proyecto

### 1. Backend (Node.js / Express)
Para iniciar el backend, sigue estos pasos:

1. Clona el repositorio del backend:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-backend.git
   cd proyecto-backend
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Levanta el servidor de desarrollo:
   ```bash
   npm start
   ```

   El backend estará disponible en `http://localhost:3002`.

### 2. Frontend (React)
Para iniciar el frontend, sigue estos pasos:

1. Clona el repositorio del frontend:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-frontend.git
   cd proyecto-frontend
   ```

2. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

3. Asegúrate de que el backend esté en funcionamiento y el frontend esté configurado para comunicarse con la API REST. Si tu backend está corriendo en `http://localhost:3002`, no necesitarás hacer cambios, ya que el frontend utiliza un proxy por defecto.

4. Levanta el servidor de desarrollo:
   ```bash
   npm start
   ```

   El frontend estará disponible en `http://localhost:3000`.

## Descripción de las funcionalidades

- **Gestión de Tareas**:
  - Crear, editar, eliminar y marcar tareas como completadas.
  - Los usuarios pueden ver una lista de todas las tareas y sus detalles, como título, descripción, fecha límite y prioridad.

- **Filtros**:
  - El usuario puede filtrar las tareas por estado (pendiente/completado) y fecha de vencimiento.

- **Calendario**:
  - El calendario muestra las tareas en un formato visual, permitiendo al usuario ver qué tareas están pendientes en un período determinado.

## Herramientas o librerías externas utilizadas

### Frontend:
- **React**: Biblioteca para la construcción de interfaces de usuario.
- **React Router**: Para la navegación entre páginas dentro de la aplicación.
- **Axios**: Para hacer peticiones HTTP al backend.
- **React Bootstrap**: Para facilitar la creación de la interfaz con componentes preconstruidos y responsivos.
- **React Calendar**: Para mostrar las tareas en un formato de calendario.

### Backend:
- **Node.js**: Entorno de ejecución de JavaScript para el backend.
- **Express**: Framework minimalista para construir la API REST.
- **SQLite**: Base de datos ligera y embebida para almacenar las tareas.
- **Sequelize**: ORM (Object-Relational Mapper) para interactuar con la base de datos de manera sencilla.
- **dotenv**: Para manejar variables de entorno de manera segura.
- **Cors**: Para permitir las solicitudes entre el frontend y backend.
