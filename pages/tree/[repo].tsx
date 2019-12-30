import fetch from "isomorphic-unfetch";
import Link from "next/link";

export default function Index({ tree }) {
  return (
    <ul>
      {tree.map(f => (
        <li>
          <a href={`/code?f=${f}`}>{f}</a>
        </li>
      ))}
    </ul>
  );
}

Index.getInitialProps = async ctx => {
  const { repo } = ctx.query;
  const res = await fetch(`http://localhost:3000/api/tree?repo=${repo}`);
  const { tree } = await res.json();
  return { tree };
};
