import React from 'react';


 
class Test extends React.Component {
    render(){ 
        return(
            <html>
            
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            <body>

            <div class="w3-sidebar w3-bar-block w3-light-grey">
             <a href="#" class="w3-bar-item w3-button">Link 1</a>
             <a href="#" class="w3-bar-item w3-button w3-hover-pink">Link 2</a>
            <a href="#" class="w3-bar-item w3-button w3-hover-green">Link 3</a>
            <a href="#" class="w3-bar-item w3-button w3-hover-blue">Link 4</a>
            <a href="#" class="w3-bar-item w3-button w3-hover-red">Link 5</a>
            </div>

            <div>

            <div class="w3-container w3-dark-grey">
            <h1>My Page</h1>
            </div>

            <div class="w3-container">
            <p>When you mouse over the links inside the side navigation, the background color will change to grey by default.</p>
            <p>If you want a different background color on hover, use any of the w3-hover-color classes.</p>
            </div>

            </div>
      
            </body>
            </html>
        );
    }
}

export default Test;