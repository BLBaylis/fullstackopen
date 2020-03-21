class CustomValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CustomValidationError'
  }
}

module.exports = CustomValidationError