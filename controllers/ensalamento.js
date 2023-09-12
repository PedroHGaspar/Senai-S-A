const express = require('express');
const router = express.Router();
const database = require("../config/database")

// FUNÇÂO QUE BUSCA TUDO DA TABELA DE DISCIPLINAS
exports.ensalar = (req, res) => {
    // const professores = buscarProfessores();
    // const disciplinas = buscarDisciplinas();
    // const salas = buscarSalas();
    // const fases = buscarFases();
    // const turmas = buscarTurmas();
    buscarProfessores();
    buscarDisciplinas();
    buscarSalas();
    buscarFases();
    buscarTurmas();




}






buscarProfessores = () => {
    database.query("SELECT * FROM professores").then(
        (resultado) => {
            professores = resultado.rows;
            console.log("Professores: ",professores);
            return professores;
        },
        (erro) => {
            res.status(500).send({ erro: erro })
        }
    )
}

buscarDisciplinas = () => {
    database.query("SELECT * FROM disciplina").then(
        (resultado) => {
            disciplinas = resultado.rows;
            console.log("disciplinas: ",disciplinas);
            return disciplinas;
        },
        (erro) => {
            res.status(500).send({ erro: erro })
        }
    )
}

buscarSalas = () => {
    database.query("SELECT * FROM salas").then(
        (resultado) => {
            salas = resultado.rows;
            console.log("Salas: ",salas);
            return salas;
        },
        (erro) => {
            res.status(500).send({ erro: erro })
        }
    )
}

buscarFases = () => {
    database.query("SELECT * FROM fase").then(
        (resultado) => {
            fase = resultado.rows;
            console.log("fases: ",fase);
            return fase;
        },
        (erro) => {
            res.status(500).send({ erro: erro })
        }
    )
}

buscarTurmas = () => {
    database.query("SELECT * FROM turma").then(
        (resultado) => {
            turma = resultado.rows;
            console.log("Turmas: ",turma);
            return turma;
        },
        (erro) => {
            res.status(500).send({ erro: erro })
        }
    )
}



// database.query("SELECT * FROM disciplina").then(
//     (resultado) => {
//         res.status(200).send({ disciplinas: resultado.rows})
//     },
//     (erro) => {
//         res.status(500).send({ erro: erro})
//     }
// )

// exports.ensalar = (req, res) => {
//     const nomeLimpo = req.params.nome.toLowerCase();
//     database.query("SELECT * FROM professores").then(
//         (resultado) => {
//             const nomeCerveja = resultado.rows.filter((cerveja) =>
//                 cerveja.nome.toLowerCase().includes(nomeLimpo)
//             );
//             res.status(200).send({ nomeCerveja });
//         },
//         (erro) => {
//             res.status(500).send({ erro: erro });
//             console.log(erro);
//         }
//     );
// };
