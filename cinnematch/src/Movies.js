import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import {getMovieInfo} from './api-request'
const options = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
]

const defaultOption = options[0]
class Movies extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      json: {},
    }
    this.handleChange = this.handleChange.bind(this);
  }

  populatePage(){
    const obj = this.state.json.results[0]
    const title = obj.title
    var poster_path = 'https://image.tmdb.org/t/p/w500/'
    poster_path += obj.poster_path
    const overview = obj.overview
    const relese_date = obj.relese_date
  }

  handleChange(event) {
    event.preventDefault()
    console.log(event.target.movieName.value)
    const movieName = event.target.movieName.value
    this.fetchData(movieName)
  }

  fetchData(props) {
    var url = `https://api.themoviedb.org/3/search/movie?api_key=d75d2433d1369590a08680adda987f45&query=`;
    url += props
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ json }))
      .then((populate) => this.populatePage())
  }

  render() {
    return(
      <div>
        <header>
          <h1 className="Center">Rate Movies</h1>
        </header>
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
          <input type="submit" value="Submit" onSubmit={this.handleChange} />
        </form>
        <div className="row">
          <div className="medium-8 medium-offset-2 column">
            <ul id="movie-list" ref={this.list}>
            </ul>
          </div>

        </div>
      </div>   
    );
  }
}

export default Movies;