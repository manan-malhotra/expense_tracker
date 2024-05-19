const winston = require("winston");
const moment = require("moment");
const elasticsearchClient = require("./loggerClient");

function logError(error) {
  elasticsearchClient
    .index({
      index: "logs",
      body: {
        loglevel: "error",
        message: error,
        timestamp: new Date(),
      },
    })
    .then((response) =>
      console.log("Log entry sent to Elasticsearch:", response.result)
    )
    .catch((err) => console.error("Error sending log entry:", err));
}

function logSuccess(message) {
  elasticsearchClient
    .index({
      index: "logs",
      body: {
        loglevel: "success",
        message: message,
        timestamp: new Date(),
      },
    })
    .then((response) =>
      console.log("Log entry sent to Elasticsearch:", response.result)
    )
    .catch((err) => console.error("Error sending log entry:", err));
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/app-" + moment().format("YYYY-MM-DD") + ".log",
    }),
  ],
});

module.exports = { logger, logError, logSuccess };
