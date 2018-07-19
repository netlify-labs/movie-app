import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../fragments/AppLayout'
import { InstantSearch, Hits, SearchBox } from 'react-instantsearch-dom';

export default class Dashboard extends Component {
  
  componentDidMount(){

  }

  Product({hit}){
    console.log(hit);
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
          <h1>Top Movies</h1>
          <InstantSearch appId="latency" apiKey="56f24e4276091e774e8157fe4b8b11f6" indexName="movies">
            <SearchBox />
              <Hits hitComponent={this.Product}/>
        </InstantSearch>
        </div>
      </AppLayout>
    )
  }
}
