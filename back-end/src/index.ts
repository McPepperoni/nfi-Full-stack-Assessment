import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { open } from "sqlite";
import path from "path";
import { CreateUser } from "./requests-handler/post";
import { getFromUserID } from "./requests-handler/get";
import { UpdateBalance } from "./requests-handler/patch";

dotenv.config();

const main = async () => {
  const app: Express = express();
  const port = process.env.PORT;
  // const sqlite = sqlite3.verbose();
  const db_path = path.resolve(__dirname, "../db/users_data.db");
  const db = await open(db_path, { verbose: true });

  console.log("database connected");

  app.post("/createUser", (req: Request, res: Response) => {
    return CreateUser(req, res, db);
  });

  app.get("/getFromUserId", (req: Request, res: Response) => {
    return getFromUserID(req, res, db);
  });

  app.patch("/updateBalance", (req, res) => {
    return UpdateBalance(req, res, db);
  });

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server !!!!");
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
  // });
};

main();
