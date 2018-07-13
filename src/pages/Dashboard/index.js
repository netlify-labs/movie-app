import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'

export default class Dashboard extends Component {
  state = {
    movies = []
  }
  componentDidMount(){
    getMovies().then((data) => {
      console.log('api data', data)
      this.setState({
        movies: data.movies
      })
    })
  }
  renderMovies() {
    const { movies } = this.state
    return movies.map((movie) => {
      return (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.quote}</p>
          <p>Director: {movie.director}</p>
        </div>
      )
    })
  }
  render() {
    return (
      <AppLayout>
        <h1>Dashboard</h1>
        <p>Do it</p>
        {this.renderMovies()}
      </AppLayout>
    )
  }
}
