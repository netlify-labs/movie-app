import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as userActions from '../../redux/user'
import { simulateNoAuth } from '../../utils/auth'

class NavBar extends Component {
  logIn = () => {
    const { dispatch } = this.props
    return dispatch(userActions.login())
  }
  render() {
    const { auth, isAuthed } = this.props
    const styles = { margin: 15 }

    let leftNav = (
      <div>
        <Link to={`/profile/`} style={styles}>
          Profile (protected)
        </Link>
        <Link to={`/this-doesnt-exist/`} style={styles}>
          404 link
        </Link>
      </div>
    )

    let rightNav = (
      <span>
        <a href="https://github.com/repo">
          View on Github
        </a>
        <button style={{marginLeft: 20}} className="button" onClick={this.logIn}>
          Log In
        </button>
      </span>
    )

    // Logged in Nav bar
    if (isAuthed) {
      leftNav = (
        <span>
          <Link to={`/profile/`} style={styles}>
            Profile
          </Link>
        </span>
      )
      rightNav = (
        <span>
          <button className="button" onClick={simulateNoAuth}>
            Mangle JWT Token
          </button>
          <button className="button" onClick={auth.logout} style={styles}>
            Log Out
          </button>
        </span>
      )
    }

    return (
      <div>
        <nav className='navbar'>
          <div className='left-nav'>
            <Link className='logo' title='logo' to='/'>
              APP LOGO
            </Link>
            {leftNav}
          </div>
          <div className='right-nav'>
            {rightNav}
          </div>
        </nav>
        <div className='navbar-spacer' />
      </div>
    )
  }
}

const NavBarWithData = connect()(NavBar)

export default NavBarWithData
