const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
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

    console.log(userFound.password);
    const token = generateToken(userFound);
    res.status(200).json({
        token,
        id: userFound._id,
        username: userFound.username,
    });
});

const getProfile = asyncHandler(async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
        res.status(401).json({ message: "Not authorized." });
    } else {
        const bearerToken = token.split(" ")[1];
        const decoded = jwt.verify(bearerToken, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        res.status(200).json({
            id: user._id,
            username: user.username,
        });
    }
});

const logout = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Logged out successfully." });
});

const generateToken = ({ _id, username }) => {
    return jwt.sign({ id: _id, username }, process.env.SECRET_KEY, {
        expiresIn: "30d",
    });
};

module.exports = { registerUser, loginUser, getProfile, logout };
