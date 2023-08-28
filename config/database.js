const pg = require("pg");

const dotenv = require("dotenv");
dotenv.config()
const database= new pg.Client(process.env.DATABASE)


module.exports=database;