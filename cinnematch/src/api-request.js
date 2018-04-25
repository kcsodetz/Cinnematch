/**
 * Returns json object if a movie with a matching title is found. Else, returns 0
 * 
 * @author: Ken Sodetz
 * @param {string} title The title of the movie   
 */
export function getMovieInfo(title) {
    const request = require("request");
    var url =
    "https://api.themoviedb.org/3/search/movie?api_key=d75d2433d1369590a08680adda987f45&query=";

    // append title to search query
    url += title;
    var json;
    request.get(url, (error, response, body) => {
        json = JSON.parse(body);
        // console.log(
        //     json.results[0]
        // );

        //window.alert(json.results[0].title);
        if (json.total_results === 0) {
            window.alert("Sorry, your search for " + title + " turned up no results")
            return 0;
       }
       else {
            return json;    
       }
    });
}