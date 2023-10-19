const pg = require("pg");

module.exports = class TurmasFacade {
    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }

    async listarTurmas() {
        try {
            const comando = `SELECT * FROM TURMA`
            const resultado = await this.client.query(comando)
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async buscarTurmaPeloNome(nm_turma) {
        try {
            const comando = 'SELECT * FROM TURMA WHERE nm_turma ILIKE $1';
            const resultado = await this.client.query(comando, [nm_turma]);
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async adicionarTurma(id_turma, nm_turma, qtd_alunos, num_fase, num_sala) {
        try {
            const comando = "INSERT INTO TURMA(id_turma, nm_turma, qtd_alunos, num_fase, num_sala) values ($1, $2, $3, $4, $5);";
            const resultado = await this.client.query(comando, [id_turma, nm_turma, qtd_alunos, num_fase, num_sala]);
            return resultado.rows;
        } catch (erro) {
            console.error(erro);
            return [];
        }
    }
    

    async editarTurma(id_turma, nm_turma, qtd_alunos, num_fase, num_sala) {
        try {
            const comando = "UPDATE TURMA SET nm_turma=$2, qtd_alunos=$3, num_fase=$4, num_sala=$5 WHERE id_turma=$1;";
            const resultado = await this.client.query(comando,[id_turma, nm_turma, qtd_alunos, num_fase, num_sala] )
            return resultado.rows;

        } catch (erro) {
            console.error(erro)
            return []
        }

    }

    async deletarTurma(id_turma) {
        try {
            const comando = "DELETE FROM TURMA WHERE id_turma=$1;";
            const resultado = await this.client.query(comando, [id_turma])
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