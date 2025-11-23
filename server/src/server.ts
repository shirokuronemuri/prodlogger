import express, { type Request, Response, NextFunction } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./modules/error-handler";
import { logStream } from "./modules/logging";
import config from "./config";

const app = express();
app.use(morgan("combined", { stream: logStream }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Max-Age", 7200);
  next();
});
app.use(
  cors({
    origin: [config.clientUrl],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(errorHandler);

export default app;
