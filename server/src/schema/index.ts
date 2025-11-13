import z from "zod";

export const authSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
});

export const editUserSchema = z.object({
  username: z.string().min(4),
  password: z.string(),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const updateSchema = z.object({
  title: z.string(),
  body: z.string(),
  version: z.string(),
  updatePoints: z.array(
    z.object({
      contents: z.string(),
      type: z.enum(["FEATURE", "IMPROVEMENT", "BUGFIX"]),
    }),
  ),
});
