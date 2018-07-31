import middy from 'middy'
import authMiddleware from './middleware/auth'

const businessLogic = (event, context, callback) => {
  // Do my custom stuff
  console.log('⊂◉‿◉つ')

  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      data: 'auth true'
    })
  })
}

// Export the handler
exports.handler = middy(businessLogic).use(authMiddleware())
