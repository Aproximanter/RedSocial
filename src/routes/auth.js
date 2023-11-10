const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth', (req, res) => {
  res.render('auth');
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/auth'
}));

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/posts',
  failureRedirect: '/auth'
}));

router.get('/logout', (req, res) => {
  req.logOut(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;