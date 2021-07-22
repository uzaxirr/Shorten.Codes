//https://www.section.io/engineering-education/nodejs-url-shortener/

const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const morgan = require('morgan')
const ValidURL = require('valid-url');
const path = require('path');
const URLSchemaMongo = require('./models/urlModel');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//const mainRouter = require('./routes/mainRoutes');
const bodyParser = require('body-parser');
const { type } = require('os');
dotenv.config()

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'src')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req,res) => {
    //console.log(req.body);
    console.log(sludge);

    console.log("testing");

    res.sendFile(path.join(__dirname, '../src/index.html'));
})
// app.get('/:sludge', (req,res) => {


//     // Schema.find ( {param : param}
//     //console.log(req.params.sludge);
//     res.redirect("https://google.com")
// }
// )

app.get('/:sludge', async (req, res) => {
    const foundObj =  await URLSchemaMongo.findOne({urlCode: req.params.sludge});
    if(foundObj)
    {
        console.log(foundObj)
        return res.redirect(foundObj.longUrl)
    }
    else
    {
        return res.status(404).json("URL Not Found");
    }
})



app.post('/', (req,res) => {

    // 1. 
    const url = req.body.name_field;
    var sludge = req.body.sludge;
    const {
        longUrl
    } = req.body 
    var shortURL = "http://shorten.codes/"+sludge;
    //console.log(longUrl);
    //console.log(sludge);
    var foundURL =  URLSchemaMongo.findOne({url});
    foundURL = new URLSchemaMongo({
        longUrl: url,
        shortUrl: shortURL,
        urlCode: sludge,
        date : new Date()
    })
     foundURL.save()
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ "URL Recived": url, "Sludge":sludge, "Short URL":shortURL }));
    //res.redirect(shortURL);
})


const MONGO_PASSWORD = "Uzair@Saad786";
// ${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
const MONGO_URL = "mongodb+srv://uzair:neymarjr11@cluster0.hrfhj.mongodb.net/URL-DB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true    
}
).then(() => {
    app.listen(port, () => {
        console.log(`Server is Running on http://localhost:${port}`);
    })
}).catch(err =>{
    console.log(err);
})
mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.")
  })


// app.listen(port, () => {
//     console.log(`Server is Running on http://localhost:${port}`);
// })