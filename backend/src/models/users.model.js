import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { type } from "os";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
    if (!this.email || !this.username) {
        throw new Error("Missing required user properties for token generation");
    }

    const payload = {
        id: this._id,
        email: this.email,
        username: this.username,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const User = mongoose.model("User", userSchema);