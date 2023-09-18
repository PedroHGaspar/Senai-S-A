const pg = require("pg");

module.exports = class ProfessoresFacade {
    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }

    async listarProfessores() {
        try {
            const comando = `SELECT * FROM professores`
            const resultado = await this.client.query(comando)
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async buscarProfessorPeloNome(nome) {
        try {
            const comando = 'SELECT * FROM professores WHERE nome ILIKE $1';
            const resultado = await this.client.query(comando, [nome]);
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async adicionarProfessor(id_prof, nome, disp_semana) {
        try {
            const comando = "INSERT INTO Professores(id_prof, nome, disp_semana) values ($1, $2, $3);";
            const resultado = await this.client.query(comando, [id_prof, nome, disp_semana]);
            return resultado.rows;
        } catch (erro) {
            console.error(erro);
            return [];
        }
    }
    

    async editarProfessor(id_prof, nome, disp_semana) {
        try {
            const comando = "UPDATE PROFESSORES SET nome=$2, disp_semana=$3 WHERE id_prof=$1;";
            const resultado = await this.client.query(comando,[id_prof, nome, disp_semana] )
            return resultado.rows;

        } catch (erro) {
            console.error(erro)
            return []
        }

    }

    async deletarProfessor(id_prof) {
        try {
            const comando = "DELETE FROM PROFESSORES WHERE id_prof=$1;";
            const resultado = await this.client.query(comando, [id_prof])
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