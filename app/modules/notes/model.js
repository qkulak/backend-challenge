const { Model } = require('app/modules/common')

class NoteModel extends Model {
  schema() {
    return {
      title: {
        type: String,
        trim: true,
        required: true
      },
      message: {
        type: String,
        trim: true,
        required: true
      },
      userId: {
        type: String,
        required: true,
        ref: 'User',
        index: true
      }
    }
  }
}

module.exports = NoteModel
