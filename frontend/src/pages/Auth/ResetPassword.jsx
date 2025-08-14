import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { updatePassword } from '../../api/authApi';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', oldPassword: '', newPassword: '', confirmNewPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (!form.email || !form.oldPassword || !form.newPassword || !form.confirmNewPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (form.newPassword !== form.confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }

    try {
      setLoading(true);
      await updatePassword({ email: form.email, oldPassword: form.oldPassword, newPassword: form.newPassword });
      setSuccess('Password updated successfully. You can now log in with the new password.');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to update password.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .reset-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/assets/login.png');
          background-size: cover;
          background-position: center;
          padding: 20px;
        }
        .reset-box {
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.95);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .reset-box.animate {
          opacity: 1;
          transform: translateY(0);
        }
        .reset-box h1 {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
        .reset-box form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .reset-box input {
          padding: 12px 15px;
          border: 1px solid #ccc;
          border-radius: 12px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .reset-box input:focus {
          border-color: #333;
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
        }
        .reset-box button {
          padding: 12px;
          border: none;
          border-radius: 12px;
          background-color: #333;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        .reset-box button:hover:not(:disabled) {
          background-color: #000;
          transform: scale(1.03);
        }
        .reset-box button:disabled {
          background-color: #777;
          cursor: not-allowed;
        }
        .message {
          font-size: 0.9rem;
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 10px;
        }
        .message.error {
          background-color: #ffe5e5;
          color: #b00020;
          border: 1px solid #f5c2c2;
        }
        .message.success {
          background-color: #e6f4ea;
          color: #2e7d32;
          border: 1px solid #a5d6a7;
        }
        .reset-box a {
          color: #333;
          text-decoration: underline;
          transition: color 0.3s;
        }
        .reset-box a:hover {
          color: #000;
        }
        @media(max-width: 450px){
          .reset-box { padding: 20px; }
        }
      `}</style>

      <div className="reset-container">
        <div className={`reset-box ${animate ? 'animate' : ''}`}>
          <h1>Reset Password</h1>
          {error && <div className="message error">{error}</div>}
          {success && <div className="message success">{success}</div>}
          <form onSubmit={onSubmit}>
            <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
            <input type="password" name="oldPassword" value={form.oldPassword} onChange={onChange} placeholder="Old password" required />
            <input type="password" name="newPassword" value={form.newPassword} onChange={onChange} placeholder="New password" required />
            <input type="password" name="confirmNewPassword" value={form.confirmNewPassword} onChange={onChange} placeholder="Confirm new password" required />
            <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</button>
          </form>
          <div className="text-center mt-4 text-sm">
            <Link to="/login">Back to login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
