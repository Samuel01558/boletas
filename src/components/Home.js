function BoletaDetails({ boleta }) {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(1);

    const handleAddComment = () => {
        fetch(`/api/boletas/${boleta._id}/comentarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'UsuarioDemo', comentario: newComment, puntuacion: rating })
        })
        .then(response => response.json())
        .then(updatedBoleta => {
            // Actualizar la UI con la boleta actualizada
        });
    };

    return (
        <div>
            <h3>{boleta.title}</h3>
            <p>{boleta.date} - {boleta.location}</p>
            <p>{boleta.description}</p>

            <div>
                <h4>Comentarios</h4>
                {boleta.comentarios.map((comentario, index) => (
                    <div key={index}>
                        <p><strong>{comentario.username}</strong>: {comentario.comentario} - {comentario.puntuacion}/5</p>
                    </div>
                ))}

                <div>
                    <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Escribe tu comentario"></textarea>
                    <select value={rating} onChange={e => setRating(e.target.value)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button onClick={handleAddComment}>Agregar Comentario</button>
                </div>
            </div>
        </div>
    );
}
