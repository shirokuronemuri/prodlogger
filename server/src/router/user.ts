import { Router } from "express";
import { editUserSchema } from "../schema";
import { validateBody } from "../modules/schema-validation";
import { authMiddleware } from "../modules/auth";
import { editUser, getMyself, getUser } from "../services/user";
const router = Router();

router.get("/user/me", authMiddleware, getMyself);
router.get("/user/:id", getUser);
router.put("/user", authMiddleware, validateBody(editUserSchema), editUser);

export default router;
