import { createTransport } from "nodemailer";
import { templateHtml } from "../utils/template.js";
import 'dotenv/config';

export const transporte = createTransport({
    service: 'gmail',
    port: process.env.PORT_GOOGLE,
    auth: {
        user: process.env.USER_GOOGLE,
        pass: process.env.PASS_GOOGLE
    }
})

export const configMail = (user) => {
    return {
        from: process.env.USER_GOOGLE,
        to: user.email,
        subject: 'RESTABLECER CONTRASEÑA',
        html: templateHtml(user),
    };
};
