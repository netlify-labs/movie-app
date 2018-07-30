import middy from 'middy'
import checkAuth from './utils/checkAuth'

const authMiddleware = (options) => {
  return ({
    before: (handler, next) => {
      if (handler.event) {
        return checkAuth(handler.event)
      }

      return Promise.resolve()
    }
  })
}

const businessLogic = (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: 'auth true'
    })
  })
}

// sample usage
exports.handler = middy(businessLogic).use(authMiddleware())
