const express = require('express');
const router = express.Router();
const controller = require('./../controllers/disciplina');

router.get('/lista/', controller.listarDisciplina)
router.get('/lista/:nm_disciplina', controller.buscarDisciplina)
router.post('/postar', controller.adicionarDisciplina);
router.put('/atualizar/:id_discip' , controller.editarDisciplina);
router.delete('/deletar/:id_discip' , controller.deletarDisciplina);

module.exports = router;