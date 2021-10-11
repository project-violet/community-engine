// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const express = require("express");
const expressDefend = require("express-defend");
const blacklist = require("express-blacklist");
const rateLimit = require("express-rate-limit");

const app = express();

const p = require('./pages/status');

const home = require('./routes/routes');

app.disable("x-powered-by");
app.use(express.json());

app.use(blacklist.blockRequests("blacklist.txt"));
app.use(
  expressDefend.protect({
    maxAttempts: 1,
    dropSuspiciousRequest: true,
    onMaxAttemptsReached: function (ipAddress, url) {
      blacklist.addAddress(ipAddress);
    },
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

const limiter = rateLimit({
  windowMs: 1000 * 60,
  max: 5 * 6 * 3 * 100,
});
app.use(limiter);

app.use(home);

app.use(function (req, res, next) {
  res.status(404).type("html").send(p.p404);
});

module.exports = app;
