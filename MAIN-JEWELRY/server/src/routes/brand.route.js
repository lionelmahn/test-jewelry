import express from "express";
import brandController from "../controller/brand.controller.js";
import { checkRole } from "../auth/checkRole.js";
import { middleware } from "../middleware/middleware.js";
import { createBrandSchema, updateBrandSchema } from "../Schema/brand.shema.js";
import { objectIdSchema } from "../Schema/commonSchema.js";
const route = express.Router();
// /**
//  * @swagger
//  * tags:
//  *   name: Brand
//  *   description: API quản lý brand
// */

// /**
//  * @swagger
//  * /api/brand:
//  *   get:
//  *     summary: Lấy danh sách brand
//  *     tags: [Brand]
//  *     responses:
//  *       200:
//  *         description: Danh sách brand
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: "Lấy brand thành công"
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     currentPage:
//  *                       type: number
//  *                       example: 1
//  *                     totalItem:
//  *                       type: number
//  *                       example: 50
//  *                     totalPage:
//  *                       type: number
//  *                       example: 5
//  *                     limit:
//  *                       type: number
//  *                       example: 10
//  *                     brand:
//  *                       type: array
//  *                       items:
//  *                         type: object
//  *                         properties:
//  *                           _id:
//  *                             type: string
//  *                             example: "692000c2e06e2283446b1d01"
//  *                           name:
//  *                             type: string
//  *                             example: "Gucci"
//  *                           slug:
//  *                             type: string
//  *                             example: "gucci"
// */
route.get("/", brandController.getAllBrand);
route.post("/", checkRole("admin"), middleware(createBrandSchema, "body"), brandController.createBrand);
route.put("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), middleware(updateBrandSchema, "body"), brandController.updateBrand);
route.delete("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), brandController.deleteBrand);
export default route