import { FoodMenuModel, FoodMenuSchemaJoi } from "../model/FoodMenuModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
class FoodMenuController {
  async createFoodMenu(req: Request, res: Response) {
    try {
      const { error, value } = await FoodMenuSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.message,
        });
      }
      const {name} = req.body
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getAllFoodMenu(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
    async getFoodMenuForRestaurant(req: Request, res: Response) {
    try {
      const id = req.params.id
      const foodMenu = await FoodMenuModel.find({"restaurant": {$eq: id}});
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getFoodMenuDetails(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async updateFoodMenu(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const foodMenu = await FoodMenuModel.findByIdAndUpdate(id, req.body);
      if (!foodMenu) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "food menu not found!",
        });
      }
      await foodMenu.save()
      return res.status(HttpCode.success).json({
        status: false,
        message: "Food menu updated successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async deleteFoodMenu(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
}

export default new FoodMenuController();
