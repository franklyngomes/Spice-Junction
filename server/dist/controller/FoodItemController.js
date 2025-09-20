import { FoodItemModel, FoodItemSchemaJoi } from "../model/FoodItemModel.js";
import { FoodMenuModel } from "../model/FoodMenuModel.js";
import { CategoryModel } from "../model/CategoryModel.js";
import { SubCategoryModel } from "../model/SubCategoryModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import * as fsSync from "fs";
import { promises as fs } from "fs";
class FoodItemController {
    async createFoodItem(req, res) {
        try {
            const { error, value } = await FoodItemSchemaJoi.validate(req.body);
            if (error) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: error.message,
                });
            }
            const { name } = req.body;
            const ifExists = await FoodItemModel.findOne({ name });
            if (ifExists) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Food item with this name already exists!",
                });
            }
            const foodItem = new FoodItemModel({
                name: value.name,
                description: value.description,
                restaurant: value.restaurant,
                subCategory: value.subCategory,
                price: value.price,
                menu: value.menu,
            });
            const multerReq = req;
            if (!error && multerReq.file) {
                foodItem.image = multerReq.file.path.replace(/\\/g, "/");
            }
            await foodItem.save();
            const ifItemExists = await FoodMenuModel.find({
                items: { $elemMatch: { name: { $eq: value.name } } },
            });
            if (!ifItemExists) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Food item with this name already exists in the menu!",
                });
            }
            const foodMenu = await FoodMenuModel.updateOne({ _id: foodItem.menu }, {
                $push: {
                    items: {
                        id: foodItem._id,
                        name: foodItem.name,
                        description: foodItem.description,
                        price: foodItem.price,
                        subCategory: foodItem.subCategory,
                        image: foodItem.image,
                    },
                },
            });
            const findCategory = await SubCategoryModel.findById(foodItem.subCategory);
            const addToCategory = await CategoryModel.updateOne({ _id: findCategory?.category }, {
                $push: {
                    items: {
                        id: foodItem._id,
                        name: foodItem.name,
                        description: foodItem.description,
                        price: foodItem.price,
                        subCategory: foodItem.subCategory,
                        image: foodItem.image,
                    },
                },
            });
            const addToSubCategory = await SubCategoryModel.updateOne({ _id: foodItem?.subCategory }, {
                $push: {
                    items: {
                        id: foodItem._id,
                        name: foodItem.name,
                        description: foodItem.description,
                        price: foodItem.price,
                        subCategory: foodItem.subCategory,
                        image: foodItem.image,
                    },
                },
            });
            return res.status(HttpCode.create).json({
                status: false,
                message: "Food item created!",
                data: foodItem,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getRestaurantFoodItem(req, res) {
        try {
            const id = req.params.id;
            const foodItem = await FoodItemModel.find({ restaurant: id }).populate("menu", "name");
            if (!foodItem || foodItem.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No food items found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food items fetched successfully",
                data: foodItem,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getAllFoodItems(req, res) {
        try {
            const foodItem = await FoodItemModel.find().populate("restaurant");
            if (!foodItem || foodItem.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No food items found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food items fetched successfully",
                data: foodItem,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getFoodItemDetails(req, res) {
        try {
            const id = req.params.id;
            const foodItem = await FoodItemModel.findById(id).populate("restaurant").populate("subCategory");
            if (!foodItem) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No food item found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food item fetched successfully",
                data: foodItem,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async updateFoodItem(req, res) {
        try {
            const id = req.params.id;
            const foodItem = await FoodItemModel.findById(id);
            if (!foodItem) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "food item not found!",
                });
            }
            if (foodItem.image) {
                const existingImage = foodItem.image;
                if (fsSync.existsSync(existingImage)) {
                    fs.unlink(existingImage);
                }
            }
            if (req.file) {
                foodItem.image = req.file.path.replace(/\\/g, "/");
            }
            foodItem.name = req.body.name || foodItem.name;
            foodItem.description = req.body.description || foodItem.description;
            foodItem.price = req.body.price || foodItem.price;
            foodItem.subCategory = req.body.subCategory || foodItem.subCategory;
            await foodItem.save();
            const foodMenu = await FoodMenuModel.updateOne({
                "items.id": id,
            }, {
                $set: {
                    "items.$.id": foodItem._id,
                    "items.$.name": foodItem.name,
                    "items.$.description": foodItem.description,
                    "items.$.price": foodItem.price,
                    "items.$.subCategory": foodItem.subCategory,
                    "items.$.image": foodItem.image,
                },
            });
            const findCategory = await SubCategoryModel.findById(foodItem.subCategory);
            const updateCategory = await CategoryModel.updateOne({ _id: findCategory?.category, "items.id": id }, {
                $set: {
                    "items.$.id": foodItem._id,
                    "items.$.name": foodItem.name,
                    "items.$.description": foodItem.description,
                    "items.$.price": foodItem.price,
                    "items.$.subCategory": foodItem.subCategory,
                    "items.$.image": foodItem.image,
                },
            });
            const updateSubCategory = await SubCategoryModel.updateOne({ _id: foodItem?.subCategory, "items.id": id }, {
                $set: {
                    "items.$.id": foodItem._id,
                    "items.$.name": foodItem.name,
                    "items.$.description": foodItem.description,
                    "items.$.price": foodItem.price,
                    "items.$.image": foodItem.image,
                },
            });
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food item updated successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async deleteFoodItem(req, res) {
        try {
            const id = req.params.id;
            const foodItem = await FoodItemModel.findByIdAndDelete(id);
            if (!foodItem) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Food item not found!",
                });
            }
            if (foodItem.image) {
                const existingImage = foodItem.image;
                if (fsSync.existsSync(existingImage)) {
                    fs.unlink(existingImage);
                }
            }
            const foodMenu = await FoodMenuModel.updateOne({ "items.id": id }, {
                $pull: { items: { id: id } },
            });
            const deleteSubCategory = await SubCategoryModel.updateOne({ _id: foodItem.subCategory }, {
                $pull: { items: { id: id } }
            });
            const findCategory = await SubCategoryModel.findById(foodItem.subCategory);
            const deleteCategory = await CategoryModel.updateOne({ _id: findCategory?.category, "items.id": id }, {
                $pull: { items: { id: id } }
            });
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food item deleted successfully",
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
export default new FoodItemController();
//# sourceMappingURL=FoodItemController.js.map