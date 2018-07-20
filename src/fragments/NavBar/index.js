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
        {/* 
        <Link to={`/profile/`} style={styles}>
          Profile (protected)
        </Link>
        */}
      </div>
    )

    let rightNav = (
      <span>
        <a href="https://github.com/repo" target="_blank">
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
          <a href="https://github.com/repo" target="_blank">
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
            <Link className='logo' title='logo' to='/'>
              Universe Theater
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
