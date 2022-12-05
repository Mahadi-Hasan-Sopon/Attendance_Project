const User = require("../models/User");

// const findUserByProperty = (key, value) => {
//   if (key === '_id') {
//     return User.findById(value);
//   }
//   return User.findOne({ [key]: value });
// };

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

const findUsers = () => {
  return User.find();
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
};
