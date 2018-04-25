import React, { Component } from 'react';

import './Profile.css'
import firebase from 'firebase/database'
import base from './base'

class Profile extends Component{

  constructor(props) {
    super(props)
    this.state = {
      profile: '',
      movies: []
    }
    this.loadProfile = this.loadProfile.bind(this)
    this.addMovie = this.addMovie.bind(this)

  }

  syncNotes = () => {
    this.ref = base.syncState(
      `profile`,
      
    )
  }

  componentDidMount(){
    base.syncState(`users/${this.props.uid}`, {
      context: this,
      state: 'movies',
      asArray: true
    });
  }
  addItem(newItem){
    console.log(newItem)
    console.log(this.state.movies)
    this.setState({
      movies: this.state.movies //updates Firebase and the local state
    });
  }

  loadProfile(ev){
    base.fetch('users', {
    }).then(data => {
      console.log(data[this.props.uid]);
      this.setState({profile: this.props.uid,movies: data[this.props.uid]})
    }).catch(error => {
      //handle error
    })
  }

  addMovie(ev){
    ev.preventDefault()
    const userId = this.props.uid
    const movie = ev.target.movieName.value
    const temp = this.state.movies.push(movie)
    base.post(`users/${userId}`, {
      data: this.state.movies
    }).then(() => {
      this.addItem(movie)
    }).catch(err => {
      // handle error
    });
      //this.setState({profile: 'Connor', movies: {"inception": "inception"}})
  }


  render(){
    return (
      <div>
        <header>
          <h1 className="Center">Profile</h1>
          <button onClick={this.loadProfile}>Load Profile</button>
          <h1 className="myMovies"> My Movies </h1>
          <form id="movie-form" onSubmit={this.addMovie}>
            <div className="input-group">
              <label htmlFor="movieName">
                  <input
                    type="text"
                    ref='movie-name-ref'
                    className="input-group field"
                    name="movieName"
                    placeholder="Enter the name of your movie"
                    required
                    autoFocus
                  />
                  </label>
                  
            </div>
            <br></br>
            <input type="submit" value="Submit" onSubmit={this.addMovie} />
          </form>
        </header>
      </div>  
    )
  }
}
export default Profile

