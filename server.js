const express = require("express");
const bodyParser = require("body-parser");
port = 3000;
const salasRoutes = require("./routes/salas");



const app = express()
app.use(bodyParser.json())  //sem isso, não da pra mandar requisição em json para a API


//cadastrando as rotas
app.use("/salas", salasRoutes)


app.listen(port, () => {
    console.log(`Servidor express rodando na porta: ${port}`)
})