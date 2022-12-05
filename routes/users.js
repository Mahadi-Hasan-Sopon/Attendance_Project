const router = require("express").Router();
//const userController = require("../controller/userController");
const userController = require("../controller/userController");

/**
 * Get a user by id or email
 * @method GET
 */
router.get("/:userId", userController.getUserById);

/**
 * Update user by id
 * @method PUT
 */
router.put("/:userId", () => {});

/**
 * Update user by id
 * @method PATCH
 */
router.patch("/:userId", userController.patchUserById);

/**
 * Get all users, include
 * - filter
 * - pagination
 * - select
 * - sort
 * @route /api/v1/users?sort=['by', 'name']
 * @method GET
 * @visibility Private
 */

/**
 * Delete user by ID
 * @method delete
 * @return null
 */
router.delete('/:userId', userController.deleteUserById)

/***
 * Get all user
 * @method GET
 * @return users
 */
router.get("/", userController.getUsers);

/**
 * Create a new user
 * @method POST
 */
router.post("/", userController.postUser);



module.exports = router;
