const express = require("express");
const router = express.Router();

// Example protected endpoint
router.get("/", (req, res) => {
  res.status(200).json([
    { id: 1, title: "Atomic Habits" },
    { id: 2, title: "The Alchemist" }
  ]);
});

module.exports = router;