// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const { promisify } = require("util");
const l_post = require("../../lib/post");

async function test_get_next_article_id() {
  //   const get_next_article_id_async = promisify(l_post.get_next_article_id);
  var result = await l_post.get_next_article_id();

  return result !== undefined;
}

module.exports = {
  "test-lib-get-next-article-id": test_get_next_article_id,
};
