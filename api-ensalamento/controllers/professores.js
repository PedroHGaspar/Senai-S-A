const ProfessoresFacade = require("../facades/Professores");
const professores_Facade = new ProfessoresFacade()


exports.listarProfessores = async (req, res) => {
    const professoresLista = await professores_Facade.listarProfessores()
    res.status(200).send({ professoresLista })
}

exports.buscarProfessores = async (req, res) => {
    const professoresDataBase = req.params.nome;
    const professores = await professores_Facade.buscarProfessorPeloNome(professoresDataBase)
    res.status(200).send({ professores })
}
exports.adicionarProfessor = async (req, res) => {
    const { id_prof, nome, disp_semana } = req.body;
    const professorNovo = await professores_Facade.adicionarProfessor(id_prof, nome, disp_semana)
    console.log("Professor Adcionado")
}

exports.editarProfessor = async (req, res) => {
    const id_prof = req.params.id_prof;
    const { nome, disp_semana } = req.body;
    const professorEditado = await professores_Facade.editarProfessor(id_prof, nome, disp_semana)
    console.log("Professor Editado")
}

exports.deletarProfessor = async (req, res) => {
    const deletarProfessorExistente = req.params.id_prof;
    const professorDeletado = await professores_Facade.deletarProfessor(deletarProfessorExistente)
    console.log("Professor Deletado")
}