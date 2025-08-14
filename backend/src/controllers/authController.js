const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req,res) => {
  try{
    const { name, email, password, address } = req.body
    if(!name || !email || !password) return res.status(400).json({ message:'Missing fields' })
    const exists = await User.findOne({ where: { email } })
    if(exists) return res.status(400).json({ message: 'Email already exists' })
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hash, address, role: 'normal' })
    res.json({ id: user.id, email: user.email })
  }catch(err){
    console.error(err); res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req,res) => {
  try{
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if(!user) return res.status(400).json({ message: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
  }catch(err){
    console.error(err); res.status(500).json({ message: 'Server error' })
  }
}

exports.updatePassword = async (req,res) => {
  try{
    const { email, oldPassword, newPassword } = req.body
    const user = await User.findOne({ where: { email } })
    if(!user) return res.status(400).json({ message: 'User not found' })
    const ok = await bcrypt.compare(oldPassword, user.password)
    if(!ok) return res.status(400).json({ message: 'Old password incorrect' })
    const hash = await bcrypt.hash(newPassword, 10)
    user.password = hash
    await user.save()
    res.json({ message: 'Password updated' })
  }catch(err){
    console.error(err); res.status(500).json({ message: 'Server error' })
  }
}
