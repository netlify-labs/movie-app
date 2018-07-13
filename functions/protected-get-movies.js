import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import faker from 'faker'
import config from '../src/_config'

exports.handler = (event, context, callback) => {
  // Use the event data auth header to verify
  checkAuth(event).then((user) => {
    console.log('user', user)
    // data from body
    const payload = JSON.parse(event.body)
    console.log('payload', payload)

    // generate movie titles
    const movies = [];
    const numberOfMovies = 10
    for (var i = numberOfMovies; i >= 0; i--) {
      var randomName = faker.name.findName();
      var adjective = faker.hacker.adjective()
      var verb = faker.hacker.verb()
      var noun = faker.hacker.noun()
      movies.push({
        title: `${randomName} ${verb}s ${adjective} ${noun}s`,
        quote: faker.hacker.phrase(),
        director: faker.name.findName()
      })
    }

    // return movie list to app
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        user: user,
      	movies: movies
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

/* initialize the JWKS client */
const auth0Domain = process.env.AUTH0_DOMAIN || config.auth0.domain
const authClient = jwksClient({
  cache: true,
  jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
})

/* Check authorization JWT */
function checkAuth(event) {
  const alg = 'RS256' // algorithm is RSA http://bit.ly/2xAYygk
  return new Promise((resolve, reject) => {
    if (!event.headers.authorization) {
      const reason = 'missing event.headers.authorization. You must be signed in to call this function'
      return reject('JWT token is malformed')
    }
    console.log('event.headers', event.headers)
    // remove "bearer " word from token
    const authToken = event.headers.authorization.substring(7)

    // Validate Token is not malformed. AKA fail fast
    let decodedToken
    try {
      decodedToken = jwt.decode(authToken, { complete: true })
     } catch (err) {
      console.log(err)
      return reject('JWT token is malformed')
    }

    if (!decodedToken || !decodedToken.header || !decodedToken.header.kid) {
      return reject('JWT token is malformed')
    }

    const kid = decodedToken.header.kid
    // Get Signing key from auth0
    authClient.getSigningKey(kid, (signError, key) => {
      if (signError) {
        console.log('signing key error', signError)
        return reject("signing key error")
      }

      const signingKey = key.publicKey || key.rsaPublicKey
      const opts = { algorithms: alg }

      // Now Verify the jwt token is valid
      try {
        jwt.verify(authToken, signingKey, opts, (verifyError, decoded) => {
          if (verifyError) {
            console.log('Token signature NOT VERIFIED', verifyError)
            return reject('Token signature NOT VERIFIED')
          }
          // output for logs
          console.log('------------------')
          console.log('decoded jwt token')
          console.log(decoded)
          console.log('------------------')

          /* if you want to allow only verified emails use this
          if (!decoded.email_verified) {
            console.log('User has not verified email yet', decoded)
            return reject(`Email not verified`)
          }
          /**/


          /* if you want to allow only certain roles use this
          const siteUrl =  config.jwtRoleNamespace || process.env.URL
          const roles = decoded[`https://${process.env.URL}/roles`]
          const requiredRole = 'user'
          if (!roles || !roles.length || !roles.includes(requiredRole)) {
            console.log(`User ${decoded.sub} is not an ${requiredRole}`)
            console.log(`User ${decoded.sub} current roles:`, roles)
            return reject(`Missing role ${requiredRole}`)
          }
          /**/

          // Everything is ok!
          return resolve(decoded)
        })
      } catch (err) {
        console.log('jwt.verify exception', err)
        return reject(err.message)
      }
    })
  })
}
