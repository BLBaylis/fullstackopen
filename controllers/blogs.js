const blogsRouter = require('express').Router();
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})
  
blogsRouter.post('/', async (req, res, next) => {
  const blog = new Blog({ ...req.body, likes: req.body.likes || 0 })

  try {
    const newBlog = await blog.save()
    res.status(201).json(newBlog.toJSON())
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
    if (deletedBlog) {
      res.status(204).end()
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
      for (prop in req.body) {
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