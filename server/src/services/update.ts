import prisma from "../modules/db";
import type { NextFunction, Request, Response } from "express";
import { ServerError } from "../modules/error-handler";

export const getProductUpdates = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productWithUpdates = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        updates: {
          include: {
            updatePoints: true,
          },
        },
      },
    });
    if (!productWithUpdates) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json({ data: productWithUpdates.updates });
  } catch (err) {
    next(err);
  }
};

export const getUpdateById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        updatePoints: true,
      },
    });
    if (!update) {
      res.status(404).send("Not found");
      return;
    }
    res.json({ data: update });
  } catch (err) {
    next(err);
  }
};

interface Update {
  title: string;
  body: string;
  version: string;
  updatePoints: UpdatePoint[];
}

interface UpdatePoint {
  contents: string;
  type: "FEATURE" | "IMPROVEMENT" | "BUGFIX";
}

export const createUpdate = async (
  req: Request<{ id: string }, {}, Update>,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return next(new ServerError());
  try {
    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        version: req.body.version,
        productId: req.params.id,
        updatePoints: {
          create: req.body.updatePoints,
        },
      },
      include: {
        updatePoints: true,
      },
    });

    res.json({ data: update });
  } catch (err) {
    next(err);
  }
};

export const editUpdate = async (
  req: Request<{ id: string }, {}, Update>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const fullUpdate = await prisma.$transaction(async (tx) => {
      await tx.updatePoint.deleteMany({
        where: {
          updateId: req.params.id,
        },
      });

      const update = await tx.update.update({
        where: {
          id: req.params.id,
        },
        data: {
          title: req.body.title,
          body: req.body.body,
          version: req.body.version,
          updatePoints: {
            create: req.body.updatePoints,
          },
        },
        include: {
          updatePoints: true,
        },
      });

      return update;
    });

    res.json({ data: fullUpdate });
  } catch (err) {
    next(err);
  }
};

export const deleteUpdate = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).json({ data: {} });
  } catch (err) {
    next(err);
  }
};
