const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

console.log('connecting to MongoDB server')
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB server'))
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('common'))

app.use('/api/blogs', blogsRouter)

module.exports = app;