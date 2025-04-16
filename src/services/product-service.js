import CustomError from "../utils/custom-error.js";
import { productDao } from "../daos/mongodb/product-dao.js";

class ProductService {
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
    create = async (body) => {
        try {
            const result = await this.dao.create(body);
            if (!result) throw new CustomError(404, 'Error creating product');
            return result;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, body) => {
        try {
            const result = await this.dao.update(id, body);            
            if (!result) throw new CustomError(404, 'Error updating product');
            return result;
        } catch (error) {
            throw error;
        }
    }
    delete = async (id) => {
        try {
            const result = await this.dao.delete(id);
            if (!result) throw new CustomError(404, 'Error deleting product');
            return result;
        } catch (error) {
            throw error;
        }
    }
};

export const productService = new ProductService(productDao);