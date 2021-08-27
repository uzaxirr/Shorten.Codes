require('dotenv').config();
const express           =     require('express');
const port              =     process.env.PORT || 3000;
const app               =     express();
const cors              =     require('cors')
const morgan            =     require('morgan')
const path              =     require('path');
const cookieParser      =     require("cookie-parser");
const mongoose          =     require('mongoose');
const mainRoute         =     require('./routes/rootRoute');
const signUpRoute       =     require('./routes/sign-upRoute');
const loginRoute        =     require('./routes/loginRoute');
const dashboardRoute    =     require('./routes/dashboardRoute');
const logoutRoute       =     require('./routes/logoutRoute')
const DB_USRNAME        =     process.env.DB_USERNAME;
const DB_PSWRD          =     process.env.DB_PASSWORD;

app.set(port, process.env.PORT);
app.use(cors({origin: true, credentials: true}));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/sign-up', signUpRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute)
app.use('/dashboard', dashboardRoute);
app.use('/', mainRoute);


// ${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
// const MONGO_URL = 'mongodb+srv://uzair:neymarjr11@cluster0.hrfhj.mongodb.net/URL-DB?retryWrites=true&w=majority';
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
const MONGO_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hrfhj.mongodb.net/URL-DB?retryWrites=true&w=majority`;


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