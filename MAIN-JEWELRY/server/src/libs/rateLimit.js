import rateLimit from "express-rate-limit";
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
}); // giới hạn 10 lần trong 15 phút

export const refreshLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 1000,
}); // giới hạn 20 lần trong 1 phút

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5000,
}); // giới hạn 300 lần trong 1 phút

export const authApiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 200,
}); // giới hạn 200 lần trong 1 phút
