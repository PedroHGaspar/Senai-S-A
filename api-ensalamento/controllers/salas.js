const SalaFacade = require("../facades/Salas");
const sala_Facade = new SalaFacade()

// FUNÇÃO GET

exports.listarSalas= async (req, res) => {
    const salasLista = await sala_Facade.listarSalas()
    res.status(200).send({ salasLista })
}

exports.buscarSala = async (req, res) => {
    const numeroSala = req.params.num_sala;
    const salasLista = await sala_Facade.buscarSalaPorNumero(numeroSala);
    res.status(200).send({ salasLista })
}
// FUNÇÃO POST
exports.criarSala = async (req, res) => {
    const { id_sala, num_sala, qtd_maxima, tipo } = req.body;
    const salaNovas = await sala_Facade.criarSala(id_sala, num_sala, qtd_maxima, tipo)
    console.log("Sala Criada")
}

exports.editarSala = async (req, res) => {
    const id_sala = req.params.id_sala;
    const { num_sala, qtd_maxima, tipo } = req.body;
    const salaEditada = await sala_Facade.editarSala( id_sala, num_sala, qtd_maxima, tipo )
    console.log("Sala Editada")
}

exports.deletarSala = async (req, res) => {
    const deletarSalaExistente = req.params.id_sala;
    const salaDeletada = await sala_Facade.deletarSala(deletarSalaExistente)
    console.log("Sala Deletada")
}



















// // FUNÇÃO DE ATUALIZAR DADOS
// exports.put = (req,res) => {
//     const query = "UPDATE salas SET numero=$2, qtd_maxima=$3, tipo=$4 WHERE id=$1;"; // nesse caso aqui tem 5 valores com $, ali nos values escrevi na ordem que escreveria no body do site que relacionamos com o banco através do URL(postman)
//     const values = [
//         req.params.id,
//         req.body.numero,
//         req.body.qtd_maxima,
//         req.body.tipo
        
//     ]
//     database.query(query, values).then(
//         () => {
//             res.status(200).send({ mensagem: "salas atualizada com sucesso!"})
//         },
//         (erro) => {
//             res.status(500).send({ erro: erro})
//         }
//     )
// }

// // FUNÇÃO DELETE
// exports.deletar = (req,res) => {
//     const query = "DELETE FROM salas WHERE id=$1;"; 
//     const values = [req.params.id];

//     database.query(query, values).then(
//         () => {
//             res.status(200).json({ mensagem: "sala removida com sucesso!"})
//         },
//         (erro) => {
//             res.status(500).send({ erro: erro})
//         }
//     )

// }