const controller = require('./controller')
const auth = require('./auth')
const validator = require('./validator')

module.exports = (router) => {
  router.post('/note', async (req, res) => {
    await auth.requiresLogin(req)
    await validator.post(req)
    await controller.createNote(req, res)
  })
}
