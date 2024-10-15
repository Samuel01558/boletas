import React, { useState } from 'react';

const UserBoletas = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleComment = () => {
    // Lógica para enviar comentario y puntuación
    console.log('Comentario enviado:', { rating, comment });
  };

  return (
    <div className="user-boletas-container p-6 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Dejar un Comentario</h2>
      <div className="rating-stars space-x-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="comment-input mt-4 w-full p-2 border rounded-lg"
        placeholder="Escribe tu comentario..."
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleComment}
      >
        Enviar Comentario
      </button>
    </div>
  );
};

export default UserBoletas;
