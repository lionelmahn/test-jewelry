import { BadRequest, Forbidden, NotFound } from "../core/error.response.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import reviewModel from "../models/review.model.js";
import userModel from "../models/user.model.js";
class ReviewService {
    async getAllReview(page, limit) {
        const skip = (page - 1) * limit;
        const [allReview, totalItem] = await Promise.all([
            reviewModel
                .find()
                .populate("userId")
                .populate("productId")
                .populate("orderItemId")
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 }),

            reviewModel.countDocuments()
        ]);
        const totalPage = Math.ceil(totalItem / limit);
        const totalAvarageReview = allReview.reduce((acc, re) => acc + re.rating, 0) / totalItem
        return {
            currentPage: page,
            totalItem,
            totalPage,
            limit,
            review: allReview,
            totalAvarageReview: Number(totalAvarageReview.toFixed(1))
        };
    }
    async getReviewByProductId(productId, page, limit) {
        const skip = (page - 1) * limit;
        const [allReview, totalItem] = await Promise.all([
            reviewModel
                .find({ productId })
                .populate("userId")
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
                .sort({ createdAt: -1 }),

            reviewModel.countDocuments({ productId })
        ]);
        const totalPage = Math.ceil(totalItem / limit);
        const averageRaring = allReview.reduce((acc, o) => acc + o.rating, 0) / totalItem
        return {
            currentPage: page,
            totalItem,
            totalPage,
            limit,
            review: allReview,
            averageRaring: Number(averageRaring.toFixed(1))
        };
    }
    async createReview(userId, productId, orderItemId, rating, comment) {
        if (!productId || !orderItemId || !userId || !rating) {
            throw new BadRequest("Thiếu");
        }
        const [product, user, order] = await Promise.all([
            productModel.findById(productId),
            userModel.findById(userId),
            orderModel.findById(orderItemId)
        ]);
        if (!product) {
            throw new NotFound("Không tìm thấy sản phẩm");
        }
        if (!user) {
            throw new NotFound("Không tìm thấy người dùng");
        }
        if (!order) {
            throw new NotFound("Không tìm thấy đơn hàng");
        }
        if (order.status !== "COMPLETED") {
            throw new Forbidden("Chỉ được đánh giá sau khi nhận hàng");
        }
        const newComment = await reviewModel.create({
            productId,
            userId,
            orderItemId,
            rating,
            comment
        });
        return newComment
    }
    async updateReview(id, rating, comment, userId) {
        const findComment = await reviewModel.findById(id);
        if (!findComment) {
            throw new NotFound("Không tìm thấy bình luận");
        }

        if (findComment.userId.toString() !== userId) {
            throw new Forbidden("Bạn không có quyền sửa bình luận này");
        }

        const updatedReview = await reviewModel.findByIdAndUpdate(
            id,
            { rating, comment },
            { new: true }
        );
        return updatedReview;
    }
    async deleteReview(id, userId) {
        const findComment = await reviewModel.findById(id);
        if (!findComment) {
            throw new NotFound("Không tìm thấy bình luận");
        }

        if (findComment.userId.toString() !== userId) {
            throw new Forbidden("Bạn không có quyền xóa bình luận này");
        }
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        return deletedReview
    }
}
export default new ReviewService()