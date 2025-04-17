import CustomError from "../utils/custom-error.js";
import { userDao } from "../daos/mongodb/users-dao.js";
import { createHash, isValidPassword } from "../utils/users-utils.js";

class UserService {
    constructor(dao) {
        this.dao = dao;
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
}

export const userService = new UserService(userDao);