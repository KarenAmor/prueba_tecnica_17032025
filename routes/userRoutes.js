const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Crear un usuario
router.post('/usuarios', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/usuarios', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    try {
      const users = await User.find().skip(skip).limit(limit);
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Buscar usuarios por ciudad
router.get('/usuarios/buscar', async (req, res) => {
    try {
      const ciudad = req.query.ciudad;
      const users = await User.find({ 'direcciones.ciudad': ciudad });
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Obtener un usuario por ID
router.get('/usuarios/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' }); // Mensaje personalizado
      }
      res.send(user);
    } catch (error) {
      res.status(500).send({ message: 'Error al buscar el usuario', error: error.message }); // Mensaje de error detallado
    }
  });

// Actualizar un usuario por ID
router.put('/usuarios/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
  
      // Agrega un mensaje a la respuesta
      const response = {
        ...user.toObject(), // Convierte el documento de Mongoose a un objeto plano
        mensaje: 'Usuario modificado correctamente', // Mensaje adicional
      };
  
      res.send(response);
    } catch (error) {
      res.status(400).send({ message: 'Error al actualizar el usuario', error: error.message });
    }
  });

// Eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
      }
  
      // Devuelve un mensaje de éxito junto con el usuario eliminado
      res.send({
        message: 'Usuario eliminado correctamente',
        usuario: user, // Opcional: incluir el usuario eliminado en la respuesta
      });
    } catch (error) {
      res.status(500).send({ message: 'Error al eliminar el usuario', error: error.message });
    }
  });



module.exports = router;