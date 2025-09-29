import { ROLE_PERMISSIONS } from "../config/role.js";
import { HttpCode } from "../helper/HttpCode.js";
const CheckPermission = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const userRole = req.user?.role;
            if (!userRole) {
                return res.status(HttpCode.notFound).json({
                    status: false,
                    message: "Role not found!",
                });
            }
            const permission = ROLE_PERMISSIONS[userRole];
            const hasPermission = requiredPermission.every((p) => permission?.includes(p));
            if (!hasPermission) {
                return res.status(HttpCode.unauthorized).json({
                    status: false,
                    message: "You're not authorized!"
                });
            }
            next();
        }
        catch (error) {
            return res.status(HttpCode.serverError).json({
                status: false,
                message: error?.message
            });
        }
    };
};
export default CheckPermission;
//# sourceMappingURL=CheckPermission.js.map