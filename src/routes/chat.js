const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/chat/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'chat', 'index.html'));
});

module.exports = router;