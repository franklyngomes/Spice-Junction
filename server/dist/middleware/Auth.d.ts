import type { Request, Response } from "express";
export declare function hashPassword(password: string): string;
export declare function comparePassword(password: string, hashPassword: string): boolean;
export declare const hmacProcess: (value: string, key: string) => string;
export declare function AuthCheck(req: Request, res: Response, next: any): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=Auth.d.ts.map