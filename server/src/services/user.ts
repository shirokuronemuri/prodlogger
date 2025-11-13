import prisma from "../modules/db";
import type { NextFunction, Request, Response } from "express";
import { ServerError } from "../modules/error-handler";
export const getMyself = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return next(new ServerError());
  try {
    const myself = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      omit: {
        passwordHash: true,
        updatedAt: true,
      },
    });
    res.json({ data: myself });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      omit: {
        passwordHash: true,
        updatedAt: true,
      },
    });
    if (!user) {
      return res.status(404).send("Not found");
    }
    res.json({ data: user });
  } catch (err) {
    next(err);
  }
};

interface EditUserBody {
  username: string;
}

export const editUser = async (
  req: Request<{}, {}, EditUserBody>,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) return next(new ServerError());
  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: req.body,
      omit: {
        passwordHash: true,
        updatedAt: true,
      },
    });

    res.json({ data: user });
  } catch (err) {
    next(err);
  }
};
