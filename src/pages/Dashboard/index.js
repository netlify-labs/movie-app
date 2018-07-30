import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../fragments/AppLayout'
import { getMovies } from '../../utils/api'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-dom';
import config from '../../_config'

export default class Dashboard extends Component {
  state = {
    movies : []
  }

  componentDidMount(){
    getMovies().then(data=>{
      console.log(data);
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
  Product({hit}){
    return (
      <Link to={`/details/` + hit.objectID}>
        <div className="movie-preview" style={{backgroundColor: hit.color}}>
          <img src={hit.image} className="img-fluid image" alt="Movie Poster" />
          {hit.title}
        </div>
      </Link>
    )
  }

  render() {
    return (
      <AppLayout>
        <div className="container">
          {this.renderMovies()}
        </div>
        <div className="container">
          <h1>Top Movies</h1>
          <InstantSearch appId={config.algolia.appId} apiKey={config.algolia.apiKey} indexName={config.algolia.index}>
            <SearchBox />
            <Hits hitComponent={this.Product}/>
        </InstantSearch>
        </div>
      </AppLayout>
    )
  }
}
