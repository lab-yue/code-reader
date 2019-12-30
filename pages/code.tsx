import fetch from "isomorphic-unfetch";
import Prism from "prismjs";
import { useRouter } from "next/router";
import "prismjs/components/prism-markdown";
import Tree from "../components/Tree";
//loadLanguages(["tsx"]);

export default function Index({ file, tree }) {
  const { f, repo: r } = useRouter().query;
  const j = (s: string | string[]) => (Array.isArray(s) ? s.join() : s);
  const filepath = j(f);
  const repo = j(r);
  const [ext] = filepath.split(".").reverse();

  let html = "";
  if (ext in Prism.languages) {
    html = Prism.highlight(file, Prism.languages[ext], ext);
  } else {
    html = file;
  }
  return (
    <>
      <style>
        {`
        .flex{
          display: flex;
          justify-content: space-between;
        }
        .nav{
          max-width: 20vw;
          max-height: 100vh;
          overflow: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
          position: sticky;
          top:0;
        }
        .nav::-webkit-scrollbar {
          display: none;
        }
        pre {
          flex:1;
          height: fit-content;
          margin-left: 2rem;
          padding: 1rem;
          font-size: 1.2rem;
          overflow: scroll;
          text-align: left;
          border: 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          color: aliceblue;
          background: #222;
        }
        pre::-webkit-scrollbar {
          display: none;
        }
        code {
          background: none;
          text-shadow: none;
        }
        .keyword {
          color: hotpink;
        }
        .punctuation {
          color: skyblue;
        }
        .tag {
          color: hotpink;
        }
        .builtin {
          color: mediumpurple;
        }
        .operator {
          color: hotpink;
        }
        .function {
          color: #ffd54f;
        }
        .constant {
          color: mediumpurple;
        }
        .parameter {
          color: #fb8c00;
        }
        .string {
          color: yellowgreen;
        }
        .comment {
          color: #555;
        }
        .class-name {
          color: skyblue;
        }`}
      </style>
      <h1>{filepath}</h1>
      <div className="flex">
        <div className="nav">
          <Tree repo={repo} tree={tree} />
        </div>
        <pre>
          <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </>
  );
}

Index.getInitialProps = async ctx => {
  const { query } = ctx;
  const res = await fetch(`http://localhost:3000/api/code?f=${query.f}`);

  const { file } = await res.json();
  const repoRes = await fetch(
    `http://localhost:3000/api/tree?repo=${query.repo}`
  );
  const { tree } = await repoRes.json();

  return { file, tree };
};
