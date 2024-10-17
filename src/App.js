import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AdminBoletas from './components/AdminBoletas';
import UserBoletas from './components/UserBoletas';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [userRole, setUserRole] = useState('');

    const handleLogin = (username, password) => {
        fetch('http://localhost:5001/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login exitoso') {
                setIsLoggedIn(true); // Actualiza el estado de inicio de sesión
                setUserRole(data.role); // Guarda el rol del usuario
                alert('Bienvenido');
            } else {
                alert('Error en el inicio de sesión');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
    };

    const handleRegister = async (username, email, password) => {
        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
            }

            const data = await response.json();
            console.log(data); 

            // Aquí podrías redirigir a la página de inicio de sesión o mostrar un mensaje
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserRole('');
    };

    return (
        <div className="App min-h-screen bg-gray-100 p-6">
            {!isLoggedIn ? (
                <>
                    {isRegister ? (
                        <Register handleRegister={handleRegister} />
                    ) : (
                        <Login handleLogin={handleLogin} />
                    )}
                    <div className="text-center mt-4">
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-blue-500 hover:underline"
                        >
                            {isRegister ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-right">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                    {userRole === 'admin' ? (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-8">Panel de Administrador</h2>
                            <AdminBoletas />
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold text-center mb-8">Bienvenido al sistema de boletas</h2>
                            <Home />
                            <UserBoletas />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
