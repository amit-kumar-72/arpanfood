import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

//create token
const createToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET);
}

//login user (with role)
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id, user.role);  //  role added in token
        res.json({
            success: true,
            token,
            role: user.role //  role returned in response too (for frontend redirect)
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//register user (with optional role, default user)
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;  //  role accepted (optional)

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            role: role || "user"  //  default role "user", admin can pass "admin"
        });

        const user = await newUser.save();
        const token = createToken(user._id, user.role);  // role in token too
        res.json({
            success: true,
            token,
            role: user.role //  return role in response too
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { loginUser, registerUser };
