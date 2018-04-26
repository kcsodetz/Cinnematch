import React from 'react'
import 'react-dropdown/style.css'
import MovieDisplay from './MovieDisplay';
import base from './base'
import './Movies.css'
import { Link, Switch, Route, Redirect } from 'react-router-dom'


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
    this.rateMovie = this.rateMovie.bind(this)
  }

  /**
   * Populate the page with movie results 
   */
  populatePage(){
    if (this.state.json.total_results === 0) {
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

  rateMovie(ev){
    ev.preventDefault()
    let movie = {...this.state.movie};
    var rating = ev.target.movieRating.value
    var default_rate = "NA"
    
    if(rating > 10){
      rating = 10
      default_rate = 10
    }
    if(rating < 0){
      rating = 0
      default_rate = 0
    }
    if (rating <= 10 && rating >= 0) {
      default_rate = 0
    }
    if (default_rate === "NA") {
      rating = "NA"
    }
    // window.alert("Rating is" + rating + " and def rate is " + default_rate)
    movie['rating'] = rating
    this.setState({
      movie
    })
  }

  /**
   * Helper to add the new movie object to the database
   * @param {Object} newItem 
   */
  addItem(newItem){
    this.setState({
      movies: this.state.movies
    });
    window.alert("Success! Movie Added!")
  }

  loadProfile() {
    base.fetch(`users/${this.props.uid}`, {
    }).then(data => {
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
    var rate_check = this.state.movie['rating']
    if (rate_check === undefined) {
      this.state.movie['rating'] = "NA"
    }
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
    if (props.length === 0) {
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
  }

  /**
   * Render function 
   */
  render() {

    return(
      <div>
        <div className="CenterNoMargin">
          <header className="w3-container w3-goldenrod">
            <h1 className="Center" style={{ color: 'rgb(255, 255, 255)' }}>Rate Movies</h1>
         </header>
        </div> 
        <div className="LeftAdjustedMargin">
        <form id="movie-form" onSubmit={this.handleChange}>
          <div className="input-group">
            <label htmlFor="movieName">
                <input
                  type="text"
                  ref='movie-name-ref'
                  className="input-group field"
                  name="movieName"
                  placeholder="Search for a movie here"
                  required
                  autoFocus
                />
                </label>
                
          </div>
          
          <br></br>
          <input type="submit" value="Search Movie" onSubmit={this.handleChange} />
          </form>
          {this.state.showComponenet ? 
          <div>
            <form id="movie-rating-form" onSubmit={this.rateMovie} >
        <div className="input-group">
          <label htmlFor="movieRating">
              <input
                type="text"
                ref='movie-rating-form'
                className="input-group field"
                name="movieRating"
                placeholder="Rate Movie Here"
                required
              />
          </label>
          <input type="submit" value="Rate Movie " onSubmit={this.rateMovie} />
        </div>
          <br></br>
        </form> 
          <button className="w3-goldenrod" onClick={this.addMovie}><Link to="/profile">Add to My Movies</Link></button>
          
            <MovieDisplay props={this.state.movie}/></div> :
              null
          }
        
        
        
      
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