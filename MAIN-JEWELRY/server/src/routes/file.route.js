import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import fs from "fs";

const router = express.Router();

const upload = multer({
    dest: "uploads/files",
    limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/test-excel", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Không nhận được file" });
    }
    const filePath = req.file.path;
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        const parseArray = (value) => {
            if (!value) return [];
            if (Array.isArray(value)) return value;
            return value
                .replace(/[\[\]]/g, "")
                .split(",")
                .map(v => v.trim());
        };
        const parseExcelDate = (value) => {
            if (!value) return null;
            if (value instanceof Date) return value;
            if (typeof value === "number") {
                return new Date(Math.round((value - 25569) * 86400 * 1000));
            }
            if (typeof value === "string") {
                if (value.includes("/")) {
                    const [month, day, year] = value.split("/").map(Number);
                    return new Date(year, month - 1, day);
                }
                return new Date(value);
            }
            return null;
        };
        let productMap = {}
        for (let i = 0; i < sheetNames.length; i++) {
            const firstSheet = workbook.Sheets[sheetNames[i]];
            const rawRows = XLSX.utils.sheet_to_json(firstSheet);
            console.log(rawRows, "rawRowsrawRowsrawRows")
            rawRows.forEach((row) => {
                const { name, brandId, categoryId, subCategoryId, description, isFeatured, isNewProduct, promotion_isActive, promotion_discount, promotion_startAt, promotion_endAt, color, itemId, type, value, purity, stockQuantity, url, isMain } = row;
                console.log(name, brandId, categoryId, subCategoryId, description, isFeatured, isNewProduct, promotion_isActive, promotion_discount, promotion_startAt, promotion_endAt, color, itemId, type, value, purity, stockQuantity, url, isMain, "dataexxel")
                if (!productMap[name]) {
                    productMap[name] = {
                        name,
                        brandId,
                        categoryId,
                        subCategoryId,
                        description,
                        isFeatured,
                        isNewProduct,
                        promotion: {},
                        images: [],
                        variants: []
                    };
                }
                const product = productMap[name];
                if (promotion_isActive) {
                    product.promotion = {
                        isActive: promotion_isActive,
                        discount: Number(promotion_discount),
                        startAt: parseExcelDate(promotion_startAt),
                        endAt: parseExcelDate(promotion_endAt)
                    }
                } else {
                    product.promotion = {
                        isActive: promotion_isActive,
                        discount: 0,
                        startAt: null,
                        endAt: null
                    }
                }
                const urls = parseArray(url);
                console.log(urls, "urlsurlsurls")
                const isMainArr = parseArray(isMain);
                urls.forEach((u, index) => {
                    const exists = product.images.find(img => img.url === u);
                    if (!exists) {
                        product.images.push({
                            url: u,
                            isMain: String(isMainArr[index]).toLowerCase() === "true"
                        });
                    }
                });
                const colors = parseArray(color);
                const itemIds = parseArray(itemId);
                const types = parseArray(type);
                const values = parseArray(value);
                const purities = parseArray(purity);
                colors.forEach((c, index) => {
                    let existVariant = product.variants.find(v => v.color === c);
                    if (!existVariant) {
                        existVariant = {
                            color: c,
                            options: []
                        };
                        product.variants.push(existVariant);
                    }
                    existVariant.options.push({
                        itemId: itemIds[index],
                        type: types[index],
                        value: Number(values[index]),
                        purity: purities[index],
                        stockQuantity: Number(stockQuantity)
                    });
                });
                console.log(product, "productproductproductproduct")
            })
        }

        const finalProducts = Object.values(productMap);
        return res.json({
            sheetNames,
            totalRows: finalProducts.length,
            fullData: finalProducts,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Lỗi đọc file Excel",
            error: err.message,
        });
    } finally {
        fs.unlinkSync(filePath);
    }
});

export default router;