// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const Redis = require("ioredis");
const config = require("../config");

const mode = config.redis.mode;

var redis;

if (mode == "single") {
  const host = config.redis.nodes[0].host;
  const port = config.redis.nodes[0].port;

  redis = new Redis({
    host: host,
    port: port,
  });
} else if (mode == "cluster") {
  redis = new Redis.Cluster(config.redis.nodes);
} else {
  throw "redis config error '" + mode + "' is not correct redis mode";
}

module.exports = redis;
