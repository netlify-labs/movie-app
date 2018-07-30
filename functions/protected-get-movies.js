import faker from 'faker'
import checkAuth from './utils/checkAuth'
import formatTime from './utils/formatTime'
import safelyParseJSON from './utils/safelyParseJSON'

exports.handler = (event, context, callback) => {
  // Use the event data auth header to verify
  // data from body
  // generate movie titles
  const movies = []
  const numberOfMovies = 10
  for (var i = numberOfMovies; i >= 0; i--) {
    var randomName = faker.name.findName()
    var adjective = faker.hacker.adjective()
    var verb = faker.hacker.verb()
    var noun = faker.hacker.noun()
    var date = faker.date.future()
    movies.push({
      title: `${randomName} ${verb}s ${adjective} ${noun}s`,
      quote: faker.hacker.phrase(),
      director: faker.name.findName(),
      time: formatTime(new Date(date))
    })
  }

  // return movie list to app
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      movies: movies
    })
  })
}
