// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const { promisify } = require("util");
const Joi = require("joi");

const { get_next_article_id } = require("../../lib/post");

async function post(req, res, next) {
  // check request format

  // 1. get next article id
  var id = await get_next_article_id();

  // 2. append to mongodb

  // 3. append to mysql
}

module.exports = post;
