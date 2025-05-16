import CustomError from "../../utils/customError.js";

export const validateUserAction = (req, res, next) => {
    if (!req.user) return next(new CustomError(401, 'No autorizado'));
    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';
    const userId = (req.user.id || req.user._id).toString();
    if (!isAdmin && userId !== id) return next(new CustomError(403, 'Prohibido: solo puedes modificar tu propia cuenta.'));
    if (!isAdmin && 'role' in req.body) return next(new CustomError(403, 'No tienes permiso para modificar el rol. Contacta al administrador.'));
    next();
};
