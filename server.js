import express from "express";
import productRouter from "./src/routes/product.router.js";
import userRouter from "./src/routes/user.router.js";
import adminRouter from "./src/routes/admin.router.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/connection.db.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import "./src/config/passport-jwt/jwtStrategy.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/products', productRouter);
app.use('/api/sessions', userRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

connectDB();

app.listen(8080, () => {
    console.log(`Servidor On http://localhost:${port}`);
});