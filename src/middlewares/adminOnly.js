import CustomError from "../utils/customError.js";

export const adminOnly = (req, res, next) => {
    if (!req.user) return next(new CustomError(401, 'Not authenticated'));
    if (req.user.role !== 'admin') return next(new CustomError(403, 'Only administrators can access'));
    next();
};