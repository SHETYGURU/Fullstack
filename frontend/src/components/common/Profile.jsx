import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../api/userApi';
import { useAuth } from '../../hooks/useAuth';

export default function ProfilePage() {
  const { user } = useAuth();
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserDetails(user.id)
        .then(res => {
          setUserDetail(res.data);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card animate-entry">
        <img
          src="/assets/user.gif"
          alt="Profile GIF"
          className="profile-gif"
        />

        <div className="profile-details">
          <div className="profile-field">
            <strong>Name:</strong> <span>{userDetail.user.name}</span>
          </div>
          <div className="profile-field">
            <strong>Email:</strong> <span>{userDetail.user.email}</span>
          </div>
          <div className="profile-field">
            <strong>Role:</strong> <span>{userDetail.user.role}</span>
          </div>
        </div>
      </div>

      <style>{`
        .profile-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f2f2f2;
          padding: 20px;
        }
        .profile-card {
          background: #fff;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.15);
          text-align: center;
          max-width: 450px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .animate-entry {
          animation: fadeInUp 0.8s ease forwards;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .profile-gif { width: 160px; height: 160px; margin-bottom: 30px; border-radius: 50%; }
        .profile-details {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center; /* Center horizontally */
        }
        .profile-field {
          margin: 12px 0;
          font-size: 16px;
          display: flex;
          gap: 8px;
          justify-content: center; /* Center label and value */
        }
        .profile-field strong { color: #555; }
        .profile-field span { color: #333; font-weight: 500; }
        @media (max-width: 500px) {
          .profile-card { padding: 25px 20px; }
          .profile-gif { width: 140px; height: 140px; margin-bottom: 20px; }
          .profile-field { font-size: 14px; }
        }
      `}</style>
    </div>
  );
}
