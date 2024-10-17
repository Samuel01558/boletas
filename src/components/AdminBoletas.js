import React, { useState, useEffect } from 'react';

const AdminBoletas = () => {
  const [eventos, setEventos] = useState([]);
  const [newEvento, setNewEvento] = useState({
    title: '',
    description: '',
    date: '',
    price: ''
  });
  const [editingId, setEditingId] = useState(null);  // Nuevo estado para manejar la edición

  useEffect(() => {
    fetch('http://localhost:5001/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(error => console.error('Error al obtener eventos:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewEvento({ ...newEvento, [e.target.name]: e.target.value });
  };

  const handleAddOrEditEvento = () => {
    if (editingId) {
      // Actualizar evento existente
      fetch(`http://localhost:5001/api/eventos/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvento)
      })
      .then(res => res.json())
      .then(data => {
        setEventos(eventos.map(evento => (evento._id === editingId ? data : evento)));
        setEditingId(null); // Limpiar el estado de edición
        setNewEvento({ title: '', description: '', date: '', price: '' });
      })
      .catch(error => console.error('Error al actualizar evento:', error));
    } else {
      // Agregar nuevo evento
      fetch('http://localhost:5001/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvento)
      })
      .then(res => res.json())
      .then(data => {
        setEventos([...eventos, data]);
        setNewEvento({ title: '', description: '', date: '', price: '' });
      })
      .catch(error => console.error('Error al agregar evento:', error));
    }
  };

  const handleDeleteEvento = (id) => {
    fetch(`http://localhost:5001/api/eventos/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setEventos(eventos.filter(evento => evento._id !== id));
    })
    .catch(error => console.error('Error al eliminar evento:', error));
  };

  const handleEditEvento = (evento) => {
    // Rellena el formulario con los valores del evento que se va a editar
    setNewEvento({
      title: evento.title,
      description: evento.description,
      date: evento.date.split('T')[0], // Formato para campo <input type="date">
      price: evento.price
    });
    setEditingId(evento._id);  // Establece el ID del evento que se está editando
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* <h2 className="text-2xl font-bold text-center mb-6">Panel de Administrador</h2> */}

      <h3 className="text-lg font-semibold mb-4">Agregar/Editar evento</h3>
      <form className="grid grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newEvento.title}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newEvento.description}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={newEvento.date}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newEvento.price}
          onChange={handleInputChange}
          className="p-2 border rounded"
        />
        <button
          type="button"
          onClick={handleAddOrEditEvento}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? 'Editar Evento' : 'Agregar Evento'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-4">Lista de eventos</h3>
      <table className="min-w-full bg-white border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Título</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventos.map(evento => (
            <tr key={evento._id} className="text-center">
              <td className="border p-2">{evento.title}</td>
              <td className="border p-2">{evento.description}</td>
              <td className="border p-2">{new Date(evento.date).toLocaleDateString()}</td>
              <td className="border p-2">${evento.price}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEditEvento(evento)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteEvento(evento._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBoletas;
