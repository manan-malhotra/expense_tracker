const Expense = require("../models/ExpenseModel");

const addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const income = Expense({
        title,
        amount,
        category,
        description,
        date,
    });

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res
                .status(400)
                .json({ message: "All fields are required!" });
        }
        if (amount <= 0 || !amount === "number") {
            return res
                .status(400)
                .json({ message: "Amount must be a positive number!" });
        }
        await income.save();
        res.status(200).json({ message: "Expense Added" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

    console.log(income);
};

const getExpense = async (req, res) => {
    try {
        const incomes = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    expense = await Expense.findById(id);
    console.log(expense);
    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    } else {
        Expense.findByIdAndDelete(id)
            .then((income) => {
                res.status(200).json({ message: "Expense Deleted" });
            })
            .catch((err) => {
                res.status(500).json({ message: "Server Error" });
            });
    }
};

module.exports = { addExpense, getExpense, deleteExpense };