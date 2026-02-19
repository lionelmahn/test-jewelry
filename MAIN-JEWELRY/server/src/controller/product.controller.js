import BaseController from "./base.controller.js";
import productService from "../services/product.service.js";
import { BadRequest } from "../core/error.response.js";

class ProductController extends BaseController {
    constructor() {
        super();
    }
    getAllProduct = async (req, res) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit) || 10;
            const search = req.query.search?.trim() || "";
            const minPrice = Number(req.query.min) || 0;
            const maxPrice = Number(req.query.max) || Number.MAX_SAFE_INTEGER;
            const color = req.query.color?.trim() || null;
            const carat = req.query.carat ? Number(req.query.carat) : null;
            const gram = req.query.gram ? Number(req.query.gram) : null;
            const purity = req.query.purity?.trim() || null;
            const mm = req.query.mm ? Number(req.query.mm) : null;
            const categoryName = req.query.category?.trim() || "";
            const subCategoryName = req.query.subcategory?.trim() || "";
            const brandName = req.query.brand?.trim() || "";
            const isNewProduct = req.query.isNewProduct || false
            const isFeatured = req.query.isFeatured || false
            const dataFilter = await productService.getAllProduct(page, limit, search, minPrice, maxPrice, color, carat, gram, purity, mm, categoryName, subCategoryName, brandName, isNewProduct, isFeatured)
            return this.ok(res, dataFilter, "Lấy danh sách sản phẩm thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    getOntime = async (req, res) => {
        try {
            const page = Number(req.query.page || 1);
            const limit = Number(req.query.limit) || 10;
            const isActive = req.query.isActive || false
            const dataFilter = await productService.getOntime(isActive, page, limit)
            return this.ok(res, dataFilter, "Lấy danh sách sản phẩm thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    getProductById = async (req, res) => {
        try {
            const { id } = req.params
            const productById = await productService.getProductById(id);
            return this.ok(res, productById, "Lấy thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    createProduct = async (req, res) => {
        try {
            const { name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct } = req.body;
            console.log(name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct, "pppppppppppppppppp")
            const newProduct = await productService.createProduct({ name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct })
            return this.created(res, newProduct, "Thêm sản phẩm thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    upFileProduct = async (req, res) => {
        try {
            if (!req.file) {
                throw new BadRequest("Không có file upload")
            }
            const filePath = req.file.path
            const data = await productService.upFileProduct(filePath)
            return this.ok(res, data, "Up thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    previewUpFile = async (req, res) => {
        try {
            if (!req.file) {
                throw new BadRequest("Không có file upload")
            }
            const filePath = req.file.path
            const data = await productService.previewUpFileProduct(filePath)
            return this.ok(res, data, "Up thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const { name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct } = req.body;
            const updatedProduct = await productService.updateProduct(id, { name, brandId, categoryId, subCategoryId, promotion, variants, images, description, isFeatured, isNewProduct })
            return this.ok(res, updatedProduct, "Cập nhật thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { id } = req.params;
            const removeProduct = await productService.deleteProduct(id)
            return this.ok(res, removeProduct, "Xóa thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    uploadImgProduct = async (req, res) => {
        try {
            const files = req.files;
            const results = await productService.uploadImgProduct(files);
            return this.created(res, results, "Upload ảnh thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }

    deleteImg = async (req, res) => {
        try {
            const { id } = req.params;
            const { url } = req.body;
            const remove = await productService.removeImgProduct(id, url)
            return this.ok(res, remove, "Đã xóa ảnh thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    removeImgTem = async (req, res) => {
        try {
            const { url } = req.body
            console.log("url", url)
            const remove = await productService.removeImgTem(url)
            return this.ok(res, remove, "Đã xóa ảnh thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
    commentProduct = async (req, res) => {
        try {
            const { id } = req.body;
            const updatedProduct = await productService.updateRating(id)
            return this.ok(res, updatedProduct, "Cập nhật đánh giá sản phẩm thành công");
        } catch (error) {
            return this.handleErr(res, error);
        }
    }
}

export default new ProductController();
