const Expense = require("../models/expenseModel");
const APIFeatures = require("../utils/apiFeatures");

//Exporting methods for the win!
exports.getAllExpenses = async (req, res) => {
  try {
    //populate query
    const features = new APIFeatures(Expense.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    //execute query
    const expenses = await features.query;
    res.status(200).json({
      status: "success",
      resultsNumber: expenses.length,
      data: {
        expenses,
      },
    });
    //send response
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
exports.createExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        expense: newExpense,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //option of the method to return the updated document
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.getExpenseDBStats = async (req, res) => {
  try {
    const stats = await Expense.aggregate([
      {
        $group: {
          _id: "$day",
          avgAmount: { $avg: "$amount" },
          numberOfExpenses: { $sum: 1 },
        },
      },
      {
        $sort: {
          avgAmount: -1,
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: stats,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
exports.aliasExpensiveExpenses = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-amount";
  next();
};
