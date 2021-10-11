// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const express = require("express");
const router = express.Router();

const article = require("./article/routes");

router.use("/article", article);

module.exports = router;