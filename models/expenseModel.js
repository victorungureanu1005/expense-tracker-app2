const mongoose = require("mongoose");

const categories = [
  "others",
  "food",
  "clothes",
  "medicine",
  "entertainment",
  "school",
];
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "others",
    enum: {
      values: categories,
      message: `The category must be: ${categories.join(", ")}`,
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
      values: days,
      message: `The day must be: ${days.join(", ")}`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false, //hide from output
  },
  userName: {
    type: String,
    select: false,
  },
  secretExpense: {
    type: Boolean,
    default: false,
  },
});

//VIRTUALS
//business logic in Model
expenseSchema.virtual("amountInEUR").get(function () {
  //called when get is called
  return this.amount / 5;
});

//Middleware
//pre
expenseSchema.pre("save", function (next) {
  //just for save
  console.log("Will save document...");
  next();
});
//post
expenseSchema.post("save", function (doc, next) {
  console.log("Saved document:");
  console.log(doc);
  next();
});

//for query
expenseSchema.pre(/^find/, function (next) {
  //find works but not on find by ID which implements FIND ONE! would work to copy pasta for find One, so we use a regular expression
  this.find({ secretExpense: { $ne: true } });
  this.start = Date.now();
  next();
});

//Post - docs for all the query after query - does not work properly.
expenseSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

//Aggregation Middleware
expenseSchema.pre("aggregate", function (next) {
  // console.log(this.pipeline()); //pipeline contains match group sort, etc.
  this.pipeline().unshift({
    $match: {
      $or: [
        { secretExpense: { $ne: null } },
        // { secretExpense: { $eq: true } },
      ],
    },
  });
  console.log(this.pipeline());
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
