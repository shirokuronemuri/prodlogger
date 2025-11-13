import { Router } from "express";
import { createUser, signin } from "../services/auth";
import { validateBody } from "../modules/schema-validation";
import { authSchema } from "../schema";
const router = Router();

router.post("/register", validateBody(authSchema), createUser);
router.post("/signin", validateBody(authSchema), signin);

export default router;
