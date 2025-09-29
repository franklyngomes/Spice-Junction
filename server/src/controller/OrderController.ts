import { OrderModel, OrderSchemaJoi } from "../model/OrderModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";
import { FoodItemModel } from "../model/FoodItemModel.js";

class OrderController {
  async createOrder(req: Request, res: Response) {
    try {
      const { error, value } = await OrderSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.message,
        });
      }
      const { customerId, items, discount, street, city, pinCode, buildingNo } =
        req.body;
      const foodItems = await Promise.all(
        items.map((item: any) => FoodItemModel.findById(item.foodItem))
      );
      let total = 0;
      foodItems.map((item: any) => (total += item.price));
      if (foodItems.includes(null)) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "One or more food items not found!",
        });
      }
      const restaurantIds = foodItems.map((item) =>
        item!.restaurant.toString()
      );
      const uniqueRestaurantIds = [...new Set(restaurantIds)];

      if (uniqueRestaurantIds.length > 1) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "All food items must belong to the same restaurant!",
        });
      }
      const restaurant = uniqueRestaurantIds[0];
      const newOrder = await OrderModel.create({
        customerId,
        restaurant,
        items,
        discount,
        address: {
          buildingNo,
          street,
          city,
          pinCode,
        },
      });
      const appliedDiscount = discount || newOrder.discount;
      total = total - appliedDiscount;
      const packagingAmount = newOrder!.tax!.packaging * foodItems.length;
      console.log(packagingAmount);
      total = Math.floor(total * (1 + newOrder!.tax!.restaurantGST / 100));
      console.log(total);
      const amount =
        total +
        packagingAmount +
        newOrder!.tax!.platform +
        newOrder!.deliveryCharge;
      console.log(amount);
      newOrder.amount = amount;
      await newOrder.save();
      return res.status(HttpCode.create).json({
        status: true,
        message: "Order generated!",
        data: newOrder,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getAllOrder(req: Request, res: Response) {
    try {
      const orders = await OrderModel.find();
      if (!orders || orders.length === 0) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No orders found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getOrderDetails(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const order = await OrderModel.findById(id);
      if (!order) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No Order found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Order fetched successfully",
        data: order,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getOrderByRestaurant(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const order = await OrderModel.find({ restaurant: id });
      if (!order) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No Order found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Orders fetched successfully",
        data: order,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getOrderByCustomer(req: Request, res: Response) {
    try {
      let id = req.params.id;
      console.log(id);
      const order = await OrderModel.find({ customerId: id });
      if (!order) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No Orders found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Orders fetched successfully",
        data: order,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async updateOrder(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const order = await OrderModel.findByIdAndUpdate(id, req.body);
      if (!order) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No orders found!",
        });
      }
      await order.save();
      return res.status(HttpCode.success).json({
        status: false,
        message: "Order updated successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async deleteOrder(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const order = await OrderModel.findByIdAndDelete(id);
      if (!order) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Order not found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Order deleted successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
}

export default new OrderController();
