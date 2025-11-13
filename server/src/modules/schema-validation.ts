import z from "zod";
import type { NextFunction, Request, Response } from "express";

z.config({
  customError: (iss) => {
    if (iss.code === "invalid_type" && iss.input === undefined) {
      return "Field is required";
    }
  },
});

export const validateBody =
  (schema: z.ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeDecode(req.body);

    if (result.error) {
      res.status(400).json({
        message: "Validation error",
        errors: z.treeifyError(result.error),
      });
      return;
    }

    next();
  };
