const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth', (req, res) => {
  res.render('auth');
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/posts'
  })(req, res, next);
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/posts',
  failureRedirect: '/auth'
}));

module.exports = router;