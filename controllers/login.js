const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const loginRouter = require('express').Router()
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !isPasswordCorrect) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  const userForToken = {
    username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET)

  res.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter