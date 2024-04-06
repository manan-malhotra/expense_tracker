const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Income = require("../models/IncomeModel");
const asyncHandler = require("express-async-handler");
const addIncome = asyncHandler(async (req, res) => {
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
    const { title, amount, date, category, description } = req.body;
    const income = Income({
        title,
        amount,
        date,
        category,
        description,
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
        console.log(income);
        return res.status(200).json({ message: "Income Added" });
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
});
const getIncome = asyncHandler(async (req, res) => {
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
        const incomes = await Income.find({ user: user._id }).sort({
            createdAt: -1,
        });
        return res.status(200).json(incomes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
const deleteIncome = asyncHandler(async (req, res) => {
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
    income = await Income.find({ _id: id, user: user._id });
    console.log(income);
    if (!income) {
        return res.status(404).json({ message: "Income not found" });
    } else {
        Income.findByIdAndDelete(id)
            .then((income) => {
                return res.status(200).json({ message: "Income Deleted" });
            })
            .catch((err) => {
                return res.status(500).json({ message: "Server Error" });
            });
    }
});
const verifyToken = (token) => {
    const { id, username } = jwt.verify(token, process.env.SECRET_KEY);
    return { id, username };
};
module.exports = { addIncome, getIncome, deleteIncome };
