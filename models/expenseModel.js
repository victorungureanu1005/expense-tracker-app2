const mongoose = require("mongoose");

const expenseSchema = new mongooseSchema({
  category: {
    type: String,
    default: "others",
    enum: {
      values: [
        "others",
        "food",
        "clothes",
        "medicine",
        "entertainment",
        "school",
      ],
      message: `The category must be: ${this.category.enum.values}`,
    },
  },
  amount: {
    type: Number,
    min: [0.01, "The amount must be above 0.01"],
    max: [1000000000000, "The amount must be below 1,000,000,000"],
  },
  day: {
    type: String,
    enum: {
      values: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ],
      message: `The day must be: ${this.day.enum.values}`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //hide from output
  },
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;