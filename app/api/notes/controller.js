const noteService = require('../../modules/notes')

/**
 *
 * @method createNote
 */
exports.createNote = async (req, res) => {
  const { title, message } = req.body
  const userId = req.userId

  const note = await noteService.create({ userId, title, message })

  return res.status(201).send(note)
}
