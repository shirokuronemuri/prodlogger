import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      NODE_ENV: string;
      PORT: number;
      DEBUG: string;
    }
  }

  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

export interface JwtUserPayload extends JwtPayload {
  id: string;
  username: string;
}

export {};
