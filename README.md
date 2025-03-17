# Prueba Backend - Node.js y MongoDB

Este proyecto es una aplicación backend desarrollada en Node.js con Express y MongoDB. Proporciona una API RESTful para gestionar usuarios, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y búsquedas específicas.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MongoDB](https://www.mongodb.com/) (local o una instancia en la nube como MongoDB Atlas)
- [Git](https://git-scm.com/) (opcional, para clonar el repositorio)
- [Swagger]: Para la documentación interactiva de la API.

## Configuración del Proyecto

1. **Clona el repositorio** (si no lo has hecho ya):

   ```bash
   git clone https://github.com/KarenAmor/prueba_tecnica_17032025.git
   cd prueba-backend
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**:

   Crea un archivo `.env` en la raíz del proyecto y agrega la siguiente configuración:

   ```env
   MONGO_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/prueba_backend
   PORT=3000
   ```

   - `MONGO_URI`: La cadena de conexión a tu base de datos MongoDB.
   - `PORT`: El puerto en el que se ejecutará el servidor (por defecto es 3000).

4. **Inicia el servidor**:

   ```bash
   npm start
   ```

   El servidor estará disponible en las siguientes direcciones:
   ### Localmente 
   `http://localhost:3000`, y a documentación en `http://localhost:3000/api-docs`

   ### En Render
   `https://prueba-tecnica-17032025.onrender.com`, y la documentacion en `https://prueba-tecnica-17032025.onrender.com/api-docs/`

## Estructura del Proyecto

- **`/models`**: Contiene los modelos de Mongoose (por ejemplo, `User.js`).
- **`/routes`**: Contiene las rutas de la API (por ejemplo, `userRoutes.js`).
- **`/test`**: Contiene las pruebas unitarias (por ejemplo, `user.test.js`).
- **`server.js`**: Punto de entrada de la aplicación, configura el servidor Express.

## Dependencias

El proyecto utiliza las siguientes dependencias principales:

- **Express**: Framework para construir la API RESTful.
- **Mongoose**: Librería para interactuar con MongoDB.
- **Dotenv**: Para manejar variables de entorno.
- **Mocha**: Framework para ejecutar pruebas.
- **Chai**: Librería de aserciones para pruebas.

Puedes ver todas las dependencias en el archivo `package.json`.

## Endpoints de la API

### Usuarios

- **POST /usuarios**: Crea un nuevo usuario.
  - **Body**:
    ```json
    {
      "nombre": "Juan Perez",
      "email": "juan.perez@example.com",
      "edad": 30,
      "direccion": {
        "calle": "Av. Principal",
        "ciudad": "Lima",
        "pais": "Perú",
        "codigo_postal": "15001"
      }
    }
    ```

- **GET /usuarios**: Obtiene la lista de todos los usuarios.
- **GET /usuarios/:id**: Obtiene un usuario por su ID.
- **PUT /usuarios/:id**: Actualiza un usuario por su ID.
- **DELETE /usuarios/:id**: Elimina un usuario por su ID.
- **GET /usuarios/buscar?ciudad={ciudad}**: Busca usuarios por ciudad.

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias, usa el siguiente comando:

```bash
npm test
```

Las pruebas verifican que el modelo de Usuario funcione correctamente, incluyendo la creación, validación y manejo de errores.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.