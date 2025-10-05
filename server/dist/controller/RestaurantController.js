import { RestaurantModel, RestaurantSchemaJoi, } from "../model/ResturantModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import cloudinary from "../config/cloudinary.js";
import { uploadRestaurantToCloudinary } from "../utils/RestaurantCloudinaryUpload.js";
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
            const multerReq = req;
            if (!multerReq.file) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "Image is required!",
                });
            }
            //upload to Cloudinary
            const result = await uploadRestaurantToCloudinary(multerReq.file);
            const restaurant = new RestaurantModel({
                name: value.name,
                ownerId: value.ownerId,
                address: {
                    buildingNo: value.buildingNo,
                    street: value.street,
                    city: value.city,
                    pinCode: value.pinCode,
                },
                phone: value.phone,
                deliveryZone: value.deliveryZone,
                cuisine: value.cuisine,
                image: result.secure_url,
                imageId: result.public_id,
            });
            await restaurant.save();
            return res.status(HttpCode.create).json({
                status: true,
                message: "Restaurant created! Please wait for approval.",
                data: restaurant,
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
    async getAllRestaurant(req, res) {
        try {
            const restaurant = await RestaurantModel.find({ isBlocked: false });
            if (!restaurant || restaurant.length === 0) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No Restaurant found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
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
                status: true,
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
    async getRestaurantByOwner(req, res) {
        try {
            const id = req.params.id;
            const restaurant = await RestaurantModel.findOne({
                ownerId: { $eq: id },
            }).populate("ownerId", "firstName lastName email").populate("deliveryZone");
            if (!restaurant) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No restaurant found!",
                });
            }
            return res.status(HttpCode.success).json({
                status: true,
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
            const multerReq = req;
            if (multerReq.file) {
                if (restaurant.imageId) {
                    await cloudinary.uploader.destroy(restaurant.imageId);
                }
                const result = await uploadRestaurantToCloudinary(multerReq.file);
                restaurant.image = result.secure_url;
                restaurant.imageId = result.public_id;
            }
            await restaurant.save();
            return res.status(HttpCode.success).json({
                status: true,
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
            if (restaurant.imageId) {
                await cloudinary.uploader.destroy(restaurant.imageId);
            }
            return res.status(HttpCode.success).json({
                status: true,
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