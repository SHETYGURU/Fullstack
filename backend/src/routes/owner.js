const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const authorize = require('../middlewares/authorize')
const { ownerRatings } = require('../controllers/ownerController')

router.use(auth)
router.use(authorize('store_owner'))

router.get('/ratings', ownerRatings)

module.exports = router
