import type { Request, Response } from "express";
declare class CategoryController {
    createCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getCategoryDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: CategoryController;
export default _default;
//# sourceMappingURL=CategoryController.d.ts.map