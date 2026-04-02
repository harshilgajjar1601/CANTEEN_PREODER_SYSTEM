const db = require("../db");

// create user
exports.createUser = (name, email, password) => {
    return db.promise().query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
};

// find user by email
exports.findUserByEmail = (email) => {
    return db.promise().query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
};