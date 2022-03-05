
const express = require('express');
const app =express();
const passport = require('passport');
const authRoutes = require('./routes/auth_routes');
const profileRoutes = require('./routes/profile_routes');
const passportSetup = require('./config/passport_config');
const flash = require('express-flash')  
const mongoose = require('mongoose');
const cookieSession = require('cookie-session')
const keys = require('./config/keys');
const User = require('./models/user_model')


app.set('view engine', 'ejs')
app.use(express.static('./assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(flash())



app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,    //Cookie's life 
    keys: [keys.session.cookieKey]   //For encrypting the cookie
}));

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('Mongoose connected');
});

//set up routes
app.use('/auth' ,authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
})

app.get('/users',(req, res) => {
    User.find().then((user,err) => {
        if (err) return res.send('Something went wrong');
        return res.json(user)
    })
    
})




app.listen(8000, () => {
    console.log('Listening to port 3000')
})
