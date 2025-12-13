import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";
import { CategoryModel } from "../model/CategoryModel.js";
import { SubCategoryModel } from "../model/SubCategoryModel.js";
import { FoodItemModel } from "../model/FoodItemModel.js";
import { RestaurantModel } from "../model/ResturantModel.js";

class AggregationController{
  async GlobalSearch(req: Request, res: Response){
    try {
      const {searchTerm} = req.body;
      const categories = await CategoryModel.find({$text: {$search: searchTerm}});
      const subCategories = await SubCategoryModel.find({$text: {$search: searchTerm}})
      const dishes = await FoodItemModel.find({$text: {$search: searchTerm}})
      const restaurants = await RestaurantModel.find({$text: {$search: searchTerm}})
      if(!categories && !subCategories && ! dishes && !restaurants){
        return res.status(HttpCode.notFound).json({
        status: false,
        message: "No results found! Try something else."
       })
      }
      return res.status(HttpCode.success).json({
        status: true,
        message: "Results fetched successfully!",
        categories,
        subCategories,
        dishes,
        restaurants,
      })
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message
      })
    }
  }
  async SortByPrice(req: Request, res: Response){
    try {
      const {min, max} = req.body
      if(!min && !max){
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Minimum and Maximum values are required!"
        })
      }
      if(typeof(min) == "string" && typeof(max) == "string"){
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Minimum and Maximum should be of type number!"
        })
      }
      const result = await FoodItemModel.find({$and: [{price: {$gte: min}}, {price: {$lte: max}}]})
      return res.status(HttpCode.success).json({
        status: true,
        message: "Results fetched successfully",
        data: result
      })
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message
      })
    }
  }
}
export default new AggregationController()