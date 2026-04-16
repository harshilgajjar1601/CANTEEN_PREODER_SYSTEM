// const mysql = require("mysql2");
// const config = require("./config/dbConfig");

// const db = mysql.createConnection(config);

// db.connect((err) => {
//     if (err) {
//         console.log("DB Connection Error ❌", err);
//     } else {
//         console.log("MySQL Connected ✅");
//     }
// });

// module.exports = db;

const mysql = require("mysql2");
const config = require("./config/dbConfig");

let db;

function handleDisconnect() {
  db = mysql.createConnection(config);

  db.connect((err) => {
    if (err) {
      console.log("DB Error ❌:", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("MySQL Connected ✅");
    }
  });

  db.on("error", (err) => {
    console.log("DB ERROR 🔴:", err);

    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // reconnect
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;