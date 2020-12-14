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
    console.log(user)
    console.log(user._id)
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
});

//JP parts
router.post('/addsong', async(req, res) => {
  try {
    let newSong = {
      title: req.body.title,
      artist: req.body.artist,
      artistId: req.body.artistId,
      albumName: req.body.albumName,
      albumId: req.body.albumId,
      playUrl: req.body.playUrl,
      songId: req.body.songId
    };
    const user = await getUserByEmail(req.body.userEmail);

    //add song to song list
    const songId = await data.songs.addSong(newSong.title, newSong.artist, newSong.artistId, newSong.albumName, newSong.albumId,newSong.playUrl,newSong.songId);
    //add song to user favorite song list
    await data.users.addSongToUser(user._id.toString(), songId.toString());

    res.status(200).json(newSong)
  } catch(e) {
    console.log({error: e})
  }
});



module.exports = router;