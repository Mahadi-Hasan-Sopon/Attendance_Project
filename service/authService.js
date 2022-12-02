const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userService");
const error = require('../utils/error')

const registerService = async ({ name, email, password }) => {
  //User.findOne({email: email})

  let user = await findUserByProperty("email", email);
  if (user) throw error("User already exits", 400);
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
  //const user = await User.findOne({ email });
  const user = await findUserByProperty("email", email);
  // if (!user) {
  //   const error = new Error("Invalid Username", 400);
  //   error.status = 400;
  //   return error;
  // }
  if (!user) throw error("Invalid Username", 400)
  
  const isMatched = await bcrypt.compare(password, user.password);
  // if (!isMatched) {
  //   const error = new Error("Invalid Credential");
  //   error.status = 400;
  //   return error;
  // }
  if (!isMatched) throw error("Invalid Credential", 400)
  
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus
  };

  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};










/** ==============================================================================Stack Learner Code ================== =============================================================================== */

/* 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./userService");
const error = require("../utils/error");

const registerService = async ({
  name,
  email,
  password
}) => {
  let user = await findUserByProperty("email", email);
  if (user) throw error("User already exist", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash });
};

const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);
  if (!user) throw error("Invalid Credential", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw error("Invalid Credential", 400);

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};

*/
