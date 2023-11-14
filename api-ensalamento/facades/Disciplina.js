const pg = require("pg");

module.exports = class DisciplinaFacade {

    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }

    async listarDisciplina() {
        try {
            const comando = `SELECT * FROM disciplina`
            const resultado = await this.client.query(comando)
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async buscarDisciplinaPeloNome(nm_disciplina) {
        try {
            const comando = `SELECT * FROM disciplina WHERE nm_disciplina ILIKE $1 || \'%\'`
            const resultado = await this.client.query(comando, [nm_disciplina])
            return resultado.rows
        }
        catch (erro) {
            console.error(erro)
            return []
        }
    }

    async adicionarDisciplina(id_discip, nm_disciplina, qtd_dias, num_fase) {
        try {
            const comando = `INSERT INTO DISCIPLINA(id_discip, nm_disciplina, qtd_dias, num_fase) values ($1, $2, $3, $4);`;
            const resultado = await this.client.query(comando, [id_discip, nm_disciplina, qtd_dias, num_fase]);
            return resultado.rows;
        } catch (erro) {
            console.error(erro);
            return [];
        }
    }
    

    async editarDisciplina(id_discip, nm_disciplina, qtd_dias, num_fase) {
        try {
            const comando = "UPDATE DISCIPLINA SET nm_disciplina=$2, qtd_dias=$3, num_fase=$4 WHERE id_discip=$1;";
            const resultado = await this.client.query(comando, [id_discip, nm_disciplina, qtd_dias, num_fase])
            return resultado.rows;

        } catch (erro) {
            console.error(erro)
            return []
        }

    }

    async deletarDisciplina(id_discip) {
        try {
            const comando = "DELETE FROM DISCIPLINA WHERE id_discip=$1;";
            const resultado = await this.client.query(comando, [id_discip])
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