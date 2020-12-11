const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');

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
    res.json(newUser);

  } catch (e) {
    console.log('error: ' + e);
		res.status(500).json(e);

    // res.sendStatus(500);
  }
});

router.post('/login', async (req, res) => {

  try {

    let user = await getUserByEmail(req.body.email);
    let flag = await bcrypt.compare(req.body.password, user.password);
    if (flag) {
      // req.session.loginOrNot = true;
      // req.session.userEmail = user.email;
      res.json(user);

    } else {
      res.status(500).json("error: the email or password is wrong");
    }
  } catch (e) {
    // console.log("error: " + e);
		res.status(500).json(e);
  }

})

module.exports = router;