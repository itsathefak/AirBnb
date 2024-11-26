const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log("Registering user:", { username, email });

      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);

      console.log("Registered User:", registeredUser);

      req.flash("success", "Welcome to Stay Luxe!");
      res.redirect("/listings");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

module.exports = router;
