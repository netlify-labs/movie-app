import faker from 'faker'
import checkAuth from './utils/checkAuth'
import formatTime from './utils/formatTime'

exports.handler = (event, context, callback) => {
  // Use the event data auth header to verify
  checkAuth(event).then((user) => {
    let movieTimes = []
    let numberOfTimes = 10
    for (var i = numberOfTimes; i >= 0; i--) {
      let date = faker.date.future()
      movieTimes.push(formatTime(new Date(date)))
    }
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        data: movieTimes
      })
    })
  }).catch((errorMsg) => {
    console.log('errorMsg', errorMsg)
    console.log(typeof errorMsg)
    // return error back to app
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        error: errorMsg,
      })
    })
  })
}
