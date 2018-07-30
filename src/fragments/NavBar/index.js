import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as userActions from '../../redux/user'

class NavBar extends Component {
  logIn = () => {
    const { dispatch } = this.props
    return dispatch(userActions.login())
  }
  render() {
    const { auth, isAuthed } = this.props

    let leftNav = (
      <div>
        {/*
        <Link to={`/profile/`} style={styles}>
          Profile (protected)
        </Link>
        */}
      </div>
    )

    let rightNav = (
      <span>
        <a href="https://github.com/DavidWells/meetup-app" target="_blank">
          <i className="fab fa-github"></i>
        </a>
        <button style={{marginLeft: 20}} className="btn" onClick={this.logIn}>
          Log In
        </button>
      </span>
    )

    // Logged in Nav bar
    if (isAuthed) {
      leftNav = (
        <span>
          {/*
          <Link to={`/profile/`} style={styles}>
            Profile
          </Link>
          */}
        </span>
      )
      rightNav = (
        <span>
          <a href="https://github.com/DavidWells/meetup-app" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="" onClick={auth.logout} style={{marginLeft: 20}}>
            Logout
          </a>
          <Link to={`/profile/`} className="btn btn-dark" style={{marginLeft: 20}}>
            Profile
          </Link>
        </span>
      )
    }

    return (
      <div>
        <nav className='navbar'>
          <div className='left-nav'>
            <Link className='logo d-sm-none d-none d-sm-block d-md-block' title='logo' to='/'>
              Universe Theater
            </Link>

            <Link className='logo d-block d-sm-none' title='logo' to='/'>
              UT
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
