import fetch from "isomorphic-unfetch";

export default function Index({ repos }) {
  return (
    <ul>
      {repos.map(repo => (
        <li>
          <a href={`/tree/${repo}`}>{repo}</a>
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
