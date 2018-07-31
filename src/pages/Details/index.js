import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'
import { movieDetails, getShowtimes } from '../../utils/api'

export default class Details extends Component {
  state = {
    movie: {
      actors: []
    }
  }

  componentDidMount() {
    const id = this.props.location.pathname.replace('/details/', '')
    movieDetails(id).then(data => {
      this.setState({
        movie: data
      })
    })
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
            <div className="col-sm-3 movie-picture">

            </div>
            <div className="col-sm-9 movie-info card">

            </div>
          </div>
        </div>
      </AppLayout>
    )
  }
}

/*
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
        </div>
      </AppLayout>
    )
*/