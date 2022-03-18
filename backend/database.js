const pg =  require('pg');

const clinet =  new pg.Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "postgres",
    database :"icar",
});
module.exports = clinet



