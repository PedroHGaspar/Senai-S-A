const express = require('express');
const router = express.Router();
const controller = require('./../controllers/disciplina');

router.get('/lista', controller.buscarDisciplina)
router.post('/postar', controller.adicionarDisciplina);
// router.put('/atualizar/:id' , controller.put);
// router.delete('/deletar/:id' , controller.deletar);

module.exports = router;