const requestLogic = require("./axiosLogic")
const Movie = require('../dbModels/netflixMovies'); // Model yolu projenize göre değiştirilmelidir
const { v4: uuidv4 } = require('uuid');

let dbMovieLogic = {

  insertDb : async function (movieData) {
    if (!Array.isArray(movieData)) {
     return {err : "Error Type" }
    }
    let filmLimit = movieData.length < 5 ? movieData.length : 5;
    let movieDetailsArray = []
    for (let i = 0; i < filmLimit; i++) {
      let movieId = movieData[i].id;
      let axiosParams = {
        method : "get",
        url : `https://api.themoviedb.org/3/movie/${movieId}?language=tr-TR`,
        headers :  { 
        }
      }
      let movieApiReqDetails = await requestLogic.sendRequest(axiosParams)
      if (movieApiReqDetails.err != '') {
        return {err : movieApiReqDetails.err}
      }
      movieDetailsArray.push(movieApiReqDetails.response.data);
    }
    for (let i = 0; i < movieDetailsArray.length; i++) {
      let elementMovieDetails = movieDetailsArray[i]
      const newMovie = new Movie({
        id: uuidv4(),
        name: elementMovieDetails.title,
        overview: elementMovieDetails.overview,
        popularity: elementMovieDetails.popularity,
        voteAverage: elementMovieDetails.vote_average,
        voteCount: elementMovieDetails.vote_count,
        releaseDate: elementMovieDetails.release_date,
        genre: elementMovieDetails.genres
      });
      try {
        await newMovie.save();
      } catch (error) {
        return {err : "Db Insert Error" }
      }
    }
    return "All Movies Saved"
  },
  getMovieApi : async function (params) {
    let axiosParams = {
      method : "get",
      url : "https://api.themoviedb.org/3/discover/movie?vote_count.gte=1500&vote_average.gte=8.4&sort_by=release_date.asc",
      headers :  { 
      }
    }
    let movieApiReq = await requestLogic.sendRequest(axiosParams)
    if (movieApiReq.err != '') {
      return {err : movieApiReq.err }
    }else{
      return await dbMovieLogic.insertDb(movieApiReq.response.data.results)
    }
  },
  getAllMovies : async function (params) {
    try {
      const movies = await Movie.find();
      return movies
      } catch (error) {
        return {err : error }
    }
  }
}
module.exports = dbMovieLogic