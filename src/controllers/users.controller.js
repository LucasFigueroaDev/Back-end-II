import { userRepository } from "../repositories/users.repository.js";
import { createResponse } from "../utils/createResponse.js";

class UserController {
    constructor(repository) {
        this.repository = repository;
    }

    getAllUser = async (req, res, next) => {
        try {
            const users = await this.repository.getAllUsers();
            createResponse(res, 200, { message: 'Todos los usuarios', users });
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userUpdated = await this.repository.updateUser(id, req.body);
            createResponse(res, 200, { message: 'Usuario actualizado' });
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const userDeleted = await this.repository.delete(id);
            createResponse(res, 200, { message: 'Usuario eliminado' });
        } catch (error) {
            next(error);
        }
    }

    register = async (req, res, next) => {
        try {
            const newUser = await this.repository.register(req.body);
            createResponse(res, 201, { message: 'Registro exitoso', newUser });
        } catch (error) {
            next(error);
        }
    }

    login = async (req, res, next) => {
        try {
            const token = await this.repository.login(req.body);
            res.cookie('token', token, { httpOnly: true });
            createResponse(res, 200, { message: 'Usuario logueado', token: token });
        } catch (error) {
            next(error);
        }
    }

    profile = async (req, res, next) => {
        try {
            const { id } = req.user;
            const user = await this.repository.getUserById(id);
            createResponse(res, 200, user);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController(userRepository);