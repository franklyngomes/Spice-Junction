import type { Request, Response } from "express";
declare const CheckPermission: (requiredPermission: string[]) => (req: Request, res: Response, next: any) => Response<any, Record<string, any>> | undefined;
export default CheckPermission;
//# sourceMappingURL=CheckPermission.d.ts.map