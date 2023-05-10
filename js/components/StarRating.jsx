import React, { useState, useEffect } from 'react';
import ReactStars from 'react-stars';

export default function StartRaiting({ setRating, resetRating }) {
  const [rating, setInternalRating] = useState(0);
  const [reset, setReset] = useState(false);

  const handleRatingChange = (newRating) => {
    setInternalRating(newRating);
    setRating(newRating);
  };

  useEffect(() => {
    if (resetRating) {
      setInternalRating(0);
      setReset(true);
    }
  }, [resetRating]);

  return (
    <div>
      <label htmlFor="message" className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">
        Your rating
      </label>
      <ReactStars
        count={5}
        size={24}
        color2={'#ffd700'}
        value={rating}
        half={false}
        onChange={handleRatingChange}
      />
    </div>
  );
}