import React from 'react';
import './MovieDisplay.css';

/**
 * Displays current movie attributes 
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
      <img
        src={poster_path} alt=''
      />
    </div>
  )
}

export default MovieDisplay