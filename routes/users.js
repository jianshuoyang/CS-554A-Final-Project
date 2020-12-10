const express = require('express');
const router = express.Router();
const data = require('../data');

router.post('/add', async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const email = req.body.email;
    await data.users.addUser(firstName, lastName, gender, email);
  } catch (e) {
    console.log(e);
  }
});

// router.get('/', async (req, res) => {
//   res.send('Hello');
// })

module.exports = router;