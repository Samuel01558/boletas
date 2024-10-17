// scripts/addAdmin.js
const mongoose = require('mongoose');
const User = require('../model/User');

const MONGODB_URI = 'mongodb://localhost:27017/eventosDB'; // Cambia esto según tu configuración

const addAdmin = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        const adminUser = {
            username: 'sam',
            password: '1234', 
            isAdmin: true,
        };

        const existingUser = await User.findOne({ username: adminUser.username });

        if (existingUser) {
            console.log('El usuario administrador ya existe.');
            return;
        }

        const newUser = new User(adminUser);
        await newUser.save();
        console.log('Usuario administrador agregado con éxito.');
    } catch (error) {
        console.error('Error al agregar el usuario administrador:', error);
    } finally {
        mongoose.connection.close();
    }
};

addAdmin();
