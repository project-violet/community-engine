// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const redis = require("../api/redis");

async function get_next_article_id() {
  return await redis.incr("post.id");
}

module.exports = {
  get_next_article_id: get_next_article_id,
};
