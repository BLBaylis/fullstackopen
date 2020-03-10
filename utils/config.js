require('dotenv').config()

let MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3003

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.TEST_MONGO_URI
}

module.exports = { MONGO_URI, PORT }