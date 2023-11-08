const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('landing');
});

router.get('/egresados', (req, res) => {
  res.render('egresados');
});

router.get('/posts2', (req, res) => {
  res.render('posts2');
});

module.exports = router;