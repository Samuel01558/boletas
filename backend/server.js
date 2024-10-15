const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Asegúrate de tener el paquete dotenv instalado

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const uri = process.env.MONGODB_URI; // Usa una variable de entorno para la URI de MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let events = [
  { id: 1, title: "Evento 1", date: "2024-10-25", location: "Ubicación 1", description: "Descripción del evento 1" },
  // Agregar más eventos aquí
];

let users = [];

// Conectar a la base de datos
async function run() {
  try {
    await client.connect();
    console.log("Conectado a MongoDB");
    
    const database = client.db('eventos'); // Cambia esto por el nombre de tu base de datos
    const usersCollection = database.collection('jas'); // Cambia esto por el nombre de tu colección

    // Ruta para obtener eventos
    app.get('/api/events', (req, res) => {
      res.json(events);
    });

    // Ruta para registrar un usuario
    app.post('/api/register', async (req, res) => {
      const { username, password } = req.body;
      const userExists = await usersCollection.findOne({ username });

      if (userExists) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
      }

      await usersCollection.insertOne({ username, password });
      res.json({ message: 'Registro exitoso' });
    });

    // Ruta para iniciar sesión
    app.post('/api/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await usersCollection.findOne({ username, password });

      if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas' });
      }

      res.json({ message: 'Inicio de sesión exitoso' });
    });
    
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }

  app.post('/api/boletas/:id/comentarios', (req, res) => {
    const { id } = req.params;
    const { username, comentario, puntuacion } = req.body;

    Boleta.findById(id)
        .then(boleta => {
            if (!boleta) {
                return res.status(404).json({ message: 'Boleta no encontrada' });
            }

            boleta.comentarios.push({ username, comentario, puntuacion });
            return boleta.save();
        })
        .then(updatedBoleta => {
            res.json(updatedBoleta);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error al agregar comentario' });
        });
});
}

run().catch(console.error);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
