import type { Request, Response, NextFunction } from "express";
import { logStream } from "./logging";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";

export class ServerError extends Error {
  statusCode: number;

  constructor(message: string = "An unknown error has occured", statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({ message: "Invalid JSON in request body" });
  } else if (err instanceof ServerError) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err instanceof PrismaClientKnownRequestError && err.code === "P2003") {
    res.status(400).json({ message: "Invalid ID reference" });
  } else if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
    res.status(404).json({ message: "Not found" });
  } else {
    let logMessage = `[ERROR] [${new Date().toISOString()}] ${req.method} ${req.originalUrl} 500 - `;
    if (err instanceof Error) {
      logMessage += `${err.stack || err.message}\n`;
    } else {
      logMessage += `${err}\n`;
    }
    logStream.write(logMessage);
    res.status(500).json({ message: "An unknown error has occured" });
  }

  next();
};
