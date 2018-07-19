import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../fragments/AppLayout'
import { movieDetails } from '../../utils/api'

export default class Details extends Component {
  state = {
      movie : {}
  }

  componentDidMount(){
    movieDetails(this.props.match.params.id).then(data=>{
      console.log(data)
      this.setState({
          movie: data
      })
    }
    );
  }
  
  render() {
    const movie = this.state.movie;
    const style = {
        backgroundColor: movie.color
    }
    return (
      <AppLayout>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
                <img src={movie.image} style={{width:'100%'}} />
            </div>
            <div className="col-sm-9">
                <h1>{movie.title}</h1>
            </div>
          </div>
        </div>
      </AppLayout>
    )
  }
}
