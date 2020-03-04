const blogsRouter = require('express').Router();
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
    res.json(blogs)
  })
})
  
blogsRouter.post('/', (req, res, next) => {
  const blog = new Blog({ ...req.body, likes: req.body.likes || 0 })
  
  blog.save()
    .then(result => res.status(201).json(result.toJSON()))
    .catch(err => next(err))
})

module.exports = blogsRouter