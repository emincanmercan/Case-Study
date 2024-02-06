const requestLogic = require("./axiosLogic")
const Movie = require('../dbModels/netflixMovies');
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
          'Authorization': `Bearer ${process.env.TOKEN}`
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
        'Authorization': `Bearer ${process.env.TOKEN}`      
      }
    }
    let movieApiReq = await requestLogic.sendRequest(axiosParams)
    if (movieApiReq.err != '') {
      return {err : movieApiReq.err }
    }else{
      return await dbMovieLogic.insertDb(movieApiReq.response.data.results)
    }
  },
  getMovie : async function (id) {
    try {
      let movie = undefined
      if (id != undefined) {
        movie = await Movie.findOne({ _id: id });
      }else{
        movie = await Movie.find();
      }
      if (movie == null) {
        movie = []
      }
      return movie
    } catch (error) {
      return {err : error }
    }
  },
  insertMovie : async function (insertObj) {
    const newMovie = new Movie({
      id: uuidv4(),
      name: insertObj.title,
      overview: insertObj.overview,
      popularity: insertObj.popularity,
      voteAverage: insertObj.voteAverage,
      voteCount: insertObj.voteVount,
      releaseDate: insertObj.releaseDate,
      genre: insertObj.genres
    });
    try {
      await newMovie.save();
    } catch (error) {
      return {err : "Db Insert Error" }
    }
    return "Movie Saved"
  },
  deleteMovie : async function (id) {
    try {
      let deletedRes = await Movie.deleteOne({ id: id });
      if (deletedRes.deletedCount == 0) {
        return "Not Found Movie"
      }else{
        return "Deleted Movie"
      }
    } catch (error) {
      return {err : error }
    }
  }
}
module.exports = dbMovieLogic