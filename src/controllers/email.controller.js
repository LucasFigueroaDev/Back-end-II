import { createHash } from "../utils/usersUtils.js";
import { configMail, transporte } from "../repositories/email.repository.js"
import { userRepository } from "../repositories/users.repository.js";
import { isValidPassword } from "../utils/usersUtils.js";
import { createResponse } from "../utils/createResponse.js";
import { tokenRest } from "../utils/tokenRest.js";


export const sendMail = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userRepository.getByEmail(email);
        if (!user) return next(new CustomError(404, 'Usuario no encontrado'));
        const token = await tokenRest();
        user.reset_password_token = token;
        user.reset_password_expires = Date.now() + 3600000;
        await user.save();
        const mail = await transporte.sendMail(configMail(user));
        createResponse(res, 200, { message: 'Email enviado' });
    } catch (error) {
        next(error);
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await userRepository.findUserByResetToken(token);
        const samePassword = isValidPassword(password, user.password);
        if (samePassword) return createResponse(res, 400, { message: 'La contraseña no puede ser la misma' });
        const newPassword = createHash(password);
        user.password = newPassword;
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        await user.save();
        createResponse(res, 200, { message: 'Contraseña actualizada' });
    } catch (error) {
        next(error);
    }
}

export const getResetPasswordForm = async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await userRepository.findUserByResetToken(token);
        res.render('resetPassword', { token });
    } catch (error) {
        next(error);
    }
};
