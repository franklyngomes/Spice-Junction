import { BlogModel, BlogSchemaJoi } from "../model/BlogModel.js";
import { HttpCode } from "../helper/HttpCode.js";
import * as fsSync from "fs";
import { promises as fs } from "fs";
class BlogController {
    async createBlog(req, res) {
        try {
            const { error, value } = await BlogSchemaJoi.validate(req.body);
            if (error) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: error.message,
                });
            }
            const { title } = req.body;
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
            const multerReq = req;
            if (!error && multerReq.file) {
                newBlog.image = multerReq.file.path.replace(/\\/g, "/");
            }
            await newBlog.save();
            return res.status(HttpCode.create).json({
                status: false,
                message: "Blog created!",
                data: newBlog,
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getAllBlog(req, res) {
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
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async getBlogDetails(req, res) {
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
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async updateBlog(req, res) {
        try {
            const id = req.params.id;
            const blog = await BlogModel.findByIdAndUpdate(id, req.body);
            if (!blog) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "No blog found!",
                });
            }
            if (blog.image) {
                const existingImage = blog.image;
                if (fsSync.existsSync(existingImage)) {
                    fs.unlink(existingImage);
                }
            }
            if (req.file) {
                blog.image = req.file.path.replace(/\\/g, "/");
            }
            await blog.save();
            return res.status(HttpCode.success).json({
                status: false,
                message: "Blog updated successfully",
            });
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message,
            });
        }
    }
    async deleteBlog(req, res) {
        try {
            const id = req.params.id;
            const blog = await BlogModel.findByIdAndDelete(id);
            if (!blog) {
                return res.status(HttpCode.badRequest).json({
                    status: false,
                    message: "Blog not found!",
                });
            }
            if (blog.image) {
                const existingImage = blog.image;
                if (fsSync.existsSync(existingImage)) {
                    fs.unlink(existingImage);
                }
            }
            return res.status(HttpCode.success).json({
                status: false,
                message: "Blog deleted successfully",
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
export default new BlogController();
//# sourceMappingURL=BlogController.js.map