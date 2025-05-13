import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./src/routes/index.js";
import { connectDB } from "./src/config/connection.db.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import "./src/config/passport-jwt/jwtStrategy.js";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', apiRouter);
app.use(errorHandler);

connectDB();

app.listen(8080, () => {
    console.log(`Servidor On http://localhost:${port}`);
});