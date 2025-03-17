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
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un usuario por ID
router.put('/usuarios/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un usuario por ID
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});



module.exports = router;