const mongoCollections = require('../config/mongoCollections');
const songs = mongoCollections.songs;
const {ObjectId} = require('mongodb');

// addSong('Hello', 'adele', 'whatever');
async function addSong(name, singerName, albumName) {
  if (!name || typeof name !== 'string') throw `invalid song name`;
  if (!singerName || typeof singerName !== 'string') throw `invalid singer name`;
  if (!albumName || typeof albumName !== 'string') throw 'invalid album name';

  const songCollections = await songs();

  let newSong = {
    name: name,
    singerName: singerName,
    albumName: albumName,
    comments: []
  }

  const insertInfo = await songCollections.insertOne(newSong);
  return insertInfo.insertedId;
}

async function getSongById(id) {
  if (!id || typeof id !== 'string') throw `invalid song id`;

  const songCollections = await songs();
  const objId = ObjectId.createFromHexString(id);
  const song = await songCollections.findOne({_id: objId});
  if (!song) throw `Song with ${id} not found`;
  return song;
}

module.exports = {
  addSong,
  getSongById
}