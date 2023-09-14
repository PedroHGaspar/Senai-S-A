const SalaFacade = require("../facades/Salas");
const sala_Facade = new SalaFacade()

// FUNÇÃO GET
exports.buscarSala = async (req, res) => {
    const numeroSala = req.params.numeroSala;
    const salas = await sala_Facade.buscarSalaPorNumero(numeroSala);
    res.status(200).send({ salas })
}
// FUNÇÃO POST
exports.criarSala = async (req, res) => {
    const criarNovaSala = [req.body.id_sala, req.body.num_sala, req.body.qtd_maxima, req.body.tipo];
    const salasNovas = await sala_Facade.criarSala(criarNovaSala)
    res.status(200).send({ salasNovas })
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