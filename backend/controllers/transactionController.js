const Transaction = require("../models/Transaction");

const addTransaction = async (req, res) => {
  try {

    const { title, amount, type, category, note, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      note,
      date,
    });

    res.status(201).json({
      message: "Transaction Added Successfully",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(transactions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    // Make sure the logged-in user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};