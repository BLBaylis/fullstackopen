const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('./testHelper').initialBlogs
const getAllDbBlogs = require('./testHelper').getAllDbBlogs

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjs = initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjs.map(blogObj => blogObj.save())) 
})

describe('/get', () => {

  test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(6)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifer key is called id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

})

describe('/post', () => {

  const authToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvb3QiLCJpZCI6IjVlNjdjM2Q1YzY0ZTViMDQwYzlhNDdlOSIsImlhdCI6MTU4Mzg2MTQyOH0.OlVEV-GCa_FK7nls_Xve6swl1pG_B-1jW1II0Mo8uSE'

  test('can post valid blog', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Test Author',
      url: 'https://url.com',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allBlogs = await getAllDbBlogs()
    expect(allBlogs.length).toBe(initialBlogs.length + 1)

    const blogTitles = allBlogs.map(blog => blog.title)
    expect(blogTitles).toContain('New Blog Post')
  })

  test('likes defaults to 0 if missing from request', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Test Author',
      url: 'https://url.com'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', authToken)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test('reject requests with missing title', async () => {
    const blogWithNoTitle = {
      author: 'Test Author',
      url: 'https://url.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authToken)
      .send(blogWithNoTitle)
      .expect(400)
  })

  test('reject requests with missing url', async () => {
    const blogWithNoUrl = {
      title: 'New Blog Post',
      author: 'Test Author'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authToken)
      .send(blogWithNoUrl)
      .expect(400)
  })

})

describe('/delete/:id', () => {

  test('deletes a blog by id successfully', async () => {
    const allBlogsBefore = await getAllDbBlogs()
    const deletedNoteId = allBlogsBefore[0].id
    await api.delete(`/api/blogs/${deletedNoteId}`).expect(204)

    const allBlogsAfter = await getAllDbBlogs()
    expect(allBlogsAfter.length).toBe(initialBlogs.length - 1)

    const blogTitles = allBlogsAfter.map(blog => blog.title)
    expect(blogTitles).not.toContain(deletedNoteId)
  })

})

describe('/put/:id', () => {

  test('updates a existing blog by id successfully', async () => {
    const allBlogsBefore = await getAllDbBlogs()
    const updatedBlogBefore = allBlogsBefore[0]
    const { likes: likesBefore, id } = updatedBlogBefore
    await api
      .put(`/api/blogs/${id}`)
      .send({ ...updatedBlogBefore, likes: likesBefore + 1 })
      .expect(204)

    const allBlogsAfter = await getAllDbBlogs()
    const updatedBlogAfter = allBlogsAfter.filter(blog => blog.id === id)[0]
    expect(updatedBlogAfter.likes).toBe(likesBefore + 1)
  })

  test('adds a blog if existing blog not found', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Test Author',
      url: 'https://url.com',
      likes: 2,
    }
    await api
      .put('/api/blogs/5e6151482320eb12b8b36e41')
      .send(newBlog)
      .expect(201)

    const allBlogs = await getAllDbBlogs()
    expect(allBlogs.length).toBe(initialBlogs.length + 1)

    const blogTitles = allBlogs.map(blog => blog.title)
    expect(blogTitles).toContain('New Blog Post')
  })

})

afterAll(() => {
  mongoose.connection.close()
})
