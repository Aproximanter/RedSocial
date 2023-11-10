
const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const pool = require('../db');
const { profile, log } = require('console');

router.get('/', helpers.isLoggedIn, (req, res) => {
  res.redirect('/profile/' + req.user.id);
});

router.get('/all', helpers.isLoggedIn, async (req, res) => {
  tableUsers = await pool.query('SELECT * FROM users');
  res.render('profile/all', { tableUsers });
});

router.get('/:id', helpers.isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const [user] = await pool.query(`SELECT
  U.id,
  U.control_number,
  U.password,
  U.full_name,
  U.email,
  U.img,
  U.privilege,
  U.status,
  (SELECT COUNT(*) FROM Follows F1 WHERE F1.followerFK = U.id) AS following,
  (SELECT COUNT(*) FROM Follows F2 WHERE F2.followedFK = U.id) AS followers
FROM
  Users U
WHERE id = ?`, id);
  if (user == undefined) {
    res.redirect('/profile')
    return;
  }
  try {
    var [isFollowed] = await pool.query('SELECT * FROM Follows WHERE followerFK = ? AND followedFK = ?', [req.user.id, user.id]);
    isFollowed = !!isFollowed;
  } catch (error) {
    console.error('Error checking if following:', error);
    return false;
  }
  const isDifferentUser = req.user.id !== user.id;
  user.isFollowed = isFollowed;
  user.isDifferentUser = isDifferentUser;
  res.render('profile', { profileUser: user , isFollowed, isDifferentUser});
});

router.post('/follow/:id', async (req, res) => {
  try {
    const { id: followerId } = req.user;
    const { id } = req.params;
    console.log('following:', id, 'follower:', followerId);
    await pool.query('INSERT INTO Follows (followerFK, followedFK) VALUES (?, ?)', [followerId, id]);
    res.redirect('/profile/' + id);
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/unfollow/:id', async (req, res) => {
  try {
    const { id: followerId } = req.user;
    const { id } = req.params;
    await pool.query('DELETE FROM Follows WHERE followerFK = ? AND followedFK = ?', [followerId, id]);
    res.redirect('/profile/' + id);
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).send('Internal Server Error');
  }
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

router.post('/delete/:id', async (req, res) => {
  try {
    const { id: toDeleteUserId } = req.params;
    const loggedInUser = req.user;
    console.log(loggedInUser.id, toDeleteUserId);
    if (loggedInUser && (loggedInUser.privilege === 1 || loggedInUser.id === parseInt(toDeleteUserId))) {
      await pool.query('DELETE FROM Users WHERE id = ?', [parseInt(toDeleteUserId)]);

      if (loggedInUser.id === parseInt(toDeleteUserId)) {
        req.logOut(() => {
          res.redirect('/');
        });
        return;
      }
      res.redirect('/');
    } else {
      res.status(403).send('Permission denied.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
