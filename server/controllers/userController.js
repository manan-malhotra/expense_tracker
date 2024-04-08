const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!password || !username) {
        res.status(400).json({ message: "Please enter all details!" });
    }
    const userFound = await User.findOne({ username });
    if (userFound) {
        res.status(400).json({ message: "Username already present." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userCreated = await User.create({
        username,
        password: hashedPassword,
    });
    console.log(userCreated);
    const token = generateToken(userCreated);
    res.status(201).json({
        id: userCreated._id,
        username: userCreated.username,
        token,
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!password || !username) {
        res.status(400).json({ message: "Please enter all details!" });
    }
    const userFound = await User.findOne({ username });
    if (!userFound) {
        res.status(400).json({ message: "User not present." });
    }
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) {
        res.status(400).json({ message: "Incorrect password." });
    }

    const token = generateToken(userFound);
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
