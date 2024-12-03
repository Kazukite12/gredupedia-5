const mysql = require('mysql2');


const pool = mysql.createConnection ({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.MYSQL_DB
})


module.exports = pool