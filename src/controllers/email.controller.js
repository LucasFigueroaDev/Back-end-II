import { configMail, transporte } from "../services/email.service.js"

export const sendMailEth = async (req, res, next) => {
    try {
        const response = await transporte.sendMail(configMail);
        res.json(response)
    } catch (error) {
        next(error)
    }
}