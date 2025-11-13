import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";

interface JWTUserPayload extends JwtPayload {
  id: string;
  username: string;
}

export const createJWT = (payload: JWTUserPayload) => {
  return jwt.sign(payload, config.jwtSecret);
};

export const comparePasswords = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 5);
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  try {
    if (!token) throw new Error();
    const payload = jwt.verify(token, config.jwtSecret) as JWTUserPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: "Not Authorized" });
  }
};
