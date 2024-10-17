import React, { useState, useEffect } from 'react';

const AdminBoletas = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [boletas, setBoletas] = useState([]);
  const [editingBoleta, setEditingBoleta] = useState(null);

  // Simulación de si el usuario es administrador (esto debería venir de autenticación)
  const isAdmin = true; // En producción, esto debería depender de un token o un estado global

  useEffect(() => {
    const fetchBoletas = async () => {
      const response = await fetch('http://localhost:5001/api/boletas');
      const data = await response.json();
      setBoletas(data);
    };
    fetchBoletas();
  }, []);

  const handleAddBoleta = async () => {
    try {
      const newBoleta = { title, date, location, description };
      const response = await fetch('http://localhost:5001/api/boletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBoleta),
      });
      const data = await response.json();
      setBoletas([...boletas, data]);
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
    } catch (error) {
      console.error('Error agregando boleta:', error);
    }
  };

  const handleEditBoleta = async (id) => {
    try {
      const updatedBoleta = { title, date, location, description };
      const response = await fetch(`http://localhost:5001/api/boletas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBoleta),
      });
      const data = await response.json();
      setBoletas(boletas.map((boleta) => (boleta._id === id ? data : boleta)));
      setEditingBoleta(null);
    } catch (error) {
      console.error('Error editando boleta:', error);
    }
  };

  const handleDeleteBoleta = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/boletas/${id}`, {
        method: 'DELETE',
      });
      setBoletas(boletas.filter((boleta) => boleta._id !== id));
    } catch (error) {
      console.error('Error eliminando boleta:', error);
    }
  };

  return (
    <div className="admin-boletas-container p-6">
      <h2 className="text-xl font-bold mb-4">Administrar Boletas</h2>

      {isAdmin ? (
        <div>
          {/* Formulario para agregar o editar una boleta */}
          <div className="boleta-form space-y-4">
            <input
              className="w-full p-2 border rounded-lg"
              type="text"
              placeholder="Título del Evento"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-lg"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <input
              className="w-full p-2 border rounded-lg"
              type="text"
              placeholder="Ubicación"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Descripción del Evento"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={editingBoleta ? () => handleEditBoleta(editingBoleta._id) : handleAddBoleta}
            >
              {editingBoleta ? 'Guardar Cambios' : 'Agregar Boleta'}
            </button>
          </div>

          {/* Lista de boletas con opciones de editar y eliminar */}
          <div className="boletas-list mt-8">
            {boletas.map((boleta) => (
              <div key={boleta._id} className="boleta-item border p-4 mb-4 rounded-lg">
                <h3 className="font-bold">{boleta.title}</h3>
                <p>{new Date(boleta.date).toLocaleDateString()} - {boleta.location}</p>
                <p>{boleta.description}</p>
                <div className="actions mt-4">
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
                    onClick={() => {
                      setEditingBoleta(boleta);
                      setTitle(boleta.title);
                      setDate(boleta.date);
                      setLocation(boleta.location);
                      setDescription(boleta.description);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => handleDeleteBoleta(boleta._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No tienes permiso para acceder a esta sección.</p>
      )}
    </div>
  );
};

export default AdminBoletas;
