import type { Request, Response } from "express";
declare class OrderController {
    createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrderDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrderByRestaurant(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getOrderByCustomer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: OrderController;
export default _default;
//# sourceMappingURL=OrderController.d.ts.map