const Blog = require('../models/blog');
const User = require('../models/User');

const getAllDbBlogs = async () => {
  const rawBlogObjs = await Blog.find({})
  return rawBlogObjs.map(blog => blog.toJSON())
}

const getAllDbUsers = async () => {
  const rawUserObjs = await User.find({})
  return rawUserObjs.map(user => user.toJSON())
}

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

const initialUsers = {
  unhashed: [
    {
      username: "Root",
      name: "Michael Chan",
      password: "password"
    },
    {
      username: "TestUser1",
      name: "Edsger W. Dijkstra",
      password: "algorithmsRCool"
    },
    {
      username: "TestUser2",
      name: "Bradley Baylis",
      password: "Codeycodecode12"
    },
    {
      username: "TestUser3",
      name: "Robert C. Martin",
      password: "testingtesting"
    },
    {
      username: "TestUser4",
      name: "Jazz The Dog",
      password: "tasty treats woof"
    },
    {
      username: "TestUser5",
      name: "Dave Davidson",
      password: "imdave1"
    }  
  ],
  hashed: [
    {
      username: 'Root',
      name: 'Michael Chan',
      passwordHash: '$2a$10$IbOG7xm0DI.SgrnbGCdNtuiA.zFBjcfy4yYE22ULQzrRITCUyRLUa'
    },
    {
      username: 'TestUser1',
      name: 'Edsger W. Dijkstra',
      passwordHash: '$2a$10$68xXOiTlAjla1echF19h0esSJLhjYCTKhGgm1SBshzQYtwiWYxdmq'
    },
    {
      username: 'TestUser2',
      name: 'Bradley Baylis',
      passwordHash: '$2a$10$d6g.pya27aLcU/j91LHiSuxUwEEPl5zGYzFxDBfEXHi8aSBfoAOam'
    },
    {
      username: 'TestUser3',
      name: 'Robert C. Martin',
      passwordHash: '$2a$10$7txyvSW5trpKZfX5.mCa6ubcgV3Qj2AljmNm8Lb9OX3YRWkVHSOw.'
    },
    {
      username: 'TestUser4',
      name: 'Jazz The Dog',
      passwordHash: '$2a$10$7FWaGSnXiv9p9sKeuGEaVODRqWyKXSQsPlzEOxqpg3KeTDetX7l86'
    },
    {
      username: 'TestUser5',
      name: 'Dave Davidson',
      passwordHash: '$2a$10$HNNND29bXHMtyAN2rfIC7O6EFhotUS3ILfff2CNS7Ly87.6lh3k82'
    }
  ]
}

module.exports = { initialBlogs, getAllDbBlogs, initialUsers, getAllDbUsers }