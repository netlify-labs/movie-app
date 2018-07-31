import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'
import { movieDetails, getShowtimes } from '../../utils/api'

export default class Details extends Component {
  state = {
    movie: {
      actors: []
    },
    showtimes: []
  }

  componentDidMount() {
    const id = this.props.location.pathname.replace('/details/', '')
    movieDetails(id).then(data => {
      this.setState({
        movie: data
      })
    })

    getShowtimes().then(data => {
      this.setState({
        showtimes: data.data
      })
    })
  }

  seeMovie(showtime) {
    alert(`You have chosen the ${showtime} showtime. Enjoy the show!`)
  }

  renderActors() {
    const actors = this.state.movie.actors
    return actors.map((actor, i) => {
      return (
        <div key={i} className='actor'>
          <strong>{actor}</strong>
        </div>
      )
    })
  }

  renderShowtimes() {
    const showtimes = this.state.showtimes
    return showtimes.map((showtime, i) => {
      return (
        <div key={i} className="col-sm-4 col-lg-3 showtime">
          <a className="btn btn-light btn-block" onClick={() => this.seeMovie(showtime)}>
            {showtime}
          </a>
        </div>
      )
    })
  }

  render() {
    const movie = this.state.movie
    const style = {
      backgroundColor: movie.color
    }
    const isAuthed = this.props.isAuthed
    return (
      <AppLayout>
        <div className="container">
          <div className="row movie-details">
            <div className="col-sm-3 movie-picture" style={style}>
              <img src={movie.image} style={{width: '100%'}} alt="Poster" />
            </div>
            <div className="col-sm-9 movie-info card">
              <h1>{movie.title}</h1>
              <h3>Starring:</h3>
              <div className="actors">
                {this.renderActors()}
              </div>
            </div>
          </div>
          <div className="row showtimes">
            <div className="col-sm-12">
              <h2>Showtimes</h2>
              <div className="row">

              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }
}


/*
{isAuthed && this.renderShowtimes()}
{!isAuthed &&
  <div className="col-sm-12 card">
    <div className="card-body text-center">
      <h1>Login to see showtimes</h1>
    </div>
  </div>
}
*/
