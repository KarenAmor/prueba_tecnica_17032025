const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  calle: String,
  ciudad: String,
  pais: String,
  codigo_postal: String,
});

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: Number,
  fecha_creacion: { type: Date, default: Date.now },
  direcciones: [addressSchema],
});

module.exports = mongoose.model('User', userSchema);