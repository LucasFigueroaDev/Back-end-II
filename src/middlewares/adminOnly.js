import CustomError from "../utils/customError.js";

export const adminOnly = (req, res, next) => {
    if (!req.user) return next(new CustomError(401, 'No autorizado'));
    if (req.user.role !== 'admin') return next(new CustomError(403, 'Solo los administradores pueden realizar esta acción'));
    next();
};