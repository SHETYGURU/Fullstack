import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authApi from '../../api/authApi';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateAddress
} from '../../utils/validators';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [err, setErr] = useState('');
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const nav = useNavigate();

  const onChange = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();
    if (!validateName(form.name)) { setErr('Name must be 20-60 characters'); return; }
    if (!validateEmail(form.email)) { setErr('Invalid email'); return; }
    if (!validateAddress(form.address)) { setErr('Address too long'); return; }
    if (!validatePassword(form.password)) { setErr('Password must be 8-16 chars, include uppercase & special char'); return; }
    try {
      await authApi.signup(form);
      setLoadingOverlay(true);
      setTimeout(() => nav('/login'), 2500);
    } catch (err) {
      setErr(err?.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <style>{`
        body { margin:0; padding:0; }
        .signup-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-image: url('/assets/login.png');
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .signup-overlay {
          position: absolute;
          top: 0; left: 0;
          height: 100%; width: 100%;
          background-color: rgba(0,0,0,0.0);
        }
        .signup-box {
          position: relative;
          z-index: 2;
          background: white;
          padding: 22px;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          max-width: 375px; /* reduced by ~25% from 500px */
          width: 75%; /* reduced width */
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .signup-box h2 { text-align:center; margin-bottom:15px; font-size:1.3rem; }
        .signup-box form { display: flex; flex-direction: column; gap:12px; }
        .form-group { display:flex; flex-direction:column; align-items:flex-start; }
        .form-group label { margin-bottom:3px; font-weight:bold; font-size:0.9rem; }
        .signup-box input, .signup-box textarea {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 12px;
          font-size: 0.9rem;
          width:100%;
          resize:none;
        }
        .signup-btn {
          padding: 8px 18px;
          background-color:#333;
          color:white;
          border:none;
          border-radius:12px;
          cursor:pointer;
          font-size:0.95rem;
          transition: background-color 0.3s ease;
          align-self:center;
        }
        .signup-btn:hover { background-color:black; }
        .error-text { color:red; font-size:0.85rem; text-align:center; }
        .loading-overlay {
          position: fixed;
          top:0; left:0;
          height:100%; width:100%;
          background-color: rgba(0,0,0,0.7);
          display:flex;
          justify-content:center;
          align-items:center;
          z-index:999;
        }
        .loading-overlay img { width:120px; height:auto; }
        @media(max-width:500px){
          .signup-box { padding:18px; width:85%; max-width:300px; }
          .signup-box h2 { font-size:1.1rem; }
        }
      `}</style>

      {loadingOverlay && (
        <div className="loading-overlay">
          <img src="/assets/shopping-cart.gif" alt="Loading..." />
        </div>
      )}

      <div className="signup-page">
        <div className="signup-overlay"></div>
        <div className="signup-box">
          <h2>Sign up</h2>
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={(e) => onChange('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={form.email} onChange={(e) => onChange('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea value={form.address} onChange={(e) => onChange('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={form.password} onChange={(e) => onChange('password', e.target.value)} required />
            </div>
            {err && <div className="error-text">{err}</div>}
            <button type="submit" className="signup-btn">Create account</button>
          </form>
          <p style={{ textAlign: 'center', marginTop:'8px' }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
