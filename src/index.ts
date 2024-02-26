import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/User";

const {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_DATABASE,
} = process.env;

const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASS,
  database: DB_DATABASE,
  entities: [
    User,
  ],
  logging: NODE_ENV === "development",
  synchronize: NODE_ENV === "development",
  migrations: [],
});

AppDataSource
  .initialize()
  .then(() => {
    console.log("Typeorm Connection Database Success");
  })
  .catch((err) => {
    console.log("Typeorm Connection ERR:", err);
  });

export const getSource = () => AppDataSource;
