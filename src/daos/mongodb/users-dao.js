import {UserModel} from '../models/mongodb/user-model.js';
import mongoDao from './mongo-dao.js';

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

    
}

export const userDao = new UserDao(UserModel);