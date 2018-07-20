
const config = {
  // auth0 setup
  auth0: {
    domain: 'netlify-dev.auth0.com',
    clientId: 'ZrIB2cm449olRhnjr6h5fuxx7F7Yba9K',
    callbackPath: '/callback'
  },
  algolia: {
    appId: 'latency',
    apiKey: '56f24e4276091e774e8157fe4b8b11f6',
    index: 'movies'
  },
  jwtRoleNamespace: 'http://your-site.com',
  // api endpoints
  api: {
    hello: '/.netlify/functions/hello',
    getMovies: '/.netlify/functions/protected-get-movies'
  }
}

export default config
