const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const initialUsers = require('./testHelper').initialUsers
const getAllDbUsers = require('./testHelper').getAllDbUsers

beforeEach(async () => {
  await User.deleteMany({})
  const userObjs = initialUsers.hashed.map(user => new User(user))
  await Promise.all(userObjs.map(userObj => userObj.save()))
})
  
describe('/get', () => {
  
  test('returns correct amount of users', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(6)
  })
  
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('unique identifer key is called id', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].id).toBeDefined()
  })
  
})
  
describe('/post', () => {
 
  test('can post valid user', async () => {
    const newUser = {
      username: 'New User',
      name: 'Testy Test',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const allUsers = await getAllDbUsers()
    expect(allUsers.length).toBe(initialUsers.unhashed.length + 1)
    
    const userTitles = allUsers.map(user => user.username)
    expect(userTitles).toContain('New User')
  })

  test('reject requests with missing username', async () => {
    const noUserName = {
      name: 'Testy Test',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(noUserName)
      .expect(400)
  })

  test('reject requests with missing name', async () => {
    const noName = {
      username: 'New User',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(noName)
      .expect(400)
  })

  test('reject requests with missing password', async () => {
    const noPassword = {
      username: 'New User',
      name: 'Testy Test'
    }

    await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
  })

})

afterAll(() => mongoose.connection.close())