const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // check user exists
        const [user] = await userModel.findUserByEmail(email);

        if (user.length > 0) {
            return res.json({ message: "Username is already exist!try another username..." });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user
        await userModel.createUser(name, email, hashedPassword);

        res.json({ message: "User registered successfully ✅" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [result] = await userModel.findUserByEmail(email);

        if (!result || result.length === 0) {
            return res.json({
                success: false,
                message: "Email not found"
            });
        }

        const user = result[0];

        // 🔥 IMPORTANT LINE
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Wrong password"
            });
        }

        return res.json({
            success: true,
            message: "Login successfully! Redirecting to menu..."
        });

    } catch (err) {
        console.log("ERROR:", err);
        return res.json({ success: false, message: "Server error" });
    }
};