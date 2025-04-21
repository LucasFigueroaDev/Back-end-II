import { ProductModel } from "../models/products.model.js";
import mongoDao from "./mongo.dao.js";
class ProductDao extends mongoDao {
    constructor(model) {
        super(model);   
    }
}

export const productDao = new ProductDao(ProductModel); 