import { RestaurantModel, RestaurantSchemaJoi, } from "../model/ResturantModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import * as fsSync from "fs";
import { promises as fs } from "fs";
class RestaurantController {
    async createRestaurant(req, res) {
        try {
            const { error, value } = await RestaurantSchemaJoi.validate(req.body);
            if (error) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: error.message,
                });
            }
            const { name } = req.body;
            const ifExists = await RestaurantModel.findOne({ name });
            if (ifExists) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Restaurant with this name already exists!",
                });
            }
            const restaurant = new RestaurantModel({
                name: value.name,
                ownerId: value.ownerId,
                buildingNo: value.buildingNo,
                street: value.street,
                city: value.city,
                pinCode: value.pinCode,
                phone: value.phone,
                deliveryZone: value.deliveryZone,
                cuisine: value.cuisine,
            });
            const multerReq = req;
            if (!error && multerReq.file) {
                restaurant.image = multerReq.file.path.replace(/\\/g, "/");
            }
            await restaurant.save();
            return res.status(HttpCode.create).json({
                status: false,
                message: "Restaurant created! Please wait for approval.",
                data: restaurant,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getAllRestaurant(req, res) {
        try {
            const restaurant = await RestaurantModel.find();
            if (!restaurant || restaurant.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No Restaurant found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Restaurants fetched successfully",
                data: restaurant,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getRestaurantDetails(req, res) {
        try {
            const id = req.params.id;
            const restaurant = await RestaurantModel.findById(id);
            if (!restaurant) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No restaurant found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Restaurant fetched successfully",
                data: restaurant,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async updateRestaurant(req, res) {
        try {
            const id = req.params.id;
            const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body);
            if (!restaurant) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No restaurant found!",
                });
            }
            if (restaurant.image) {
                const existingImage = restaurant.image;
                if (fsSync.existsSync(existingImage)) {
                    fs.unlink(existingImage);
                }
            }
            if (req.file) {
                restaurant.image = req.file.path.replace(/\\/g, "/");
            }
            await restaurant.save();
            return res.status(HttpCode.success).json({
                status: false,
                message: "Restaurant updated successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async deleteRestaurant(req, res) {
        try {
            const id = req.params.id;
            const restaurant = await RestaurantModel.findByIdAndDelete(id);
            if (!restaurant) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Restaurant not found!",
                });
            }
            if (restaurant.image) {
                const existingImage = restaurant.image;
                if (fsSync.existsSync(existingImage)) {
                    fs.unlink(existingImage);
                }
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Restaurant deleted successfully",
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
export default new RestaurantController();
//# sourceMappingURL=RestaurantController.js.map