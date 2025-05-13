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

export const configMail = {
    from: process.env.USER_GOOGLE,
    to: process.env.USER_GOOGLE,
    subject: 'RESTABLECER CONTRASEÑA',
    // text: 'texto plano'
    html: templateHtml
}