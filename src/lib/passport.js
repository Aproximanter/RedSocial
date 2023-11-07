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

  try {
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
  } catch (err) {
    return done(null, false); //TODO: this isnt redirecting to the failureRedirect option
  }
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user);
    } else {
      done(null, false);
    }
  } else {
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});