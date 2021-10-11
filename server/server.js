// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const logger = require("./etc/logger");
const config = require("./config");

const http = require("http");

const app = require("./app");

const port = config.server_port;
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);

require('./ws');

logger.info("hello");

function onError(error) {
  logger.error(error);
}
