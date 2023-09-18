const express = require('express');
const router = express.Router();
const controller = require('./../controllers/professores');

router.get('/lista/:nome', controller.buscarProfessores)
router.post('/postar', controller.adicionarProfessor);
//router.put('/atualizar/:id' , controller.put);
//router.delete('/deletar/:id' , controller.deletar);

module.exports = router;