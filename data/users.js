const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');

function check(obj) {
  let flag = true;
  let firstName = obj.firstName;
  let lastName = obj.lastName;
  let gender = obj.gender;
  let email = obj.email;

  if (firstName) {
    if (typeof firstName !== 'string') {
      flag = false;
    }
  }
  if (lastName) {
    if (typeof lastName !== 'string') {
      flag = false;
    }
  }
  if (gender) {
    if (typeof gender !== 'string') {
      flag = false;
    }
  }
  if (email) {
    if (typeof email !== 'string') {
      flag = false;
    }
  }
  return flag;
}

// addUser('jianshuo', 'yang', 'male', '123@qq.com');
async function addUser(firstName, lastName, gender, email) {
  if (!firstName || typeof firstName !== 'string') throw `invalid first name`;
  if (!lastName || typeof lastName !== 'string') throw `invalid last name`;
  if (!gender || typeof gender !== 'string') throw `invalid gender input`;
  if (!email || typeof email !== 'string') throw `invalid email input`;

  const userCollection = await users();
  let newUser = {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    email: email,
    likedSongs: []
  }

  const insertInfo = await userCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) throw `Can't add user`;
  return await getUserById(insertInfo.insertedId.toString());
}

async function getUserById(id) {
  if (!id || typeof id !== 'string') throw `invalid id input`;
  const objId = ObjectId.createFromHexString(id);
  const userCollection = await users();
  const res = await userCollection.findOne({_id: objId});
  if (!res) throw `No user found`;
  return res;
}

async function getUsers() {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  if (!userList) throw `No users exist in database`;
  return userList;
}

// update works
async function updateUserDelta(id, deltasObj) {
  if (!id || typeof id !== 'string') throw `invalid id input`;
  if (!deltasObj || typeof deltasObj !== 'object') throw `invalid object input`;
  if (check(deltasObj) === false) throw `invalid object input`;

  let userToBeUpdated = await getUserById(id);

  Object.assign(userToBeUpdated, deltasObj);
  const userCollection = await users();
  const objId = ObjectId.createFromHexString(id);
  const updateInfo = await userCollection.updateOne({_id: objId}, {$set: userToBeUpdated});
  if (updateInfo.modifiedCount === 0) throw `Update failed`;
  return await getUserById(id);
}

async function deleteUser(id) {
  if (!id || typeof id !== 'string') throw `invalid id input`;
  const objId = ObjectId.createFromHexString(id);
  const userCollection = await users();
  const deletionInfo = await userCollection.removeOne({_id: objId});
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete user with id of ${id}`;
  }
}