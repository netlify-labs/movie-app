
module.exports.config = {
  // auth0 setup
  auth0: {
    domain: 'netlify-dev.auth0.com',
    clientId: 'ZrIB2cm449olRhnjr6h5fuxx7F7Yba9K',
    callbackPath: '/callback'
  },
  jwtRoleNamespace: 'http://your-site.com',
  // api endpoints
  api: {
    hello: '/.netlify/functions/hello',
    getMovies: '/.netlify/functions/protected-get-movies'
  }
}
