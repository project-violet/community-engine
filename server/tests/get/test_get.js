// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const a_get = require("../../routes/article/get");

/*
POST /article {title, body, author, password, boardid, title}
  => article id
*/

async function test_get_article() {
  var result = await a_get(
    {
      query: {
        id: 4,
      },
    },
    null,
    null
  );

  return result == true;
}

module.exports = {
  "test-get-article": test_get_article,
};
