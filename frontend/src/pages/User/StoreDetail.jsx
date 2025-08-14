import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStore } from '../../api/storeApi';
import RatingStars from '../../components/user/RatingStars';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function StoreDetail() {
  const { id } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    getStore(id)
      .then((r) => setStore(r.data))
      .catch(() => {});
  }, [id]);

  if (!store) return <div>Loading...</div>;

  return (
    <>
      <style>{`
        .store-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          padding: 20px;
          background-image: url('/assets/background.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .store-box {
          background: rgba(255, 255, 255, 0.95);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
          animation: fadeInScale 0.8s ease-out forwards;
          transition: transform 0.3s ease;
        }
        .store-box:hover {
          transform: scale(1.03);
        }
        .store-name {
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .store-info {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-bottom: 8px;
          font-size: 0.95rem;
          color: #000;
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 500px) {
          .store-box {
            padding: 15px;
          }
        }
      `}</style>

      <div className="store-container">
        <div className="store-box">
          <h2 className="store-name">{store.name}</h2>

          <div className="store-info">
            <FaMapMarkerAlt color="#000" />
            <span>{store.address}</span>
          </div>

          <div className="store-info">
            <FaStar color="#000" />
            <span>Average: {store.rating ?? 'N/A'}</span>
          </div>

          <div style={{ marginTop: 12 }}>
            <h4>Your Rating</h4>
            <RatingStars storeId={id} initial={store.userRating} />
          </div>
        </div>
      </div>
    </>
  );
}
