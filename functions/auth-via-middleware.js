import middy from 'middy'
import { httpErrorHandler } from 'middy/middlewares'
import checkAuth from './utils/checkAuth'

const authMiddleware = (options) => {
  return ({
    before: async (handler, next) => {
      const user = await checkAuth(handler.event)
      console.log('middy user', user)
      if (!user) {
        console.log("THROW")
        throw new Error('no')
      }
      next()
    },
    onError: (handler, next) => {
      console.log('Error', handler)
      // might read options from `config`
      next()
    }
  })
}

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
            data: 'auth false'
          })
        })
        // next({
        //   statusCode: 401,
        //   message: e.message
        // })
      })
    },
    onError: (handler, next) => {
      console.log('Error middleware', handler)
      console.log('next', next)
      // might read options from `config`
      return handler.callback(null, {
        statusCode: 401,
        body: JSON.stringify({
          data: 'auth false'
        })
      })
      // next()
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
  //.use(authMiddleware())
  .use(myMiddleware())
  .use(httpErrorHandler())
