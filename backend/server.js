const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./database/initDB');
const loginRoutes = require('./api/login');
const registerRoutes = require('./api/register.js');
const boletasRoutes = require('./api/boletas');
const Evento = require('./model/Evento');
const User = require('./model/User');  

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());


connectDB()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database:', err));


app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/boletas', boletasRoutes);


app.get('/api/eventos', async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.json(eventos);
    } catch (error) {
        console.error('Error fetching eventos:', error);
        res.status(500).json({ message: 'Error fetching eventos', error: error.message });
    }
});


app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const existingUser = await User.findOne({ username });  // Cambié Usuario a User
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const newUser = new User({ username, email, password });  // Cambié Usuario a User
        await newUser.save();
        res.status(201).json({ message: 'Registro exitoso' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
});





const createAdminUser = async () => {
    const adminExists = await User.findOne({ isAdmin: true });
    if (adminExists) {
        console.log('Admin user already exists');
        return;
    }

    try {
        const adminUser = new User({
            username: 'admin',
            password: 'adminpassword',  // Asegúrate de cambiar esto luego
            isAdmin: true,
        });
        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

createAdminUser();


// Serve static files from the React app only in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
} else {
    app.get('*', (req, res) => {
        res.status(404).json({ message: 'API route not found' });
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});