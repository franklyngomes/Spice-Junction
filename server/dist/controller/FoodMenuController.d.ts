import type { Request, Response } from "express";
declare class FoodMenuController {
    createFoodMenu(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllFoodMenu(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getFoodMenuDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateFoodMenu(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteFoodMenu(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: FoodMenuController;
export default _default;
//# sourceMappingURL=FoodMenuController.d.ts.map