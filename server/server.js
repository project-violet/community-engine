// This source code is a part of Project Violet.
// Copyright (C) 2021. violet-team. Licensed under the Apache-2.0 License.

const logger = require('./etc/logger');
const config = require('./config');

const app = require('./app');
const http = require('http');

var port = config.server_port;
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);

logger.info('hello');

function onError(error) {
    logger.error(error);
}