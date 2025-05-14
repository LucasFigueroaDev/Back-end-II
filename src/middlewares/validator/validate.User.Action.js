import CustomError from "../../utils/customError.js";

export const validateUserAction = (req, res, next) => {
    if (!req.user) {
        return next(new CustomError(401, 'No autorizado'));
    }

    const { id } = req.params;
    const isAdmin = req.user.role === 'admin';
    const userId = (req.user.id || req.user._id).toString();

    // Si no es admin, verifica si es la misma cuenta
    if (!isAdmin && userId !== id) {
        return next(new CustomError(403, 'Prohibido: solo puedes modificar tu propia cuenta.'));
    }

    // Si el usuario no es admin y está intentando modificar el rol
    if (!isAdmin && 'role' in req.body) {
        return next(new CustomError(403, 'No tienes permiso para modificar el rol. Contacta al administrador.'));
    }

    next();
};
