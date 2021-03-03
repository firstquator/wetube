// Get module : require
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import { localsMiddleware } from "./middleware";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import "./passport";


const app = express();


// Keep Log In
const CookieStore = MongoStore(session);
dotenv.config();
// Middleware
app.use(helmet());
// pug templates application
app.set('view engine', "pug");
app.use("/uploads", express.static("uploads"));
app.use("/build", express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({mongooseConnection: mongoose.connection})
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);
app.use(
  helmet({
  contentSecurityPolicy: false,
})
);
export default app;