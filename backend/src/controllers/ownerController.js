const { Store, Rating, User } = require('../models')
exports.ownerRatings = async (req,res) => {
  const ownerId = req.user.id
  const store = await Store.findOne({ where: { ownerId }, include: [{ model: Rating, as:'ratings', include: [{ model: User, as:'user', attributes:['id','name'] }] }] })
  if(!store) return res.status(404).json({ message: 'No store found for owner' })
  const ratings = store.ratings.map(r=> ({ userName: r.user ? r.user.name : null, rating: r.rating }))
  const avg = ratings.length ? (ratings.reduce((a,b)=>a+b.rating,0)/ratings.length).toFixed(2) : null
  res.json({ ratings, average: avg })
}
