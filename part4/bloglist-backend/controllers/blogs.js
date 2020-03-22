const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const CustomValidationError = require('../utils/customError')
const config = require('../utils/config')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs.map(blog => blog.toJSON()))
  } catch (err) {
    next(err)
  }
})
  
blogsRouter.post('/', async (req, res, next) => {
  try {
    const decodedToken = req.token ? jwt.verify(req.token, config.JWT_SECRET) : null
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Login required' })
    }
    const user = await User.findOne({ username: decodedToken.username })
    const blog = new Blog({ ...req.body, likes: req.body.likes || 0, user: user._id })
    const newBlog = await blog.save()
    user.blogs = [...user.blogs, newBlog]
    await user.save()
    res.status(201).json(newBlog.toJSON())
  } catch (thrownError) {
    if (thrownError.name === 'ValidationError') {
      const err = new CustomValidationError('Validation failed')
      err.errors = thrownError.errors
      return next(err)
    }
    next(thrownError)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = req.token ? jwt.verify(req.token, config.JWT_SECRET) : null
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'Login required' })
    }
    const user = await User.findOne({ username: decodedToken.username })
    const blogToDelete = await Blog.findById(req.params.id)
    if (blogToDelete) {
      if (user._id.toString() === blogToDelete.user._id.toString()) {
        await blogToDelete.remove()
        return res.status(204).end()
      }
      res.status(401).json({ error: 'You do not have appropriate permissions' })
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    let blogToUpdate = await Blog.findById(id)
    if (blogToUpdate) {
      for (const prop in req.body) {
        blogToUpdate[prop] = req.body[prop]
      }
      await blogToUpdate.save()
      res.status(204).end()
    } else {
      const newBlog = await new Blog(req.body).save()
      res.status(201).json(newBlog.toJSON())
    }
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter