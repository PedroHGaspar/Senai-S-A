const express = require('express');
const router = express.Router();
const controller = require('./../controllers/professores');

router.get('/lista', controller.busca)
router.post('/postar', controller.postar);
router.put('/atualizar/:id' , controller.put);
router.delete('/deletar/:id' , controller.deletar);

module.exports = router;