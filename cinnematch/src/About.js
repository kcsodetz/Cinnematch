import React from 'react'
/**
 * Class for About component 
 */
class About extends React.Component{
  /**
   * Render function
   */
  render() {
    return(
      <div>
        <header className="w3-container w3-goldenrod">
        <h1 className="Center" style={{ color: 'rgb(255, 255, 255)' }}> About </h1>
        </header>
        <p className="LeftAdjustedMargin" >Cinnematch allows you to rate, discover, and keep track of 
          all the movies you have ever seen or want to see! Cinnematch also helps you
          find and connect with individuals from your area that share your same taste!</p>
      </div>   
    );
  }
}

export default About;