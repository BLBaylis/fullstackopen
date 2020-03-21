const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const CustomValidationError = require('../utils/customError')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    res.json(users.map(user => user.toJSON()))
  } catch (err) {
    next(err)
  }
})

userRouter.post('/', async (req, res, next) => {
  let passwordError
  try {
    const password = req.body.password

    if (!password) {
      const err = new CustomValidationError('password required')
      passwordError = err
    } else if (password.length < 3) {
      passwordError = new CustomValidationError('password must be longer than three characters')
    }

    const passwordHash = passwordError ? null : await bcrypt.hash(req.body.password, 10)

    const user = new User({
      ...req.body,
      passwordHash
    })

    if (!passwordError) {
      const newUser = await user.save()
      res.status(201).json(newUser.toJSON())
    } else {
      try {
        await user.validate()
      } catch (mongooseValidationError) {
        const err = new CustomValidationError('Validation failed')
        err.errors = { password: passwordError, ...mongooseValidationError.errors }
        throw err
      }
      const err = new CustomValidationError('Validation failed')
      err.errors = passwordError
      throw err
    }
  } catch (thrownError) {
    const err = new CustomValidationError('Validation failed')
    err.errors = thrownError.errors
    next(err)
  }

})

module.exports = userRouter