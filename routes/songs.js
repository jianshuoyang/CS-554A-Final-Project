const express = require('express');
const router = express.Router();
const data = require('../data');

router.get('/', async (req, res) => {
  try {

  } catch (e) {
    console.log(e);
  }
});

router.post('/addLikeSongs', async (req, res) => {

  try {
    const newSong = await data.songs.addSong(req.body.songName, req.body.artist, req.body.album);
    const add = await data.users.addSongToUser('userId', 'newSongId');
    // console.log(newUser);
    // req.session.id = newUser.id;
    // req.session.loginOrNot = true;
  } catch (e) {
    console.log('error' + e);
    res.sendStatus(500);
  }
});

module.exports = router;