const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/chat', (req, res) => {
  res.redirect('chat.html');
});

module.exports = router;