import React, { useState, useEffect } from 'react';

const AdminBoletas = () => {
    const [eventos, setEventos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [idEventoEdit, setIdEventoEdit] = useState(null); // Para editar un evento

    useEffect(() => {
        // Cargar eventos al montar el componente
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/eventos');
            const data = await response.json();
            setEventos(data);
        } catch (error) {
            console.error('Error al cargar eventos:', error);
        }
    };

    const agregarEvento = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/eventos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, fecha }),
            });

            if (!response.ok) {
                throw new Error('Error al agregar el evento');
            }

            setNombre('');
            setFecha('');
            fetchEventos(); // Recargar eventos después de agregar uno
        } catch (error) {
            console.error('Error al agregar evento:', error);
        }
    };

    const editarEvento = (evento) => {
        setIdEventoEdit(evento._id); // Guardar el ID del evento que se está editando
        setNombre(evento.nombre);
        setFecha(evento.fecha);
    };

    const actualizarEvento = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5001/api/eventos/${idEventoEdit}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, fecha }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el evento');
            }

            setIdEventoEdit(null);
            setNombre('');
            setFecha('');
            fetchEventos(); // Recargar eventos después de actualizar uno
        } catch (error) {
            console.error('Error al actualizar evento:', error);
        }
    };

    const eliminarEvento = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
            try {
                const response = await fetch(`http://localhost:5001/api/eventos/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el evento');
                }

                fetchEventos(); // Recargar eventos después de eliminar uno
            } catch (error) {
                console.error('Error al eliminar evento:', error);
            }
        }
    };

    return (
        <div>
            <h3 className="text-xl mb-4">Gestión de Eventos</h3>
            <form onSubmit={idEventoEdit ? actualizarEvento : agregarEvento} className="mb-4">
                <input
                    type="text"
                    placeholder="Nombre del evento"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="border p-2 rounded mr-2"
                />
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                    className="border p-2 rounded mr-2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    {idEventoEdit ? 'Actualizar Evento' : 'Agregar Evento'}
                </button>
            </form>
            <ul>
                {eventos.map((evento) => (
                    <li key={evento._id} className="flex justify-between items-center mb-2">
                        <span>{evento.nombre} - {new Date(evento.fecha).toLocaleDateString()}</span>
                        <div>
                            <button onClick={() => editarEvento(evento)} className="bg-yellow-500 text-white px-2 py-1 rounded-lg mr-2">
                                Editar
                            </button>
                            <button onClick={() => eliminarEvento(evento._id)} className="bg-red-500 text-white px-2 py-1 rounded-lg">
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBoletas;
