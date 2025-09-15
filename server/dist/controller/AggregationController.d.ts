import type { Request, Response } from "express";
declare class AggregationController {
    GlobalSearch(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    SortByPrice(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: AggregationController;
export default _default;
//# sourceMappingURL=AggregationController.d.ts.map