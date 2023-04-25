import fs from "node:fs/promises";

export const packageJson = JSON.parse(
  await fs.readFile("package.json", "utf8"),
);
