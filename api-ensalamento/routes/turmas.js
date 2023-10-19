const express = require('express');
const router = express.Router();
const controller = require('./../controllers/turmas');

router.get('/lista/', controller.listarTurmas)
router.get('/lista/:nm_turma', controller.buscarTurmaPeloNome)
router.post('/postar', controller.adicionarTurma);
router.put('/atualizar/:id_turma' , controller.editarTurma);
router.delete('/deletar/:id_turma' , controller.deletarTurma);

module.exports = router;