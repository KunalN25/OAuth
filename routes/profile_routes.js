const router = require('express').Router();
const User = require('../models/user_model')

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
});

router.get('/alter', authCheck, (req, res) => {
    res.render('alter_prof', {user: req.user});
})

router.post('/alter', authCheck, (req, res) => {
    if(req.body.name === ''){
        req.flash('error_msg', 'Cannot be empty');
        res.redirect('/profile/alter');
    }

    User.findOne({ _id: req.user.id }, (err, user) => {
        //user is the user object thats returned to us
        if(err)     return res.redirect('/profile/alter')

        if(!user) {
            return res.redirect('/profile/alter');
        } else {
            user.name = req.body.name;
            user.save().then((err, done) => {
                
                return res.redirect('/profile/alter');
            })
            res.redirect('/profile');
        }
       
    })
})

module.exports = router;