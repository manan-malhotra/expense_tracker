const winston = require("winston");
const moment = require("moment");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app-" + moment().format("YYYY-MM-DD") + ".log",
    }),
  ],
});

module.exports = { logger };
