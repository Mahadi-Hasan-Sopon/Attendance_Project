const User = require("../models/User");
const userService = require("../service/userService");
const authService = require("../service/authService");
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
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) throw error("User not Found", 404);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const putUserById = (req, res, next) => {};

const patchUserById = async (req, res, next) => {
  const { name, roles, accountStatus } = req.body;
  const userId = req.params.userId;
  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) throw error("User not Found", 404);
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    return res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    user.remove(userId);
    return res.status(203).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
