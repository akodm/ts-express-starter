require("dotenv").config(); // dotenv config.
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes';
import userRouter from './routes/user';
import moment from 'moment';
import './sequelize';
moment.locale("ko"); // localization.

// port setup.
const normalizePort = (val: string) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const port = normalizePort(process.env.PORT ?? "3333");

const app = express();

const corsOptions = {
  origin: "*", // or process.env.CLIENT_URL.
  optionsSuccessStatus: 200
};

// app options.
app.use(cors(corsOptions));
app.use(helmet());
app.use(logger("dev")); // + winston ?
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));  // static folder.

// app run.
app.listen(port, () => {
  console.log(`${process.env?.NODE_ENV} Hello Typescript-Express ! ${moment().format("YYYY. MM. DD. (ddd) HH:mm:ss")}`);
  process.send && process.send("ready");
});

// + app.io = socket.io

// error.
app.on("error", (error: any) => {
  if(error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string"
    ? "Pipe " + port
    : "Port " + port;

  switch(error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// routes.
app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  // Route Not Found.
  next(createError(404));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  /**
   * Route API Error Handling.
   * throw new Error: x.
   * custom handling: return next({ s: status code, m: error message. });
   */

  const status = err.s ?? err.status ?? 500;
  const message = err.m ?? err.message ?? err;

  console.log(err);
  return res.status(status).send({
    result: false,
    data: null,
    message
  });
});

export default app;