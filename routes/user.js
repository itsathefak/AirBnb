const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelware.js");

const userController = require("../controllers/users.js");

// Signup Get
router.get("/signup", userController.renderSignupForm);

// Signup Post
router.post("/signup", wrapAsync(userController.signup));

// Login Page

router.get("/login", userController.renderLoginForm);

// Login post route

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// Logout

router.get("/logout", userController.logout);

module.exports = router;
