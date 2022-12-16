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
  const columns = handleParams("columns", req, res, response);

  if (await checkForUser(user_id, db)) {
    response.message = `No user with id: ${user_id}`;
    return res.status(response.response).send(response);
  }

  var data = {};

  await db
    .get(
      `SELECT ${
        columns === "" ? "*" : columns
      } FROM ${table} INNER JOIN users ON ${table}.user_id=users.id WHERE user_id="${user_id}";`
    )
    .then((d) => (data = d))
    .catch((e) => {
      response.message = `An error occur: ${e}`;
      return res.status(response.response).send(response);
    });

  response = {
    ...response,
    response: 200,
    message: `successfully get id: ${user_id} from table: ${table}`,
    data: data,
  };

  return res.status(response.response).send(response);
};

export const search = async (
  req: Request,
  res: Response,
  db: sqlite.Database
) => {
  var response: TResponse = {
    response: 404,
    message: "",
    data: [],
  };

  const query = handleParams("query", req, res, response);

  var byName: any[] = [];
  var byId: any[] = [];
  await db
    .all(`SELECT *FROM users WHERE display_name LIKE "%${query}%"`)
    .then((rows) => (byName = rows))
    .catch((e) => {
      response.message = `An error occur: ${e}`;
      return res.status(response.response).send(response);
    });

  await db
    .all(`SELECT * FROM users WHERE id LIKE "%${query}%"`)
    .then((rows) => (byId = rows))
    .catch((e) => {
      response.message = `An error occur: ${e}`;
      return res.status(response.response).send(response);
    });

  response = {
    ...response,
    response: 200,
    message: `successfully searched for "${query}"`,
    data: {
      byName,
      byId,
    },
  };

  return res.status(response.response).send(response);
};
