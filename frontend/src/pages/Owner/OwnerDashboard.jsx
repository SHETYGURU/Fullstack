import React, { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import { FaStar } from 'react-icons/fa';

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    api.get('/owner/ratings')
      .then(r => {
        setRatings(r.data.ratings);
        setAvg(r.data.average);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        .dashboard-container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          border: 2px solid #ddd;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          background: #fff;
        }
        .dashboard-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          background: #fff;
          padding: 15px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          animation: headerFadeIn 1s ease forwards;
        }
        @keyframes headerFadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .avg-rating {
          font-size: 2rem;
          font-weight: bold;
          position: relative;
          color: #ffbf00;
          margin-top: 10px;
          display: flex;
          align-items: center;
          animation: ratingBounce 1s ease;
        }
        .avg-rating::after {
          content: '';
          position: absolute;
          top: 0;
          left: -10%;
          width: 120%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.3) 100%);
          transform: skewX(-20deg);
          animation: glare 2s infinite linear;
        }
        @keyframes ratingBounce {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { transform: translateY(10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes glare {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(100%) skewX(-20deg); }
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          animation: tableFadeIn 1s ease forwards;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f5f5f5;
        }
        @keyframes tableFadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .dashboard-container { padding: 15px; }
          .avg-rating { font-size: 1.5rem; }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Owner Dashboard</h2>
          <div className="avg-rating">
            <FaStar style={{ marginRight: '8px' }} />
            {avg ?? 'N/A'}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((item, index) => (
              <tr key={index}>
                <td>{item.userName}</td>
                <td>
                  <FaStar style={{ color: '#ffbf00', marginRight: '5px' }} />
                  {item.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
