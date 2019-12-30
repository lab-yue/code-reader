import { readFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);

export default async (req, res) => {
  res.statusCode = 200;
  const { f } = req.query;
  if (!f) return res.json({ error: "no f", file: "" });
  try {
    const file = await readFileAsync(f, "utf8");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ file }));
  } catch {
    return res.json({ error: "no f", file: "" });
  }
};
