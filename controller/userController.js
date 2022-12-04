const User = require("../models/User");
const userService = require("../service/userService");
const error = require("../utils/error");

const getUsers = async (req, res, next) => {
  /**
   * //TODO filter, sort, pagination, select
   *
   */
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userService.findUserByProperty();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = (req, res, next) => {};

const putUserById = (req, res, next) => {};

const patchUserById = async (req, res, next) => {
    const { name, roles, accountStatus } = req.body;
    const id = req.params.userId;
  try {
    const user = await userService.findUserById(id);
    if (!user) throw error("User not Found", 404);
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = (req, res, next) => {};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
