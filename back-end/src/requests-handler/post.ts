import { randomUUID } from "crypto";
import { Request, Response } from "express";
import sqlite from "sqlite";
import { TBalance, TResponse, TUser } from "../types";
import { handleBody } from "../utils";
import { checkForUser } from "./get";

//Create new User with balance
export const CreateUser = async (
  req: Request,
  res: Response,
  db: sqlite.Database
) => {
  var response: TResponse = {
    response: 404,
    message: "",
    data: {},
  };

  const user: TUser = {
    id: `${Date.now().toString(36)}-${randomUUID()}`,
    display_name: handleBody("display_name", req, res, response),
  };

  if (!(await checkForUser(user.id, db))) {
    response.message = `User with id: ${user.id} has already exist`;
    return res.status(response.response).send(response);
  }

  await db
    .run(
      `
      INSERT INTO users(id, display_name) VALUES("${user.id}", "${user.display_name}");
    `
    )
    .catch((err) => {
      response.message = err.message;
      return res.status(response.response).send(response);
    });

  const balance: TBalance = {
    id: `${Date.now().toString(36)}-${randomUUID()}`,
    user_id: user.id,
    display_name: user.display_name,
    balance: 0,
  };

  await db
    .run(
      `
      INSERT INTO balance(id, user_id) VALUES("${balance.id}", "${balance.user_id}");
    `
    )
    .catch((err) => {
      if (err) {
        response.message = err.message;
        return res.status(response.response).send(response);
      }
    });

  response = {
    response: 200,
    message: "successfully create user",
    data: balance,
  };

  return res.status(200).send(response);
};
