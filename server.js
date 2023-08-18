const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const salasProfessores = require("./routes/professores");
const database = require("./config/database")



const app = express()
app.use(bodyParser.json())  //sem isso, não da pra mandar requisição em json para a API


app.use("/professores", salasProfessores);

database.connect((erro) => {
    if(erro) {
        return console.log("Não foi possivel se conectar com o elephantSQL");


    }else{
        return console.log("conectado ao elephantSQL")
    }
})



app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`)
})