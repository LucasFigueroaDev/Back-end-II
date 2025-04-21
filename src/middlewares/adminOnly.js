import CustomError from "../utils/customError.js";

export const adminOnly = (req, res, next) => {
    if (!req.user) return next(new CustomError(401, 'No autenticado'));
    if (req.user.role !== 'admin') return next(new CustomError(403, 'Solo administradores pueden acceder'));
    next();
};