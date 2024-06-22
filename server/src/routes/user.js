const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  logoutUser,
  getUserDetails,
  getAllUsers,
} = require("../controllers/user");
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/alluser").get(isAuthenticatedUser, getAllUsers);
router.route("/logout").get(logoutUser);

module.exports = router;
