const mongoCollections = require('../config/mongoCollections');
const songs = mongoCollections.songs;
const comments = mongoCollections.comments;
const {ObjectId} = require('mongodb');
const commentsUtil = require('./comments');

// addSong('Hello', 'adele', 'whatever');
async function addSong(title, artist, artistId, albumName, albumId) {
  if (!title || typeof title !== 'string') throw `invalid song name`;
  if (!artist || typeof artist !== 'string') throw `invalid singer name`;
  if (!albumName || typeof albumName !== 'string') throw 'invalid album name';

  const songCollections = await songs();

  let newSong = {
    title: title,
    artist: artist,
    artistId: artistId,
    albumName: albumName,
    albumId: albumId,
    comments: []
  };

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

// addCommentToSong('5fc2a1e28178a4dc6b454038', '5fc2a28a6eba1ddc99e12ea6');
async function addCommentToSong(id, commentId) {
  if (!id || typeof id !== 'string') throw 'whatever';
  if (!commentId || typeof commentId !== 'string') throw 'whatever';
  const objId = ObjectId.createFromHexString(id);
  const commentObj = await commentsUtil.getCommentById(commentId);
  let res = {
    id: commentObj._id,
    name: commentObj.name,
    comment: commentObj.comment
  }
  const songCollections = await songs();

  await songCollections.updateOne({_id: objId}, {$addToSet: {comments: res}});
}

async function removeCommentFromSong(id, commentId) {
  if (!id || typeof id !== 'string') throw 'invalid id';
  if (!commentId || typeof commentId !== 'string') throw 'invalid song id';

  const objId = ObjectId.createFromHexString(id);
  const objId2 = ObjectId.createFromHexString(songId);
  const songCollections = await songs();
  const updateInfo = await songCollections.updateOne({_id: objId}, {$pull: {comments: {id: objId2}}});
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'delete song from user failed';

  const commentCollections = await comments();
  const deleteInfo = await commentCollections.removeOne({_id: objId2});
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete the comment with id of ${objId2}`;
  }
}

module.exports = {
  addSong,
  getSongById,
  addCommentToSong,
  removeCommentFromSong
}