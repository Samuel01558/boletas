import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
    const [boletas, setBoletas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newBoleta, setNewBoleta] = useState({
        title: '',
        date: '',
        location: '',
        description: '',
        price: 0,
    });
    const [editingBoletaId, setEditingBoletaId] = useState(null);

    useEffect(() => {
        fetchBoletas();
    }, []);

    const fetchBoletas = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/boletas');
            if (!response.ok) {
                throw new Error('Error fetching boletas');
            }
            const data = await response.json();
            setBoletas(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBoleta({ ...newBoleta, [name]: value });
    };

    const handleAddBoleta = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/boletas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBoleta),
            });

            if (!response.ok) {
                throw new Error('Error adding boleta');
            }
            setNewBoleta({ title: '', date: '', location: '', description: '', price: 0 }); // Reset form
            fetchBoletas(); // Actualiza la lista de boletas después de agregar
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteBoleta = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/boletas/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting boleta');
            }
            fetchBoletas(); // Actualiza la lista de boletas después de eliminar
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditBoleta = async (id) => {
        if (editingBoletaId) {
            // Editar una boleta existente
            try {
                const response = await fetch(`http://localhost:5001/api/boletas/${editingBoletaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBoleta),
                });

                if (!response.ok) {
                    throw new Error('Error editing boleta');
                }
                setEditingBoletaId(null); // Reset editing state
                setNewBoleta({ title: '', date: '', location: '', description: '', price: 0 }); // Reset form
                fetchBoletas(); // Actualiza la lista de boletas después de editar
            } catch (error) {
                setError(error.message);
            }
        } else {
            // Cargar la boleta en el formulario
            const boleta = boletas.find(b => b._id === id);
            setNewBoleta(boleta);
            setEditingBoletaId(id);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
            <h2 className="text-2xl font-bold mb-4">Agregar / Editar Boleta</h2>
            <div className="mb-6">
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={newBoleta.title}
                    onChange={handleInputChange}
                    className="border p-2 mr-4"
                />
                <input
                    type="date"
                    name="date"
                    value={newBoleta.date}
                    onChange={handleInputChange}
                    className="border p-2 mr-4"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Ubicación"
                    value={newBoleta.location}
                    onChange={handleInputChange}
                    className="border p-2 mr-4"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    value={newBoleta.description}
                    onChange={handleInputChange}
                    className="border p-2 mr-4"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={newBoleta.price}
                    onChange={handleInputChange}
                    className="border p-2 mr-4"
                />
                <button onClick={editingBoletaId ? handleAddBoleta : handleEditBoleta} className="bg-green-500 text-white p-2 rounded">
                    {editingBoletaId ? 'Actualizar Boleta' : 'Agregar Boleta'}
                </button>
            </div>

            <h2 className="text-2xl font-bold mb-4">Boletas Existentes</h2>
            <ul>
                {boletas.map((boleta) => (
                    <li key={boleta._id} className="mb-4">
                        <h3 className="text-xl font-semibold">{boleta.title}</h3>
                        <p>Fecha: {new Date(boleta.date).toLocaleDateString()}</p>
                        <p>Ubicación: {boleta.location}</p>
                        <p>Descripción: {boleta.description}</p>
                        <p>Precio: ${boleta.price}</p>
                        <button
                            onClick={() => handleDeleteBoleta(boleta._id)}
                            className="bg-red-500 text-white p-2 rounded mr-4"
                        >
                            Eliminar
                        </button>
                        <button
                            onClick={() => handleEditBoleta(boleta._id)}
                            className="bg-blue-500 text-white p-2 rounded"
                        >
                            Editar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
