require('dotenv').config();

const Server = require('./server');
const { logger } = require('./config/services');

(async() => {
    try {
        const server = new Server();

        server.listen();
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
