const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  req.token = auth && auth.toLowerCase().startsWith('bearer ') ? auth.substring(7) : null
  next()
}

module.exports = tokenExtractor