const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const cors = require('cors');
const salasProfessores = require("./routes/professores");
const controllerDisciplina = require("./routes/disciplina");
const controllerSalas = require("./routes/salas");
const controllerTurmas = require("./routes/turmas")
const database = require("./config/database")


const app = express()
app.use(bodyParser.json())  //sem isso, não da pra mandar requisição em json para a API
app.use(cors());

app.use("/professores", salasProfessores);
app.use("/disciplina", controllerDisciplina);
app.use("/salas", controllerSalas);
app.use("/turmas", controllerTurmas);


database.connect((erro) => {
    if(erro) {
        return console.log("Não foi possivel se conectar com o elephantSQL");


    }else{
         console.log("conectado ao elephantSQL")
    }
})



app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`)
})