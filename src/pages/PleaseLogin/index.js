import React from 'react'
import NotFound from '../NotFound'
import AppLayout from '../../fragments/AppLayout'

const PleaseLogin = (props) => {
  const path = props.location.pathname
  // if known protected routes, ask for login.
  if (path.match(/profile/)) {
    return (
      <AppLayout>
        <h3>You must be logged in to view this page</h3>
        <button className="button" onClick={props.logIn}>
          Log In
        </button>
      </AppLayout>
    )
  }
  // else show 404
  return <NotFound {...props} />
}

export default PleaseLogin
