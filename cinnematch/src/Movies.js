import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
const options = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
]

const defaultOption = options[0]
class Movies extends React.Component{
  render() {
    return(
      <div>
        <header>
          <h1 className="Center">Rate Movies</h1>
        </header>
        <form>
          <p>
            <input
              type="text"
              name="movieName"
              placeholder="Enter the name of your movie"
              required
            />
          </p>
        </form>
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option">  </Dropdown>
        <button type="submit" id="addMovieButton"> Add Movie </button>
        <div className="row">
          <div className="medium-8 medium-offset-2 column">
            <ul id="flick-list">
            </ul>
          </div>
        </div>
      </div>   
    );
  }
}

export default Movies;