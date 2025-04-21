import { userService } from "../services/users.service.js";
import { createHash } from "../utils/usersUtils.js";

class AdminController {
    constructor(service) {
        this.service = service;
    }
    getAll = async (req, res, next) => {
        try {
            const response = await this.service.getAll();
            res.status(200).json({ message: 'Users', response });
        } catch (error) {
            next(error);
        }
    }
    getUserById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.getById(id);
            res.status(200).json({ message: 'User', response });
        } catch (error) {
            next(error);
        }
    }
    adminUpdate = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.update(id, req.body);
            res.status(200).json({ message: 'User updated', response });
        } catch (error) {
            next(error);
        }
    }
    adminUpdateUser = async (req, res, next) => {
        try {
            const { id } = req.params;            
            const updates = req.body;
            if (updates.password) updates.password = createHash(updates.password);
            const updatedUser = await this.service.update(id,updates,{ new: true, runValidators: true });
            if (!updatedUser) return res.status(404).json({ success: false, message: 'User not found' });
            res.status(200).json({success: true,user: updatedUser});
        } catch (error) {
            next(error);
        }
    }
    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.delete(id);
            res.status(200).json({ message: 'User deleted', response });
        } catch (error) {
            next(error);
        }
    }
}

export const adminController = new AdminController(userService);