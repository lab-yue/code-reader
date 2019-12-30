import execa from "execa";

const cache = new Map();

export default async (req, res) => {
  const key = "react";
  const cached = cache.get(key);

  if (cached) {
    console.log("from cache");
    return res.json({ repos: cached });
  }
  const { stdout } = await execa("ls", ["./hub"]);
  const repos = stdout.split("\n");
  cache.set(key, repos);
  res.json({ repos });
};
