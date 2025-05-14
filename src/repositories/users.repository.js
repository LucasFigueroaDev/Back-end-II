import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";
import { userDao } from "../dao/users.dao.js";
import { cartDao } from "../dao/cart.dao.js";
import { createHash, isValidPassword } from "../utils/usersUtils.js";
import "dotenv/config";

class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    generateToken = (user, time = '1h') => {
        const payload = {
            id: user._id,
            role: user.role,
            cart: user.cart
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: time });
    }

    getAllUsers = async () => {
        try {
            const users = await this.dao.getAll();
            if (!users) throw new CustomError(404, 'Error al obtener los usuarios');
            return users;
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById = async (uid) => {
        try {
            const user = await this.dao.getUserById(uid);
            return new UserDTO(user);
        } catch (error) {
            throw error;
        }
    }

    updateUser = async (id, body) => {
        try {
            const user = await this.dao.getById(id);
            const userUpdate = await this.dao.update(user._id, body);
            if (!userUpdate) throw new CustomError(404, 'Error al actualizar el usuario');
            return userUpdate;
        } catch (error) {
            throw error;
        }
    }

    delete = async (id) => {
        try {
            const userDelete = await this.dao.delete(id);
            if (!userDelete) throw new CustomError(404, 'Error al eliminar el usuario');
            return userDelete;
        }
        catch (error) {
            throw error;
        }
    }

    getByEmail = async (email) => {
        try {
            const user = await this.dao.getByEmail(email);
            return user;
        } catch (error) {
            throw error;
        }
    }

    register = async (user) => {
        try {
            const { email, password } = user;
            const existingUser = await this.getByEmail(email);
            if (existingUser) throw new CustomError(400, 'Usuario ya registrado');
            const cartUser = await cartDao.create();
            const newUser = await this.dao.create({
                ...user,
                password: createHash(password),
                cart: cartUser._id
            });
            if (!newUser) throw new CustomError(404, 'Error al crear el usuario');
            return new UserDTO(newUser);
        } catch (error) {
            throw error;
        }
    }

    login = async (user) => {
        try {
            const { email, password } = user;
            const userExists = await this.dao.getByEmail(email);
            if (!userExists) throw new CustomError(400, 'Usuario no existe');
            const passwordValid = isValidPassword(password, userExists.password);
            if (!passwordValid) throw new CustomError(400, 'Contraseña invalida');
            return this.generateToken(userExists);
        } catch (error) {
            throw error;
        }
    }
}

export const userRepository = new UserRepository(userDao);