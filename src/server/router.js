const { Router } = require('express');
const router = new Router();
const mainController = require('./controllers/main-controller');

router.get('/ping', mainController.ping);

module.exports = router;
