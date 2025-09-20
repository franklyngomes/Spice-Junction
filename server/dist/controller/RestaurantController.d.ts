import type { Request, Response } from "express";
declare class RestaurantController {
    createRestaurant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllRestaurant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRestaurantDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getRestaurantByOwner(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateRestaurant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteRestaurant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: RestaurantController;
export default _default;
//# sourceMappingURL=RestaurantController.d.ts.map