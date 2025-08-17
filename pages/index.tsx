import Typography from "@mui/material/Typography";

export default function Home({ message }: { message: string }) {
  return (
    <main style={{ padding: "2rem" }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Hello, Static World 🌍
      </Typography>
      <Typography variant="body1">{message}</Typography>
      <Typography variant="caption">
        whatup
      </Typography>
    </main>
  );
}

// This runs at build time
export async function getStaticProps() {
  return {
    props: {
      message: "This page was generated at build time using getStaticProps. derrrrr whatup",
    },
  };
}