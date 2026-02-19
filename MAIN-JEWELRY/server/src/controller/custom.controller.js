import customService from "../services/custom.service.js"
import BaseController from "./base.controller.js"
class CustomController extends BaseController {
    getCustom = async (req, res) => {
        try {
            const page = Number(req?.query?.page);
            const limit = Number(req?.query?.limit)
            const data = await customService.getCustom(page, limit)
            return this.ok(res, data, "Thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    getCustomById = async (req, res) => {
        try {
            const userId = req.user.id
            const page = Number(req?.query?.page);
            const limit = Number(req?.query?.limit)
            const data = await customService.getCustomById(userId, page, limit)
            return this.ok(res, data, "Thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    previewDesign = async (req, res) => {
        try {
            const userId = req.user.id
            const id = req.params.id
            const { material, gem, quantity } = req.body
            const data = await customService.previewDesign(userId, id, material, gem, quantity)
            return this.ok(res, data, "Thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateCustom = async (req, res) => {
        try {
            const userId = req.user.id
            const id = req.params.id
            const { shippingAddress, paymentMethod, paymentStatus, codeCou, quantity } = req.body
            const data = await customService.updateCustom(userId, id, shippingAddress, paymentMethod, paymentStatus, codeCou, quantity)
            return this.ok(res, data, "Thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    addCustom = async (req, res) => {
        try {
            const userId = req.user.id
            const { jewelryType, material, gem, size, budget } = req.body
            console.log(userId, jewelryType, material, gem, size, budget)
            const data = await customService.addCustom(userId, jewelryType, material, gem, size, budget)
            return this.created(res, data, "Thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    calcuate = async (req, res) => {
        try {
            const userId = req.user.id
            const { jewelryType, material, gem, size, budget } = req.body
            console.log(userId, jewelryType, material, gem, size, budget)
            const data = await customService.calcuate(userId, jewelryType, material, gem, size, budget)
            return this.ok(res, data, "Thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
    updateStaus = async (req, res) => {
        try {
            const userId = req.user.id
            const id = req.params.id
            const status = req?.body?.status?.toUpperCase()
            const data = await customService.updateStatus(userId, id, status)
            return this.ok(res, data, "Cập nhật thành công")
        } catch (error) {
            return this.handleErr(res, error)
        }
    }
}
export default new CustomController()