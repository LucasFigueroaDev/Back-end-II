import { UserModel } from '../models/users.model.js';
import mongoDao from './mongo.dao.js';

class UserDao extends mongoDao {
    constructor(model) {
        super(model);
    }

    getByemail = async (email) => {
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const userDao = new UserDao(UserModel);