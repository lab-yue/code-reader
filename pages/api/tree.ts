import execa from "execa";

const cache = new Map();

export default async (req, res) => {
  const key = "react";
  const cached = cache.get(key);

  if (cached) {
    console.log("from cache");
    return res.json({ tree: cached });
  }
  const { stdout } = await execa("tree", [
    "./hub/react",
    "-f",
    "--noreport",
    "-i",
    "-F"
  ]);
  const tree = stdout.split("\n").filter(f => !f.endsWith("/"));
  cache.set(key, tree);
  res.json({ tree });
};
