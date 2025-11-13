import prisma from "../modules/db";
import type { NextFunction, Request, Response } from "express";
import { ServerError } from "../modules/error-handler";

export const getProductsFromUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userWithProducts = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        products: true,
      },
    });
    if (!userWithProducts) {
      res.status(404).send("Not found");
      return;
    }
    res.json({ data: userWithProducts.products });
  } catch (err) {
    next(err);
  }
};

export const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ServerError());
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
    });

    res.json({ data: products });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      res.status(404).send("Not found");
      return;
    }

    res.send({ data: product });
  } catch (err) {
    next(err);
  }
};

interface ProductBody {
  name: string;
  description: string;
}

export const createProduct = async (
  req: Request<{}, {}, ProductBody>,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return next(new ServerError());
  try {
    const product = await prisma.product.create({
      data: {
        ...req.body,
        belongsToId: req.user.id,
      },
    });

    res.send({ data: product });
  } catch (err) {
    next(err);
  }
};

export const editProduct = async (
  req: Request<{ id: string }, {}, ProductBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json({ data: {} });
  } catch (err) {
    next(err);
  }
};
