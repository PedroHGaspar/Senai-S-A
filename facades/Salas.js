const pg = require('pg');

module.exports = class SalaFacade {

    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }


    async listarSalas() {
        try {
            const comando = `SELECT * FROM salas`
            const resultado = await this.client.query(comando)
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }


    async buscarSalaPorNumero(num_sala) {
        try {
            const comando = `SELECT * FROM SALAS WHERE num_sala = $1`
            const resultado = await this.client.query(comando, [num_sala])
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async criarSala(id_sala, num_sala, qtd_maxima, tipo) {
        try {
            const comando = "INSERT INTO SALAS(id_sala, num_sala, qtd_maxima, tipo) values ($1, $2, $3, $4);";
            const resultado = await this.client.query(comando, [id_sala, num_sala, qtd_maxima, tipo])
            return resultado.rows;

        } catch (erro) {
            console.error(erro)
            return []
        }

    }

    async editarSala(id_sala, num_sala, qtd_maxima, tipo) {
        try {
            const comando = "UPDATE SALAS SET num_sala=$2, qtd_maxima=$3, tipo=$4 WHERE id_sala=$1;";
            const resultado = await this.client.query(comando,[id_sala, num_sala, qtd_maxima, tipo] )
            return resultado.rows;

        } catch (erro) {
            console.error(erro)
            return []
        }

    }

    async deletarSala(id_sala) {
        try {
            const comando = "DELETE FROM SALAS WHERE id_sala=$1;";
            const resultado = await this.client.query(comando, [id_sala])
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
