import { productRepository } from "../repositories/product.repository.js";
import { createResponse } from "../utils/createResponse.js";

class ProductController {
    constructor(repository) {
        this.repository = repository
    }

    getAll = async (req, res, next) => {
        try {
            const data = await this.repository.getAll();
            createResponse(res, 200, {message: 'Todos los productos', data} );
        } catch (error) {
            next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const data = await this.repository.getById(pid);
            createResponse(res, 200, { message:'Producto por ID', data });
        } catch (error) {
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const data = await this.repository.create(req.body);
            createResponse(res, 201, { message: 'Producto creado', data });
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const data = await this.repository.update(pid, req.body);
            createResponse(res, 200, { message:'Producto actualizado', data });
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const response = await this.repository.delete(pid);
            createResponse(res, 200, { message: 'Producto eliminado', response });
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController(productRepository);