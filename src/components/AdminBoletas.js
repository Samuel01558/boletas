import React, { useState } from 'react';

const AdminBoletas = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBoleta = () => {
    // Lógica para agregar una boleta
    console.log('Boleta agregada:', { title, date, location, description });
  };

  return (
    <div className="admin-boletas-container p-6">
      <h2 className="text-xl font-bold mb-4">Agregar Boleta</h2>
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
          onClick={handleAddBoleta}
        >
          Agregar Boleta
        </button>
      </div>
    </div>
  );
};

export default AdminBoletas;
