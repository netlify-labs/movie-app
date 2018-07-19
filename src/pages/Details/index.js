import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'
import { movieDetails } from '../../utils/api'

export default class Details extends Component {
  state = {
      movie : {
        actors: []
      },
      showtimes: ['10:45am', '12:30pm', '1:30pm', '2:00pm', '2:15pm', '3:00pm', '3:45pm', '5:00pm', '6:00pm', '7:30pm', '8:00pm', '9:00pm', '11:00pm']
  }

  componentDidMount(){
    const id = this.props.location.pathname.replace('/details/', '')
    movieDetails(id).then(data=>{
      this.setState({
          movie: data
      })
    });
  }

  renderActors(){
    const actors = this.state.movie.actors
    return actors.map((actor, i) => {
      return (
        <div key={i}>
          <strong>{actor}</strong>
        </div>
      )
    })
  }

  renderShowtimes(){
    const showtimes = this.state.showtimes
    return showtimes.map((showtime, i) => {
      return (
        <div key={i} className="col-sm-3 showtime">
          <a className="btn btn-light btn-block">
            {showtime}
          </a>
        </div>
      )
    })
  }
  
  render() {
    const movie = this.state.movie;
    const style = {
        backgroundColor: movie.color
    }
    const isAuthed = this.props.isAuthed
    return (
      <AppLayout>
        <div className="container">
          <div className="row movie-details">
            <div className="col-sm-3 movie-picture" style={style}>
                <img src={movie.image} style={{width:'100%'}} />
            </div>
            <div className="col-sm-9 movie-info card">
                <h1>{movie.title}</h1>
                <h3>Starring:</h3>
                {this.renderActors()}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h2>Showtimes</h2>
              <div className="row">
                {isAuthed && this.renderShowtimes()}
                {!isAuthed &&
                  <div className="col-sm-12 card">
                    <div className="card-body text-center">
                      <h1>Login to see showtimes</h1>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }
}
