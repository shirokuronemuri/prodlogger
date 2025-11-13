import express from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler } from "./modules/error-handler";
import { logStream } from "./modules/logging";

const app = express();

app.use(cors());
app.use(morgan("combined", { stream: logStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/api", router);

app.use(errorHandler);

export default app;
