require("./globalRequire");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
require('dotenv').config();
app.use(cors());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
const movieController = require('./controllers/movieController');

app.use('/', movieController);
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`); // get Dbname .env
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB failed:'));
db.once('open', () => {
  console.log('MongoDB connected');
});
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port} !`);
});