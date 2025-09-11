import { CategoryModel } from "../model/CategoryModel.js";
import { HttpCode } from "../helper/HttpCode.js";
class CategoryController {
    async createCategory(req, res) {
        try {
            const { name } = req.body;
            const ifExists = await CategoryModel.findOne({ name });
            if (ifExists) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Category with this name already exists!"
                });
            }
            const category = new CategoryModel({
                name
            });
            await category.save();
            return res.status(HttpCode.create).json({
                status: false,
                message: "Category created successfully",
                data: category
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    }
    async getAllCategory(req, res) {
        try {
            const category = await CategoryModel.find();
            if (!category || category.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No categories found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Categories fetched successfully",
                data: category
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    }
    async getCategoryDetails(req, res) {
        try {
            const id = req.params.id;
            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No category found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Category fetched successfully",
                data: category
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    }
    async updateCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await CategoryModel.findByIdAndUpdate(id, req.body);
            if (!category) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No category found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Category updated successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    }
    async deleteCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await CategoryModel.findByIdAndDelete(id);
            if (!category) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No category found!"
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Category deleted successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    }
}
export default new CategoryController();
//# sourceMappingURL=CategoryController.js.map