import React, { Component } from 'react'
import AppLayout from '../../fragments/AppLayout'
import { getMovies } from '../../utils/api'

export default class Dashboard extends Component {
  state = {
    movies: []
  }
  componentDidMount(){
    getMovies().then((data) => {
      console.log('api data', data)
      if (data.error) {
        alert(`Error from API: ${data.error}`)
        // throw or update UI
        return false
      }

      this.setState({
        movies: data.movies
      })
    })
  }
  renderMovies() {
    const { movies } = this.state
    return movies.map((movie, i) => {
      return (
        <div key={i}>
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
        <h1>Movies</h1>
        {this.renderMovies()}
      </AppLayout>
    )
  }
}
