require("dotenv").config();

const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware.js");
//middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("I am alive");
});
app.use("/transactions", require("./routes/transactionsRouter"));
app.use(errorHandler);

const server = () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

server();
