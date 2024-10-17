import React, { useState } from 'react';
import StarRating from './StarRating';

const BoletaDetails = ({ boleta, onClose }) => {
    const [comentario, setComentario] = useState('');
    const [puntuacion, setPuntuacion] = useState(0);

    const handleComentarioChange = (e) => {
        setComentario(e.target.value);
    };

    const handlePuntuacionChange = (rating) => {
        setPuntuacion(rating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí enviarías el comentario y puntuación al backend
        console.log('Comentario:', comentario);
        console.log('Puntuación:', puntuacion);
        // Resetea el formulario
        setComentario('');
        setPuntuacion(0);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                {/* Botón para cerrar la ventana modal */}
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    &#10005;
                </button>

                <h2 className="text-2xl font-bold mb-4">{boleta.title}</h2>
                <p className="mb-2"><strong>Fecha:</strong> {new Date(boleta.date).toLocaleDateString()}</p>
                <p className="mb-2"><strong>Ubicación:</strong> {boleta.location}</p>
                <p className="mb-4"><strong>Descripción:</strong> {boleta.description}</p>
                <p className="mb-4"><strong>Precio:</strong> ${boleta.price}</p>

                <h3 className="text-xl font-semibold mb-2">Deja un comentario</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="comentario" className="block text-sm font-medium">Comentario:</label>
                        <textarea
                            id="comentario"
                            value={comentario}
                            onChange={handleComentarioChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            rows="3"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="puntuacion" className="block text-sm font-medium">Puntuación:</label>
                        <StarRating puntuacion={puntuacion} onPuntuacionChange={handlePuntuacionChange} />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Enviar
                    </button>
                </form>

                <h3 className="text-xl font-semibold mt-6">Comentarios</h3>
                {boleta.comentarios && boleta.comentarios.length > 0 ? (
                    <div className="space-y-2 mt-4">
                        {boleta.comentarios.map((comentario, index) => (
                            <div key={index} className="p-3 bg-gray-100 rounded-md">
                                <p><strong>{comentario.username}</strong>: {comentario.comentario}</p>
                                <p>Puntuación: {comentario.puntuacion}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4">No hay comentarios aún.</p>
                )}
            </div>
        </div>
    );
};

export default BoletaDetails;
