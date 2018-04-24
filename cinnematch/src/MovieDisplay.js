import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './MovieDisplay.css'

/**
 * Displays current movie 
 */
const MovieDisplay = ({props}) => {

  const obj = props.obj;
  const title = obj.title;
  const overview = obj.overview;
  const poster_path = obj.poster_path;
  const release_date = obj.release_date;


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

export default MovieDisplay