const express = require('express');
const router = express.Router();
const controller = require('./../controllers/ensalamento');

router.get('/quadro', controller.ensalar);

module.exports = router;