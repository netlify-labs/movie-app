import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'

export default class Profile extends Component {

  render() {
    const { profile } = this.props

    if (!profile) {
      return <div>Loading</div>
    }

    const image = (profile.picture) ? <img src={profile.picture} alt="profile" className="img-thumbnail" /> : null

    return (
      <AppLayout>
        <div className="container card">
          <div className="card-body">
            <h1>{profile.name} <small>({profile.nickname})</small></h1>
            <div class="row">
              <div class="col-sm-6">
              {image}
              </div>
              <div className="col-sm-6">
                <h2>User data from JWT</h2>
                <pre>
                  {JSON.stringify(profile, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }
}
