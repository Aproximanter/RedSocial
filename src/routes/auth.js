const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth', (req, res) => {
  res.render('auth');
});

router.post('/signin', (req, res) => {
  console.log(req.body);
  res.send('sign in');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/posts',
  failureRedirect: '/auth'
}));

module.exports = router;