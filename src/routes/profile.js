
const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const pool = require('../db');

router.get('/', helpers.isLoggedIn, (req, res) => {
  res.redirect('/profile/' + req.user.id);
});

router.get('/all', helpers.isLoggedIn, async (req, res) => {
  tableUsers = await pool.query('SELECT * FROM users');
  res.render('profile/all', { tableUsers });
});

router.get('/:id', helpers.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const [user] = await pool.query('SELECT * FROM users WHERE id = ?', id);
  if (user == undefined) {
    res.redirect('/profile')
    return;
  }
  res.render('profile', { profileUser: user });
});


router.post('/update/:id', helpers.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { full_name, password, control_number } = req.body;

  let profilePic = 'default.jpg';
  if (req.file) {
    profilePic = req.file.filename;
  }

  const updateUser = {};

  if (full_name) {
    updateUser.full_name = full_name;
  }
  if (control_number) {
    updateUser.control_number = control_number;
  }
  if (password) {
    hashedPassword = await helpers.encryptPassword(password);
    updateUser.password = hashedPassword;
  }

  try {
    console.log("UPDATING USER: ", updateUser);
    await pool.query('UPDATE Users SET ? WHERE id = ?', [updateUser, id]);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    res.redirect('/profile/' + id);
  }
});


module.exports = router;
