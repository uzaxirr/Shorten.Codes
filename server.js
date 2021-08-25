require('dotenv').config();
const express           =     require('express');
const port              =     process.env.PORT || 8080;
const app               =     express();
const morgan            =     require('morgan')
const path              =     require('path');
const cookieParser      =     require("cookie-parser");
const mongoose          =     require('mongoose');
const mainRoute         =     require('./routes/rootRoute');
const signUpRoute       =     require('./routes/sign-upRoute');
const loginRoute        =     require('./routes/loginRoute');
const dashboardRoute    =     require('./routes/dashboardRoute');
const logoutRoute       =     require('./routes/logoutRoute');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'src')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/sign-up', signUpRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute)
app.use('/dashboard', dashboardRoute);
app.use('/', mainRoute);


const MONGO_URL = process.env.MONGO_URL;


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