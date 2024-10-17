import React, { useState, useEffect } from 'react';

const AdminBoletas = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [boletas, setBoletas] = useState([]);
  const [editingBoleta, setEditingBoleta] = useState(null);
  
  // Estados para el inicio de sesión
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchBoletas();
    }
  }, [isAdmin]);

  const fetchBoletas = async () => {
    const response = await fetch('http://localhost:5001/api/boletas');
    const data = await response.json();
    setBoletas(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingBoleta ? 'PUT' : 'POST';
    const url = editingBoleta ? `http://localhost:5001/api/boletas/${editingBoleta}` : 'http://localhost:5001/api/boletas';
    
    const newBoleta = { title, date, location, description };

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBoleta),
    });

    if (response.ok) {
      fetchBoletas();
      resetForm();
    }
  };

  const resetForm = () => {
    setTitle('');
    setDate('');
    setLocation('');
    setDescription('');
    setEditingBoleta(null);
  };

  const handleEdit = (boleta) => {
    setTitle(boleta.title);
    setDate(boleta.date);
    setLocation(boleta.location);
    setDescription(boleta.description);
    setEditingBoleta(boleta._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/api/boletas/${id}`, { method: 'DELETE' });
    fetchBoletas();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Validar las credenciales
    if (username === 'admin' && password === 'tuContraseñaSegura') {
      setIsAdmin(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  if (!isAdmin) {
    return (
      <div>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Administrar Boletas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ubicación" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" required></textarea>
        <button type="submit">{editingBoleta ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <ul>
        {boletas.map((boleta) => (
          <li key={boleta._id}>
            {boleta.title} - {boleta.date} - {boleta.location}
            <button onClick={() => handleEdit(boleta)}>Editar</button>
            <button onClick={() => handleDelete(boleta._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBoletas;
