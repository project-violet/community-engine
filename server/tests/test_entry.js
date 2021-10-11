// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const t_api = require("./api/test_api");
const t_config = require("./config/test_config");
const t_del = require("./delete/test_del");
const t_get = require("./get/test_get");
const t_lib = require('./lib/test_lib');
const t_post = require("./post/test_post");

var modules = [];

modules.push(t_api);
modules.push(t_config);
modules.push(t_del);
modules.push(t_get);
modules.push(t_lib);
modules.push(t_post);

async function run_test() {
  for (var module of modules) {
    for (var key in module) {
      try {
        var result = await module[key]();

        console.log(
          "(not throw)",
          key,
          ":",
          result ? "\x1b[32mSuccess\x1b[0m" : "\x1b[31mFail\x1b[0m"
        );
      } catch (e) {
        console.log("(throw)", key, ":", "\x1b[31mFail\x1b[0m");
        console.log(e);
      }
    }
  }
}

run_test().then();
