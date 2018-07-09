import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as userActions from './redux/user'
import { auth } from './redux/user'
/* import react components for routes */
import NavBar from './fragments/NavBar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/UserProfile'
import Welcome from './pages/Welcome'
import Loading from './pages/Loading'
import PleaseLogin from './pages/PleaseLogin'
import NotFound from './pages/NotFound'


class App extends React.Component {
  componentWillMount() {
    this.checkLogin()
  }
  logIn = () => {
    const { dispatch } = this.props
    return dispatch(userActions.login())
  }
  checkLogin = () => {
    const { isAuthed, dispatch } = this.props
    if (isAuthed) {
      auth.getProfile((err, profile) => {
        if (err) {
          // clear old tokens
          return dispatch(userActions.logout())
        }
        // profile recieved from auth0, set profile
        return dispatch(userActions.loginSuccess(profile))
      })
    }
  }
  render () {
    const props = this.props
    // Route View Components
    const navBar = (p) => <NavBar isAuthed={props.isAuthed} auth={auth} {...p} />
    const profile = (p) => <Profile profile={props.profile} {...p} />

    return (
      <div className='app-wrapper'>
        <Route path="/" render={navBar} />
        <Switch>
          <Route path="/callback" render={(props) => {
            // parse auth hash
            handleAuthentication(props)
            return <Loading />
          }} />
          {/* The route below handles authed + logged out urls */}
          <Route {...props} render={(p) => {
            // loading state
            if (props.loading || props.location.pathname === '/callback') {
              return <Loading />
            }

            // Non-authed routes
            if (!props.isAuthed) {
              return (
                <Switch>
                  <Route path={`/`} exact component={Welcome} />
                  <Route render={() => <PleaseLogin logIn={this.logIn} {...props} />}  />
                </Switch>
              )
            }

            // Protected routes
            return (
              <Switch>
                <Route path={`/`} exact component={Dashboard} />
                <Route path={`/profile`} render={profile} />
                <Route component={NotFound} />
              </Switch>
            )
          }}
          />
        </Switch>
      </div>
    )
  }
}

function handleAuthentication (nextState, replace) {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const stateToProps = ({ user }) => ({
  profile: user.profile,
  loading: user.loading,
  isAuthed: user.isAuthenticated
})

export default withRouter(connect(stateToProps)(App))
