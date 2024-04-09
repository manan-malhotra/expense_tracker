require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware.js");
app.use(errorHandler);

const server = () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

server();
