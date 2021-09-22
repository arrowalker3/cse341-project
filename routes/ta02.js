//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const users = ['user1', 'user2', 'user3'];
let duplicateName = false;
let nonexistant = false;

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    users: users,
    duplicateName: duplicateName,
    nonexistant: nonexistant
  });
});

router.post('/addUser', (req, res, next) => {
  const newName = req.body.newName;
  if (users.includes(newName)) {
    duplicateName = true;
  } else {
    users.push(req.body.newName);
    duplicateName = false;
    nonexistant = false;
  }
  res.redirect('/ta02');
});

router.post('/removeUser', (req, res, next) => {
  const toRemove = req.body.toRemove;
  const index = users.indexOf(toRemove);

  if (index !== -1) {
    users.splice(index, 1);
    duplicateName = false;
    nonexistant = false;
  } else {
    nonexistant = true;
  }
  res.redirect('/ta02');
});

module.exports = router;
