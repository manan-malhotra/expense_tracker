const router = require("express").Router();
const {
    addIncome,
    getIncome,
    deleteIncome,
} = require("../controllers/incomeController");

const {
    addExpense,
    getExpense,
    deleteExpense,
} = require("../controllers/expenseController");

router.get("/", (req, res) => {
    res.send("I am alive");
});

router
    .post("/addIncome", addIncome)
    .get("/getIncome", getIncome)
    .delete("/deleteIncome/:id", deleteIncome)
    .post("/addExpense", addExpense)
    .get("/getExpense", getExpense)
    .delete("/deleteExpense/:id", deleteExpense);

module.exports = router;
