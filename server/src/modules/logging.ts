import fs from "node:fs";
import path from "node:path";

export const logStream = fs.createWriteStream(path.join(process.cwd(), "server.log"), {
  flags: "a",
});
