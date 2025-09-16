import type { Request, Response } from "express";
declare class PaymentController {
    createPaymentOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createPaymentRecord(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: PaymentController;
export default _default;
//# sourceMappingURL=PaymentController.d.ts.map