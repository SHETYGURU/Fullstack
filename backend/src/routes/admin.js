// backend/src/routes/admin.js
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const authorize = require('../middlewares/authorize')
const adminController = require('../controllers/adminController')

router.use(auth)
router.use(authorize('admin'))

router.get('/stats', adminController.stats)

// Users
router.get('/users', adminController.listUsers)
router.get('/users/:id', adminController.getUserDetails) // <-- detail endpoint
router.post('/users', adminController.createUser)

// Stores
router.get('/stores', adminController.listStores)
router.post('/stores', adminController.createStore)

module.exports = router
