import middy from 'middy'
import checkAuth from './utils/checkAuth'

const authMiddleware = (config) => {
  // might set default options in config
  return ({
    before: (handler, next) => {
      console.log('Before middleware')
      checkAuth(handler.event).then((user) => {
        // We have the user, trigger next middleware
        next()
      }).catch((e) => {
        console.log('throw e', e)
        return handler.callback(null, {
          statusCode: 401,
          body: JSON.stringify({
            auth: 'no',
            message: e.message
          })
        })
      })
    }
  })
}

const businessLogic = (event, context, callback) => {
  // Do my custom stuff

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: 'auth true'
    })
  })
}

// Export the handler
exports.handler = middy(businessLogic).use(authMiddleware())
