const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("I am alive");
});
app.use("/transactions", require("./routes/transactionsRouter"));
app.use("/users", require("./routes/userRouter"));

module.exports = app;
