import fetch from "isomorphic-unfetch";

export default function Index({ file }) {
  return <>{JSON.stringify(file)}</>;
}

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/code");
  const { file } = await res.json();
  return { file };
};
