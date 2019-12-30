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

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/tree");
  const { tree } = await res.json();
  return { tree };
};
