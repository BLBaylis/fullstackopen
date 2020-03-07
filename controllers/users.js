const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
    res.json(users.map(user => user.toJSON()))
  } catch (err) {
    next(err)
  }
})

userRouter.post('/', async (req, res, next) => {

  try {

    if (!req.body.password) {
      return res.status(400).end()
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10)

    const user = new User({
      ...req.body,
      passwordHash
    })

    const newUser = await user.save()
    res.status(201).json(newUser.toJSON())
  } catch (err) {
    next(err)
  }

})

module.exports = userRouter