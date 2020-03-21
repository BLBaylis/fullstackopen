const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CustomValidationError') {
    let validationErrors = []
    let propNames = Object.keys(err.errors)
    if (propNames.includes('password') && propNames.includes('passwordHash')) {
      propNames = propNames.filter(propName => propName !== 'passwordHash')
    }
    const nestedErrs = propNames.map(propName => err.errors[propName])
    nestedErrs.forEach(nestedErr => {
      if (nestedErr.name === 'ValidatorError' || nestedErr.name === 'ValidationError') {
        //mongoose validator error
        const message = errMessageMaker(nestedErr)
        validationErrors = [...validationErrors, message]
      } 
      if (nestedErr.name === 'CustomValidationError') {
        validationErrors = [...validationErrors, nestedErr.message]
      }
    })
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors })
    }
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  }

  
  logger.error(err)
    
  res.status(500).json({ error: err.message })
}

const errMessageMaker = errObj => {
  const { path, properties, kind: failedCondition } = errObj
  let message
  switch (failedCondition) {
  case 'minlength':
    message = `${path} must be longer than ${properties[failedCondition]} characters`
    break
  case 'maxlength':
    message = `${path} must be less than ${properties[failedCondition]} characters`
    break
  case 'required':
    message = `${path} missing`
    break
  case 'unique':
    message = `${path} already taken`
    break
  default:
    logger.info(`Req property ${path} does not have a custom err message in errMessageMaker for failed validation condition: ${failedCondition}`)
    message = errObj.message
    break
  }
  return message
}

module.exports = errorHandler 