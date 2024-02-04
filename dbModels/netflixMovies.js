const mongoose = require('mongoose');

const netflixMoviesSchema = new mongoose.Schema({
    name: {
        type : String
    },
    overview: {
        type : String
    },
    popularity: {
        type : Number
    },
    voteAverage: {
        type : Number
    },
    voteCount: {
        type : Number
    },
    releaseDate: {
        type : String
    },
    genre: {
        type: [
            {
              name: {
                type: String,
              }
            }
        ]
    }
});

const NetflixMovies = mongoose.model('NetflixMovies', netflixMoviesSchema);

module.exports = NetflixMovies;