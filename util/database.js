const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "161.35.177.175",
    user: "gregt",
    password: "pwdgt",
    database: "dbgregt"
});

module.exports = pool.promise();