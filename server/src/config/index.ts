import path from "node:path";

const env = process.env.NODE_ENV || "development";

if (env !== "production") {
  require("dotenv").config({
    path: path.resolve(process.cwd(), `.env.${env}`),
  });
}

export default {
  env,
  port: process.env.PORT | 3000,
  dbUrl: process.env.DATABASE_URL,
  debug: process.env.DEBUG === "true",
  jwtSecret: process.env.JWT_SECRET,
};
