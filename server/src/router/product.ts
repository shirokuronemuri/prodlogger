import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getMyProducts,
  getProductById,
  getProductsFromUser,
} from "../services/product";
import { validateBody } from "../modules/schema-validation";
import { productSchema } from "../schema";
import { authMiddleware } from "../modules/auth";
import { validateOwner } from "../modules/ownership-validation";
const router = Router();

router.get("/products", authMiddleware, getMyProducts);
router.get("/user/:id/products", getProductsFromUser);
router.get("/products/:id", getProductById);
router.post(
  "/products",
  authMiddleware,
  validateOwner("product"),
  validateBody(productSchema),
  createProduct,
);
router.put(
  "/products/:id",
  authMiddleware,
  validateOwner("product"),
  validateBody(productSchema),
  editProduct,
);
router.delete("/products/:id", authMiddleware, validateOwner("product"), deleteProduct);

export default router;
