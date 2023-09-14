const express = require('express');
const router = express.Router();
const controller = require('./../controllers/salas');

router.get('/lista/:numeroSala', controller.buscarSala)
router.post('/postar', controller.criarSala);
// router.put('/atualizar/:id' , controller.put);
// router.delete('/deletar/:id' , controller.deletar);

module.exports = router;