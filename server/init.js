// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const redis = require("./api/redis");

async function init_redis() {
  await redis.flushall();
  await redis.set("post.id", 0);
}

init_redis().then((value) => console.log('init redis'));
