require('dotenv').config()

let MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3003
const JWT_SECRET = process.env.JWT_SECRET

if (process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.TEST_MONGO_URI
}

module.exports = { MONGO_URI, PORT, JWT_SECRET }