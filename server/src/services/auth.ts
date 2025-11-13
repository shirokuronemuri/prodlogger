import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import prisma from "../modules/db";
import type { NextFunction, Request, Response } from "express";

interface UserBody {
  username: string;
  password: string;
}

export const createUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        passwordHash: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      res.status(409).json({ message: "Username already taken" });
      return;
    }
    next(err);
  }
};

export const signin = async (req: Request<{}, {}, UserBody>, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user && (await comparePasswords(req.body.password, user.passwordHash))) {
      const token = createJWT(user);
      res.json({ token });
    } else {
      res.status(401).send("Not authorized");
    }
  } catch (err) {
    next(err);
  }
};
