const { validate, Validator } = require('app/api/common')
const { body } = validate

class NoteValidator extends Validator {
  async post(req) {
    const validations = [body('title').optional().isLength(1, 64), body('message').optional().isLength(1, 200)]
    await this.validate(req, validations, { sanitize: 'query' })
  }
}

module.exports = new NoteValidator()
