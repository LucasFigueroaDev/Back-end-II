import mongoose from 'mongoose';
import CustomError from '../../utils/customError.js';

export const validateId = (param = 'id') => {
    return (req, res, next) => {
        const id = req.params[param];
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new CustomError(400, 'Invalid ID'));
        }
        next();
    }
}