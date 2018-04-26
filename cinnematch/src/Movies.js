import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {getMovieInfo} from './api-request'
import MovieDisplay from './MovieDisplay';
import firebase from 'firebase/database'
import base from './base'
import './Movies.css'
const options = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
]

const defaultOption = options[0]

/**
 * Class allowing the user to rate and add a movie to their profile
 */
class Movies extends React.Component{
  /**
   * Default constructor  
   * @constructor
   * @param {object} props 
   */
  constructor(props) {
    super(props)
    this.state = {
      movies: {},
      json: {},
      showComponenet: false,
      movie_query: '',
      movie: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.addMovie = this.addMovie.bind(this)
    this.getRealName = this.getRealName.bind(this)
  }

  /**
   * Populate the page with movie results 
   */
  populatePage(){
    if (this.state.json.total_results == 0) {
      window.alert("Your search for \"" + this.state.movie_query + "\" turned up no results")
      return;
    }
    const obj = this.state.json.results[0];
    // initialize movie object
    let movie = {...this.state.movie};
    // set values in movie object
    movie['title'] = obj.title;
    movie['poster_path'] = 'https://image.tmdb.org/t/p/w500/';
    movie['poster_path'] += obj.poster_path;
    movie['overview'] = obj.overview;
    movie['release_date'] = obj.release_date;
    this.setState({
      movie,
      showComponenet: true
    });
  }

  getRealName(name){
    return this.state.movie['title']
  }

  componentDidMount() {
    base.syncState(`users/${this.props.uid}`, {
      context: this,
      state: 'movies',
    });
    this.loadProfile()
  }

  /**
   * Helper to add the new movie object to the database
   * @param {Object} newItem 
   */
  addItem(newItem){
    console.log(this.state.movies)
    this.setState({
      movies: this.state.movies
    });
  }

  loadProfile() {
    base.fetch(`users/${this.props.uid}`, {
    }).then(data => {
      console.log(data)
      this.setState({profile: this.props.uid, movies: data})
    }).catch(error => {
      //handle error
    })
  }

  /**
   * Helper to add a new movie object 
   * @param {string} name 
   */
  addMovie(name){
    const userId = this.props.uid
    const movie = this.state.movie['title']
    this.state.movies[movie] = this.state.movie
    console.log(this.state.movies)
    base.post(`users/${userId}`, {
      data: this.state.movies
    }).then(() => {
      this.addItem(movie)
    }).catch(err => {
      // handle error
    });
  }

  /**
   * Handle changed state 
   * @param {Object} event 
   */
  handleChange(event) {
    event.preventDefault()
    console.log(event.target.movieName.value)
    const movieName = event.target.movieName.value
    this.fetchData(movieName)
  }

  /**
   * Handle API request 
   * @param {Object} props 
   */
  fetchData(props) {
    var url = `https://api.themoviedb.org/3/search/movie?api_key=d75d2433d1369590a08680adda987f45&query=`;

    // check if props is empty
    if (props.length == 0) {
      return;
    }

    this.setState({
      movie_query: props
    });

    url += props

    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ json }))
      .then((load) => this.loadProfile())
      .then((populate)=> this.populatePage())
      .then((add) => this.addMovie(props))
  }

  /**
   * Render function 
   */
  render() {

    return(
      <div>
        <div className="CenterNoMargin">
          <header className="w3-container w3-goldenrod">
            <h1 className="Center">Rate Movies</h1>
         </header>
        </div> 
        <div className="Center">
        <form id="movie-form" onSubmit={this.handleChange}>
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
          <input type="submit" value="Add Movie" onSubmit={this.handleChange} />
          {this.state.showComponenet ? 
            <MovieDisplay props={this.state.movie}/> :
              null
          }
        </form>
        <div className="row">
          <div className="medium-8 medium-offset-2 column">
            <ul id="movie-list" ref={this.list}>
            </ul>
          </div>
         </div>
         </div>
      </div>   
    );
  }
}

export default Movies;