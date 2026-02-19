import express from "express"
import reviewController from "../controller/review.controller.js"
const route = express.Router()
route.get("/all", reviewController.getAllReview)
route.get('/', reviewController.getReviewByProductId)
route.post('/', reviewController.createReview)
route.put("/:id", reviewController.updateReview)
route.delete("/:id", reviewController.deleteReview)
export default route