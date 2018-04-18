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
        <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option">  </Dropdown>
      </div>   
    );
  }
}

export default Movies;