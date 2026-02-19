import express from "express"
import categoryController from "../controller/category.controller.js";
import { checkRole } from "../auth/checkRole.js";
import { middleware } from "../middleware/middleware.js";
import { createCateSchema, updateCateSchema } from "../Schema/category.schema.js";
import { objectIdSchema } from "../Schema/commonSchema.js";
const route = express.Router();
route.get("/", categoryController.getAllCategory)
route.post("/", checkRole("admin"), middleware(createCateSchema, "body"), categoryController.createCategory)
route.put("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), middleware(updateCateSchema, "body"), categoryController.updateCategory)
route.delete("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), categoryController.deleteCategory)
export default route