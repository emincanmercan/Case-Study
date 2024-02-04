require("./globalRequire");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
const movieController = require('./controllers/getMovieController');

app.use('/', movieController);
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieDb');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', () => {
  console.log('MongoDB ile bağlantı kuruldu');
});
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port} !`);
});