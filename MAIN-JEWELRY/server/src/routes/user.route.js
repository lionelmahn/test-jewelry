import express from "express";
import userController from "../controller/user.controller.js";
import multer from "multer";
import path from "path"
import { middleware } from "../middleware/middleware.js";
import { objectIdSchema } from "../Schema/commonSchema.js";
import { updatePasswordSchema, updateRoleSchema, updateUserSchema } from "../Schema/user.schema.js";
import { checkRole } from "../auth/checkRole.js";
const route = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
route.get("/", checkRole("admin"), userController.getAllUser);
route.put("/:id", middleware(updateUserSchema, "body"), userController.updateUser);
route.put("/update-role/:id", checkRole("admin"), middleware(objectIdSchema, "params"), middleware(updateRoleSchema, "body"), userController.updateRole);
route.get('/logout', userController.logout)
route.post('/update-password', middleware(updatePasswordSchema, "body"), userController.updatePassword)
route.post("/upload", upload.single('avatar'), userController.uploadAvatar)
route.delete("/:id", checkRole("admin"), userController.deleteUser)
export default route