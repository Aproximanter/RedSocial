const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/chat', (req, res) => {
  res.render('chat');
});

module.exports = router;