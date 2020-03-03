const blogsRouter = require('express').Router();
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    console.log("get")
  Blog
    .find({})
    .then(blogs => {
    res.json(blogs)
  })
})
  
blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)
  
  blog.save()
    .then(result => {
      res.status(201).json(result.toJSON())
    })
    .catch(console.log)
})

module.exports = blogsRouter