import CustomError from "../utils/custom-error.js";
import { userDao } from "../daos/mongodb/users-dao.js";

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

    getByEmail = async (email) => {
        try {
            const result = await this.dao.getByEmail(email);
            return result;
        } catch (error) {
            throw error;
        }
    }

    create = async (body) => {
        try {
            const result = await this.dao.create(body);
            if (!result) throw new CustomError(404, 'Error creating user');
            return result;
        }
        catch (error) {
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
}

export const userService = new UserService(userDao);