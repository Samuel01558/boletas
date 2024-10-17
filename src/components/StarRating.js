import React, { useState } from 'react';

const StarRating = ({ puntuacion, onPuntuacionChange }) => {
    const [hover, setHover] = useState(null);

    return (
        <div className="flex justify-center"> {/* Centrando las estrellas */}
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;

                return (
                    <label key={index} className="cursor-pointer">
                        <input
                            type="radio"
                            name="puntuacion"
                            value={ratingValue}
                            onClick={() => onPuntuacionChange(ratingValue)}
                            className="hidden"
                        />
                        <svg
                            className={`w-8 h-8 ${
                                ratingValue <= (hover || puntuacion)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        >
                            <path d="M9.049 2.927a.5.5 0 01.902 0l1.176 3.608a.5.5 0 00.474.34h3.865a.5.5 0 01.293.906l-3.124 2.27a.5.5 0 00-.18.564l1.176 3.608a.5.5 0 01-.77.558L10 12.347l-3.124 2.27a.5.5 0 01-.77-.558l1.176-3.608a.5.5 0 00-.18-.564L4.978 7.781a.5.5 0 01.293-.906h3.865a.5.5 0 00.474-.34L9.049 2.927z" />
                        </svg>
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
