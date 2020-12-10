const express = require('express');
const router = express.Router();
const data = require('../data');
// const xss = require('xss');

async function getUserByEmail(email) {
  const userList = await data.users.getUsers();
  const lowerEmail = email.toLowerCase();
  for (var i = 0; i < userList.length; i++) {
    if (userList[i].email === lowerEmail) {
      return userList[i];
    }
  }
  throw `No user found`;
}

router.post('/add', async (req, res) => {

  try {
    const newUser = await data.users.addUser(req.body.firstName, req.body.lastName, req.body.gender,
        req.body.email, req.body.password);
    // console.log(newUser);
    // req.session.id = newUser.id;
    // req.session.loginOrNot = true;
  } catch (e) {
    console.log('error' + e);
    res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {

  try {

    let user = await getUserByEmail(xss(req.body.email));
    let flag = await bcrypt.compare(xss(req.body.password), user.password);
    if (flag) {
      req.session.loginOrNot = true;
      req.session.userEmail = user.email;
    } else {
      res.status(401);
    }
  } catch (e) {
    res.status(401).render('utils/index', {error1: true})
  }

})

module.exports = router;