const router = express.Router();
const dbMovieLogic = require("../logic/movieLogic")
router.get('/getAllMovie', async (req, res) => {
  let getMovieDb = await dbMovieLogic.getMovie();
  if (getMovieDb.err != undefined) {
    return errFunc(res, getMovieDb.err)
  }
  return res.json(getMovieDb);
});
router.get('/insertMovieWithApi', async (req, res) => {
  let movieApiResponse = await dbMovieLogic.getMovieApi();
  if (movieApiResponse.err != undefined) {
    return errFunc(res, movieApiResponse.err)
  }
  return res.json(movieApiResponse);
});
router.post('/insertMovie', async (req, res) => {
  let insertObj = req.body.data
  let movieInsertRes = await dbMovieLogic.insertMovie(insertObj);
  if (movieInsertRes.err != undefined) {
    return errFunc(res, movieInsertRes.err)
  }
  return res.json(movieInsertRes);
});
router.get('/movies/:id', async (req, res) => {
  let id =  req.params.id
  let movieResponse = await dbMovieLogic.getMovie(id);
  if (movieResponse.err != undefined) {
    return errFunc(res, movieResponse.err)
  }
  return res.json(movieResponse);
});
router.delete('/movies/:id', async (req, res) => {
  let id = req.params.id
  let movieDeleteResponse = await dbMovieLogic.deleteMovie(id);
  if (movieDeleteResponse.err != undefined) {
    return errFunc(res, movieDeleteResponse.err)
  }
  return res.json(movieDeleteResponse);
});


module.exports = router;