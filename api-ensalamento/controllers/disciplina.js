const DisciplinaFacade = require("../facades/Disciplina");
const disciplina_Facade = new DisciplinaFacade()


exports.listarDisciplina = async (req, res) => {
    const disciplinasLista = await disciplina_Facade.listarDisciplina()
    res.status(200).send({ disciplinasLista })
}

exports.buscarDisciplina = async (req, res) => {
    const disciplinaDataBase = req.params.nm_disciplina;
    const disciplinas = await disciplina_Facade.buscarDisciplinaPeloNome(disciplinaDataBase)
    res.status(200).send({ disciplinas })
}
exports.adicionarDisciplina = async (req, res) => {
    const { id_discip, nm_disciplina, qtd_dias, num_fase } = req.body;
    const disciplinaNova = await disciplina_Facade.adicionarDisciplina(id_discip, nm_disciplina, qtd_dias, num_fase)
    res.status(200).send("Disciplina Criada")
}

exports.editarDisciplina = async (req, res) => {
    const id_discip = req.params.id_discip;
    const { nm_disciplina, qtd_dias, num_fase } = req.body;
    const disciplinaEditado = await disciplina_Facade.editarDisciplina(id_discip, nm_disciplina, qtd_dias, num_fase)
    res.status(200).send("Disciplina Editado")
}

exports.deletarDisciplina = async (req, res) => {
    const deletarDisciplinaExistente = req.params.id_discip;
    const disciplinaDeletado = await disciplina_Facade.deletarDisciplina(deletarDisciplinaExistente)
    res.status(200).send("Disciplina Deletado")
}