const express = require('express');
const router = express.Router();
const database = require("../config/database")

// FUNÇÂO QUE BUSCA TUDO DA TABELA DE salas
exports.busca = (req,res) => {
    database.query("SELECT * FROM salas").then(
        (resultado) => {
            res.status(200).send({ salas: resultado.rows})
        },
        (erro) => {
            res.status(500).send({ erro: erro})
        }
    )
}



// FUNÇÃO DE POST
exports.postar = (req,res) => {
    const query = "INSERT INTO salas(id, numero, qtd_maxima, tipo) values ($1, $2, $3, $4);"; // o $1 indica que aquele valor, entre aqueles que será enviado, será o primeiro e assim sucessivamente, até o 5 nesse caso
    const values = [req.body.id, req.body.numero, req.body.qtd_maxima, req.body.tipo];

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "salas cadastrado com sucesso!" })
        },
        (erro) => {
            res.status(500).send({erro: erro})
        }
    )

}

// FUNÇÃO DE ATUALIZAR DADOS
exports.put = (req,res) => {
    const query = "UPDATE salas SET numero=$2, qtd_maxima=$3, tipo=$4 WHERE id=$1;"; // nesse caso aqui tem 5 valores com $, ali nos values escrevi na ordem que escreveria no body do site que relacionamos com o banco através do URL(postman)
    const values = [
        req.params.id,
        req.body.numero,
        req.body.qtd_maxima,
        req.body.tipo
        
    ]
    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "salas atualizada com sucesso!"})
        },
        (erro) => {
            res.status(500).send({ erro: erro})
        }
    )
}

// FUNÇÃO DELETE
exports.deletar = (req,res) => {
    const query = "DELETE FROM salas WHERE id=$1;"; 
    const values = [req.params.id];

    database.query(query, values).then(
        () => {
            res.status(200).json({ mensagem: "sala removida com sucesso!"})
        },
        (erro) => {
            res.status(500).send({ erro: erro})
        }
    )

}