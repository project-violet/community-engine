// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const config = require("./config");

const ws = require("ws");

const ws_port = config.ws_port;
const wss = new ws.Server({ port: ws_port });

wss.on("connection", (ws, request) => {
  const ip =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;
});
