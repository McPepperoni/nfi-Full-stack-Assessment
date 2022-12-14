import { Request, Response } from "express";
import sqlite from "sqlite";
import { TBalance, TResponse } from "../types";
import { handleParams } from "../utils";
import { checkForUser } from "./get";

export const UpdateBalance = async (
  req: Request,
  res: Response,
  db: sqlite.Database
) => {
  var response: TResponse = {
    response: 404,
    message: "",
    data: {},
  };

  const operation = handleParams("operation", req, res, response);
  const user_id = handleParams("user_id", req, res, response);
  const amount = parseFloat(handleParams("amount", req, res, response));

  if (await checkForUser(user_id, db)) {
    response.message = `No user with id: ${user_id}`;
    return res.status(response.response).send(response);
  }

  var data: TBalance = {
    id: "",
    user_id: "",
    balance: 0,
  };

  await db
    .get(`SELECT * FROM balance WHERE user_id="${user_id}";`)
    .then((v) => {
      data = { ...v };
    })
    .catch((err) => {
      response.message = err;
      return res.status(response.response).send(response);
    });

  switch (operation) {
    case "deposit":
      data.balance += amount;
      break;
    case "withdraw":
      data.balance -= amount;

      if (data.balance < 0) {
        response.message = "the amount to withdraw is insufficient";
        return res.status(response.response).send(response);
      }
      break;
  }

  await db
    .run(
      `UPDATE balance SET balance=${data.balance} WHERE user_id="${user_id}"`
    )
    .catch((err) => {
      response.message = err;
      return res.status(response.response).send(response);
    });

  response = {
    ...response,
    response: 200,
    message: `successfully ${operation} with the amount of ${amount}`,
    data,
  };

  return res.status(response.response).send(response);
};
