import type { Request, Response } from "express";
declare class BlogController {
    createBlog(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllBlog(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getBlogDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateBlog(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBlog(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: BlogController;
export default _default;
//# sourceMappingURL=BlogController.d.ts.map