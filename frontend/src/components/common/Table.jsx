import React, { useState, useMemo } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export default function Table({ columns = [], data = [] }) {
  const [sort, setSort] = useState({ key: null, asc: true });

  const sorted = useMemo(() => {
    if (!sort.key) return data;
    const copy = [...data];
    return copy.sort((a, b) => {
      const va = (a[sort.key] ?? '').toString();
      const vb = (b[sort.key] ?? '').toString();
      if (va === vb) return 0;
      return sort.asc ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }, [data, sort]);

  return (
    <div style={{ overflowX: 'auto', padding: 10 }}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          thead th {
            font-weight: bold;
            animation: fadeInUp 0.4s ease both;
          }
          tbody tr:hover {
            background-color: #fafafa;
            transition: background-color 0.3s ease;
          }
        `}
      </style>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          borderRadius: '0.5cm',
          overflow: 'hidden',
        }}
      >
        <thead>
          <tr>
            {columns.map((c, idx) => (
              <th
                key={c.key || c.label}
                style={{
                  textAlign: 'left',
                  borderBottom: '2px solid #ddd',
                  padding: 8,
                  animationDelay: `${idx * 0.05}s`,
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button
                    onClick={() =>
                      c.key
                        ? setSort((prev) => ({
                            key: c.key,
                            asc: prev.key === c.key ? !prev.asc : true,
                          }))
                        : null
                    }
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: c.key ? 'pointer' : 'default',
                      padding: 0,
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '1rem',
                    }}
                  >
                    {c.label}
                    {sort.key === c.key ? (
                      sort.asc ? (
                        <FaSortUp style={{ fontSize: '1.1rem' }} />
                      ) : (
                        <FaSortDown style={{ fontSize: '1.1rem' }} />
                      )
                    ) : c.key ? (
                      <FaSort style={{ opacity: 0.4, fontSize: '1.1rem' }} />
                    ) : null}
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f3f3' }}>
              {columns.map((c) => (
                <td key={c.key || c.label} style={{ padding: 8 }}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
