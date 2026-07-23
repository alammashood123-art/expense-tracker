
const Budget = require("../models/Budget");

// Create Budget
const createBudget = async (req, res) => {
  try {
    const { category, amount } = req.body;

    const budget = await Budget.create({
      user: req.user.id,
      category,
      amount,
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Budgets
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Budget
const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(updatedBudget);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Budget
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await budget.deleteOne();

    res.json({
      message: "Budget deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};