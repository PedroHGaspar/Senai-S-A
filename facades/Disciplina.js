const pg = require("pg");

module.exports = class DisciplinaFacade {

    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }

    async buscarDisciplinaPeloNome(nome) {
        try {
            const comando = `SELECT * FROM disciplina WHERE LOWER(NOME) = LOWER('${nome}'')`
            const resultado = await this.client.query(comando)
            return resultado.rows
        }
        catch (erro) {
            console.error(erro)
            return []
        }
    }

    async adicionarDisciplinaPeloNome() {
        try {
            const comando = `INSERT INTO DISCIPLINA(id, nome, carga_horaria, preco) values ($1, $2, $3, $4);')`
            const resultado = await this.client.query(comando)
            return resultado.rows
        }
        catch (erro) {
            console.error(erro)
            return []
        }
    }

    async closeDatabase() {
        await this.client.close()
    }
}