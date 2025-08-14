const express = require('express')
const router = express.Router()
const { listStoresPublic, getStorePublic } = require('../controllers/storeController')
const auth = require('../middlewares/auth')
const { submitRating, updateRating, getStoreRatings } = require('../controllers/ratingController')

router.get('/', listStoresPublic)
router.get('/:id', getStorePublic)

router.post('/:id/ratings', auth, submitRating)
router.put('/:id/ratings', auth, updateRating)
router.get('/:id/ratings', auth, getStoreRatings)

module.exports = router
