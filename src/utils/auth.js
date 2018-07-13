import auth0Instance from './authInstance'
import decode from 'jwt-decode'
import history from './history'
import config from '../_config'
import { getXsrfToken, clearXsrfToken } from './xsrf' // eslint-disable-line

export default class Auth {
  auth0 = auth0Instance()

  login = () => {
    const token = getXsrfToken()
    const location = encodeURIComponent(window.location.href)
    const appState = {
      location: location,
      token: token
      // and any other state that you might want to store
    }
    // debugger;
    this.auth0.authorize({
      appState: appState,
      redirectUri: `${window.location.origin}/callback`,
    })
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        console.log('err', err)
        const errMsg = `Sorry an error occured.

${JSON.stringify((err))}

Make sure you are using https`
        alert(errMsg)
      }

      if (authResult && authResult.accessToken && authResult.idToken) {
        //console.log('authResult', authResult)
        this.setSession(authResult)
      } else if (err) {
        history.replace('/')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    });
  }

  setSession(authResult) {
    console.log('authResult', authResult)

    if (authResult && authResult.accessToken && authResult.idToken) {
      const role = this.getRole(authResult.idToken)

      // TODO finish roles needed for app
      /*if (!role) {
        alert('Roles not used in app. Update auth0 rules')
        return false
      }
      // TODO set what admin rights we need
      if (!role.length || !this.isAdmin(role)) {
        alert('Sorry you are not an admin of this app! Please contact admin')
        // no role. redirect them home
        return history.replace('/')
      }
      */
      // Set the time that the access token will expire at
      const expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      )
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      // navigate to the dashboard route
      history.replace('/')
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return accessToken
  }

  getProfile = (cb) => {
    let accessToken = this.getAccessToken()
    console.log('check', accessToken)
    this.auth0.client.userInfo(accessToken, function(err, user) {
      if (err) {
        console.log('err', err)
      }
      console.log(user)
      if (user) {
        // this.userProfile = user
      }
      if (cb && typeof cb === 'function') {
        return cb(err, user)
      }
      // Now you have the user's information
    });
  }

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthed = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isAdmin(rolesArray) {
    return true
    // TODO change roles
    // return rolesArray.indexOf('app-admin') > -1
  }

  isSuperAdmin(rolesArray) {
    return true
    // TODO change roles
    // return rolesArray.indexOf('app-super-admin') > -1
  }

  getRole(token) {
    const namespace = config.jwtRoleNamespace
    const idToken = token || localStorage.getItem('id_token')
    if (!idToken) {
      return null
    }
    const decoded = decode(idToken)
    return decoded[`${namespace}/roles`] || null
  }
}


export function simulateNoAuth() {
  console.log('Mangling JWTs')
  console.log('Reload page to see effect on app')
  // Break JWT for testing purposes
  const access = localStorage.getItem('access_token')
  const idToken = localStorage.getItem('id_token')
  localStorage.setItem('access_token', `x${access}`)
  localStorage.setItem('id_token', `x${idToken}`)
}
