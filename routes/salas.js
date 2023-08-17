const express = require('express');
const router = express.Router(); //permite ter acesso aos métodos http
const controller = require('./../controllers/salas');

router.post('/cadastrar', controller.novaSala);

module.exports = router;