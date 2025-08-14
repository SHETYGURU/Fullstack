

  import React, { useEffect, useState } from 'react'
import { getStats } from '../../api/adminApi'
import { getUsers, createUser, getUserDetails } from '../../api/userApi'
import { listStores, createStore } from '../../api/storeApi'
import Table from '../../components/common/Table'
import Modal from '../../components/common/Modal'
import { FaUsers, FaStore, FaPlus, FaFilter, FaTimes, FaStar } from 'react-icons/fa';

export default function AdminPage() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 })
  const [displayStats, setDisplayStats] = useState({ users: 0, stores: 0, ratings: 0 })
  const [tab, setTab] = useState('users')

  const [users, setUsers] = useState([])
  const [userFilters, setUserFilters] = useState({ name: '', email: '', address: '', role: '' })
  const [openAddUser, setOpenAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', role: 'normal' })
  const [userDetail, setUserDetail] = useState(null)

  const [stores, setStores] = useState([])
  const [storeFilters, setStoreFilters] = useState({ name: '', email: '', address: '' })
  const [openAddStore, setOpenAddStore] = useState(false)
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', ownerId: '' })
  const [storeOwners, setStoreOwners] = useState([])

  const [createdCreds, setCreatedCreds] = useState(null)
  const [copied, setCopied] = useState(false)

  const fetchStats = async () => {
    const res = await getStats()
    setStats(res.data)
  }

  const fetchUsers = async (filters = {}) => {
    const res = await getUsers(filters)
    setUsers(res.data)
  }

  const fetchStores = async (filters = {}) => {
    const res = await listStores(filters)
    setStores(res.data)
  }

  const fetchOwners = async () => {
    const res = await getUsers({ role: 'store_owner' })
    setStoreOwners(res.data)
  }

  useEffect(() => {
    fetchStats()
    fetchUsers()
    fetchStores()
    fetchOwners()
  }, [])

  // Animate numbers every 10 seconds
  useEffect(() => {
    const animate = () => {
      const duration = 800
      const frameRate = 30
      const steps = duration / (1000 / frameRate)
      const counters = ['users', 'stores', 'ratings']

      counters.forEach((key) => {
        let stepCount = 0
        const start = 0
        const end = stats[key]
        const increment = (end - start) / steps

        const interval = setInterval(() => {
          stepCount++
          setDisplayStats((prev) => ({
            ...prev,
            [key]: Math.floor(start + increment * stepCount),
          }))
          if (stepCount >= steps) {
            setDisplayStats((prev) => ({ ...prev, [key]: end }))
            clearInterval(interval)
          }
        }, 1000 / frameRate)
      })
    }

    animate()
    const loop = setInterval(animate, 10000)
    return () => clearInterval(loop)
  }, [stats])

  const handleAddUser = async (e) => {
    e.preventDefault()
    const generatedPassword = Math.random().toString(36).slice(-8)
    const payload = { ...newUser, password: generatedPassword }
    await createUser(payload)

    setCreatedCreds({ name: newUser.name, email: newUser.email, password: generatedPassword })
    setOpenAddUser(false)
    setNewUser({ name: '', email: '', address: '', role: 'normal' })
    fetchUsers(userFilters)
    fetchStats()
    if (payload.role === 'store_owner') fetchOwners()
  }

  const handleAddStore = async (e) => {
    e.preventDefault()
    await createStore(newStore)
    setOpenAddStore(false)
    setNewStore({ name: '', email: '', address: '', ownerId: '' })
    fetchStores(storeFilters)
    fetchStats()
  }

  const viewUserDetail = async (id) => {
    const res = await getUserDetails(id)
    setUserDetail(res.data)
  }

  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'role', label: 'Role' },
    { label: 'Actions', render: (row) => <button className="btn" onClick={() => viewUserDetail(row.id)}>View</button> }
  ]

  const storeColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'rating', label: 'Rating' }
  ]

  const handleCopyCreds = async () => {
    if (!createdCreds) return
    const lines = [
      `Name: ${createdCreds.name}`,
      `Email: ${createdCreds.email}`,
      `Password: ${createdCreds.password}`,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(lines)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = lines
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const buildMailtoHref = () => {
    if (!createdCreds) return '#'
    const subject = `Your account has been created`
    const body = [
      `Dear ${createdCreds.name},`,
      ``,
      `Your account has been created successfully.`,
      `Email: ${createdCreds.email}`,
      `Password: ${createdCreds.password}`,
      ``,
      `You can now log in to the platform.`,
      ``,
      `Best regards,`,
      `Admin`
    ].join('\n')
    return `mailto:${encodeURIComponent(createdCreds.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <div>
      <style>{`
        .stats {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .stat-card {
          flex: 1 1 150px;
          background: white;
          border-radius: 12px;
          padding: 15px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          overflow: hidden;
        }
        .stat-card .icon {
          font-size: 1.8rem;
          color: balck;
        }
        .stat-number {
          font-size: 1.5rem;
          font-weight: bold;
          color: #111827;
          transition: all 0.3s ease;
        }
        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
        }
        .glare {
          position: absolute;
          top: 0;
          left: -50%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
          transform: skewX(-25deg);
          animation: glareMove 2s infinite linear;
        }
        @keyframes glareMove {
          0% { left: -50%; }
          100% { left: 150%; }
        }
        @media (max-width: 768px) {
          .stats {
            flex-direction: column;
            gap: 10px;
          }
        }
              input, select {
      border-radius: 0.5cm;
      padding: 5px 8px; /* slightly reduced */
      border: 1px solid #ccc;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      font-size: 0.85rem; /* slightly smaller text */
      min-width: 140px; /* so they don't shrink too much */
    }

    .btn {
      padding: 5px 8px;
      border-radius: 0.5cm;
      border: 1px solid #ddd;
      background: #f7f7f7;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      white-space: nowrap;
    }
    .btn:hover {
      background: black;
      color: white;
      transform: scale(1.05);
    }
    .btn-primary {
      background: #2563eb;
      color: white;
      border: 1px solid #1d4ed8;
    }

    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 10px;
    }

    .filters input,
    .filters select,
    .filters .btn {
      flex: 1 1 auto; /* let them resize */
      max-width: 180px; /* prevents too wide inputs */
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .popup {
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      min-width: 280px;
      max-width: 520px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .tab-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
        align-items: stretch;
      }
      .filters input,
      .filters select,
      .filters .btn {
        max-width: 100%;
      }
      .stats {
        flex-direction: column;
        gap: 10px;
      }
    }
      `}</style>

      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <div className="glare"></div>
          <FaUsers className="icon" />
          <div>
            <div className="stat-number">{displayStats.users}</div>
            <div className="stat-label">Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="glare"></div>
          <FaStore className="icon" />
          <div>
            <div className="stat-number">{displayStats.stores}</div>
            <div className="stat-label">Stores</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="glare"></div>
          <FaStar className="icon" />
          <div>
            <div className="stat-number">{displayStats.ratings}</div>
            <div className="stat-label">Ratings</div>
          </div>
        </div>
      </div>

     <div className="tab-buttons">
          <button className="btn" onClick={() => setTab('users')}>
            <FaUsers /> Users
          </button>
          <button className="btn" onClick={() => setTab('stores')}>
            <FaStore /> Stores
          </button>
        </div>

        {tab === 'users' && (
          <div>
            <form onSubmit={(e) => { e.preventDefault(); fetchUsers(userFilters) }} className="filters">
              <input placeholder="Name" value={userFilters.name} onChange={e => setUserFilters({ ...userFilters, name: e.target.value })} />
              <input placeholder="Email" value={userFilters.email} onChange={e => setUserFilters({ ...userFilters, email: e.target.value })} />
              <input placeholder="Address" value={userFilters.address} onChange={e => setUserFilters({ ...userFilters, address: e.target.value })} />
              <select value={userFilters.role} onChange={e => setUserFilters({ ...userFilters, role: e.target.value })}>
                <option value="">Any Role</option>
                <option value="normal">Normal</option>
                <option value="admin">Admin</option>
                <option value="store_owner">Store Owner</option>
              </select>
              <button className="btn" type="submit"><FaFilter /> Filter</button>
  <button className="btn" type="button" onClick={() => { setUserFilters({ name: '', email: '', address: '', role: '' }); fetchUsers() }}><FaTimes /> Clear</button>
  <button className="btn" type="button" onClick={() => setOpenAddUser(true)}><FaPlus /> Add User</button>

            </form>
            <Table columns={userColumns} data={users} />
          </div>
        )}

        {tab === 'stores' && (
          <div>
            <form onSubmit={(e) => { e.preventDefault(); fetchStores(storeFilters) }} className="filters">
              <input placeholder="Name" value={storeFilters.name} onChange={e => setStoreFilters({ ...storeFilters, name: e.target.value })} />
              <input placeholder="Email" value={storeFilters.email} onChange={e => setStoreFilters({ ...storeFilters, email: e.target.value })} />
              <input placeholder="Address" value={storeFilters.address} onChange={e => setStoreFilters({ ...storeFilters, address: e.target.value })} />
              <button className="btn" type="submit">Filter</button>
              <button className="btn" type="button" onClick={() => { setStoreFilters({ name: '', email: '', address: '' }); fetchStores() }}>Clear</button>
              <button className="btn" type="button" onClick={() => setOpenAddStore(true)}>Add Store</button>
            </form>
            <Table columns={storeColumns} data={stores} />
          </div>
        )}

        <Modal open={openAddUser} title="Add User" onClose={() => setOpenAddUser(false)}>
          <form onSubmit={handleAddUser} style={{ display: 'grid', gap: 8 }}>
            <input placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required />
            <input placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
            <input placeholder="Address" value={newUser.address} onChange={e => setNewUser({ ...newUser, address: e.target.value })} />
            <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="normal">Normal</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>
            <button className="btn" type="submit">Create</button>
          </form>
        </Modal>

        <Modal open={openAddStore} title="Add Store" onClose={() => setOpenAddStore(false)}>
          <form onSubmit={handleAddStore} style={{ display: 'grid', gap: 8 }}>
            <input placeholder="Name" value={newStore.name} onChange={e => setNewStore({ ...newStore, name: e.target.value })} required />
            <input placeholder="Email" value={newStore.email} onChange={e => setNewStore({ ...newStore, email: e.target.value })} required />
            <input placeholder="Address" value={newStore.address} onChange={e => setNewStore({ ...newStore, address: e.target.value })} />
            <select value={newStore.ownerId} onChange={e => setNewStore({ ...newStore, ownerId: e.target.value })}>
              <option value="">No owner</option>
              {storeOwners.map(o => (
                <option key={o.id} value={o.id}>{o.name} ({o.email})</option>
              ))}
            </select>
            <button className="btn" type="submit">Create</button>
          </form>
        </Modal>

        <Modal open={!!userDetail} title="User Details" onClose={() => setUserDetail(null)}>
          {userDetail && (
            <div>
              <div><strong>Name:</strong> {userDetail.user.name}</div>
              <div><strong>Email:</strong> {userDetail.user.email}</div>
              <div><strong>Address:</strong> {userDetail.user.address}</div>
              <div><strong>Role:</strong> {userDetail.user.role}</div>
              {userDetail.user.role === 'store_owner' && (
                <div style={{ marginTop: 10 }}>
                  <strong>Stores:</strong>
                  <ul>
                    {userDetail.stores.map(s => (
                      <li key={s.id}>{s.name} - Avg Rating: {s.avgRating ?? 'N/A'}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Modal>

        {createdCreds && (
          <div className="overlay" role="dialog" aria-modal="true">
            <div className="popup">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>👤</span>
                <h3 style={{ margin: 0 }}>New User Created</h3>
              </div>
              <div style={{ display: 'grid', gap: 6, marginBottom: 12 }}>
                <div><strong>Name:</strong> {createdCreds.name}</div>
                <div><strong>Email:</strong> {createdCreds.email}</div>
                <div><strong>Password:</strong> {createdCreds.password}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button className="btn" type="button" onClick={handleCopyCreds}>
                  <span style={{ marginRight: 6 }}>📋</span> Copy
                </button>
                <a href={buildMailtoHref()} className="btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 6 }}>✉️</span> Mail
                </a>
                <button className="btn btn-primary" type="button" onClick={() => setCreatedCreds(null)}>
                  <span style={{ marginRight: 6 }}>✔️</span> OK
                </button>
              </div>
              {copied && <div style={{ marginTop: 8, color: 'green' }}>Copied to clipboard!</div>}
            </div>
          </div>
        )}
    </div>
  )
}
