// 1. importing mongoose
const mongoose = require("mongoose");

// 1.1 importing bcryptjs
const bcrypt = require("bcryptjs");

// 2. creating schema for user entity
const userSchema = new mongoose.Schema({
  UserId: { type: String, unique: true, required: true},
  FirstName: {type: String, required: true},
  LastName: { type: String, required: true},
  password: { type: String, required: true},
  following: [String]
})

// 3. creating model of user schema
const User = mongoose.model("User", userSchema);

// 4. writing CRUD operations on user model
// i) C - CREATE user
async function register(UserId, FirstName, LastName, password) {
  const user = await getUser(UserId);
  if(user) throw Error('Please try for a new UserId');

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    UserId: UserId,
    FirstName: FirstName,
    LastName: LastName,
    password: hashed
  });

  return newUser;
}

// ii) R - READ user
async function login(UserId, password) {
  const user = await getUser(UserId);
  if(!user) throw Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch) throw Error('Wrong Password');
  
  return user;
}

// iii) U - UPDATE user
async function updatePassword(id, newpassword) {
  const user = await User.updateOne({"_id": id}, {$set: { password: newpassword}});
  return user;
}

// iv) D - DELETE user
async function deleteUser(id) {
  await User.deleteOne({"_id": id});
};

// utility function
async function getUser(UserId) {
  return await User.findOne({ "UserId": UserId});
}

// 5. export functions
module.exports = { 
  register, login, updatePassword, deleteUser, getUser
};