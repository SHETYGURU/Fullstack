import React, { useEffect, useState } from 'react';
import { listStores } from '../../api/storeApi';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar';
import RatingStars from '../../components/user/RatingStars';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [q, setQ] = useState('');

  const fetchStores = () => {
    listStores({ q })
      .then(r => setStores(r.data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchStores();
  }, [q]);

  return (
    <div className="store-list-container">
      <style>{`
        .store-list-container {
          background-image: url('/assets/background.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh;
          padding: 20px;
        }

        h2 {
          color: #000; /* Black heading */
          text-align: center;
        }

        .store-grid {
          display: grid;
          gap: 16px;
          margin-top: 20px;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* better responsiveness */
        }

        @media (min-width: 768px) {
          .store-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .store-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .store-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 16px;
          border: 1px solid #ddd;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(10px);
          color: #222;
          transition: transform 0.3s ease,
                      box-shadow 0.3s ease,
                      background-color 0.3s ease,
                      color 0.3s ease;
        }

        .store-card:hover {
          transform: scale(1.03);
          background-color: #333;
          color: #fff;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
        }

        .store-card:hover a {
          color: #fff;
        }

        .store-card h3 {
          margin: 0 0 8px;
          color: inherit;
          text-transform: uppercase;
        }

        .store-card a {
          text-decoration: none;
          color: inherit;
        }

        .store-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: inherit;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .rating-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: #000; /* black text instead of yellow */
         }
        //   .rating-info:hover{
        //   color :#fff;
        //   }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .rating-stars-animate {
          display: inline-flex;
          gap: 4px;
          cursor: pointer;
        }

        .rating-stars-animate svg {
          transition: transform 0.2s ease, filter 0.2s ease;
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.15));
        }

        .rating-stars-animate svg:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 0 4px rgba(255, 204, 0, 0.7));
        }

        .no-results {
          text-align: center;
          margin-top: 40px;
          font-size: 1.2rem;
          color: rgba(0, 0, 0, 0.5);
          font-style: italic;
        }
      `}</style>

      <h2>Stores</h2>
      <SearchBar value={q} onChange={setQ} placeholder="Search by name or address" />

      {stores.length === 0 ? (
        <div className="no-results">No Stores Found</div>
      ) : (
        <div className="store-grid">
          {stores.map((s, index) => (
            <div key={s.id} className="store-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3>
                <Link to={'/stores/' + s.id}>{s.name}</Link>
              </h3>

              <div className="store-info">
                <FaMapMarkerAlt size={14} color="#4db8ff" />
                <span>{s.address}</span>
              </div>

              <div className="rating-info">
                <FaStar size={14} color="#000" /> {/* star icon also black */}
                <span>Average: {s.rating ?? 'N/A'}</span>
              </div>

              <div style={{ marginTop: 8 }}>
                Your Rating:
                <div className="rating-stars-animate">
                  <RatingStars
                    storeId={s.id}
                    initial={s.userRating}
                    onRatingChange={fetchStores}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
