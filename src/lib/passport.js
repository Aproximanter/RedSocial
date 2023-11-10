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
  newUser.password = await helpers.encryptPassword(password);

  try {
    const result = await pool.query('INSERT INTO users SET ? ', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
  } catch (err) {
    console.log("WARNING: Could not sign up")
    return done(null, false); //TODO: this isnt redirecting to the failureRedirect option
  }
}));

passport.use('local.signin', new LocalStrategy({
  usernameField: 'controln',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, controlNumber, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE control_number = ?', [controlNumber]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    if (validPassword) {
      console.log(user);
      console.log("SIGNED IN user.id", user.id);
      done(null, user);
    } else {
      console.log("WARNING: User used the wrong password");
      done(null, false);
    }
  } else {
    console.log("WARNING: No such user");
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query(`SELECT
  U.id,
  U.control_number,
  U.password,
  U.full_name,
  U.email,
  U.img,
  U.privilege,
  U.status,
  (SELECT COUNT(*) FROM Follows F1 WHERE F1.followerFK = U.id) AS followers,
  (SELECT COUNT(*) FROM Follows F2 WHERE F2.followedFK = U.id) AS following
FROM
  Users U
WHERE id = ?`, [id]);
  done(null, rows[0]);
});