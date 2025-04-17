import { userService } from "../services/users-service.js";

class UserController {
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
    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.getById(id);
            res.status(200).json({ message: 'User', response });
        } catch (error) {
            next(error);
        }
    }
    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.service.update(id, req.body);
            res.status(200).json({ message: 'User updated', response });
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
    register = async (req, res, next) => {
        try {
            const response = await this.service.register(req.body);
            res.status(201).json({ message: 'User registered', User: response });
        } catch (error) {
            next(error);
        }
    }
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const response = await this.service.login(email, password);
            res.status(200).json({ message: 'User logged in', User: response });
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController(userService);