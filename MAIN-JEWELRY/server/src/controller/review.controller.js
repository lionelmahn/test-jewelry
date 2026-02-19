import reviewService from "../services/review.service.js";
import BaseController from "./base.controller.js";

class ReviewController extends BaseController {
    getAllReview = async (req, res) => {
        try {
            const page = Number(req?.query?.page || 1);
            const limit = Number(req?.query?.limit || 10);
            const data = await reviewService.getAllReview(page, limit);
            return this.ok(res, data, "Lấy tất cả bình luận thành công");
        } catch (error) {
            return this.handleErr(res, err);
        }
    }
    getReviewByProductId = async (req, res) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const id = req?.query?.id?.trim() || ""
            console.log(id, page, limit, "ndnvffvn")
            const data = await reviewService.getReviewByProductId(id, page, limit);
            return this.ok(res, data, "Lấy tất cả bình luận thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    createReview = async (req, res) => {
        try {
            const { productId, orderItemId, rating, comment } = req.body;
            const userId = req.user.id;
            const data = await reviewService.createReview(userId, productId, orderItemId, rating, comment);
            return this.created(res, data, "Đã bình luận");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    updateReview = async (req, res) => {
        try {
            const { id } = req.params;
            const { rating, comment } = req.body;
            const userId = req.user.id;

            const data = await reviewService.updateReview(id, rating, comment, userId);
            return this.ok(res, data, "Cập nhật bình luận thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    deleteReview = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const data = await reviewService.deleteReview(id, userId);
            return this.ok(res, data, "Xóa bình luận thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };
}
export default new ReviewController();
