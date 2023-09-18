const express = require('express');
const router = express.Router();
const controller = require('./../controllers/professores');

router.get('/lista/', controller.listarProfessores)
router.get('/lista/:nome', controller.buscarProfessores)
router.post('/postar', controller.adicionarProfessor);
router.put('/atualizar/:id_prof' , controller.editarProfessor);
router.delete('/deletar/:id_prof' , controller.deletarProfessor);

module.exports = router;