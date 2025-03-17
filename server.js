const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
dotenv.config();

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Prueba Backend',
      version: '1.0.0',
      description: 'Documentación de la API para la prueba técnica de backend',
      contact: {
        name: 'Tu Nombre',
        email: 'tu@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto según tu entorno
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos donde están tus rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Documentación de la API en http://localhost:${port}/api-docs`); // Usa "port" en lugar de "PORT"
});