import type { Request, Response } from "express";
declare class DeliveryZoneController {
    createDeliveryZone(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllDeliveryZones(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getDeliveryZoneDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteDeliveryZone(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: DeliveryZoneController;
export default _default;
//# sourceMappingURL=DeliveryZoneController.d.ts.map