require('dotenv').config();
const chai = require('chai');
const { expect } = chai;
const mongoose = require('mongoose');
const User = require('../models/User'); // Asegúrate de que la ruta sea correcta

before(async function () {
    this.timeout(10000);
    try {
        console.log('Connecting to MongoDB:', process.env.MONGO_URI); // Verifica que la URI no sea undefined
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
});

// Limpia la base de datos después de cada prueba
afterEach(async () => {
  await User.deleteMany({});
});

// Desconecta de la base de datos después de todas las pruebas
after(async function () {
  this.timeout(10000); // Aumenta el tiempo de espera a 10000 ms (10 segundos)
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
});

// Pruebas unitarias para el modelo de Usuario
describe('User Model', () => {
  it('debería crear un usuario correctamente', async () => {
    const userData = {
      nombre: 'Juan Blanco',
      email: 'juan.blanco@example.com',
      edad: 30,
      direcciones: [
        {
          calle: 'Av. Principal',
          ciudad: 'Lima',
          pais: 'Perú',
          codigo_postal: '15001',
        },
      ],
    };

    const user = new User(userData);
    const savedUser = await user.save();

    // Verifica que el usuario se haya guardado correctamente
    expect(savedUser._id).to.exist;
    expect(savedUser.nombre).to.equal(userData.nombre);
    expect(savedUser.email).to.equal(userData.email);
    expect(savedUser.edad).to.equal(userData.edad);
    expect(savedUser.direcciones).to.have.lengthOf(1);
    expect(savedUser.direcciones[0].ciudad).to.equal(userData.direcciones[0].ciudad);
  });

  it('no debería crear un usuario sin un email', async () => {
    const userData = {
      nombre: 'Juan Perez',
      edad: 30,
    };

    const user = new User(userData);

    let error;
    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    // Verifica que se lance un error de validación
    expect(error).to.exist;
    expect(error.errors.email).to.exist;
    expect(error.errors.email.message).to.equal('Path `email` is required.');
  });

  it('no debería permitir emails duplicados', async () => {
    const userData = {
      nombre: 'Juan Perez',
      email: 'juan.perez@example.com',
      edad: 30,
    };

    const user1 = new User(userData);
    await user1.save();

    const user2 = new User(userData);

    let error;
    try {
      await user2.save();
    } catch (err) {
      error = err;
    }

    // Verifica que se lance un error de duplicación
    expect(error).to.exist;
    expect(error.code).to.equal(11000); // Código de error de MongoDB para duplicados
  });
});