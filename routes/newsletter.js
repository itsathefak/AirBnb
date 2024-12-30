const express = require("express");
const router = express.Router();
const { sendWelcomeEmail } = require("../utils/mailer");

// Newsletter subscription route
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await sendWelcomeEmail(email);
    res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing to newsletter:", error.message);
    res.status(500).json({ message: "Failed to subscribe to newsletter" });
  }
});

module.exports = router;
