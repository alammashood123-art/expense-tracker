const express = require("express");

const router = express.Router();

const { registerUser } = require("../controllers/authController");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/change-password", protect, changePassword);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome!",
    user: req.user,
  });
});

module.exports = router;