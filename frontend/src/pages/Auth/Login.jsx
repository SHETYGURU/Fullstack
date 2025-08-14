

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import * as authApi from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validators';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErr('Invalid email');
      return;
    }
    try {
      const res = await authApi.login({ email, password });
      const { user, token } = res.data;
      login(user, token);

      setLoadingOverlay(true);
      setTimeout(() => {
        const dest =
          loc.state?.from?.pathname ||
          (user.role === 'admin'
            ? '/admin'
            : user.role === 'store_owner'
            ? '/owner'
            : '/stores');
        nav(dest, { replace: true });
      }, 3000);
    } catch (err) {
      setErr(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
     <style>{`
        body {
          margin: 0;
          padding: 0;
        }
        .login-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-image: url('/assets/login.png');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .login-overlay {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.0);
        }
        .login-box {
          position: relative;
          z-index: 2;
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          max-width: 400px;
          width: 90%;
          text-align: center;
        }
        .login-box form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left; /* aligns labels and inputs to the left */
        }
        .login-box label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .login-box input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 12px;
          font-size: 1rem;
          width: 100%;
        }
        .login-btn {
          padding: 10px 20px;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          align-self: center;
        }
        .login-btn:hover {
          background-color: black;
        }
        .error-text {
          color: red;
          font-size: 0.9rem;
        }
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }
        .loading-overlay img {
          width: 150px;
          height: auto;
        }
        @media (max-width: 500px) {
          .login-box {
            padding: 20px;
          }
        }
      `}</style>

      {loadingOverlay && (
        <div className="loading-overlay">
          <img src="/assets/shopping-cart.gif" alt="Loading..." />
        </div>
      )}

      <div className="login-page">
        <div className="login-overlay"></div>
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={submit}>
            <div>
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {err && <div className="error-text">{err}</div>}
            <button type="submit" className="login-btn">Login</button>
            <div className="mt-3 text-sm text-right">
              <Link to="/reset-password" className="underline">Forgot password?</Link>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
