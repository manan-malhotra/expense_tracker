const Expense = require("../models/ExpenseModel");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const { logger, logError, logSuccess } = require("../logger/logger");
const addExpense = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    logger.log("error", "Not authorized.Token missing.");
    logError("Not authorized.Token missing.");
    return res.status(401).json({ message: "Not authorized." });
  }
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    logger.log("error", "User not found!");
    logError("User not found!");
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
      logger.log("error", "Please enter all details!");
      logError("Please enter all details!");
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      logger.log("warn", "Amount must be a positive number!");
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    logger.log("info", "Expense Added Successfully");
    logSuccess("Expense Added Successfully");
    return res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    logger.log("error", "Server Error");
    logError("Server Error");
    return res.status(500).json({ message: "Server Error" });
  }
});

const getExpense = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    logger.log("error", "Please enter all details!");
    logError("Not authorized.Token missing.");
    return res.status(401).json({ message: "Not authorized." });
  }
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    logger.log("error", "User not found!");
    logError("User not found!");
    return res.status(401).json({ message: "Not authorized." });
  }
  try {
    const incomes = await Expense.find({ user: user._id }).sort({
      createdAt: -1,
    });
    logger.log("info", "Expense fetched successfully.");
    logSuccess("Expense fetched successfully.");
    return res.status(200).json(incomes);
  } catch (error) {
    logger.log("error", "Server Error");
    logError("Server Error");
    return res.status(500).json({ message: "Server Error" });
  }
});

const deleteExpense = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    logger.log("error", "Not authorized.Token missing.");
    logError("Not authorized.Token missing.");
    return res.status(401).json({ message: "Not authorized." });
  }
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    logger.log("error", "User not found!");
    logError("User not found!");
    return res.status(401).json({ message: "Not authorized." });
  }
  const { id } = req.params;
  expense = await Expense.find({ _id: id, user: user._id });
  if (!expense) {
    logger.log("error", "Expense not found");
    logError("Expense not found");
    return res.status(404).json({ message: "Expense not found" });
  } else {
    Expense.findByIdAndDelete(id)
      .then((income) => {
        logger.log("info", "Expense Deleted");
        logSuccess("Expense Deleted");
        return res.status(200).json({ message: "Expense Deleted" });
      })
      .catch((err) => {
        logger.log("error", "Server Error");
        logError("Server Error");
        return res.status(500).json({ message: "Server Error" });
      });
  }
});

module.exports = { addExpense, getExpense, deleteExpense };
