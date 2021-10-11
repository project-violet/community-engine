// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const { promisify } = require("util");
const Joi = require("joi");

const logger = require("../../etc/logger");
const m_article = require("../../model/article");
const { get_next_article_id } = require("../../lib/post");

/*
POST /article {title, body, author, password, boardid, title}
  => article id
*/

const post_article_schema = Joi.object({
  title: Joi.string().max(255).min(1).required(),
  body: Joi.string().max(65535).required(),
  author: Joi.string().max(64).min(1).required(),
  password: Joi.string().max(32).min(8).required(),
  boardid: Joi.number().min(0).integer().required(),
});

async function post(req, res, next) {
  logger.info('[post-article]', req.body);

  try {
    // check request format
    await post_article_schema.validateAsync(req.body);
  } catch (e) {
    logger.error('[post-article-check]', req.body, e);
    res.status(400).type("json").send({ msg: "bad request" });
    return;
  }

  try {
    // 1. get next article id
    var id = await get_next_article_id();

    // 2. append to mongodb
    var m = new m_article.mongo({ ...req.body, id: id });
    const m_save_async = promisify(m.save).bind(m);
    var m_result = await m_save_async();

    // 3. append to mysql
    // TODO: Implements append to mysql

    res.json({ msg: "success", result: { id: id, _id: m_result._id } });
  } catch (e) {
    logger.error('[post-article-body]', e);
    res.status(500).type("json").send({ msg: "internal server error" });
  }
}

module.exports = post;
