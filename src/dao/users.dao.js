import { UserModel } from '../models/users.model.js';
import mongoDao from './mongo.dao.js';

class UserDao extends mongoDao {
    constructor(model) {
        super(model);
    }

    getByEmail = async (email) => {
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new Error(error);
        }
    }

    getUserById = async (uid) => {
        try {
            return await this.model.findById(uid).populate('cart');
        } catch (error) {
            throw new Error(error);
        }
    }

    findOne = async (query) =>{
        try {
            return await this.model.findOne(query);
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const userDao = new UserDao(UserModel);