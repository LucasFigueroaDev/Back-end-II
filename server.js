import express from "express";
import productRouter from "./src/routes/product-router.js";
import userRouter from "./src/routes/user-router.js";
import { connectDB } from "./src/daos/mongodb/connection.js";
import { errorHandler } from "./src/middlewares/error-handler.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use(errorHandler);

connectDB();

app.listen(8080, () => {
    console.log(`Servidor On http://localhost:${port}`);
});