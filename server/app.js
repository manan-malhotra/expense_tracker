const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Server is up and running now!");
});
app.use("/transactions", require("./routes/transactionsRouter"));
app.use("/users", require("./routes/userRouter"));

module.exports = app;
