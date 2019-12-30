import { useState, useEffect } from "react";

type TreeProps = {
  repo: string;
  tree: string[];
};

const name = path => {
  const [short] = path.split("/").reverse();
  return {
    path,
    short
  };
};

export default function Tree({ repo, tree }: TreeProps) {
  const initTree = tree.map(name);
  const [txt, setTxt] = useState("");
  const [navTree, setNavTree] = useState(initTree);

  useEffect(() => {
    const filtered = initTree.filter(path => {
      return path.short.toUpperCase().includes(txt.toUpperCase());
    });
    setNavTree(filtered);
  }, [txt]);
  return (
    <>
      <input onChange={e => setTxt(e.target.value)} />
      <ul>
        {navTree.map(f => (
          <li key={f.path}>
            <a href={`/code?repo=${repo}&f=${f.path}`}>{f.short}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
