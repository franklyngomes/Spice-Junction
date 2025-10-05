import { SubCategoryModel } from "../model/SubCategoryModel.js";
import { SubCategorySchemaJoi } from "../model/SubCategoryModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import cloudinary from "../config/cloudinary.js";
import path from "path";
import { uploadCategoryToCloudinary } from "../utils/CategoryCloudinaryUpload.js";
class SubCategoryController {
    async createSubCategory(req, res) {
        try {
            const { name, category } = req.body;
            const { error, value } = SubCategorySchemaJoi.validate(req.body);
            if (error) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: error.message,
                });
            }
            const ifExists = await SubCategoryModel.findOne({ name });
            if (ifExists) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Category with this name already exists!",
                });
            }
            const multerReq = req;
            if (!multerReq.file) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "Image is required!",
                });
            }
            //upload to Cloudinary
            const result = await uploadCategoryToCloudinary(multerReq.file);
            const subCategory = new SubCategoryModel({
                name: value.name,
                category: value.category,
                image: result.secure_url,
                imageId: result.public_id,
            });
            await subCategory.save();
            return res.status(HttpCode.create).json({
                status: true,
                message: "Category created successfully",
                data: subCategory,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error instanceof Error ? error.message : JSON.stringify(error),
                error,
            });
        }
    }
    async getAllSubCategory(req, res) {
        try {
            const category = await SubCategoryModel.find().populate("category", "name _id");
            if (!category || category.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No categories found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
                message: "Categories fetched successfully",
                data: category,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getSubCategoryDetails(req, res) {
        try {
            const id = req.params.id;
            const category = await SubCategoryModel.findById(id).populate("category", "name _id");
            if (!category) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No category found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
                message: "Category fetched successfully",
                data: category,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async updateSubCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await SubCategoryModel.findByIdAndUpdate(id, req.body);
            if (!category) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No category found!",
                });
            }
            const multerReq = req;
            if (multerReq.file) {
                if (category.imageId) {
                    await cloudinary.uploader.destroy(category.imageId);
                }
                const result = await uploadCategoryToCloudinary(multerReq.file);
                category.image = result.secure_url;
                category.imageId = result.public_id;
            }
            await category.save();
            return res.status(HttpCode.success).json({
                status: true,
                message: "Category updated successfully",
            });
        }
        catch (error) {
            console.log(error);
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async deleteSubCategory(req, res) {
        try {
            const id = req.params.id;
            const category = await SubCategoryModel.findByIdAndDelete(id);
            if (!category) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No category found!",
                });
            }
            if (category.imageId) {
                await cloudinary.uploader.destroy(category.imageId);
            }
            return res.status(HttpCode.success).json({
                status: true,
                message: "Category deleted successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
}
export default new SubCategoryController();
//# sourceMappingURL=SubCategoryController.js.map