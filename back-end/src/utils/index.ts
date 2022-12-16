import { Request, Response } from "express";
import { TResponse } from "../types";

export const handleParams = (
  field: string,
  req: Request,
  res: Response,
  response: TResponse
) => {
  const result = req.query[field];
  if (result == undefined) {
    response.message = `${field} does not exist`;
    res.status(404).send(response);
  }

  return result ? result.toString() : "";
};

export const handleBody = (
  field: string,
  req: Request,
  res: Response,
  response: TResponse
) => {
  console.log(req.body);

  const result = req.body[field];

  if (result == undefined) {
    response.message = `${field} does not exist`;
    res.status(404).send(response);
  }

  return result ? result.toString() : "";
};
