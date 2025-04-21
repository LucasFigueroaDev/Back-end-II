import CustomError from "../utils/customError.js";
import jwt from "jsonwebtoken";
import { userDao } from "../dao/users.dao.js";
import { createHash, isValidPassword } from "../utils/usersUtils.js";
import "dotenv/config";

class UserService {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = async () => {
        try {
            const result = await this.dao.getAll();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    getById = async (id) => {
        try {
            const result = await this.dao.getById(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, body) => {
        try {
            const result = await this.dao.update(id, body);
            if (!result) throw new CustomError(404, 'Error updating user');
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    delete = async (id) => {
        try {
            const result = await this.dao.delete(id);
            if (!result) throw new CustomError(404, 'Error deleting user');
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    register = async (body) => {
        try {
            const { email, password } = body;
            const existingUser = await this.dao.getByemail(email);
            if (existingUser) throw new CustomError(400, 'User already exists');
            const result = await this.dao.create({
                ...body,
                password: createHash(password),
            });
            if (!result) throw new CustomError(404, 'Error creating user');
            return result;
        } catch (error) {
            throw error;
        }
    }
    login = async (email, password) => {
        try {
            const userExists = await this.dao.getByemail(email);
            if (!userExists) throw new CustomError(400, 'User does not exist');
            const passwordValid = isValidPassword(password, userExists.password);
            if (!passwordValid) throw new CustomError(400, 'Invalid password');
            return userExists;
        } catch (error) {
            throw error;
        }
    }
    generateToken = (user) => {
        const payload = {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
        }
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

export const userService = new UserService(userDao);