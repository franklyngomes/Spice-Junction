import type { Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string;
                firstName: string;
                lastName: string;
                email: string;
                role: string;
            };
        }
    }
}
declare class UserController {
    signup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    adminSignup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    restaurantSignup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyEmail(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    signin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    forgotPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    userProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    setUserAddress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUserAddress(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    restaurantRequests(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    responseRestaurantRequest(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=UserController.d.ts.map