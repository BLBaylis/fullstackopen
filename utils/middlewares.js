const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: "Malformed Request" })
    }
    
    logger.error(err)
    
    res.status(500).json({ error: err })
}

module.exports = { errorHandler }