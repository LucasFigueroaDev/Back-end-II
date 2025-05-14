import CustomError from "../utils/customError.js";
import { productDao } from "../dao/product.dao.js";

class ProductRepository {
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
    getById = async (pid) => {
        try {
            const result = await this.dao.getById(pid);
            if(!result) throw new CustomError(404, 'El producto no existe');
            return result;
        } catch (error) {
            throw error;
        }
    }
    create = async (body) => {
        try {
            const result = await this.dao.create(body);
            if (!result) throw new CustomError(404, 'Error al crear el producto');
            return result;
        } catch (error) {
            throw error;
        }
    }
    update = async (id, body) => {
        try {
            const result = await this.dao.update(id, body);            
            if (!result) throw new CustomError(404, 'Error al actualizar el producto');
            return result;
        } catch (error) {
            throw error;
        }
    }
    delete = async (id) => {
        try {
            const result = await this.dao.delete(id);
            if (!result) throw new CustomError(404, 'Error al eliminar el producto');
            return result;
        } catch (error) {
            throw error;
        }
    }
};

export const productRepository = new ProductRepository(productDao);