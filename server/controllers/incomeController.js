const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const Income = require("../models/IncomeModel");
const asyncHandler = require("express-async-handler");
const { logger } = require("../logger/logger");
const addIncome = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    logger.log("error", "Not authorized.Token missing.");
    return res.status(401).json({ message: "Not authorized." });
  }
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    logger.log("error", "User not found!");
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
      logger.log("error", "Please enter all details!");
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      logger.log("warn", "Amount must be a positive number!");
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    logger.log("info", "Income Added");
    return res.status(200).json({ message: "Income Added" });
  } catch (error) {
    logger.log("error", "Server Error");
    return res.status(500).json({ message: "Server Error" });
  }
});
const getIncome = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    logger.log("error", "Not authorized.Token missing.");
    return res.status(401).json({ message: "Not authorized." });
  }
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    logger.log("error", "User not found!");
    return res.status(401).json({ message: "Not authorized." });
  }
  try {
    const incomes = await Income.find({ user: user._id }).sort({
      createdAt: -1,
    });
    logger.log("info", "Income fetched successfully.");
    return res.status(200).json(incomes);
  } catch (error) {
    logger.log("error", "Server Error");
    return res.status(500).json({ message: "Server Error" });
  }
});
const deleteIncome = asyncHandler(async (req, res) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    logger.log("error", "Not authorized.Token missing.");
    return res.status(401).json({ message: "Not authorized." });
  }
  const bearerToken = token.split(" ")[1];
  const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    logger.log("error", "User not found!");
    return res.status(401).json({ message: "Not authorized." });
  }
  const { id } = req.params;
  income = await Income.find({ _id: id, user: user._id });
  if (!income) {
    logger.log("error", "Income not found");
    return res.status(404).json({ message: "Income not found" });
  } else {
    Income.findByIdAndDelete(id)
      .then((income) => {
        logger.log("info", "Income Deleted");
        return res.status(200).json({ message: "Income Deleted" });
      })
      .catch((err) => {
        logger.log("error", "Server Error");
        return res.status(500).json({ message: "Server Error" });
      });
  }
});
const verifyToken = (token) => {
  const { id, username } = jwt.verify(token, process.env.SECRET_KEY);
  return { id, username };
};
module.exports = { addIncome, getIncome, deleteIncome };
