import React, { useState } from 'react';
import { submitRating } from '../../api/ratingApi';

export default function RatingStars({ storeId, initial = 0, readonly = false, onRatingChange }) {
  const [value, setValue] = useState(initial);
  const [err, setErr] = useState('');

  const submit = async (v) => {
    if (readonly) return;

    try {
      await submitRating({ storeId, rating: v }); // backend handles create/update
      setValue(v);
      setErr('');
      if (onRatingChange) onRatingChange(); // refresh store list
    } catch (e) {
      console.error('Submit rating failed:', e);
      setErr('Failed to submit rating');
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          onClick={() => submit(n)}
          style={{
            background: 'none',
            border: 'none',
            cursor: readonly ? 'default' : 'pointer',
            fontSize: 20,
            color: n <= value ? 'gold' : 'gray',
          }}
          disabled={readonly}
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
        >
          {n <= value ? '★' : '☆'}
        </button>
      ))}
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </div>
  );
}
