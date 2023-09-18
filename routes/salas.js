const express = require('express');
const router = express.Router();
const controller = require('./../controllers/salas');

router.get('/lista/', controller.listarSalas)
router.get('/lista/:num_sala', controller.buscarSala)
router.post('/postar', controller.criarSala);
router.put('/atualizar/:id_sala' , controller.editarSala);
router.delete('/deletar/:id_sala' , controller.deletarSala);

module.exports = router;