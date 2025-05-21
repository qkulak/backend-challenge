const Note = require('../../modules/notes')

exports.getUserNotes = async function (req, res) {
  const userId = req.params.id
  const notes = await Note.find({ userId })

  return res.status(200).json({
    success: true,
    data: notes
  })
}

exports.createNote = async function (req, res) {
  const { title, message } = req.body
  const userId = req.userId

  const note = await Note.create({ userId, title, message })

  return res.status(201).json({
    success: true,
    data: note
  })
}
