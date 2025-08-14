import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange, placeholder }) {
  const styles = {
    container: {
      position: 'relative',
      margin: '12px 0',
    },
    input: {
      padding: '10px 15px 10px 40px',
      border: '1px solid #ccc',
      borderRadius: '0.5cm',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      width: '100%',
      outline: 'none',
      fontSize: '16px',
      transition: 'all 0.3s ease',
    },
    icon: {
      position: 'absolute',
      top: '50%',
      left: '12px',
      transform: 'translateY(-50%)',
      color: '#666',
      pointerEvents: 'none',
      fontSize: '14px',
    },
  };

  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const fullText = placeholder || 'Search by name or address';
  const speed = 100; // typing speed in ms
  const delayBeforeRestart = 10000; // 10 seconds

  useEffect(() => {
    let index = 0;
    let typing = true;
    let timeoutId;

    const typeAnimation = () => {
      if (typing) {
        if (index < fullText.length) {
          setAnimatedPlaceholder(fullText.substring(0, index + 1));
          index++;
          timeoutId = setTimeout(typeAnimation, speed);
        } else {
          typing = false;
          timeoutId = setTimeout(typeAnimation, 1000); // pause before deleting
        }
      } else {
        if (index > 0) {
          setAnimatedPlaceholder(fullText.substring(0, index - 1));
          index--;
          timeoutId = setTimeout(typeAnimation, speed);
        } else {
          typing = true;
          timeoutId = setTimeout(typeAnimation, delayBeforeRestart); // 10s delay before typing again
        }
      }
    };

    timeoutId = setTimeout(typeAnimation, speed);
    return () => clearTimeout(timeoutId);
  }, [fullText]);

  return (
    <div style={styles.container}>
      <style>
        {`
          input:focus {
            border-color: #007bff;
            box-shadow: 0 4px 12px rgba(0,123,255,0.2);
          }
          input:hover {
            transform: scale(1.01);
          }
        `}
      </style>

      {/* Search Icon */}
      <FaSearch style={styles.icon} />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={animatedPlaceholder}
        style={styles.input}
      />
    </div>
  );
}
