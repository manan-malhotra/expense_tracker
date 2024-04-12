require("dotenv").config();
const client = require("prom-client");
const app = require("./app");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware.js");
app.use(errorHandler);

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});
const server = () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

server();
