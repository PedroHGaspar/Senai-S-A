const express = require('express');
const router = express.Router();
//const professores = require("../models/professores");
const database = require("../config/database")

// FUNÇÂO QUE BUSCA TUDO DA TABELA DE CERVEJAS
exports.busca = (req,res) => {
    database.query("SELECT * FROM PROFESSORES").then(
        (resultado) => {
            res.status(200).send({ professores: resultado.rows})
        },
        (erro) => {
            res.status(500).send({ erro: erro})
        }
    )
}



// FUNÇÃO DE POST
exports.postar = (req,res) => {
    const query = "INSERT INTO PROFESSORES(id, nome, horarios, disciplinas) values ($1, $2, $3, $4);"; // o $1 indica que aquele valor, entre aqueles que será enviado, será o primeiro e assim sucessivamente, até o 5 nesse caso
    const values = [req.body.id, req.body.nome, req.body.horarios, req.body.disciplinas];

    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "Professor cadastrado com sucesso!" })
        },
        (erro) => {
            res.status(500).send({erro: erro})
        }
    )

}

// FUNÇÃO DE ATUALIZAR DADOS
exports.put = (req,res) => {
    const query = "UPDATE PROFESSORES SET nome=$2, horarios=$3, disciplinas=$4 WHERE id=$1;"; // nesse caso aqui tem 5 valores com $, ali nos values escrevi na ordem que escreveria no body do site que relacionamos com o banco através do URL(postman)
    const values = [
        req.params.id,
        req.body.nome,
        req.body.horarios,
        req.body.disciplinas
        
    ]
    database.query(query, values).then(
        () => {
            res.status(200).send({ mensagem: "Professor atualizada com sucesso!"})
        },
        (erro) => {
            res.status(500).send({ erro: erro})
        }
    )
}

// FUNÇÃO DELETE
exports.deletar = (req,res) => {
    const query = "DELETE FROM PROFESSORES WHERE id=$1;"; 
    const values = [req.params.id];

    database.query(query, values).then(
        () => {
            res.status(200).json({ mensagem: "Professor removida com sucesso!"})
        },
        (erro) => {
            res.status(500).send({ erro: erro})
        }
    )

}