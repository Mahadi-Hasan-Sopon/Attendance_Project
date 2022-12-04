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
  const user = new User({ name, email, password, roles, accountStatus });
  return user.save();
};

const findUserById = (id) => {
  return User.findById(id);
};

const findUsers = () => {
  return User.find();
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
  findUserById,
};
