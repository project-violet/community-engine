// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const a_post = require("../../routes/article/post");

/*
POST /article {title, body, author, password, boardid, title}
  => article id
*/

async function test_post_article() {
  var result = await a_post(
    {
      body: {
        title: "test title",
        body: "test body",
        author: "test author",
        password: "testpw",
        boardid: "0",
      },
    },
    null,
    null
  );

  return result == true;
}

module.exports = {
  "test-post-article": test_post_article,
};
