import execa from "execa";

const cache = new Map();

export default async (req, res) => {
  const { repo } = req.query;
  const cached = cache.get(repo);

  if (cached) {
    console.log("from cache");
    return res.json({ tree: cached });
  }
  const { stdout } = await execa("tree", [
    `./hub/${repo}`,
    "-f",
    "--noreport",
    "-i",
    "-F"
  ]);
  const tree = stdout.split("\n").filter(f => !f.endsWith("/"));
  cache.set(repo, tree);
  res.json({ tree });
};
