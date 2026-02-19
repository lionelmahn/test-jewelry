import express from "express"
import couponController from "../controller/coupon.controller.js"
import { middleware } from "../middleware/middleware.js"
import { createCouponSchema, updateCouponSchema } from "../Schema/coupon.shema.js"
import { checkRole } from "../auth/checkRole.js"
import { objectIdSchema } from "../Schema/commonSchema.js"
const route = express.Router()
route.get('/', couponController.getCoupon)
route.post("/", checkRole("admin"), middleware(createCouponSchema, "body"), couponController.createCoupon)
route.put("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), middleware(updateCouponSchema, "body"), couponController.updateCoupon)
route.delete("/:id", checkRole("admin"), middleware(objectIdSchema, "params"), couponController.deleteCoupon)
export default route