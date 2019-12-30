import fetch from "isomorphic-unfetch";

export default function Index({ file }) {
  return (
    <pre>
      <code>{file}</code>
    </pre>
  );
}

Index.getInitialProps = async ctx => {
  const { query } = ctx;
  const res = await fetch(`http://localhost:3000/api/code?f=${query.f}`, {});
  const { file } = await res.json();
  return { file };
};
