const mongoose = require('mongoose')

exports.currentStatus = async function (req, res) {
  if (mongoose.connection.readyState === 1) {
    return res.status(200).send({
      status: 'OK',
      database: 'Connected'
    })
  }

  res.status(503).send({
    status: 'ERROR',
    database: 'Error',
    message: error.message
  })
}
