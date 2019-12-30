import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Repo({ tree }) {
  const router = useRouter();
  const { repo } = router.query;

  return (
    <ul>
      {tree.map(f => (
        <li key={f}>
          <a href={`/code?repo=${repo}&f=${f}`}>{f}</a>
        </li>
      ))}
    </ul>
  );
}

Repo.getInitialProps = async ctx => {
  const { repo } = ctx.query;
  const res = await fetch(`http://localhost:3000/api/tree?repo=${repo}`);
  const { tree } = await res.json();
  return { tree };
};
