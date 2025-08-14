import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const doLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FaShoppingBag size={22} color="#333" />
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#333',
            fontWeight: 'bold',
            fontSize: '18px',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#ff6600')}
          onMouseLeave={(e) => (e.target.style.color = '#333')}
        >
          BakeCart
        </Link>
      </div>

      {/* Right: Profile + Auth buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!user && (
          <>
            <Link to="/login" style={iconButtonStyle}>
              <FaSignInAlt /> Login
            </Link>
            <Link to="/signup" style={iconButtonStyle}>
              <FaUserPlus /> Signup
            </Link>
          </>
        )}

        {user && (
          <>
            {/* Profile link visible only for admin */}
            {user.role === 'admin' && (
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  fontSize: '15px',
                  color: '#333',
                  textDecoration: 'none',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              >
                <FaUserCircle /> {user.name || user.userName || 'Profile'}
              </Link>
            )}

            {/* Logout button */}
            <button
              onClick={doLogout}
              style={{
                ...iconButtonStyle,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <FaSignOutAlt /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

// Styles
const iconButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  textDecoration: 'none',
  color: '#333',
  fontSize: '15px',
  padding: '6px 10px',
  borderRadius: '4px',
  transition: 'all 0.3s ease',
  backgroundColor: 'transparent',
};
