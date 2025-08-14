const jwt = require('jsonwebtoken')
const { User } = require('../models')
module.exports = async function (req, res, next){
  const auth = req.headers.authorization
  if(!auth) return res.status(401).json({ message: 'Unauthorized' })
  const parts = auth.split(' ')
  if(parts.length!==2) return res.status(401).json({ message: 'Unauthorized' })
  const token = parts[1]
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret')
    const user = await User.findByPk(payload.id)
    if(!user) return res.status(401).json({ message: 'User not found' })
    req.user = { id: user.id, role: user.role, name: user.name, email: user.email }
    next()
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' })
  }
}
