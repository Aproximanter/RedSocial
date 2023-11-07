const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const helpers = require('./helpers');
const pool = require('../db');


passport.use('local.signup', new LocalStrategy({
  usernameField: 'controln',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, control_number, password, done) => {
  const { name, email } = req.body; // Make sure to get 'matricula' from the request
  let newUser = {
    control_number,
    full_name: name,
    email: email
  };
  newUser.pass = await helpers.encryptPassword(password);
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});