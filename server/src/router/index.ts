import { Router } from "express";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import updateRouter from "./update.js";
import userRouter from "./user.js";
const router = Router();

router.use(authRouter);
router.use(productRouter);
router.use(userRouter);
router.use(updateRouter);

export default router;
