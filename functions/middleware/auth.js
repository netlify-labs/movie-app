import checkAuth from '../utils/checkAuth'

export default function authMiddleware(config) {
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
