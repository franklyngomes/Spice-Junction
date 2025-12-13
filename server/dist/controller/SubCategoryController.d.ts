import type { Request, Response } from "express";
declare class SubCategoryController {
    createSubCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllSubCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getSubCategoryDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateSubCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteSubCategory(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: SubCategoryController;
export default _default;
//# sourceMappingURL=SubCategoryController.d.ts.map