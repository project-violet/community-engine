// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const redis = require("./api/redis");


function init_redis() {
  redis.flushall();
  redis.set("post.id", 0);
}

init_redis();