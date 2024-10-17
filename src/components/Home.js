import React, { useState, useEffect } from 'react';
import BoletaDetails from './BoletaDetails';

const Home = () => {
    const [boletas, setBoletas] = useState([]);
    const [selectedBoleta, setSelectedBoleta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoletas = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/boletas');
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);

                const contentType = response.headers.get('content-type');
                console.log('Content-Type:', contentType);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.log('Response text:', text);
                    throw new TypeError("Oops, we haven't got JSON!");
                }

                const data = await response.json();
                setBoletas(data);
            } catch (error) {
                console.error('Error fetching boletas:', error);
                setError(`Failed to fetch boletas: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBoletas();
    }, []);

    if (loading) return <div className="text-center mt-4 text-blue-600">Loading boletas...</div>;
    if (error) return <div className="text-center mt-4 text-red-500">Error: {error}</div>;

    // Función para cerrar el modal
    const handleCloseBoletaDetails = () => {
        setSelectedBoleta(null); // Cierra el modal
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Boletas Disponibles</h1>
            {boletas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boletas.map((boleta) => (
                        <div
                            key={boleta._id}
                            onClick={() => setSelectedBoleta(boleta)}
                            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <h2 className="text-2xl font-semibold mb-2">{boleta.title}</h2>
                            <p className="text-gray-600">
                                {new Date(boleta.date).toLocaleDateString()} - {boleta.location}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No hay boletas disponibles.</p>
            )}
            {selectedBoleta && (
                <BoletaDetails 
                    boleta={selectedBoleta} 
                    onClose={handleCloseBoletaDetails} // Aquí se pasa onClose
                />
            )}
        </div>
    );
};

export default Home;
