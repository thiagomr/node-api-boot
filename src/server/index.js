const express = require('express');
const router = require('./router');
const { logger } = require('../config/services');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8000;
        this.app.use('/v1', router);
    }

    listen() {
        this.app.listen(this.port, () => logger.info(`listen at port ${this.port}`));
    }
}

module.exports = Server;
