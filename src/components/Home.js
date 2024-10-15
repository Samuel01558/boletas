import React from 'react';

const Home = () => {
  return (
    <div className="home-container p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Eventos Disponibles</h1>
      <div className="event-list space-y-6">
        <div className="event-item bg-white p-6 rounded-lg shadow-md">
          <h2 className="event-title text-2xl font-semibold">Concierto de Rock</h2>
          <p className="text-gray-600">Fecha: 2024-10-25 - Ubicación: Ciudad XYZ</p>
          <p className="mt-2">Una noche increíble con las mejores bandas de rock.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
