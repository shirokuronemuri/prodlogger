import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      NODE_ENV: string;
      PORT: number;
      DEBUG: string;
      CLIENT_URL: string;
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
