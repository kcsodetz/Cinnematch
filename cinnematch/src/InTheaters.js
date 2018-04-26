import React from 'react'
import grayX from './delete x.png';

class Showtimes extends React.Component{
  constructor() {
    super();
    this.state = {
      json: {},
      listView: [],
      listItems: [],
      movieInfo: {},
      rendered: false
    };
    this.apiRequest = this.apiRequest.bind(this);
  }  


  populatePage() {
    const keys = Object.keys(this.state.json.results)
    const length = keys.length
    console.log(this.state.json.results);

    const path = 'https://image.tmdb.org/t/p/w500/'
    var i = 0;

    var listItems = []

    for(i = 0; i < length; i++){
      listItems.push (
        <div className="LeftAdjustedMargin">
        <div className="column">
          <p key={i}>
          {this.state.json.results[i].title + ": " + this.state.json.results[i].vote_average + "/10"}
          </p>
          <img style={{height:300}} src={path + this.state.json.results[i]['poster_path']}/>
          </div>
        </div>
        )
         
       
    }

    
    // const listItems = keys.map((i) => 
    //   <div>
    //   <p key={i}>
    //   <img src={grayX} style={{height:20}}/>
    //   {this.state.json.results[i].title}
    //   </p>
    //   </div>
    // ); 

    this.setState({
      listItems   
    });

  }

  /**
   * API request for current movies in theaters around the US
   */
  apiRequest() {
    const url = "https://api.themoviedb.org/3/movie/now_playing?api_key=d75d2433d1369590a08680adda987f45&language=en-US&page=1";
    
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ json }))
      .then((populate) => this.populatePage())
  }
  
  render() {
    return(
      <div>
        <header className="w3-container w3-goldenrod">
          <h1 className="Center" style={{ color: 'rgb(255, 255, 255)' }}>In Theaters</h1>
        </header>
        <div>
          {/* <button onClick={this.apiRequest()}>Whats in Theaters</button> */}

          <button className="LeftAdjustedMargin" onClick={this.apiRequest}>Whats in Theaters</button>
          {this.state.listItems}
        </div>
      </div>   
    );
  }
}

export default Showtimes;