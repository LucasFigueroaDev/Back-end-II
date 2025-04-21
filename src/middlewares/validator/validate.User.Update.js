import CustomError from "../../utils/customError.js";

export const validateUserUpdate = (req, res, next) => {
    const { id } = req.params;
    if (!req.user) return next(new CustomError(401, 'Unauthorized'));
    const isAdmin = req.user.role === 'admin';
    if (!isAdmin && req.user.id !== id) return next(new CustomError(403, 'Prohibited: You can only modify your own account.'));
    if (!isAdmin && 'role' in req.body) return next(new CustomError(403, "You don't have permission to modify the role. Contact the administrator."));
    next();
};