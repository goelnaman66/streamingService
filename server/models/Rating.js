const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Array
    }

})


const Rating = mongoose.model('Rating', RatingSchema);

module.exports = { Rating }