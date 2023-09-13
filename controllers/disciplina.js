const DisciplinaFacade = require("../facades/Disciplina");
const disciplina_Facade = new DisciplinaFacade()

exports.buscarDisciplina = async (req, res) => {
    const disciplinaDataBase = req.params.disciplina;
    const disciplinas = await disciplina_Facade.buscarDisciplinaPeloNome(disciplinaDataBase)
    res.status(200).send({ disciplinas })
}
exports.adicionarDisciplina = async (req, res) => {
    const adicionarDisciplinaNova =[req.body.id, req.body.nome, req.body.carga_horaria, req.body.preco];
    const disciplinasNovas = await disciplina_Facade.adicionarDisciplinaPeloNome(adicionarDisciplinaNova)
    res.status(200).send({ disciplinasNovas })
}
