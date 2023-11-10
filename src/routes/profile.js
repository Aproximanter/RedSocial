
const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const pool = require('../db');

router.get('/', helpers.isLoggedIn, (req, res) => {
  res.redirect('/profile/' + req.user.id);
});

router.get('/:id', helpers.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const [user] = await pool.query('SELECT * FROM users WHERE id = ?', id);
  if (user == undefined) {
    res.redirect('/profile')
  }
  res.render('profile', { profileUser: user });
});

module.exports = router;
