const elasticsearchClient = require("./loggerClient");

function logError(error) {
  elasticsearchClient
    .index({
      index: "errors",
      body: {
        error: error,
        timestamp: new Date(),
      },
    })
    .then((response) =>
      console.log("Log entry sent to Elasticsearch:", response.result),
    )
    .catch((err) => console.error("Error sending log entry:", err));
}

module.exports = { logError };
