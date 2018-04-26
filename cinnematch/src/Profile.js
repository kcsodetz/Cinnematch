import React, { Component } from 'react';
import './Profile.css'
import base from './base'
import grayX from './delete x.png';

/**
 * Class for Profile component
 */
class Profile extends Component{
/**
 * Default constructor  
 * @constructor
 * @param {Object} props 
 */
  constructor(props) {
    super(props)
    this.state = {
      profile: '',
      firebaseObject: {},
      movies: {},
      listItems: []
    }
    this.loadProfile = this.loadProfile.bind(this)
    this.removeMovie = this.removeMovie.bind(this)
    this.populatePage = this.populatePage.bind(this)
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `profile`,
    )
  }

  componentDidMount() {
    base.syncState(`users/${this.props.uid}`, {
      context: this,
      state: 'movies',
    });
    this.loadProfile()
  }

  removeItem(newItem) {
    this.setState({
      movies: this.state.movies 
    });
  }

  populatePage() {
    const movieNames = Object.keys(this.state.movies);
    const listItems = movieNames.map((movieTitles) => 
      <div className="column-og">
      <p key={movieTitles}><button className="Picture" onClick={() => this.removeMovie(movieTitles)}>
      <img src={grayX} style={{height:20}} alt=''/>
      </button>{movieTitles + " | Rating: " + `${this.state.movies[movieTitles]['rating']}` + "/10"}
      </p>
      <div className="picture-border">
      <img style={{height:300}} src={this.state.movies[movieTitles]['poster_path']} alt=''/>
      </div>
      </div>
    ); 

    this.setState({
      listItems   
    });
  }

  loadProfile() {
    base.fetch(`users/${this.props.uid}`, {
    }).then(data => {
      this.setState({profile: this.props.uid, movies: data})
      this.populatePage()
    }).catch(error => {
      //handle error
    })
  }

  removeMovie(ev) {
    const userId = this.props.uid
    const movie = ev
    const temp = this.state.movies[movie]
    this.state.movies[temp] = null
    base.remove(`users/${userId}/${movie}`).then(() => {
      this.removeItem(movie)
      this.loadProfile()
    }).catch(error => {
      //handle error
    });
  }

  render() {

    // this.loadProfile()

    return (
      <div>
        <header className="w3-container w3-goldenrod">
          <h1 className="Center" style={{ color: 'rgb(255, 255, 255)' }}>Profile</h1>
        </header>
       
        <div className="LeftAdjustedMargin">
          <h1 className="myMovies"> My Movies </h1>
          <p>Click 'x' to remove from list</p>
          <div>
          <form id="movie-form" onSubmit={this.removeMovie}>
           
            <br></br>
           
          </form>
          </div>
          <div>
            <p>
            

              {this.state.listItems} 
            </p>
          </div>
        </div>
      </div>  
    )
  }
}
export default Profile

