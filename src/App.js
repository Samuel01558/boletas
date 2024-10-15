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
    
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setUserRole('admin');
    } else if (username === 'user' && password === 'user123') {
      setIsLoggedIn(true);
      setUserRole('user');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleRegister = (username, email, password) => {
    alert(`Usuario ${username} registrado con éxito`);
    setIsRegister(false); 
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
