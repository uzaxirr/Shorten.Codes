const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type:String,
        default:Date.now
    }
})

var URLs = mongoose.model('urls', URLSchema);

module.exports = URLs;