//The main idea is to pair with the router appropiate methods defined in the Controller
const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);
//Alias and combined example
router.route("/expense-db-stats").get(expenseController.getExpenseDBStats);
router
  .route("/top-5-expensive")
  .get(
    expenseController.aliasExpensiveExpenses,
    expenseController.getAllExpenses
  );

//ID Param
router
  .route("/:id")
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
