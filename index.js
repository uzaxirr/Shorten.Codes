const express = require("express")
const app = express()

// Database config
const connection = require('./config/db.config')
mongoose.connection.once('open', function() {
    util.log(' > Mongo connection established.');
//connection.once('open', () => console.log('DB Connected'))
connection.on('error', () => console.log('Error'))

// Routes Config
app.use(express.json({
    extended: false
})) //parse incoming request body in JSON format.
app.use('/', require('./routes/redirect'))
app.use('/api/url', require('./routes/url'))

//Listen for incoming requests
const PORT = process.env.PORT || 5000
// app.listen(PORT, () =>{
//  console.log(`server started, listening PORT ${PORT}`)
// })


app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${port}`);
})