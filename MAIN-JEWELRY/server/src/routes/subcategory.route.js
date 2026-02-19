import express from "express";
import multer from "multer";
import path from "path"
import subcategoryController from "../controller/subcategory.controller.js";
import { checkRole } from "../auth/checkRole.js";
import { middleware } from "../middleware/middleware.js";
import { createSubcateSchema, updateSubcateSchema } from "../Schema/subcategory.schema.js";
import { objectIdSchema } from "../Schema/commonSchema.js";
const route = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/subcategorys');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });
route.get("/", subcategoryController.getAllSubCate);
route.post("/", checkRole("admin"), middleware(createSubcateSchema, "body"), subcategoryController.createSubcategory);
route.put("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), middleware(updateSubcateSchema, "body"), subcategoryController.updateSubCate);
route.post("/upload", checkRole("admin"), upload.array('subcatgory-images', 5), subcategoryController.createImgSub)
route.delete("/delete-img-tem", checkRole("admin"), subcategoryController.removeImgTem)
route.delete("/:id/delete-img", checkRole("admin"), middleware(objectIdSchema, "params"), subcategoryController.deleteImg)
route.delete("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), subcategoryController.deleteSub);
export default route