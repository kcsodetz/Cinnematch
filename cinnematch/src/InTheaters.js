import React from 'react'

class Showtimes extends React.Component{
  constructor() {
    super();
    this.state = {
      json: {},
      listView: [],
      rendered: false
    };
    this.apiRequest = this.apiRequest.bind(this);
  }  


  populatePage() {
    console.log(this.state.json);
    this.setState({
      rendered: true
    })
    return(
      <div>
        Funct ret
      </div>
    );
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
          <h1 className="Center">Showtimes</h1>
        </header>
        <div>
          <button onClick={this.apiRequest()}>Whats in Theaters</button>
        </div>
      </div>   
    );
  }
}

export default Showtimes;