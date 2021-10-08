// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const t_a_post = require("./test_post_article");

async function test_post() {
  var modules = {
    "test-post-article": t_a_post,
  };

  for (var key in modules) {
    var result = await modules[key]();
    if (result) console.log(key, ":", "\x1b[32mSuccess\x1b[0m");
    else console.log(key, ":", "\x1b[31mFail\x1b[0m");
  }
}

module.exports = test_post;