import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import logger from "morgan";
import moment from "moment";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
moment.locale("ko");

import indexRouter from "./routes";

const app = express();

const { PORT, NODE_ENV } = process.env;

app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next({ s: 404, m: "존재하지 않는 주소입니다." });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.s || err.status || 500;
  const message = err.m || "문제가 발생했습니다. 잠시 후 다시 시도해주세요.";

  console.error("Catch Error:", err);

  return res.status(status).send({
    result: false,
    message: message,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`NODE_ENV: ${NODE_ENV} ${PORT} ${moment().format("YYYY-MM-DD (ddd) HH:mm")}`);

  process.send && process.send("ready");
});

export default app;
