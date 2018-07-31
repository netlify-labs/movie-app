import middy from 'middy'
import { httpErrorHandler } from 'middy/middlewares'
import checkAuth from './utils/checkAuth'

const myMiddleware = (config) => {
  // might set default options in config
  return ({
    before: (handler, next) => {
      console.log('Before middleware')
      checkAuth(handler.event).then((user) => {
        next()
      }).catch((e) => {
        console.log('throw e', e)
        return handler.callback(null, {
          statusCode: 401,
          body: JSON.stringify({
            auth: 'false',
            message: e.message
          })
        })
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
exports.handler = middy(businessLogic)
  .use(myMiddleware())
  //.use(httpErrorHandler())
