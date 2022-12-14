import { Request, Response } from "express";
import sqlite from "sqlite";
import { TResponse } from "../types";
import { handleParams } from "../utils";

export const checkForUser = async (user_id: string, db: sqlite.Database) => {
  const user = await db.get(`SELECT * FROM users WHERE id="${user_id}"`);

  return user === undefined;
};

export const getFromUserID = async (
  req: Request,
  res: Response,
  db: sqlite.Database
) => {
  var response: TResponse = {
    response: 404,
    message: "",
    data: [],
  };

  const user_id = handleParams("user_id", req, res, response);
  const table = handleParams("table", req, res, response);

  if (await checkForUser(user_id, db)) {
    response.message = `No user with id: ${user_id}`;
    return res.status(response.response).send(response);
  }

  const data = await db.get(
    `SELECT * FROM ${table} WHERE user_id="${user_id}";`
  );

  response = {
    ...response,
    response: 200,
    message: `successfully get id: ${user_id} from table: ${table}`,
    data: data,
  };

  return res.status(response.response).send(response);
};
