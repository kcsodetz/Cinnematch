export function getMovieInfo(title) {
    const request = require("request");
    var url =
    "https://api.themoviedb.org/3/search/movie?api_key=d75d2433d1369590a08680adda987f45&query=";

        url += title;

    request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    console.log(
        json.results[0]
    );
    });
}