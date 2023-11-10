const express = require('express');
const router = express.Router();
const pool = require('../db');
const helpers = require('../lib/helpers');

router.get('/', helpers.isLoggedIn, async (req, res) => {
  const posts = await pool.query(`SELECT
  P.content AS content,
  P.id AS id,
  P.userFK AS userFK,
  U.full_name AS user_name,
  U.privilege AS user_privilege,
  U.img AS user_pfp
FROM
  Posts P
JOIN
  Users U ON P.userFK = U.id
ORDER BY P.id DESC`);
  res.render('posts', { posts });
});

router.get('/add', helpers.isLoggedIn, (req, res) => {
  addPostData = {
    formTitle: "Agregar un post nuevo",
    formDestination: "/posts/add",
    titleData: "",
    descriptionData: "",
  }
  res.render('posts/addPost', addPostData);
});

router.post('/add', helpers.isLoggedIn, async (req, res) => {
  const { content } = req.body;
  //TODO: add user_id support
  const newPost = {
      content,
      userFK: req.user.id
  };
  await pool.query('INSERT INTO posts set ?', [newPost]);
  res.redirect('/posts');
});

router.get('/delete/:id', helpers.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const [post] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  if (post.length === 0) {
    res.redirect('/posts');
    return;
  }
  if (req.user.id === post.userFK || req.user.privilege >= 1) {
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  } else {
    res.redirect('/posts');
    return;
  }
  await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  res.redirect('/posts');
});

router.get('/edit/:id', helpers.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const posts = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);
  const post = posts[0]
  editPostData = {
    formTitle: "Editar post",
    formDestination: "/posts3/edit/" + id,
    titleData: post.title,
    descriptionData: post.description,
  }
  res.render('posts/addPost', editPostData);
});

router.post('/edit/:id', helpers.isLoggedIn, async (req, res) => {
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