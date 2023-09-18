const ProfessoresFacade = require("../facades/Professores");
const professores_Facade = new ProfessoresFacade()


exports.buscarProfessores = async (req, res) => {
    const professoresDataBase = req.params.professores;
    const professores = await professores_Facade.buscarProfessorPeloNome(professoresDataBase)
    res.status(200).send({ professores })
}
exports.adicionarProfessor = async (req, res) => {
    const adicionarProfessorNovo =[req.body.id_prof, req.body.nome, req.body.disp_semana];
    const professorNovo = await professores_Facade.adicionarProfessor(adicionarProfessorNovo)
    res.status(200).send({ professorNovo })
}


// // FUNÇÃO DE ATUALIZAR DADOS
// exports.put = (req, res) => {
//     const query = "UPDATE PROFESSORES SET nome=$2, horarios=$3, disciplinas=$4 WHERE id=$1;"; // nesse caso aqui tem 5 valores com $, ali nos values escrevi na ordem que escreveria no body do site que relacionamos com o banco através do URL(postman)
//     const values = [
//         req.params.id,
//         req.body.nome,
//         req.body.horarios,
//         req.body.disciplinas

//     ]
//     database.query(query, values).then(
//         () => {
//             res.status(200).send({ mensagem: "Professor atualizada com sucesso!" })
//         },
//         (erro) => {
//             res.status(500).send({ erro: erro })
//         }
//     )
// }

// // FUNÇÃO DELETE
// exports.deletar = (req, res) => {
//     const query = "DELETE FROM PROFESSORES WHERE id=$1;";
//     const values = [req.params.id];

//     database.query(query, values).then(
//         () => {
//             res.status(200).json({ mensagem: "Professor removida com sucesso!" })
//         },
//         (erro) => {
//             res.status(500).send({ erro: erro })
//         }
//     )

// }