const mongoose = require('mongoose');
const Usuario = require('../model/Usuario'); 


const uri = "mongodb://localhost:27017/eventosDB";


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


async function connectDB() {
    try {
        await mongoose.connect(uri, options);
        console.log("Conectado exitosamente a MongoDB usando Mongoose");

        
        const existingUser = await Usuario.findOne({ username: 'usuarioPrueba' });
        if (!existingUser) {
            
            const nuevoUsuario = new Usuario({
                username: 'usuarioPrueba',
                email: 'usuarioPrueba@example.com',
                password: 'contraseñaSegura'
            });

            
            await nuevoUsuario.save();
            console.log('Usuario guardado:', nuevoUsuario);
        } else {
            console.log('El usuario ya existe, no se insertó uno nuevo');
        }

        
        const usuarios = await Usuario.find();
        console.log('Usuarios en la base de datos:', usuarios);

    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
    }
}


connectDB();


process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar la conexión:', error);
        process.exit(1);
    }
});
module.exports = connectDB;