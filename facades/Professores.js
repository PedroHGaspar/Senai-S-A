const pg = require("pg");

module.exports = class ProfessoresFacade {
    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }

    async buscarProfessorPeloNome(nome) {
        try {
            const comando = `SELECT * FROM professores WHERE LOWER(NOME) = (${nome})`
            const resultado = await this.client.query(comando)
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async adicionarProfessor() {
        try {
            const comando = "INSERT INTO Professores(id_prof, nome, disp_semana) values ($1, $2, $3);";
            const resultado = await this.client.query(comando)
            return resultado.rows;

        } catch (erro) {
            console.error(erro)
            return []
        }

    }

    async closeDatabase() {
        await this.client.close()
    }
}