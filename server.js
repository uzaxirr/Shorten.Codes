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
const MONGO_URL         =     process.env.MONGO_URL;

//TODO: URL Not Found error after logout
app.set(port, process.env.PORT);
app.use(cors({origin: true, credentials: true}));
app.use(express.static(path.join(__dirname, 'build')));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/sign-up', signUpRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute)
app.use('/dashboard', dashboardRoute);
app.use('/', mainRoute);


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