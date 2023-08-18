const pg = require("pg");
const database = new pg.Client("postgres://xugreage:Y4ocFDG2etUDhzLxHCFFCG5obVTsWkhQ@silly.db.elephantsql.com/xugreage");

module.exports=database;