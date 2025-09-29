import { BlogModel, BlogSchemaJoi } from "../model/BlogModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import type { Request, Response } from "express";
import * as fsSync from "fs"
import {promises as fs} from "fs" 

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
class BlogController {
  async createBlog(req: Request, res: Response) {
    try {
      const { error, value } = await BlogSchemaJoi.validate(req.body);
      if (error) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: error.message,
        });
      }
      const {title} = req.body
      const ifExists = await BlogModel.findOne({ title });
      if (ifExists) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Blog with this name already exists!",
        });
      }
      const newBlog = new BlogModel({
        title: value.title,
        author: value.author,
        description: value.description,
      });
      const multerReq = req as MulterRequest;
      if (!error && multerReq.file) {
        newBlog.image = multerReq.file.path.replace(/\\/g, "/");
      }
      await newBlog.save();
      return res.status(HttpCode.create).json({
        status: false,
        message: "Blog created!",
        data: newBlog,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getAllBlog(req: Request, res: Response) {
    try {
      const blogs = await BlogModel.find().populate("author", "firstName lastName");
      if (!blogs || blogs.length === 0) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No Blogs found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Blogs fetched successfully",
        data: blogs,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async getBlogDetails(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const blog = await BlogModel.findById(id).populate("author", "firstName lastName");
      if (!blog) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No blog found!",
        });
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Blog fetched successfully",
        data: blog,
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async updateBlog(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const blog = await BlogModel.findByIdAndUpdate(id, req.body);
      if (!blog) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "No blog found!",
        });
      }
      if(blog.image){
        const existingImage = blog.image
        if(fsSync.existsSync(existingImage)){
          fs.unlink(existingImage)
        }
      }
      if(req.file){
        blog.image = req.file.path.replace(/\\/g, "/")
      }
      await blog.save()
      return res.status(HttpCode.success).json({
        status: false,
        message: "Blog updated successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
  async deleteBlog(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const blog = await BlogModel.findByIdAndDelete(id);
      if (!blog) {
        return res.status(HttpCode.badRequest).json({
          status: false,
          message: "Blog not found!",
        });
      }
      if(blog.image){
        const existingImage = blog.image
        if(fsSync.existsSync(existingImage)){
          fs.unlink(existingImage)
        }
      }
      return res.status(HttpCode.success).json({
        status: false,
        message: "Blog deleted successfully",
      });
    } catch (error) {
      return res.status(HttpCode.serverError).json({
        status: false,
        message: (error as Error)?.message,
      });
    }
  }
}

export default new BlogController();
