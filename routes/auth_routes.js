const router = require('express').Router()
const passport = require('passport');


const authCheck = (req, res, next) => {
    if(!req.user){
        next();
    } else {
        res.redirect('/profile');
    }
};

//auth login
router.get('/login',authCheck, (req, res) => {
    res.render('login', { user: req.user});
})

//auth logout
router.get('/logout', (req,res) => {
    //logout using passport
    //This will remove all the user data from the session cookie
    req.logout();
    res.redirect('/auth/login');
})

//auth login with google
router.get('/google', passport.authenticate('google',{
    scope:['profile']
}));
//Using passport for google sign-in

//callback route for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
     /*Additionally, google gives a code which would then
        be used by passport to get the user details from
        google with the passport callback function 
        in the passport_config file
     */    
    res.redirect('/profile')
//    res.send('passport callback') ;
       

})

module.exports = router;