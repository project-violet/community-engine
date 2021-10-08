// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const redis = require("../api/redis");

function get_next_article_id() {
  return new Promise((resolve, reject) => {
    redis.incr("post.id", function (value) {
      resolve(value);
    });
  });
}

module.exports = {
  get_next_article_id: get_next_article_id,
};
