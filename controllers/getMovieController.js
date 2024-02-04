const router = express.Router();
const Movie = require('../dbModels/netflixMovies'); // Model yolu projenize göre değiştirilmelidir
const dbMovieLogic = require("../logic/movieLogic")
router.get('/getAllMovie', async (req, res) => {
  let getMovieDb = await dbMovieLogic.getAllMovies();
  if (getMovieDb.err != undefined) {
    return errFunc(res, getMovieDb.err)
  }
  return res.json(getMovieDb);
});
router.get('/insertMovie', async (req, res) => {
  let movieApiResponse = await dbMovieLogic.getMovieApi();
  if (movieApiResponse.err != undefined) {
    return errFunc(res, movieApiResponse.err)
  }
  return res.json(movieApiResponse);
});


module.exports = router;