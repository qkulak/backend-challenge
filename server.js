require('app-module-path').addPath('./')

// Export http handler
exports.handler = async function (event, context) {
  const app = await require('app').start()
  return await app.server.run(event, context)
}
