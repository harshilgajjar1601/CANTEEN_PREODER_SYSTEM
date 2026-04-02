const mysql = require("mysql2");
const config = require("./config/dbConfig");

const db = mysql.createConnection(config);

db.connect((err) => {
    if (err) {
        console.log("DB Connection Error ❌", err);
    } else {
        console.log("MySQL Connected ✅");
    }
});

module.exports = db;