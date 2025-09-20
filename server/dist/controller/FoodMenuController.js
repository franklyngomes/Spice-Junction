import { FoodMenuModel, FoodMenuSchemaJoi } from "../model/FoodMenuModel.js";
import { HttpCode } from "../helper/HttpCode.js";
class FoodMenuController {
    async createFoodMenu(req, res) {
        try {
            const { error, value } = await FoodMenuSchemaJoi.validate(req.body);
            if (error) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: error.message,
                });
            }
            const { name } = req.body;
            const ifExists = await FoodMenuModel.findOne({ name });
            if (ifExists) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Food menu with this name already exists!",
                });
            }
            const foodMenu = new FoodMenuModel({
                name: value.name,
                restaurant: value.restaurant,
            });
            await foodMenu.save();
            return res.status(HttpCode.create).json({
                status: false,
                message: "FoodMenu created!",
                data: foodMenu,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getAllFoodMenu(req, res) {
        try {
            const foodMenu = await FoodMenuModel.find();
            if (!foodMenu || foodMenu.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No food menu found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food menus fetched successfully",
                data: foodMenu,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getFoodMenuForRestaurant(req, res) {
        try {
            const id = req.params.id;
            const foodMenu = await FoodMenuModel.find({ "restaurant": { $eq: id } });
            if (!foodMenu) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No food menu found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food menus fetched successfully",
                data: foodMenu,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getFoodMenuDetails(req, res) {
        try {
            const id = req.params.id;
            const foodMenu = await FoodMenuModel.findById(id);
            if (!foodMenu) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No food menu found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food menu fetched successfully",
                data: foodMenu,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async updateFoodMenu(req, res) {
        try {
            const id = req.params.id;
            const foodMenu = await FoodMenuModel.findByIdAndUpdate(id, req.body);
            if (!foodMenu) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "food menu not found!",
                });
            }
            await foodMenu.save();
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food menu updated successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async deleteFoodMenu(req, res) {
        try {
            const id = req.params.id;
            const foodMenu = await FoodMenuModel.findByIdAndDelete(id);
            if (!foodMenu) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Food menu not found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Food menu deleted successfully",
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
export default new FoodMenuController();
//# sourceMappingURL=FoodMenuController.js.map