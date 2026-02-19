export const checkRole = (requireRole) => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Chưa đăng nhập" });
            }
            console.log(req.user.role);
            if (req.user.role !== requireRole) {
                return res.status(403).json({ message: "Không có quyền truy cập" });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: "Lỗi xác thực quyền" });
        }
    }
}