// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const redis = require("../api/redis");

function get_next_article_id(on_result) {
  redis.incr("post.id", on_result);
}

module.exports = {
  get_next_article_id: get_next_article_id,
};
