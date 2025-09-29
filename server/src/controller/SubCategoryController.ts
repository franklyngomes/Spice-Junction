import { SubCategoryModel } from "../model/SubCategoryModel.js";
import { SubCategorySchemaJoi } from "../model/SubCategoryModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";
import * as fsSync from "fs";
import { promises as fs } from "fs";

// Define MulterRequest type to extend Express Request with file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

class SubCategoryController {
  async createSubCategory(req: Request, res: Response) {
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
      const subCategory = new SubCategoryModel({
        name: value.name,
        category: value.category,
      });
      const multerReq = req as MulterRequest;
      if (multerReq.file) {
        subCategory.image = multerReq.file.path.replace(/\\/g, "/");
      }else{
        return res.status(HttpCode.notFound).json({
          status: false,
          message: "Image is required!"
        })
      }
      await subCategory.save();
      return res.status(HttpCode.create).json({
        status: true,
        message: "Category created successfully",
        data: subCategory
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getAllSubCategory(req: Request, res: Response) {
    try {
      const category = await SubCategoryModel.find();
      if (!category || category.length === 0) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No categories found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Categories fetched successfully",
        data: category,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getSubCategoryDetails(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const category = await SubCategoryModel.findById(id);
      if (!category) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No category found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async updateSubCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const category = await SubCategoryModel.findByIdAndUpdate(id, req.body);
      if (!category) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No category found!",
        });
      }
      if (category.image) {
        const existingImage = category.image;
        if (fsSync.existsSync(existingImage)) {
          fs.unlink(existingImage);
        }
      }
      if (req.file) {
        category.image = req.file.path.replace(/\\/g, "/");
      }
      await category.save();
      return res.status(HttpCode.success).json({
        status: false,
        message: "Category updated successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async deleteSubCategory(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const category = await SubCategoryModel.findByIdAndDelete(id);
      if (!category) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No category found!",
        });
      }
      if (category.image) {
        const existingImage = category.image;
        if (fsSync.existsSync(existingImage)) {
          fs.unlink(existingImage);
        }
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
}

export default new SubCategoryController();
