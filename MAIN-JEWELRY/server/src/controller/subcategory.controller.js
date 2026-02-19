import subcategoryService from "../services/subcategory.service.js";
import BaseController from "./base.controller.js";

class SubcategoryController extends BaseController {
    getAllSubCate = async (req, res) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit || 10);
            const search = req.query.search?.trim() || "";
            const slug = req.query.slug?.trim() || ""
            const data = await subcategoryService.getAllSubCate(page, limit, search, slug);
            return this.ok(res, data, "Lấy danh mục con thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };
    createSubcategory = async (req, res) => {
        try {
            const { name, description, categoryId, images } = req.body;

            const data = await subcategoryService.createSubCate(name, description, categoryId, images);
            return this.created(res, data, "Thêm thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };
    createImgSub = async (req, res) => {
        try {
            const files = req.files;
            const upImg = await subcategoryService.createImgSub(files)
            return this.created(res, upImg, "Upload ảnh thành công")
        } catch (error) {
            return this.handleErr(res, err);
        }
    }
    deleteImg = async (req, res) => {
        try {
            const { id } = req.params;
            const { url } = req.body;
            const remove = await subcategoryService.removeImgSub(id, url)
            return this.ok(res, remove, "Đã xóa ảnh thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    removeImgTem = async (req, res) => {
        try {
            const { url } = req.body
            console.log("url", url)
            const remove = await subcategoryService.removeImgTem(url)
            return this.ok(res, remove, "Đã xóa ảnh thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    updateSubCate = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, categoryId, images } = req.body;

            const data = await subcategoryService.updateSubCate(id, name, description, categoryId, images);
            return this.ok(res, data, "Cập nhật Subcategory thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };

    deleteSub = async (req, res) => {
        try {
            const { id } = req.params;

            const data = await subcategoryService.deleteSubCate(id);
            return this.ok(res, data, "Xóa Subcategory thành công");
        } catch (err) {
            return this.handleErr(res, err);
        }
    };
}

export default new SubcategoryController();
