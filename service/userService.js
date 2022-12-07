const User = require("../models/User");
const error = require("../utils/error");

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

const updateUserByPut = async (id, data) => {
  const user = await findUserByProperty("email", data.email);
  if (user) {
    throw error("User already exits: email");
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

const findUsers = () => {
  return User.find();
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
  updateUserByPut,
};
