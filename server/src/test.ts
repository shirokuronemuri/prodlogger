import z from "zod";
import util from "node:util";

const schema = z.object({
  username: z.string().min(5),
  password: z.string(),
});

const body = {
  username: "user",
  password: 12,
};

const result = schema.safeParse(body);
if (!result.success)
  console.log(
    util.inspect(z.treeifyError(result.error), {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  );
