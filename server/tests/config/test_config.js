// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const config = require('../../config');

async function test_config() {
  var result = Object.keys(config).length !== 0;

  return result == true;
}

module.exports = {
  "test-config": test_config,
};
