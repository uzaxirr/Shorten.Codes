const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/urlshortner';

mongoose.connect(DB_URL, {useNewUrlParser: true,useUnifiedTopology: true});

const connection = mongoose.connect;

module.exports = connection;