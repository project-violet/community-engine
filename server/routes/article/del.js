// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const { promisify } = require("util");
const Joi = require("joi");

const logger = require("../../etc/logger");
const m_article = require("../../model/article");

const del_article_schema = Joi.object({
  id: Joi.number().min(0).integer().required(),
  password: Joi.string().max(32).min(8).required(),
});

async function del(req, res, next) {
  logger.info("[del-article] %s", req.query);

  try {
    // check request format
    await del_article_schema.validateAsync(req.query);
  } catch (e) {
    logger.error("[del-article-check] %s %s", req.query, e);
    res.status(400).type("json").send({ msg: "bad request" });
    return;
  }

  try {
    const m_deleteone_async = promisify(m_article.mongo.deleteOne).bind(
      m_article.mongo
    );
    var x = await m_deleteone_async(req.query);

    if (x.deletedCount == 0) {
      res.status(403).json({ msg: "bad article-id or password" });
      return;
    }

    res.json({ msg: "success" });
  } catch (e) {
    logger.error("[del-article-body] %s", e);
    res.status(500).type("json").send({ msg: "internal server error" });
  }
}

module.exports = del;
