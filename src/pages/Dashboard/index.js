import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../fragments/AppLayout'
import { getMovies, searchMovies, Product, Search } from '../../utils/api'
import * as algoliasearch from 'algoliasearch';
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-dom';

export default class Dashboard extends Component {
  state = {
    movies: [],
    results: []
  }
  componentDidMount(){

    /*
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
    */
  }
  /*
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
  */
  Product({hit}){
    console.log(hit);
    return (
      <Link to={`/details/` + hit.objectID}>
        <div style={{backgroundColor: '#'+ hit.color}}>
          <img src={hit.image} />
          {hit.title}
        </div>
      </Link>
    )
  }
  render() {
    return (
      <AppLayout>
        <div className="container">
          <h1>Movies</h1>
          <InstantSearch appId="latency" apiKey="56f24e4276091e774e8157fe4b8b11f6" indexName="movies">
            <SearchBox />
              <Hits hitComponent={this.Product}/>
        </InstantSearch>
        </div>
      </AppLayout>
    )
  }
}
