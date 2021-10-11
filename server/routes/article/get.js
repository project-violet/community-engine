// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const { promisify } = require("util");
const Joi = require("joi");

const logger = require("../../etc/logger");
const m_article = require("../../model/article");

const get_article_schema = Joi.object({
  id: Joi.number().min(0).integer().required(),
});

async function get(req, res, next) {
  logger.info("[get-article]", req.query);

  try {
    // check request format
    await get_article_schema.validateAsync(req.body);
  } catch (e) {
    logger.error("[get-article-check]", req.body, e);
    res.status(400).type("json").send({ msg: "bad request" });
    return;
  }

  try {
    const m_find_async = promisify(m_article.mongo.find).bind(m_article.mongo);
    var result = await m_find_async({ id: req.query.id });

    res.json({ msg: "success", result: result });
  } catch (e) {
    logger.error("[get-article-body]", e);
    res.status(500).type("json").send({ msg: "internal server error" });
  }
}

module.exports = get;
