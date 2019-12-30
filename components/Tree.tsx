import { useState, useEffect } from "react";
import Link from "next/link";
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
      <style>{`
        .input{
          postion: absolute;
          top:0;
          left:0;
        }
        .tree{
          margin-top: 1rem;
          max-height: 90vh;
          overflow: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: sticky;
          top:0;
        }
        .tree::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <input className="input" onChange={e => setTxt(e.target.value)} />
      <ul className="tree">
        {navTree.map(f => (
          <li key={f.path}>
            <Link href={`/code?repo=${repo}&f=${f.path}`}>{f.short}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
