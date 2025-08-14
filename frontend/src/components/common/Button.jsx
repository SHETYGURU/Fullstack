import React from 'react';

export default function Button({ children, ...props }) {
  const styles = {
    padding: '10px 18px',
    margin: '8px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#f0f0f0',
    color: '#000',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  };

  const hoverStyles = {
    backgroundColor: '#000',
    color: '#fff',
    transform: 'scale(1.05)',
  };

  const [hover, setHover] = React.useState(false);

  return (
    <button
      {...props}
      style={{
        ...styles,
        ...(hover ? hoverStyles : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </button>
  );
}
