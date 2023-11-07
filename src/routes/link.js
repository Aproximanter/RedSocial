const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  const posts = await pool.query('SELECT * FROM posts ORDER BY id DESC');
  res.render('posts', { posts });
});

router.get('/add', (req, res) => {
  addPostData = {
    formTitle: "Agregar un post nuevo",
    formDestination: "/posts/add",
    titleData: "",
    descriptionData: "",
  }
  res.render('posts/addPost', addPostData);
});

router.post('/add', async (req, res) => {
  const { title, description } = req.body;
  //TODO: add user_id support
  const newPost = {
      title,
      description,
  };
  await pool.query('INSERT INTO posts set ?', [newPost]);
  res.redirect('/posts');
});

router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  res.redirect('/posts');
});

router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const posts = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  const post = posts[0]
  editPostData = {
    formTitle: "Editar post",
    formDestination: "/posts/edit/" + id,
    titleData: post.title,
    descriptionData: post.description,
  }
  res.render('posts/addPost', editPostData);
});

router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description} = req.body; 
  const newPost = {
      title,
      description
  };
  await pool.query('UPDATE posts set ? WHERE id = ?', [newPost, id]);
  res.redirect('/posts');
});

module.exports = router;