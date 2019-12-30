import fetch from "isomorphic-unfetch";
import Link from "next/link";
export default function Index({ repos }) {
  return (
    <ul>
      {repos.map(repo => (
        <li key={repo}>
          <Link href={`/tree/${repo}`}>{repo}</Link>
        </li>
      ))}
    </ul>
  );
}

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/repo");
  const { repos } = await res.json();
  return { repos };
};
