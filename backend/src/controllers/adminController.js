// backend/src/controllers/adminController.js
const { User, Store, Rating } = require('../models')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

exports.stats = async (req, res) => {
  const users = await User.count()
  const stores = await Store.count()
  const ratings = await Rating.count()
  res.json({ users, stores, ratings })
}

/**
 * List users with optional filters:
 * ?name=&email=&address=&role=
 */
exports.listUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query
    const where = {}
    if (name) where.name = { [Op.like]: `%${name}%` }
    if (email) where.email = { [Op.like]: `%${email}%` }
    if (address) where.address = { [Op.like]: `%${address}%` }
    if (role) where.role = role

    const users = await User.findAll({
      where,
      attributes: ['id', 'name', 'email', 'address', 'role']
    })
    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Create a new user (admin can create normal/admin/store_owner)
 * body: { name, email, password, address, role }
 */
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' })
    const exists = await User.findOne({ where: { email } })
    if (exists) return res.status(400).json({ message: 'Email exists' })
    const hash = await bcrypt.hash(password, 10)
    const u = await User.create({ name, email, password: hash, address, role })
    res.json({ id: u.id, email: u.email })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * List stores with optional filters:
 * ?name=&email=&address=
 * Each store will return average rating as `rating`.
 */
exports.listStores = async (req, res) => {
  try {
    const { name, email, address } = req.query
    const where = {}
    if (name) where.name = { [Op.like]: `%${name}%` }
    if (email) where.email = { [Op.like]: `%${email}%` }
    if (address) where.address = { [Op.like]: `%${address}%` }

    const stores = await Store.findAll({
      where,
      include: [{ model: Rating, as: 'ratings' }]
    })

    const data = stores.map(s => {
      const avg = s.ratings.length ? (s.ratings.reduce((a, b) => a + b.rating, 0) / s.ratings.length).toFixed(2) : null
      return { id: s.id, name: s.name, email: s.email, address: s.address, rating: avg }
    })
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Create a store (admin)
 * body: { name, email, address, ownerId }
 */
exports.createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body
    const s = await Store.create({ name, email, address, ownerId })
    res.json(s)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

/**
 * Get user details. If user is store_owner, include store(s) and their avg rating(s)
 */
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findByPk(id, { attributes: ['id', 'name', 'email', 'address', 'role'] })
    if (!user) return res.status(404).json({ message: 'Not found' })

    let stores = []
    if (user.role === 'store_owner') {
      const ownerStores = await Store.findAll({
        where: { ownerId: id },
        include: [{ model: Rating, as: 'ratings' }]
      })
      stores = ownerStores.map(s => {
        const avg = s.ratings.length ? (s.ratings.reduce((a, b) => a + b.rating, 0) / s.ratings.length).toFixed(2) : null
        return { id: s.id, name: s.name, avgRating: avg }
      })
    }

    res.json({ user, stores })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}
