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
          all the movies you have ever seen or want to see! </p>
          <p className="LeftAdjustedMargin">Created for Purdue CS 252 Spring 2018 by Cyrus Santiago, Connor Todd, and Ken Sodetz. Logo created by Rylan Santos.</p>
          <p className="LeftAdjustedMargin" href="https://github.com/kcsodetz/Cinnematch">View our source code at https://github.com/kcsodetz/Cinnematch</p>
      </div>   
    );
  }
}

export default About;