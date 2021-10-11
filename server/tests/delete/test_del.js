// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const a_del = require("../../routes/article/del");

async function test_del_article() {
  var result = await a_del(
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
  "test-del-article": test_del_article,
};
