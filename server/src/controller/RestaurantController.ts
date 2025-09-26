import {
  RestaurantModel,
  RestaurantSchemaJoi,
} from "../model/ResturantModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";
import * as fsSync from "fs";
import { promises as fs } from "fs";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/CloudinaryUpload.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
class RestaurantController {

  async createRestaurant(req: Request, res: Response) {
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
      const multerReq = req as MulterRequest;
      if (!multerReq.file) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Image is required!",
        });
      }
      //upload to Cloudinary
      const result = await uploadToCloudinary(multerReq.file)

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
        status: false,
        message: "Restaurant created! Please wait for approval.",
        data: restaurant,
      });
    } catch (error) {
      console.log(error);
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getAllRestaurant(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getRestaurantDetails(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getRestaurantByOwner(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const restaurant = await RestaurantModel.findOne({
        ownerId: { $eq: id },
      });
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async updateRestaurant(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const restaurant = await RestaurantModel.findByIdAndUpdate(id, req.body);
      if (!restaurant) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No restaurant found!",
        });
      }
      const multerReq = req as MulterRequest;
      if (multerReq.file) {
        if (restaurant.imageId) {
          await cloudinary.uploader.destroy(restaurant.imageId);
        }
        const result = await uploadToCloudinary(multerReq.file)
        restaurant.image = result.secure_url;
        restaurant.imageId = result.public_id;
      }
      await restaurant.save();
      return res.status(HttpCode.success).json({
        status: false,
        message: "Restaurant updated successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async deleteRestaurant(req: Request, res: Response) {
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
        status: false,
        message: "Restaurant deleted successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
}

export default new RestaurantController();
