import categoryService from "../services/category.service.js";
import BaseController from "./base.controller.js";

class CategoryController extends BaseController {
    getAllCategory = async (req, res) => {
        try {
            const page = Number(req.query.page || 1)
            const limit = Number(req.query.limit || 10)
            const search = req.query.search?.trim() || ""
            const dataFilter = await categoryService.getAllCate(page, limit, search)
            return this.ok(res, dataFilter, "Lấy category thành công")
        } catch (err) {
            return this.handleErr(res, err)
        }
    };

    createCategory = async (req, res) => {
        try {
            const createCate = await categoryService.createCate(req.body)
            return this.created(res, createCate, "Thêm thành công")
        } catch (err) {
            return this.handleErr(res, err)
        }
    };

    updateCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body
            const updateCate = await categoryService.updateCate(id, name, description)
            return this.ok(res, updateCate, "Cập nhật thành công")
        } catch (err) {
            return this.handleErr(res, err)
        }
    };

    deleteCategory = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await categoryService.deleteCate(id);
            return this.ok(res, deleted, "Xóa thành công")
        } catch (err) {
            return this.handleErr(res, err)
        }
    };
}

export default new CategoryController();
