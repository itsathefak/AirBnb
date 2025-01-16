const express = require("express");
const router = express.Router();

// About page GET route
router.get("/", (req, res) => {
    res.render("about", { title: "About Us" });
  });

module.exports = router;
