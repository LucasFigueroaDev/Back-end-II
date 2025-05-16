import express from "express";
import cookieParser from "cookie-parser";
import apiRouter from "./src/routes/index.js";
import handlebars from "express-handlebars";
import path from "path";
import { connectDB } from "./src/config/connection.db.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { __dirname } from "./src/utils/utils.js";
import "./src/config/passport-jwt/jwtStrategy.js";

const port = 8080;
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use('/api', apiRouter);
app.use(errorHandler);

connectDB();

app.listen(8080, () => {
    console.log(`Servidor On http://localhost:${port}`);
});