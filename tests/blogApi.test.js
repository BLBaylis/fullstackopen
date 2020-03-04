const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const testHelper = require('./testHelper')

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjs = testHelper.initialBlogs.map(blog => new Blog(blog))
  await Promise.all(blogObjs.map(blogObj => blogObj.save())) 
})

describe('blog api', () => {

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

  test('can post valid blog', async () => {
      const newBlog = {
        title: "New Blog Post",
        author: "Test Author",
        url: "https://url.com",
        likes: 2,
      }

      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const allBlogs = await testHelper.getAllDbBlogs();
      expect(allBlogs.length).toBe(testHelper.initialBlogs.length + 1)

      const blogTitles = allBlogs.map(blog => blog.title)
      expect(blogTitles).toContain('New Blog Post')
  })

  test('likes defaults to 0 if missing from request', async () => {
    const newBlog = {
      title: "New Blog Post",
      author: "Test Author",
      url: "https://url.com"
    }

    const response = await api.post('/api/blogs').send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test('reject requests with missing title or url', async () => {
    const blogWithNoTitle = {
      author: "Test Author",
      url: "https://url.com"
    }

    const blogWithNoUrl = {
      title: "New Blog Post",
      author: "Test Author"
    }

    const testBadRequest = async (blogToSend) => {
      return api
        .post('/api/blogs')
        .send(blogToSend)
        .expect(400)
    }

    await Promise.all([testBadRequest(blogWithNoTitle), testBadRequest(blogWithNoUrl)])
  })

})


afterAll(() => {
  mongoose.connection.close()
})
