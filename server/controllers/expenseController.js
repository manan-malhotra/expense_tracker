const Expense = require("../models/ExpenseModel");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const addExpense = asyncHandler(async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Not authorized." });
    }
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: "Not authorized." });
    }
    const { title, amount, category, description, date } = req.body;

    const income = Expense({
        title,
        amount,
        category,
        description,
        date,
        user,
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
        return res.status(200).json({ message: "Expense Added" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }

    console.log(income);
});

const getExpense = asyncHandler(async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Not authorized." });
    }
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: "Not authorized." });
    }
    try {
        const incomes = await Expense.find({ user: user._id }).sort({
            createdAt: -1,
        });
        return res.status(200).json(incomes);
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});

const deleteExpense = asyncHandler(async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        return res.status(401).json({ message: "Not authorized." });
    }
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).json({ message: "Not authorized." });
    }
    const { id } = req.params;
    expense = await Expense.find({ _id: id, user: user._id });
    console.log(expense);
    if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
    } else {
        Expense.findByIdAndDelete(id)
            .then((income) => {
                return res.status(200).json({ message: "Expense Deleted" });
            })
            .catch((err) => {
                return res.status(500).json({ message: "Server Error" });
            });
    }
});

module.exports = { addExpense, getExpense, deleteExpense };
