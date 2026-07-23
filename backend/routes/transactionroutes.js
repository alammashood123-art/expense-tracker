const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addTransaction,
} = require("../controllers/transactionController");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");

router.post("/", protect, addTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);

module.exports = router;