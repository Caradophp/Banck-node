import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function verifyAuth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token não informado",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "12345");

    console.log("Token:", sub);

    next(); // <- MUITO IMPORTANTE
  } catch (error) {
    return response.status(401).json({
      message: "Token inválido",
    });
  }
}