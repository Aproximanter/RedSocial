const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/auth', (req, res) => {
  res.render('auth');
});

module.exports = router;