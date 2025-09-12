import type { Request, Response } from "express";
declare class FoodItemController {
    createFoodItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRestaurantFoodItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getFoodItemDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateFoodItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteFoodItem(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: FoodItemController;
export default _default;
//# sourceMappingURL=FoodItemController.d.ts.map