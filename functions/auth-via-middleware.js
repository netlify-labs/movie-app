import middy from 'middy'
import checkAuth from './utils/checkAuth'

const authMiddleware = (options) => {
  return ({
    before: (handler, next) => {
      return checkAuth(handler.event).then((user) => {
        console.log('user', user)
        return user
      })
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
