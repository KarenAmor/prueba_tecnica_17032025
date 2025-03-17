const express = require('express');
const User = require('../models/User');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         edad:
 *           type: number
 *           description: Edad del usuario
 *         direcciones:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Direccion'
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del usuario
 *     Direccion:
 *       type: object
 *       properties:
 *         calle:
 *           type: string
 *           description: Calle de la dirección
 *         ciudad:
 *           type: string
 *           description: Ciudad de la dirección
 *         pais:
 *           type: string
 *           description: País de la dirección
 *         codigo_postal:
 *           type: string
 *           description: Código postal de la dirección
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/usuarios', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtiene la lista de usuarios
 *     description: Retorna una lista de todos los usuarios registrados.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de usuarios por página
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al obtener los usuarios
 */
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

/**
 * @swagger
 * /usuarios/buscar:
 *   get:
 *     summary: Busca usuarios por ciudad
 *     description: Retorna una lista de usuarios que tienen una dirección en la ciudad especificada.
 *     parameters:
 *       - in: query
 *         name: ciudad
 *         schema:
 *           type: string
 *         required: true
 *         description: Ciudad para buscar usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al buscar usuarios
 */
router.get('/usuarios/buscar', async (req, res) => {
  try {
    const ciudad = req.query.ciudad;
    const users = await User.find({ 'direcciones.ciudad': ciudad });
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     description: Retorna un usuario específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al buscar el usuario
 */
router.get('/usuarios/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Error al buscar el usuario', error: error.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     description: Actualiza un usuario específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error al actualizar el usuario
 */
router.put('/usuarios/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Agrega un mensaje a la respuesta
    const response = {
      ...user.toObject(), 
      mensaje: 'Usuario modificado correctamente', 
    };

    res.send(response);
  } catch (error) {
    res.status(400).send({ message: 'Error al actualizar el usuario', error: error.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     description: Elimina un usuario específico basado en su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 */
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Devuelve un mensaje de éxito junto con el usuario eliminado
    res.send({
      message: 'Usuario eliminado correctamente',
      usuario: user, 
    });
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el usuario', error: error.message });
  }
});

module.exports = router;