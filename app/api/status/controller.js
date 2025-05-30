const mongoose = require('mongoose')

exports.currentStatus = async function (req, res) {
  if (mongoose.connection.readyState === 2) {
    // If mongoose is connecting, wait for it to finish to know if we should 200 or 503
    await mongoose.connection.asPromise()
  }
  if (mongoose.connection.readyState === 1) {
    return res.status(200).send({
      status: 'OK',
      database: 'Connected'
    })
  }

  return res.status(503).send({
    status: 'ERROR',
    message: 'Error connecting to database'
  })
}
