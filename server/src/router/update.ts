import { Router } from "express";
import { validateBody } from "../modules/schema-validation";
import { authMiddleware } from "../modules/auth";
import {
  createUpdate,
  deleteUpdate,
  editUpdate,
  getProductUpdates,
  getUpdateById,
} from "../services/update";
import { updateSchema } from "../schema";
import { validateOwner } from "../modules/ownership-validation";
const router = Router();

router.get("/products/:id/updates", getProductUpdates);
router.get("/updates/:id", getUpdateById);
router.post(
  "/products/:id/updates",
  authMiddleware,
  validateOwner("product"),
  validateBody(updateSchema),
  createUpdate,
);
router.put(
  "/updates/:id",
  authMiddleware,
  validateOwner("update"),
  validateBody(updateSchema),
  editUpdate,
);
router.delete("/updates/:id", authMiddleware, validateOwner("update"), deleteUpdate);

export default router;
