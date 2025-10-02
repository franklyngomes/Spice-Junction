import { FoodItemModel, FoodItemSchemaJoi } from "../model/FoodItemModel.js";
import { FoodMenuModel } from "../model/FoodMenuModel.js";
import { CategoryModel } from "../model/CategoryModel.js";
import { SubCategoryModel } from "../model/SubCategoryModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import { RestaurantModel } from "../model/ResturantModel.js";
import { uploadFoodItemToCloudinary } from "../utils/FoodItemCloudinaryUpload.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
class FoodItemController {
  async createFoodItem(req: Request, res: Response) {
    try {
      const { error, value } = await FoodItemSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.message,
        });
      }
      const restaurant = await RestaurantModel.findById(value.restaurant);
      if (restaurant?.isBlocked) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Your restaurant is blocked! Please contact admin",
        });
      }
      if (!restaurant?.isApproved) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Your restaurant is not approved! Please try again later.",
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
      const multerReq = req as MulterRequest;
      if (!multerReq.file) {
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Image is required!",
        });
      }
      //upload to Cloudinary
      const result = await uploadFoodItemToCloudinary(multerReq.file);
      const foodItem = new FoodItemModel({
        name: value.name,
        description: value.description,
        restaurant: value.restaurant,
        subCategory: value.subCategory,
        price: value.price,
        menu: value.menu,
        image: result.secure_url,
        imageId: result.public_id,
      });
      await foodItem.save();
      const foodMenu = await FoodMenuModel.updateOne(
        { _id: foodItem.menu },
        {
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
        }
      );
      const findCategory = await SubCategoryModel.findById(
        foodItem.subCategory
      );
      if (findCategory && findCategory.category?.length > 0) {
        await CategoryModel.updateMany(
          { _id: { $in: findCategory?.category } },
          {
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
          }
        );
      }
      const addToSubCategory = await SubCategoryModel.updateOne(
        { _id: foodItem?.subCategory },
        {
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
        }
      );

      return res.status(HttpCode.create).json({
        status: false,
        message: "Food item created!",
        data: foodItem,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getRestaurantFoodItem(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const foodItem = await FoodItemModel.find({ restaurant: id }).populate(
        "menu",
        "name"
      );
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getAllFoodItems(req: Request, res: Response) {
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }

  async getFoodItemDetails(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const foodItem = await FoodItemModel.findById(id)
        .populate("restaurant")
        .populate("subCategory")
        .populate("menu", "name _id");
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
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  // async updateFoodItem(req: Request, res: Response) {
  //   try {
  //     const id = req.params.id;
  //     const foodItem = await FoodItemModel.findById(id);
  //     if (!foodItem) {
  //       return res.status(HttpCode.badRequest).json({
  //         status: false,
  //         message: "food item not found!",
  //       });
  //     }
  //     const multerReq = req as MulterRequest;
  //     if (multerReq.file) {
  //       if (foodItem.imageId) {
  //         await cloudinary.uploader.destroy(foodItem.imageId);
  //       }
  //       const result = await uploadFoodItemToCloudinary(multerReq.file);
  //       foodItem.image = result.secure_url;
  //       foodItem.imageId = result.public_id;
  //     }
  //     foodItem.name = req.body.name || foodItem.name;
  //     foodItem.description = req.body.description || foodItem.description;
  //     foodItem.price = req.body.price || foodItem.price;
  //     foodItem.subCategory = req.body.subCategory || foodItem.subCategory;
  //     const foodMenu = await FoodMenuModel.updateOne(
  //       {
  //         "items.id": id,
  //       },
  //       {
  //         $set: {
  //           "items.$.id": foodItem._id,
  //           "items.$.name": foodItem.name,
  //           "items.$.description": foodItem.description,
  //           "items.$.price": foodItem.price,
  //           "items.$.subCategory": foodItem.subCategory,
  //           "items.$.image": foodItem.image,
  //         },
  //       }
  //     );
  //     const findCategory = await SubCategoryModel.findById(
  //       foodItem.subCategory
  //     );

  //     const updateCategory = await CategoryModel.updateOne(
  //       { _id: findCategory?.category, "items.id": id },
  //       {
  //         $set: {
  //           "items.$.id": foodItem._id,
  //           "items.$.name": foodItem.name,
  //           "items.$.description": foodItem.description,
  //           "items.$.price": foodItem.price,
  //           "items.$.subCategory": foodItem.subCategory,
  //           "items.$.image": foodItem.image,
  //         },
  //       }
  //     );
  //     const updateSubCategory = await SubCategoryModel.updateOne(
  //       { _id: foodItem?.subCategory, "items.id": id },
  //       {
  //         $set: {
  //           "items.$.id": foodItem._id,
  //           "items.$.name": foodItem.name,
  //           "items.$.description": foodItem.description,
  //           "items.$.price": foodItem.price,
  //           "items.$.image": foodItem.image,
  //         },
  //       }
  //     );
  //     if (foodItem.subCategory !== req.body.subCategory) {
  //       const findCategory = await SubCategoryModel.findById(
  //         req.body.subCategory
  //       );
  //       if (findCategory && findCategory.category?.length > 0) {
  //         await CategoryModel.updateMany(
  //           { _id: { $in: findCategory?.category } },
  //           {
  //             $push: {
  //               items: {
  //                 id: foodItem._id,
  //                 name: foodItem.name,
  //                 description: foodItem.description,
  //                 price: foodItem.price,
  //                 subCategory: req.body.subCategory,
  //                 image: foodItem.image,
  //               },
  //             },
  //           }
  //         );
  //       }
  //       await SubCategoryModel.updateOne(
  //         { _id: foodItem.subCategory },
  //         {
  //           $pull: { items: { id: id } },
  //         }
  //       );
  //       const categories = await SubCategoryModel.findById(
  //         foodItem.subCategory
  //       );
  //       const deleteCategory = await CategoryModel.updateOne(
  //         { _id: categories?.category, "items.id": id },
  //         {
  //           $pull: { items: { id: id } },
  //         }
  //       );
  //     }
  //     await foodItem.save();
  //     return res.status(HttpCode.success).json({
  //       status: false,
  //       message: "Food item updated successfully",
  //     });
  //   } catch (error) {
  //     return res.status(HttpCode.serverError).json({
  //       status: false,
  //       message: (error as Error)?.message,
  //     });
  //   }
  // }
  async updateFoodItem(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const {
        name,
        description,
        price,
        subCategory: newSubCategoryId,
      } = req.body;

      // 1. Find the food item and store its original subcategory
      const foodItem = await FoodItemModel.findById(id);
      if (!foodItem) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Food item not found!",
        });
      }
      const originalSubCategoryId = foodItem.subCategory.toString();

      // 2. Prepare the data for updates
      const updateData = {
        name: name || foodItem.name,
        description: description || foodItem.description,
        price: price || foodItem.price,
        subCategory: newSubCategoryId || foodItem.subCategory,
        image: foodItem.image, // Default to old image
      };

      // 3. Handle image upload if a new file is provided
      const multerReq = req as MulterRequest;
      if (multerReq.file) {
        if (foodItem.imageId) {
          await cloudinary.uploader.destroy(foodItem.imageId);
        }
        const result = await uploadFoodItemToCloudinary(multerReq.file);
        updateData.image = result.secure_url;
        foodItem.imageId = result.public_id; // Update imageId on the main document
      }

      // 4. Update the main FoodItem document
      Object.assign(foodItem, updateData);
      await foodItem.save();

      // 5. Check if the subcategory has changed and perform the correct actions
      const subCategoryHasChanged =
        newSubCategoryId && newSubCategoryId !== originalSubCategoryId;

      if (subCategoryHasChanged) {
        // --- MOVE OPERATION: Pull from old locations, Push to new locations ---

        const itemPayload = {
          id: foodItem._id,
          name: foodItem.name,
          description: foodItem.description,
          price: foodItem.price,
          subCategory: foodItem.subCategory,
          image: foodItem.image,
        };

        // A. Pull from the OLD subcategory
        await SubCategoryModel.updateOne(
          { _id: originalSubCategoryId },
          { $pull: { items: { id: id } } }
        );

        // B. Pull from ALL OLD parent categories
        const oldSubCategoryDoc = await SubCategoryModel.findById(
          originalSubCategoryId
        );
        if (oldSubCategoryDoc && oldSubCategoryDoc.category?.length > 0) {
          await CategoryModel.updateMany(
            { _id: { $in: oldSubCategoryDoc.category } },
            { $pull: { items: { id: id } } }
          );
        }

        // C. Push to the NEW subcategory
        await SubCategoryModel.updateOne(
          { _id: newSubCategoryId },
          { $push: { items: itemPayload } }
        );

        // D. Push to ALL NEW parent categories
        const newSubCategoryDoc = await SubCategoryModel.findById(
          newSubCategoryId
        );
        if (newSubCategoryDoc && newSubCategoryDoc.category?.length > 0) {
          await CategoryModel.updateMany(
            { _id: { $in: newSubCategoryDoc.category } },
            { $push: { items: itemPayload } }
          );
        }
      } else {
        // --- UPDATE-IN-PLACE OPERATION ---
        const setUpdate = {
          "items.$.name": updateData.name,
          "items.$.description": updateData.description,
          "items.$.price": updateData.price,
          "items.$.image": updateData.image,
        };

        // Update in the current subcategory
        await SubCategoryModel.updateOne(
          { _id: originalSubCategoryId, "items.id": id },
          { $set: setUpdate }
        );

        // Update in all current parent categories
        const currentSubCategoryDoc = await SubCategoryModel.findById(
          originalSubCategoryId
        );
        if (
          currentSubCategoryDoc &&
          currentSubCategoryDoc.category?.length > 0
        ) {
          await CategoryModel.updateMany(
            { _id: { $in: currentSubCategoryDoc.category }, "items.id": id },
            { $set: setUpdate }
          );
        }
      }

      // 6. Update the item in the FoodMenuModel (this is always an update-in-place)
      await FoodMenuModel.updateOne(
        { "items.id": id },
        {
          $set: {
            "items.$.name": updateData.name,
            "items.$.description": updateData.description,
            "items.$.price": updateData.price,
            "items.$.subCategory": updateData.subCategory,
            "items.$.image": updateData.image,
          },
        }
      );

      return res.status(HttpCode.success).json({
        status: true,
        message: "Food item updated successfully",
        data: foodItem,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async deleteFoodItem(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const foodItem = await FoodItemModel.findByIdAndDelete(id);
      if (!foodItem) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Food item not found!",
        });
      }
      if (foodItem.imageId) {
        await cloudinary.uploader.destroy(foodItem.imageId);
      }
      const foodMenu = await FoodMenuModel.updateOne(
        { "items.id": id },
        {
          $pull: { items: { id: id } },
        }
      );
      const deleteSubCategory = await SubCategoryModel.updateOne(
        { _id: foodItem.subCategory },
        {
          $pull: { items: { id: id } },
        }
      );
      const findCategory = await SubCategoryModel.findById(
        foodItem.subCategory
      );
      const deleteCategory = await CategoryModel.updateOne(
        { _id: findCategory?.category, "items.id": id },
        {
          $pull: { items: { id: id } },
        }
      );
      return res.status(HttpCode.success).json({
        status: false,
        message: "Food item deleted successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
}

export default new FoodItemController();
