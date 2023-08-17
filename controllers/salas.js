const express = require('express');
const router = express.Router();
const salas = require('../models/salas');

exports.novaSala = (req, res) => {
    const sala = req.body;
    salas.push(sala);
    console.log(salas);
    res.status(201).send({message:'Sala adcionada com sucesso', salas});
};