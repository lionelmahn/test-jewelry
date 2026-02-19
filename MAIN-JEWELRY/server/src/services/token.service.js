import crypto from "crypto";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import session from "../models/session.model.js";
const createToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
}
const createRefershToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}
const verifyToken = async (token) => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(">>> payload", payload);
        const decode = await session.findOne({ userId: payload.id });
        if (!decode) {
            throw new Error('Phiên đăng nhập không hợp lệ');
        }
        return payload;
    } catch (error) {
        throw new Error('Vui lòng đăng nhập lại');
    }
}
export { createToken, createRefershToken, verifyToken }