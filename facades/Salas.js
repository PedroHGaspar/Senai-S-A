const pg = require('pg');

module.exports = class SalaFacade {

    constructor() {
        this.conectarDatabase()
    }

    async conectarDatabase() {
        this.client = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage")
        await this.client.connect()
    }

    async buscarSalaPorNumero(num) {
        try {
            const comando = `SELECT * FROM SALAS WHERE num_sala = (${num})`
            const resultado = await this.client.query(comando)
            return resultado.rows;
        } catch (erro) {
            console.error(erro)
            return []
        }
    }

    async criarSala() {
        try {
            const comando = "INSERT INTO salas(id_sala, num_sala, qtd_maxima, tipo) values ($1, $2, $3, $4);";
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
