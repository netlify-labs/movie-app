import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'

exports.handler = (event, context, callback) => {
  // Use the event data auth header to verify
  checkAuth(event).then((user) => {
    const payload = JSON.parse(event.body)
    console.log(user)

    // do the stuff

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
      	data: 'yeaueueueue'
      })
    })
  }).catch((errorMsg) => {
    console.log('errorMsg', errorMsg)
    return callback(null, {
      statusCode: 401,
      body: JSON.stringify({
        message: errorMsg,
      })
    })
  })
}

/* initialize the JWKS client */
const auth0Domain = process.env.AUTH0_DOMAIN
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

    // remove "bearer " word from token
    const authToken = event.headers.authorization.substring(7)

    // Validate Token is not malformed. AKA fail fail
    let decodedToken
    try {
      decodedToken = jwt.decode(authToken, { complete: true })
     } catch (err) {
      console.log(err)
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
          const roles = decoded[`https://${process.env.URL}/roles`]
          const requiredRole = 'user'
          if (!roles || !roles.length || !roles.includes(requiredRole)) {
            console.log(`User ${decoded.sub} is not an ${requiredRole}`)
            console.log(`User ${decoded.sub} current roles:`, roles)
            return reject(`Missing role ${requiredRole}`)
          }
          /**/

          // Everything is ok!
          return resolve({
            user: true
          })
        })
      } catch (err) {
        console.log('jwt.verify exception', err)
        return reject(err.message)
      }
    })
  })
}
