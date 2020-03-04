const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middlewares = require('./utils/middlewares')

logger.info('connecting to MongoDB server')
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('Connected to MongoDB server'))
  .catch(error => {
    logger.info('error connection to MongoDB:', error.message)
})

app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('common'))
}

app.use('/api/blogs', blogsRouter)

app.use(middlewares.errorHandler)

module.exports = app;