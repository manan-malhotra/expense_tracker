const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const { logger, logError, logSuccess } = require("../logger/logger");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    logger.log("error", "Please enter all details!");
    logError("Please enter all details!");
    return res.status(400).json({ message: "Please enter all details!" });
  }
  const userFound = await User.findOne({ username });
  if (userFound) {
    logger.log("error", "User already present.");
    logError("User already present");
    return res.status(400).json({ message: "Username already present." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userCreated = await User.create({
    username,
    password: hashedPassword,
  });
  const token = generateToken(userCreated);
  logger.log("info", "User created successfully.");
  logSuccess("User created successfully.");
  res.status(201).json({
    id: userCreated._id,
    username: userCreated.username,
    token,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!password || !username) {
    logger.log("error", "Please enter all details!");
    logError("Please enter all details!");
    return res.status(400).json({ message: "Please enter all details!" });
  }
  const userFound = await User.findOne({ username });
  if (!userFound) {
    logger.log("error", "User not present.");
    logError("User not present.");
    return res.status(400).json({ message: "User not present." });
  }
  const match = await bcrypt.compare(password, userFound.password);
  if (!match) {
    logger.log("error", "Incorrect password.");
    logError("Incorrect password.");
    return res.status(400).json({ message: "Incorrect password." });
  }

  const token = generateToken(userFound);
  logger.log("info", "User logged in  successfully.");
  logSuccess("User logged in  successfully.");
  res.status(200).json({
    token,
    id: userFound._id,
    username: userFound.username,
  });
});

const generateToken = ({ _id, username }) => {
  return jwt.sign({ id: _id, username }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser };
