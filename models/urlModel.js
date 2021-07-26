const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    username: {
        type: String,
        default: null
    },
    clicks: {
        type: Number,
        default: 0
    },
    date: {
        type:String,
        default:Date.now
    }
    
})

var URLs = mongoose.model('urls', URLSchema);

module.exports = URLs;