import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './MovieDisplay.css'

/**
 * Displays current movie 
 */
const MovieDisplay = ({props}) => {

  const title = props.title;
  const overview = props.overview;
  const poster_path = props.poster_path;
  const release_date = props.release_date;


  return(
    <div>
      <div>
      {'Titile: '+ title}
      </div>
      <div>
      {'Release Date: '+ release_date}
      </div>
      <div>
      {'Overview: '+ overview}
      </div>
    </div>
  )
}

export default MovieDisplay