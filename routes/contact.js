const express = require("express");
const router = express.Router();
const contactController = require('../controllers/contactController'); // Import the contact controller

// Contact page GET route
router.get("/", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// Contact form POST route
router.post("/", contactController.submitContactForm);

module.exports = router;
