import express from "express";
import { connectDB } from "./daos/mongodb/connection.js";
import { errorHandler } from "./middlewares/error-handler.js";
import productRouter from "./routes/product-router.js";
import userRouter from "./routes/user-router.js";

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