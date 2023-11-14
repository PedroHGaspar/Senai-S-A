const TurmasFacade = require("../facades/turmas");
const turmas_Facade = new TurmasFacade()


exports.listarTurmas = async (req, res) => {
    const turmasLista = await turmas_Facade.listarTurmas()
    res.status(200).send({ turmasLista })
}

exports.buscarTurmaPeloNome = async (req, res) => {
    const professoresDataBase = req.params.nm_turma;
    const turmasLista = await turmas_Facade.buscarTurmaPeloNome(professoresDataBase)
    res.status(200).send({ turmasLista })
}
exports.adicionarTurma = async (req, res) => {
    const { id_turma, nm_turma, qtd_alunos } = req.body;
    const turmaNova = await turmas_Facade.adicionarTurma(id_turma, nm_turma, qtd_alunos)
    console.log("Turma Adcionado")
}

exports.editarTurma = async (req, res) => {
    const id_turma = req.params.id_turma;
    const { nm_turma, qtd_alunos } = req.body;
    const turmaEditada = await turmas_Facade.editarTurma(id_turma, nm_turma, qtd_alunos)
    console.log("Turma Editado")
}

exports.deletarTurma = async (req, res) => {
    const deletarTurmaExistente = req.params.id_turma;
    const turmaDeletada = await turmas_Facade.deletarTurma(deletarTurmaExistente)
    console.log("Turma Deletado")
}