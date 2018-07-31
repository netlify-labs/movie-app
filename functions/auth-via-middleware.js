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
        next({
          statusCode: 401,
          message: e.message
        })
      })
    },
    after: (handler, next) => {
      console.log('After middleware')
      // might read options from `config`
      next()
    },
    onError: (handler, next) => {
      console.log('Error middleware')
      // might read options from `config`
      next()
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
