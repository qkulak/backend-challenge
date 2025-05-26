const userService = require('app/modules/user')
const noteService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  const user = await userService.findByIdAndUpdate(req.params.id, req.body)
  res.status(200).send(user)
}

/**
 *
 * @method getUserNotes
 */
exports.getUserNotes = async (req, res) => {
  const userId = req.params.id
  const notes = await noteService.find({ userId })

  return res.status(200).send(notes)
}
