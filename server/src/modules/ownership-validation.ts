import type { Request, Response, NextFunction } from "express";
import prisma from "../modules/db";

export const validateOwner =
  (dbTable: "product" | "update") =>
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).send("Not authorized");
      return;
    }
    if (dbTable === "product") {
      const product = await prisma.product.findUnique({ where: { id: req.params.id } });
      if (!product) {
        res.status(404).send("Not found");
        return;
      }
      if (product.belongsToId !== req.user.id) {
        res.status(403).send("Forbidden");
      }
    } else if (dbTable === "update") {
      const update = await prisma.update.findUnique({ where: { id: req.params.id } });
      if (!update) {
        res.status(404).send("Not found");
        return;
      }
      const product = await prisma.product.findUnique({ where: { id: update.productId } });
      if (!product) {
        res.status(404).send("Not found");
        return;
      }
      if (product.belongsToId !== req.user.id) {
        res.status(403).send("Forbidden");
        return;
      }
    }
    next();
  };
